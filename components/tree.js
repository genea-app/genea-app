Vue.component('tree', {
    template: `
        <div id="treecontainer">
            <div id="tree"></div>
        </div>
    `,
    props: ["person"],
    data: function() {
        return {}
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
            if (this.$root.isDebug()) {
                console.log("Person:", this.$root.person);
                console.log("Relations:", this.$root.person.relations);
            }
            var page = this.$root.page;
            if (!["tree", "personaldetails", "relations"].includes(page)) {
                page = "tree";
            }
            document.location.hash = "/" + page + "/" + id
        }
    }
});