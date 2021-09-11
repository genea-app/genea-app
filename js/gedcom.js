var Gedcom = (function() {
    // Constructor
    function Gedcom() {
        gedcom = this;
    }

    // Private variables
    var gedcom;

    // Public properties
    this.data = null;

    // Public methods

    // Parse a GEDCOM file into a javascript object
    Gedcom.prototype.parse = function(data) {
        /*
        Todo: Use this instead of below when Firefox finally fixes their RegExp engine.
        var regex1 = /(?<level>[0-9]+)\s+(?<pointer>@[^@]+@ |)(?<tag>[_a-zA-Z0-9]+)(?: |)(?<value>[^\n\r]*)|(?<invalid>[^\n\r]*)/g;
        var regex2 = /(?<level>[0-9]+)\s+(?<pointer>@[^@]+@ |)(?<tag>[_a-zA-Z0-9]+)(?: |)(?<value>[^\n\r]*)|(?<invalid>[^\n\r]*)/;
        */
        var regex1 = /([0-9]+)\s+(@[^@]+@ |)([_a-zA-Z0-9]+)(?: |)([^\n\r]*)|([^\n\r]*)/g;
        var regex2 = /([0-9]+)\s+(@[^@]+@ |)([_a-zA-Z0-9]+)(?: |)([^\n\r]*)|([^\n\r]*)/;
        // Parse individual rows into array, then parse each row into object{level, pointer(optional), tag, value(optional)}
        var dataArray = data
            .match(regex1) // Parse rows
            /*
            Todo: Use this instead of below when Firefox finally fixes their RegExp engine.
            .map(row => row.match(regex2).groups) // Parse items
            */
            .map(function(row) {
                var match = row.match(regex2); // Parse items
                return {
                    level: match[1],
                    pointer: match[2],
                    tag: match[3],
                    value: match[4],
                    invalid: match[5]
                };
            })
            .reduce(function(rows, item) {
                // Preprocess data in order to include all lines that are not in valid GEDCOM format, by concatenating their value to the previous line. Also process CONC and CONT tags.
                if (item.tag == "CONC") {
                    rows[rows.length - 1].value += item.value;
                } else if (item.tag == "CONT") {
                    rows[rows.length - 1].value += "\n" + item.value;
                } else if (!item.invalid && item.invalid !== "") {
                    rows.push(item);
                } else if (item.invalid !== "") {
                    rows[rows.length - 1].value += "\n" + item.invalid;
                }
                return rows;
            }, [])
            .map(function(item) // Clean up items
                {
                    var temp = {};
                    temp.level = parseInt(item.level);
                    if (item.pointer) {
                        temp.pointer = item.pointer.trim();
                    }
                    if (item.tag) {
                        temp.tag = item.tag.trim().toUpperCase();
                    }
                    if (item.value) {
                        temp.value = item.value;
                    }
                    if (!temp.items) {
                        temp.items = [];
                    }
                    return temp;
                });
        // Change array into multilevel tree of items
        var dataTree = dataArray.map(function(item, i, rows) {
            // Add all immediate children to items
            for (var j = i + 1; j < rows.length; j++) {
                if (item.level + 1 == rows[j].level) {
                    if (!item.items) {
                        item.items = [];
                    }
                    item.items.push(rows[j]);
                } else if (item.level >= rows[j].level) {
                    break;
                }
            }
            return item;
        });
        // Remove all none root levels from tree
        dataTree = dataTree.filter(item => item.level == 0)
        this.data = dataTree;
    }

    // Convert the javascript object containing family data into GEDCOM format
    Gedcom.prototype.stringify = function() {
        var dataTree = this.data.slice(0);
        // Recursively loop over each item and add to data array
        var dataArray = [];
        dataTree.forEach(function flatten(item) {
            // Preprocess value for inserting CONC and CONT tags
            var values = [];
            if (item.value) {
                values = item.value.match(/(\n|.{1,200})/g);
            }
            // Add data
            dataArray.push(`${item.level}${item.pointer ? " " + item.pointer : ""}${item.tag ? " " + item.tag : ""}${values.length > 0 ? " " + values[0] : ""}`);
            // Add extra data in CONT or CONC
            while (values.length > 1) {
                values.shift();
                if (values[0].includes("\n")) {
                    dataArray.push(`${item.level + 1} CONT ${values[1]}`);
                    values.shift();
                } else {
                    dataArray.push(`${item.level + 1} CONC ${values[0]}`);
                }
            }
            // Children
            if (item.items) {
                item.items.forEach(flatten);
            }
            return item;
        });
        // Return data array as string
        return dataArray.join("\n");
    }

    Gedcom.prototype.filename = function() {
        var filename = "genea.app.ged";
        try {
            filename = this.data.find(item => item.tag == "HEAD").items.find(item => item.tag == "FILE").value;
        } catch {

        }
        return filename;
    }

    // Return the id of the first person in the GEDCOM file
    Gedcom.prototype.firstPerson = function() {
        return this.data.find(item => item.level == 0 && item.tag == "INDI").pointer;
    }

    // Return a list of every person in the GEDCOM file
    Gedcom.prototype.getPersons = function() {
        var persons = this.data.filter(item => item.level == 0 && item.tag == "INDI").map(item => gedcom.person(item.pointer));
        return persons;
    }

    // Return full details about person
    Gedcom.prototype.person = function(id) {
        var person = this.data.find(item => item.level == 0 && item.pointer == id && item.tag == "INDI");
        if (person && person.items) {
            var name = ((person.items.find(item => item.tag == "NAME") || {}).value || "Unknown").replace(/\//g, "");
            var gender = (person.items.find(item => item.tag == "SEX") || {}).value;
            var birth = (((person.items.find(detail => detail.tag == "BIRT") || {}).items || []).find(detail => detail.tag == "DATE") || {}).value
            var death = (((person.items.find(detail => detail.tag == "DEAT") || {}).items || []).find(detail => detail.tag == "DATE") || {}).value
            var caption = `${name} (${parseDate(birth).getFullYear() || "?"} - ${parseDate(death).getFullYear() || "?"})`;
            return {
                "id": id,
                "name": name,
                "gender": (gender || "").toUpperCase(),
                "birth": birth,
                "death": death,
                "caption": caption,
                "items": person.items
            };
        } else {
            return {}; // Person not found
        }
    }

    // Create a new person
    Gedcom.prototype.addPerson = function(givenName, surName, gender) {
        var personId = "@I" + (this.data.filter(item => item.tag == "INDI").map(item => parseInt(item.pointer.replace(/[^\d]/g, ''))).reduce((a, b) => Math.max(a, b), []) + 1) + "@";
        this.data.push({
            "level": 0,
            "pointer": personId,
            "tag": "INDI",
            "items": [{
                    "level": 1,
                    "tag": "NAME",
                    "value": givenName + " /" + surName + "/",
                    "items": [{
                            "level": 2,
                            "tag": "SURN",
                            "value": surName,
                            "items": []
                        },
                        {
                            "level": 2,
                            "tag": "GIVN",
                            "value": givenName,
                            "items": []
                        }
                    ]
                },
                {
                    "level": 1,
                    "tag": "SEX",
                    "value": gender
                }
            ]
        });
        return this.person(personId);
    }

    Gedcom.prototype.addRelation = function(partner1Id, partner2Id) {
        var relationId = "@F" + (this.data.filter(item => item.tag == "FAM").map(item => parseInt(item.pointer.replace(/[^\d]/g, ''))).reduce((a, b) => Math.max(a, b), []) + 1) + "@";
        var partner1 = this.person(partner1Id);
        var partner2 = this.person(partner2Id);
        var partnerItems = [{
            "level": 1,
            "tag": ((partner1.gender || "").substring(0, 1).toUpperCase() == "F" ? "WIFE" : "HUSB"),
            "value": partner1.id
        }]
        if (partner2Id) {
            partnerItems.push({
                "level": 1,
                "tag": ((partner2.gender || "").substring(0, 1).toUpperCase() == "F" ? "WIFE" : "HUSB"),
                "value": partner2.id
            });
        }
        this.data.push({
            "level": 0,
            "pointer": relationId,
            "tag": "FAM",
            "items": partnerItems
        });
        this.data.find(item => item.tag == "INDI" && item.pointer == partner1Id).items.push({
            "level": 1,
            "tag": "FAMS",
            "value": relationId
        });
        if (partner2Id) {
            this.data.find(item => item.tag == "INDI" && item.pointer == partner2Id).items.push({
                "level": 1,
                "tag": "FAMS",
                "value": relationId
            });
        }
        return relationId;
    }

    Gedcom.prototype.removeRelation = function(relationId) {
        var index = this.data.findIndex(fam => fam.tag == "FAM" && fam.pointer == relationId);
        this.data.splice(index, 1);
        this.data.filter(item => item.tag == "INDI").forEach(function(item) {
            var index = item.items.findIndex(fam => fam.tag == "FAMS" && fam.pointer == relationId);
            if (index >= 0) {
                this.data.splice(index, 1);
            }
        })
    }

    Gedcom.prototype.addSibling = function(personId, siblingId) {
        var relationId = this.data.find(fam => fam.tag == "FAM" && fam.items.find(member => member.tag == "CHIL" && member.value == personId)).pointer;
        this.addChild(relationId, siblingId);

    }
    Gedcom.prototype.removeSibling = function(siblingId) {
        this.removeChild(siblingId);
    }

    Gedcom.prototype.addChild = function(relationId, childId) {
        this.data.find(fam => fam.tag == "FAM" && fam.pointer == relationId).items.push({
            "level": 1,
            "tag": "CHIL",
            "value": childId
        });
        this.data.find(item => item.tag == "INDI" && item.pointer == childId).items.push({
            "level": 1,
            "tag": "FAMC",
            "value": relationId
        });
    }
    Gedcom.prototype.removeChild = function(childId) {
        this.data.filter(fam => fam.tag == "FAM").forEach(function(item) {
            var index = item.items.findIndex(child => child.tag == "CHIL" && child.value == childId)
            if (index >= 0) {
                item.items.splice(index, 1);
            }
        });
        this.data.filter(item => item.tag == "INDI" && item.pointer == childId).forEach(function(item) {
            var index = item.items.findIndex(fam => fam.tag == "FAMC");
            while (index >= 0) {
                item.items.splice(index, 1);
                index = item.items.findIndex(fam => fam.tag == "FAMC");
            }
        });
    }

    // Query GEDCOM data and return details of relative
    Gedcom.prototype.paternalgrandfather = function(id) {
        try {
            var fatherId = gedcom.father(id).id;
            var paternalgrandfather = gedcom.father(fatherId).id;
            return gedcom.person(paternalgrandfather);
        } catch {
            console.log(`No paternal grand father found for ${id}`);
            return {};
        }
    }
    Gedcom.prototype.paternalgrandmother = function(id) {
        try {
            var fatherId = gedcom.father(id).id;
            var paternalgrandmother = gedcom.mother(fatherId).id;
            return gedcom.person(paternalgrandmother);
        } catch {
            console.log(`No paternal grand father found for ${id}`);
            return {};
        }
    }
    Gedcom.prototype.maternalgrandfather = function(id) {
        try {
            var motherId = gedcom.mother(id).id;
            var maternalgrandfather = gedcom.father(motherId).id;
            return gedcom.person(maternalgrandfather);
        } catch {
            console.log(`No paternal grand father found for ${id}`);
            return {};
        }
    }
    Gedcom.prototype.maternalgrandmother = function(id) {
        try {
            var motherId = gedcom.mother(id).id;
            var maternalgrandmother = gedcom.mother(motherId).id;
            return gedcom.person(maternalgrandmother);
        } catch {
            console.log(`No paternal grand father found for ${id}`);
            return {};
        }
    }
    Gedcom.prototype.father = function(id) {
        try {
            var father = this.data.find(fam => fam.tag == "FAM" && fam.items.find(member => member.tag == "CHIL" && member.value == id)).items.find(member => member.tag == "HUSB");
            return gedcom.person(father.value);
        } catch {
            console.log(`No father found for ${id}`);
            return {};
        }
    }
    Gedcom.prototype.mother = function(id) {
        try {
            var mother = this.data.find(fam => fam.tag == "FAM" && fam.items.find(member => member.tag == "CHIL" && member.value == id)).items.find(member => member.tag == "WIFE");
            return gedcom.person(mother.value);
        } catch {
            console.log(`No mother found for ${id}`);
            return {};
        }
    }
    Gedcom.prototype.siblings = function(id) {
        try {
            var siblings = this.data.find(fam => fam.tag == "FAM" && fam.items.find(member => member.tag == "CHIL" && member.value == id)).items.filter(member => member.tag == "CHIL" && member.value != id);
            return siblings.map(sibling => gedcom.person(sibling.value));
        } catch {
            console.log(`No siblings found for ${id}`);
            return [];
        }
    }
    Gedcom.prototype.relations = function(id) {
        try {
            return this.data.filter(fam => fam.tag == "FAM" && fam.items.find(member => (member.tag == "HUSB" || member.tag == "WIFE") && member.value == id)).map(function(fam) {
                var partner = fam.items.find(member => (member.tag == "HUSB" || member.tag == "WIFE") && member.value != id);
                var children = fam.items.filter(member => (member.tag == "CHIL"));
                var output = {};
                output.id = fam.pointer;
                if (partner) {
                    output.partner = gedcom.person(partner.value);
                }
                output.children = children.map(child => gedcom.person(child.value));
                return output;
            });
        } catch {
            console.log(`No relations found for ${id}`);
            return [];
        }
    }

    // Private methods
    function parseDate(date) {
        try {
            return new Date(date);
        } catch {
            return null;
        }
    }

    return Gedcom;
})();