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

            <div style="position: fixed; bottom: 45px; right: 24px;">
                <button v-on:click="addPerson()" class="btn modal-trigger btn-floating btn-large waves-effect waves-light red"><i class="material-icons">add</i></button>
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