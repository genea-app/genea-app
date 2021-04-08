var Stamboom = (function() {

            function Stamboom() {
                // Constructor
            }

            // Private variables
            var dot = "";
            var blankFamily = {
                paternalgrandfather: {},
                paternalgrandmother: {},
                maternalgrandfather: {},
                maternalgrandmother: {},
                father: {},
                mother: {},
                current: {},
                siblings: [],
                relations: []
            }

            var selectedPerson;
            var family;
            var onselectCallback;

            var gedcom = new Gedcom();

            // Public properties
            this.isLoaded = false;

            // Public methods
            Stamboom.prototype.register = function(options) {
                this.treecontainer = options.treecontainer;
                this.tree = options.tree;
            }

            Stamboom.prototype.load = function(data) {
                gedcom.parse(data);
                this.isLoaded = true;
                drag();
            }

            Stamboom.prototype.save = function() {
                return gedcom.stringify();
            }

            Stamboom.prototype.debug = function() {
                return dot;
            }

            Stamboom.prototype.getFilename = function() {
                return gedcom.filename();
            }

            Stamboom.prototype.select = function(id) {
                selectedPerson = (id ? id : gedcom.firstPerson());
                if (document.getElementById("stamboom_" + id)) {
                    // When person is already on the screen, scroll into the center of the view before selecting
                    document.getElementById("stamboom_" + id).scrollIntoView({ behavior: "smooth", inline: "center", block: "center" });
                    window.setTimeout(function() {
                        init();
                    }, 500);
                } else {
                    init();
                }
                onselectCallback(selectedPerson);
            }
            Stamboom.prototype.getPerson = function(id) {
                return gedcom.person(id);
            }
            Stamboom.prototype.getRelations = function(id) {
                return gedcom.relations(id);
            }
            Stamboom.prototype.getPersons = function() {
                return gedcom.getPersons();
            }

            Stamboom.prototype.addPerson = function(givenName, surName, gender) {
                return gedcom.addPerson(givenName, surName, gender);
            }

            Stamboom.prototype.addRelation = function(parent1Id, parent2Id) {
                return gedcom.addRelation(parent1Id, parent2Id);
            }
            Stamboom.prototype.removeRelation = function(childId) {
                gedcom.removeRelation(childId);
            }

            Stamboom.prototype.addChild = function(relationId, childId) {
                return gedcom.addChild(relationId, childId);
            }
            Stamboom.prototype.removeChild = function(childId) {
                gedcom.removeChild(childId);
            }


            Stamboom.prototype.onselect = function(callback) {
                onselectCallback = callback;
            }

            // Private methods
            function init() {
                family = Object.assign({}, blankFamily);
                loadFamily();
                draw();
            }

            function loadFamily() {
                family.paternalgrandfather = gedcom.paternalgrandfather(selectedPerson);
                family.paternalgrandmother = gedcom.paternalgrandmother(selectedPerson);
                family.maternalgrandfather = gedcom.maternalgrandfather(selectedPerson);
                family.maternalgrandmother = gedcom.maternalgrandmother(selectedPerson);
                family.father = gedcom.father(selectedPerson);
                family.mother = gedcom.mother(selectedPerson);
                family.current = gedcom.person(selectedPerson);
                family.siblings = gedcom.siblings(selectedPerson);
                family.relations = gedcom.relations(selectedPerson);
            }

            function draw() {
                // Node drawing
                var node = {
                    draw: function(person) {
                        return `` +
                            `id="stamboom_${person.id}",` +
                            (person.id ? `href="#/tree/${person.id}",` : ``) +
                            `color="${node.color(person)}",` +
                            (selectedPerson == person.id ? `style="filled,bold",fillcolor="white",` : ``) +
                            (selectedPerson == person.id ? `class="selectedPerson",` : ``) +
                            `tooltip=" ",` +
                            `label=<<table border="2" cellspacing="0" cellpadding="0" fixedsize="true" height="55" width="122">` +
                            `<tr>` +
                            `<td border="0" fixedsize="true" height="53" width="45">` +
                            `<img src="${node.image(person)}" scale="both" />` +
                            `</td>` +
                            `<td border="0" fixedsize="true" align="left">` +
                            `<b>${node.label(person)}</b>` +
                            `</td>` +
                            `</tr>` +
                            `</table>>`;
                    },
                    label: function(person) {
                        // Format name and split over multiple lines
                        var maxLength = 15;
                        if (!person.name) {
                            person.name = "";
                        }
                        var parts = person.name.split(" ");
                        var output = [""];
                        for (var i = 0; i < parts.length; i++) {
                            if (parts[i].length + (output[output.length - 1]).length > maxLength) {
                                output.push(parts[i]);
                            } else {
                                output[output.length - 1] = output[output.length - 1] + " " + parts[i];
                            }
                        }
                        output = output.map(part => { return (part.length < maxLength ? part : part.substr(0, maxLength) + "...") });
                        return output.join("<br/>");
                    },
                    color: function(person) {
                        switch ((person.gender || "").substring(0, 1).toUpperCase()) {
                            case "F":
                                return "pink";
                            case "M":
                                return "lightblue";
                            case "U":
                                return "lightgray";
                            case "":
                                return "lightgray";
                            default:
                                return "olivedrab3";
                        }
                    },
                    image: function(person) {
                        return "img/unknown.png";
                    }
                }

                // Preprocess
                if (!family.relations || family.relations.length == 0) {
                    family.relations = [];
                }
                family.relations = family.relations.map(function(relation) {
                    if (!relation.children || relation.children.length == 0) {
                        relation.children = [];
                    }
                    return relation;
                });

                // Dot graph definition
                dot =
                    `digraph G {` + `\n` +

                    `graph [nodesep=0.15,splines=ortho,ranksep=0.35]` + `\n` +
                    `node [shape=box,fontname=Helvetica,fontsize=8,fixedsize=true,width=1.7,height=0.75,style=filled]` + `\n` +

                    `// ----- Grand Parents -----\n` +
                    `PaternalGrandFather [${node.draw(family.paternalgrandfather)}]` + `\n` +
                    `PaternalGrandMother [${node.draw(family.paternalgrandmother)}]` + `\n` +
                    `MaternalGrandFather [${node.draw(family.maternalgrandfather)}]` + `\n` +
                    `MaternalGrandMother [${node.draw(family.maternalgrandmother)}]` + `\n` +
                    `// ----- Parents -----\n` +
                    `Father [${node.draw(family.father)}]` + `\n` +
                    `Mother [${node.draw(family.mother)}]` + `\n` +
                    `// ----- Current -----\n` +
                    `Current [${node.draw(family.current)}]` + `\n` +
                    `// ----- Siblings -----\n` +
                    (family.siblings || []).map(function(sibling, x) {
                        return `Sibling${x} [${node.draw(sibling)}]`;
                    }).join("\n") + `\n` +
                    `// ----- Relations -----\n` +
                    (family.relations || []).map(function(relation, x) {
                        return `Relation${x} [${node.draw(relation.partner)}]`;
                    }).join("\n") + `\n` +
                    `// ----- Children -----\n` +
                    (family.relations || []).map(function(relation, x) {
                        return (relation.children || []).map(function(child, y) {
                            return `Relation${x}Child${y} [${node.draw(child)}]`;

                        }).join("\n");
                    }).join("\n") + `\n` +

                    `\n// ----- Settings -----\n` +
                    `node[color=green, label="", width=0, height=0];` + `\n` +
                    `edge[arrowtail=none, arrowhead=none, color=cornflowerblue];` + `\n` +

                    `\n// ----- Paternal and Maternal Grand Parents -----\n` +
                    `{rank=same;PaternalGrandFather;PaternalGrandParentsDot;PaternalGrandMother;MaternalGrandFather;MaternalGrandParentsDot;MaternalGrandMother}` + `\n` +
                    `PaternalGrandFather -> PaternalGrandParentsDot -> PaternalGrandMother` + `\n` +
                    `PaternalGrandParentsDot` + `\n` +
                    `PaternalGrandParentsDot -> Father` + `\n` +

                    `MaternalGrandFather -> MaternalGrandParentsDot -> MaternalGrandMother` + `\n` +
                    `MaternalGrandParentsDot -> Mother` + `\n` +

                    `\n// ----- Parents -----\n` +
                    `{rank=same;Father;ParentsDot;Mother}` + `\n` +
                    `Father -> ParentsDot -> Mother` + `\n` +
                    `ParentsDot -> ParentsChildrenDot` + `\n` +

                    `\n// ----- Siblings -----\n` +
                    `{rank=same;ParentsChildrenDot${family.siblings.map(function (sibling, x) { return `;Sibling${x}Dot`; }).join("")}}` + `\n` +

                    `ParentsChildrenDot` + family.siblings.map(function (sibling, x) { return ` -> Sibling${x}Dot`; }).join("") + `\n` +
                    `ParentsChildrenDot -> Current` + `\n` +
                    family.siblings.map(function (sibling, x) {
                        return `Sibling${x}Dot -> Sibling${x}`;
                    }).join("\n") + `\n` +

                    `\n// ----- Relations -----\n` +
                    `{rank=same;Current${family.relations.map(function (relation, x) { return `;Relation${x}Dot;Relation${x}`; }).join("")}${family.siblings.map(function (sibling, x) { return `;Sibling${x}`; }).join("")}}` + `\n` +

                    (
                        family.relations.length > 0
                            ?
                            `Current -> Relation0Dot` + `\n` +
                            `Relation0Dot -> Relation0` + `\n` +
                            family.relations.slice(1).map(function (relation, x) {
                                return `` +
                                    `Relation${x} -> Relation${x + 1}Dot [color="gray",style="dashed"]` + `\n` +
                                    `Relation${x + 1}Dot -> Relation${x + 1} [color="gray",style="dashed"]`;
                            }).join("\n") + `\n`
                            :
                            ``
                    ) +

                    `\n// ----- Children -----\n` +
                    (family.relations || []).map(function (relation, x) {
                        if (relation.children.length > 0) {
                            return `` +
                                `{rank=same${relation.children.map(function (child, y) { return `;Relation${x}Child${y}Dot`; }).join("")}}` + `\n` +
                                `{rank=same${relation.children.map(function (child, y) { return `;Relation${x}Child${y}`; }).join("")}}` + `\n` +

                                `Relation${x}Dot -> Relation${x}Child${relation.children.length - 1}Dot` + `\n` +

                                relation.children.map(function (child, y) { return `Relation${x}Child${y}Dot`; }).join(" -> ") + `\n` +

                                (relation.children || []).map(function (child, y) {
                                    return `Relation${x}Child${y}Dot:s -> Relation${x}Child${y}:n`;
                                }).join("\n")
                        }
                    }).join("\n") + `\n` +

                    `}
                    
                `;

                // Render dot graph
                hpccWasm.graphviz.layout(dot, "svg", "dot", {
                    images:
                        [
                            { path: "img/unknown.png", width: "512px", height: "682px" }
                        ]
                }).then(function (svg) {
                    this.tree.innerHTML = svg;
                    // Scroll selected person into center of the view
                    if (this.document.getElementsByClassName("selectedPerson")[0]) {
                        this.document.getElementsByClassName("selectedPerson")[0].scrollIntoView({ behavior: "auto", inline: "center", block: "center" });
                    }
                }).catch(function (err) {
                    console.error(err.message)
                });
            }

            function drag() {
                // Dragging the stamboom
                var dragElement = this.treecontainer;
                var dragPosition = { top: 0, left: 0, x: 0, y: 0 };
                var dragStart = function (e) {
                    dragElement.style.cursor = 'grabbing';
                    dragElement.style.userSelect = 'none';
                    dragPosition =
                    {
                        left: dragElement.scrollLeft,
                        top: dragElement.scrollTop,
                        // Get the current mouse position
                        x: parseInt(e.clientX || e.touches[0].clientX),
                        y: parseInt(e.clientY || e.touches[0].clientY),
                    };
                    document.addEventListener('mousemove', dragMove);
                    document.addEventListener('touchmove', dragMove);
                    document.addEventListener('mouseup', dragEnd);
                    document.addEventListener('touchend', dragEnd);
                };
                var dragMove = function (e) {
                    // How far the mouse has been moved
                    const dx = parseInt(e.clientX || e.touches[0].clientX) - dragPosition.x;
                    const dy = parseInt(e.clientY || e.touches[0].clientY) - dragPosition.y;
                    // Scroll the element
                    dragElement.scrollTop = dragPosition.top - dy;
                    dragElement.scrollLeft = dragPosition.left - dx;
                };
                var dragEnd = function () {
                    dragElement.style.cursor = 'grab';
                    dragElement.style.removeProperty('user-select');
                    document.removeEventListener('mousemove', dragMove);
                    document.removeEventListener('touchmove', dragMove);
                    document.removeEventListener('mouseup', dragEnd);
                    document.removeEventListener('touchend', dragEnd);
                };
                // Attach the handler
                dragElement.addEventListener('mousedown', dragStart);
                dragElement.addEventListener('touchstart', dragStart);
            }

	return Stamboom;
})();