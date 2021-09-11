Vue.component('relations', {
    template: `
        <div class="container">
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
                        <a class="waves-effect waves-light btn" v-on:click="addChild(index)"><i class="material-icons left">person_add</i>Add child</a>
                    </template>
                    <div v-if="!person.relations || person.relations.length==0">
                        No relations or children. Click the Add button to add a new relation.
                    </div>
                </div>
            </div>

            <!-- Modals -->
            <div id="modalAdd" class="modal">
                <div class="modal-content">
                    <h4>Add</h4>
                    <p>
                        <label>
                            <input type="radio" value="new" v-model="modalAdd.action" />
                            <span>Create new person</span>
                        </label>
                    </p>
                    <p>
                        <label>
                            <input type="radio" value="link" v-model="modalAdd.action" />
                            <span>Link with existing person</span>
                        </label>
                    </p>
                    <template v-if="modalAdd.action=='new'">
                        <h4>New Person</h4>
                        <div class="row">
                            <div class="col s6">
                                <div class="input-field">
                                    <label for="givenName" class="active">Given Name</label>
                                    <input id="givenName" v-model="modalAdd.givenName" type="text"/>
                                </div>
                            </div>
                            <div class="col s6">
                                <div class="input-field">
                                    <label for="surName" class="active">Surname</label>
                                    <input id="surName" v-model="modalAdd.surName" type="text"/>
                                </div>
                            </div>
                            <div class="col s6">
                                <div class="input-field">
                                    <label for="sex" class="active">Sex</label>
                                    <input id="sex" v-model="modalAdd.sex" class="autocomplete" type="text"/>
                                </div>
                            </div>
                            <div class="col s12">
                                <a class="btn waves-effect waves-light modal-close" v-on:click="create();"><i class="material-icons left">person_add</i>Create</a>
                            </div>
                        </div>
                    </template>
                    <template v-if="modalAdd.action=='link'">
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
                <button v-on:click="addPartner(person)" class="btn btn-floating btn-large waves-effect waves-light red"><i class="material-icons">add</i></button>
            </div>
        </div>
    `,
    props: ["person"],
    data: function() {
        return {
            modalAdd: {}
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
        }
    },
    methods: {
        addPartner: function() {
            this.modalAdd.type = "partner";
            var modal = M.Modal.init(document.querySelector("#modalAdd"), {
                "onCloseEnd": this.clearModal
            });
            modal.open();
        },
        addChild: function(relationIndex) {
            this.modalAdd.type = "child";
            this.modalAdd.relationIndex = relationIndex;
            var modal = M.Modal.init(document.querySelector("#modalAdd"), {
                "onCloseEnd": this.clearModal
            });
            modal.open();
        },
        create: function() {
            if (this.modalAdd.type == "partner") {
                var newPerson = stamboom.addPerson(this.modalAdd.givenName, this.modalAdd.surName, this.modalAdd.sex);
                stamboom.addRelation(this.person.id, newPerson.id);
                stamboom.select(this.person.id);
            } else if (this.modalAdd.type == "child") {
                var newPerson = stamboom.addPerson(this.modalAdd.givenName, this.modalAdd.surName, this.modalAdd.sex);
                var relation = this.person.relations[this.modalAdd.relationIndex];
                stamboom.addChild(relation.id, newPerson.id)
            }
            // Force update
            stamboom.select(this.person.id);
        },
        link: function() {
            if (this.modalAdd.type == "partner") {
                stamboom.addRelation(this.person.id, this.modalAdd.person.id);
            } else if (this.modalAdd.type == "child") {
                var relation = this.person.relations[this.modalAdd.relationIndex];
                stamboom.removeChild(this.modalAdd.person.id);
                stamboom.addChild(relation.id, this.modalAdd.person.id);
            }
            // Force update
            stamboom.select(this.person.id);
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
        clearModal: function() {
            this.modalAdd = {};
        },
        openPerson: function(id) {
            stamboom.select(id);
        }
    }
});