Vue.component('tree', {
    template: `
        <div>
            <div id="treecontainer">
                <div id="tree"></div>
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
    methods: {
        onselect: function(id) {
            this.$root.selectedPerson = id;
            this.$root.person = stamboom.getPerson(id);
            this.$root.person.relations = stamboom.getRelations(id);
            this.$root.person.parents = stamboom.getParents(id);
            if (this.$root.isDebug()) {
                console.log("Person:", this.$root.person);
                console.log("Relations:", this.$root.person.relations);
                console.log("Parents:", this.$root.person.parents);
            }
            var page = this.$root.page;
            if (!["tree", "personaldetails", "relations"].includes(page)) {
                page = "tree";
            }
            document.location.hash = "/" + page + "/" + id
        },
        addPerson: function() {
            this.$parent.$refs.modalNewPerson.open();
        }
    }
});