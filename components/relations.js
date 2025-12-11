Vue.component('relations', {
    template: `
        <div class="container">

            <div class="row" style="margin-bottom: 0;">
                <div class="col s12 offset-m1">
                    <h1 class="header">
                        Parents
                    </h1>
                </div>
            </div>
            <div class="row">
                <div class="col s12 offset-m1">
                    <ul v-if="person.parents && person.parents.length>0" class="collection with-header">
                        <li v-for="(parent, index) in person.parents" class="collection-header" :key="parent.id">
                            <a :href="'#/relations/' + parent.id">{{parent.caption}}</a>
                        </li>
                    </ul>
                    <div v-if="!person.parents || person.parents.length==0">
                        No parents.
                    </div>
                </div>
            </div>
            
            <div class="row" style="margin-bottom: 0;">
                <div class="col s12 offset-m1">
                    <h1 class="header">
                        Relations and Children
                    </h1>
                </div>
            </div>
            <div class="row">
                <div class="col s12 offset-m1">
                    <template v-for="(relation, index) in person.relations">
                        <ul class="collection with-header" :key="relation.id">
                            <li class="collection-header">
                                <h4>
                                    <a :href="'#/relations/' + relation.partner.id" class="black-text">{{relation.partner.caption}}</a>
                                    <a style="float: right;" v-on:click="unlinkPartner(relation.id);" v-if="relation.children.length==0"><i class="material-icons">link_off</i></a>
                                </h4>
                            </li>
                            <li v-for="(child, childIndex) in relation.children" :key="child.id" class="collection-item">
                                <a :href="'#/relations/' + child.id">{{child.caption}}</a>
                                <a class="secondary-content" v-on:click="unlinkChild(child.id);"><i class="material-icons">link_off</i></a>
                            </li>
                        </ul>
                    </template>
                    <div v-if="!person.relations || person.relations.length==0">
                        No relations or children. Click the Add button to add a new relation.
                    </div>
                </div>
            </div>

            <div class="row" style="margin-bottom: 0;">
                <div class="col s12 offset-m1">
                    <h1 class="header">
                        Relationship Finder
                    </h1>
                </div>
            </div>
            <div class="row">
                <div class="col s12 offset-m1">
                    <div class="input-field">
                        <input type="text" id="relationshipFinderInput" v-model="relationshipFinderQuery" 
                               @keyup="updateRelationshipSuggestions" 
                               @focus="showRelationshipSuggestions = true"
                               placeholder="Type a person's name to find relationship">
                        <label for="relationshipFinderInput" class="active">Find relationship to:</label>
                    </div>
                    <div v-if="showRelationshipSuggestions && filteredPersons.length > 0" class="collection" style="max-height: 200px; overflow-y: auto; margin-top: -20px;">
                        <a v-for="p in filteredPersons" :key="p.id" 
                           @click="findRelationshipPath(p.id)" 
                           class="collection-item" 
                           style="cursor: pointer;">
                            {{p.caption}}
                        </a>
                    </div>
                    <div v-if="relationshipPath && relationshipPath.length > 0" class="card blue-grey lighten-5" style="margin-top: 20px;">
                        <div class="card-content">
                            <span class="card-title">Relationship Path</span>
                            <div v-for="(step, index) in relationshipPath" :key="index" style="margin-bottom: 15px;">
                                <div style="display: flex; align-items: center;">
                                    <span style="font-weight: bold; color: #1976d2;">
                                        <a :href="'#/relations/' + step.person.id" style="color: #1976d2;">{{step.person.caption}}</a>
                                    </span>
                                </div>
                                <div v-if="step.relationship" style="margin-left: 20px; margin-top: 5px; color: #546e7a;">
                                    <i class="material-icons tiny" style="vertical-align: middle;">arrow_downward</i>
                                    <span style="font-style: italic;">{{step.relationship}}</span>
                                    <i class="material-icons tiny" style="vertical-align: middle;">arrow_downward</i>
                                </div>
                            </div>
                            <div v-if="relationshipSummary" style="margin-top: 20px; padding: 10px; background: white; border-radius: 4px;">
                                <strong>Summary:</strong> {{relationshipSummary}}
                            </div>
                        </div>
                    </div>
                    <div v-else-if="relationshipPath && relationshipPath.length === 0 && relationshipFinderQuery" class="card orange lighten-4" style="margin-top: 20px;">
                        <div class="card-content">
                            <span>No relationship path found between these two people.</span>
                        </div>
                    </div>
                </div>
            </div>

            <div style="position: fixed; bottom: 45px; right: 24px;">
                <button v-on:click="addPerson()" class="btn modal-trigger btn-floating btn-large waves-effect waves-light red"><i class="material-icons">add</i></button>
            </div>
        </div>
    `,
    props: ["person"],
    data: function() {
        return {
            modalAdd: {},
            relationshipFinderQuery: '',
            showRelationshipSuggestions: false,
            filteredPersons: [],
            relationshipPath: null,
            relationshipSummary: null
        }
    },
    watch: {
        modalAdd: {
            handler: function(val, oldVal) {
                if (val.action == "link") {
                    var data = this.modalAdd;
                    window.setTimeout(function() {
                        M.Autocomplete.init(document.querySelector('#existingPerson'), {
                            data: (function() {
                                var persons = stamboom.getPersons();
                                persons = Object.fromEntries(persons.map(person => [person.caption]));
                                return persons;
                            })(),
                            onAutocomplete: function(selection) {
                                var person = stamboom.getPersons().find(person => person.caption == selection);
                                data.person = person;
                            }
                        });
                    }, 200);
                }
            },
            deep: true
        },
        relationshipFinderQuery: function(newVal) {
            if (!newVal || newVal.trim() === '') {
                this.showRelationshipSuggestions = false;
                this.filteredPersons = [];
            }
        }
    },
    methods: {
        updateRelationshipSuggestions: function() {
            const query = this.relationshipFinderQuery.toLowerCase().trim();
            if (query === '') {
                this.filteredPersons = [];
                this.showRelationshipSuggestions = false;
                return;
            }
            
            const allPersons = stamboom.getPersons();
            this.filteredPersons = allPersons
                .filter(p => p.id !== this.person.id && p.caption.toLowerCase().includes(query))
                .slice(0, 10); // Limit to 10 suggestions
            this.showRelationshipSuggestions = true;
        },
        
        findRelationshipPath: function(targetId) {
            this.showRelationshipSuggestions = false;
            const targetPerson = stamboom.getPersons().find(p => p.id === targetId);
            if (!targetPerson) {
                this.relationshipPath = [];
                return;
            }
            
            this.relationshipFinderQuery = targetPerson.caption;
            
            // BFS to find shortest path between current person and target
            const path = this.findShortestPath(this.person.id, targetId);
            
            if (path && path.length > 0) {
                // Build detailed relationship path
                this.relationshipPath = this.buildRelationshipPath(path);
                this.relationshipSummary = this.generateRelationshipSummary(this.relationshipPath);
            } else {
                this.relationshipPath = [];
                this.relationshipSummary = null;
            }
        },
        
        findShortestPath: function(startId, endId) {
            if (startId === endId) {
                return [startId];
            }
            
            const visited = new Set();
            const queue = [[startId]];
            visited.add(startId);
            
            while (queue.length > 0) {
                const path = queue.shift();
                const currentId = path[path.length - 1];
                
                // Get all related persons (parents, children, spouses)
                const related = this.getRelatedPersons(currentId);
                
                for (const relatedId of related) {
                    if (relatedId === endId) {
                        return [...path, endId];
                    }
                    
                    if (!visited.has(relatedId)) {
                        visited.add(relatedId);
                        queue.push([...path, relatedId]);
                    }
                }
            }
            
            return null; // No path found
        },
        
        getRelatedPersons: function(personId) {
            const related = [];
            
            // Get parents
            const father = stamboom.father(personId);
            const mother = stamboom.mother(personId);
            if (father && father.id) related.push(father.id);
            if (mother && mother.id) related.push(mother.id);
            
            // Get spouses/partners
            const relations = stamboom.relations(personId);
            relations.forEach(rel => {
                if (rel.partner && rel.partner.id) {
                    related.push(rel.partner.id);
                }
            });
            
            // Get children
            relations.forEach(rel => {
                if (rel.children) {
                    rel.children.forEach(child => {
                        if (child.id) related.push(child.id);
                    });
                }
            });
            
            // Get siblings
            const siblings = stamboom.siblings(personId);
            siblings.forEach(sib => {
                if (sib.id) related.push(sib.id);
            });
            
            return related;
        },
        
        buildRelationshipPath: function(idPath) {
            const path = [];
            
            for (let i = 0; i < idPath.length; i++) {
                const currentId = idPath[i];
                const person = stamboom.person(currentId);
                
                let relationship = null;
                if (i < idPath.length - 1) {
                    const nextId = idPath[i + 1];
                    relationship = this.describeRelationship(currentId, nextId);
                }
                
                path.push({
                    person: person,
                    relationship: relationship
                });
            }
            
            return path;
        },
        
        describeRelationship: function(personId1, personId2) {
            // Check if person2 is parent of person1
            const father = stamboom.father(personId1);
            const mother = stamboom.mother(personId1);
            if (father && father.id === personId2) {
                return "is the father of";
            }
            if (mother && mother.id === personId2) {
                return "is the mother of";
            }
            
            // Check if person2 is child of person1
            const relations = stamboom.relations(personId1);
            for (const rel of relations) {
                if (rel.children) {
                    for (const child of rel.children) {
                        if (child.id === personId2) {
                            return "is the child of";
                        }
                    }
                }
            }
            
            // Check if person2 is spouse/partner of person1
            for (const rel of relations) {
                if (rel.partner && rel.partner.id === personId2) {
                    return "is the spouse/partner of";
                }
            }
            
            // Check if person2 is sibling of person1
            const siblings = stamboom.siblings(personId1);
            for (const sib of siblings) {
                if (sib.id === personId2) {
                    return "is the sibling of";
                }
            }
            
            return "is related to";
        },
        
        generateRelationshipSummary: function(path) {
            if (!path || path.length < 2) return null;
            
            const start = path[0].person.name || 'Person';
            const end = path[path.length - 1].person.name || 'Person';
            const distance = path.length - 1;
            
            if (distance === 1) {
                return `${start} ${path[0].relationship} ${end} (direct relationship)`;
            } else {
                return `${start} and ${end} are ${distance} step(s) apart in the family tree`;
            }
        },
        
        addPerson: function() {
            this.$parent.$refs.modalNewPerson.open();
        },
        unlinkChild: function(childId) {
            if (window.confirm("Confirm you want to remove this child from the relation.")) {
                stamboom.removeChild(childId);
                // Force update
                stamboom.select(this.person.id);
            }
        },
        unlinkPartner: function(relationId) {
            if (window.confirm("Confirm you want to remove this relation.")) {
                stamboom.removeRelation(relationId);
                // Force update
                stamboom.select(this.person.id);
            }
        },
        openPerson: function(id) {
            stamboom.select(id);
        }
    }
});