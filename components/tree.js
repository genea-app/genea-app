Vue.component('tree', {
    template: `
        <div>
            <div id="treecontainer">
                <div id="tree"></div>
            </div>

            <!-- Modals -->
            <div id="modalAddPerson" class="modal">
                <div class="modal-content">
                    <template>
                        <h4>Add</h4>
                        <p>
                            <label>
                                <input type="radio" value="parent" v-model="modalAddPerson.type" :disabled="parents().length>=2" />
                                <span>Parent<span v-if="parents().length>=2"> - Already has two or more parents.</span></span>
                            </label>
                        </p>
                        <p>
                            <label>
                                <input type="radio" value="relation" v-model="modalAddPerson.type" />
                                <span>Relation</span>
                            </label>
                        </p>
                        <p>
                            <label>
                                <input type="radio" value="sibling" v-model="modalAddPerson.type" :disabled="parents().length==0" />
                                <span>Sibling<span v-if="parents().length==0"> - Add a Parent first.</span></span>
                            </label>
                        </p>
                        <p>
                            <label>
                                <input type="radio" value="child" v-model="modalAddPerson.type" :disabled="relations().length==0" />
                                <span>Child<span v-if="relations().length==0"> - Add a Relation first.</span></span>
                            </label>
                        </p>
                        <p>
                            <label>
                                <input type="radio" value="unrelated" v-model="modalAddPerson.type" />
                                <span>Unrelated</span>
                            </label>
                        </p>
                    </template>
                    <template v-if="modalAddPerson.type=='child'">
                        <h4>Relation</h4>
                        <p v-for="relation in relations()">
                            <label>
                                <input type="radio" :value="relation" v-model="modalAddPerson.relation" />
                                <span>{{relation.partner.name}}</span>
                            </label>
                        </p>
                    </template>
                    <template v-if="(modalAddPerson.type!='child' && modalAddPerson.type!='unrelated') || (modalAddPerson.type=='child' && modalAddPerson.relation)">
                        <h4>How</h4>
                        <p>
                            <label>
                                <input type="radio" value="new" v-model="modalAddPerson.action" />
                                <span>Create new person</span>
                            </label>
                        </p>
                        <p>
                            <label>
                                <input type="radio" value="link" v-model="modalAddPerson.action" />
                                <span>Link with existing person</span>
                            </label>
                        </p>
                    </template>
                    <template v-if="modalAddPerson.action=='new' || modalAddPerson.type=='unrelated'">
                        <h4>New Person</h4>
                        <div class="row">
                            <div class="col s6">
                                <div class="input-field">
                                    <label for="givenName" class="active">Given Name</label>
                                    <input id="givenName" v-model="modalAddPerson.givenName" type="text"/>
                                </div>
                            </div>
                            <div class="col s6">
                                <div class="input-field">
                                    <label for="surName" class="active">Surname</label>
                                    <input id="surName" v-model="modalAddPerson.surName" type="text"/>
                                </div>
                            </div>
                            <div class="col s6">
                                <div class="input-field">
                                    <label for="sex" class="active">Sex</label>
                                    <input id="sex" v-model="modalAddPerson.sex" class="autocomplete" type="text"/>
                                </div>
                            </div>
                            <div class="col s12">
                                <a class="btn waves-effect waves-light modal-close" v-on:click="create();"><i class="material-icons left">person_add</i>Create</a>
                            </div>
                        </div>
                    </template>
                    <template v-if="modalAddPerson.action=='link'">
                        <h4>Existing Person</h4>
                        <div class="row">
                            <div class="col s6">
                                <div class="input-field">
                                    <i class="material-icons prefix">person</i>
                                    <input id="existingPerson" type="text" class="autocomplete" placeholder="Find Person" />
                                </div>
                            </div>
                            <div class="col s12">
                                <a class="btn waves-effect waves-light modal-close" v-on:click="link();"><i class="material-icons left">link</i>Link</a>
                            </div>
                        </div>
                    </template>
                </div>
                <div class="modal-footer">
                    <a class="modal-close waves-effect waves-green btn-flat">Close</a>
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
            modalAddPerson: {}
        }
    },
    mounted: function() {
        stamboom.register({
            treecontainer: document.getElementById("treecontainer"),
            tree: document.getElementById("tree")
        });
        // Register to stamboom events
        stamboom.onselect(this.onselect);
    },
    watch: {
        modalAddPerson: {
            handler: function(val, oldVal) {
                if (val.action == "link") {
                    var data = this.modalAddPerson;
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
        }
    },
    methods: {

        // Tree view

        onselect: function(id) {
            this.$root.selectedPerson = id;
            this.$root.person = stamboom.getPerson(id);
            this.$root.person.relations = stamboom.getRelations(id);
            if (this.$root.isDebug()) {
                console.log("Person:", this.$root.person);
                console.log("Relations:", this.$root.person.relations);
            }
            var page = this.$root.page;
            if (!["tree", "personaldetails", "relations"].includes(page)) {
                page = "tree";
            }
            document.location.hash = "/" + page + "/" + id
        },

        // Modal

        addPerson: function() {
            var modal = M.Modal.init(document.querySelector("#modalAddPerson"), {
                "onCloseEnd": this.clearModal
            });
            modal.open();
        },
        clearModal: function() {
            this.modalAddPerson = {};
        },
        create: function() {
            var newPerson = stamboom.addPerson(this.modalAddPerson.givenName, this.modalAddPerson.surName, this.modalAddPerson.sex);
            if (this.modalAddPerson.type == "parent") {
                var relationId = null;
                if (stamboom.getParents(this.person.id).length == 0) {
                    // Mock relation in order to get a FAM record
                    relationId = stamboom.addRelation(newPerson.id);
                } else if (stamboom.getParents(this.person.id).length == 1) {
                    // Remove existing one-parent FAM record and recreate for both parents
                    var parent = stamboom.getParents(this.person.id)[0].id;
                    var tempRelationId = stamboom.getRelations(parent)[0].id;
                    stamboom.removeRelation(tempRelationId);
                    relationId = stamboom.addRelation(parent, newPerson.id);
                } else {
                    return;
                }
                stamboom.addChild(relationId, this.person.id);
                // Add child
            } else if (this.modalAddPerson.type == "relation") {
                stamboom.addRelation(this.person.id, newPerson.id);
                stamboom.select(this.person.id);
            } else if (this.modalAddPerson.type == "sibling") {
                stamboom.addSibling(this.person.id, newPerson.id);
                stamboom.select(this.person.id);
            } else if (this.modalAddPerson.type == "child") {
                stamboom.addChild(this.modalAddPerson.relation.id, newPerson.id)
            } else if (this.modalAddPerson.type == "unrelated") {
                // Switch to the new person, no further linkage needed.
                this.person.id = newPerson.id;
            }
            // Force update
            stamboom.select(this.person.id);
        },
        link: function() {
            if (this.modalAddPerson.type == "parent") {
                var relationId = null;
                if (stamboom.getParents(this.person.id).length == 0) {
                    // Mock relation in order to get a FAM record
                    relationId = stamboom.addRelation(this.modalAddPerson.person.id);
                } else if (stamboom.getParents(this.person.id).length == 1) {
                    // Remove existing one-parent FAM record and recreate for both parents
                    var parent = stamboom.getParents(this.person.id)[0].id;
                    var tempRelationId = stamboom.getRelations(parent)[0].id;
                    stamboom.removeRelation(tempRelationId);
                    relationId = stamboom.addRelation(parent, this.modalAddPerson.person.id);
                } else {
                    return;
                }
                stamboom.addChild(relationId, this.person.id);
                // Add child
            } else if (this.modalAddPerson.type == "relation") {
                stamboom.addRelation(this.person.id, this.modalAddPerson.person.id);
                stamboom.select(this.person.id);
            } else if (this.modalAddPerson.type == "sibling") {
                stamboom.addSibling(this.person.id, this.modalAddPerson.person.id);
                stamboom.select(this.person.id);
            } else if (this.modalAddPerson.type == "child") {
                stamboom.addChild(this.modalAddPerson.relation.id, this.modalAddPerson.person.id)
            } else if (this.modalAddPerson.type == "unrelated") {
                // Switch to the new person, no further linkage needed.
                this.person.id = this.modalAddPerson.person.id;
            }
            // Force update
            stamboom.select(this.person.id);
        },

        relations: function() {
            return stamboom.getRelations(this.person.id);
        },
        parents: function() {
            return stamboom.getParents(this.person.id);
        }

    }
});