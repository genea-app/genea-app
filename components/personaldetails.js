Vue.component('personaldetails', {
    template: `
        <div class="container">
            <div class="row" style="margin-bottom: 0;">
                <div class="col s12 offset-m1">
                    <h1 class="header">
                        Personal Details
                    </h1>
                </div>
            </div>
            <personaldetails-list :items="person.items" :mode="'simple'" :level="0"></personaldetails-list>
            <div class="row">
                <div class="col s12 offset-m1">
                    <ul class="collection">
                        <li class="collection-item">
                            <div class="switch">
                                <label>
                                    <input type="checkbox" v-model="advancedMode">
                                    <span class="lever"></span>
                                    Advanced fields
                                </label>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <personaldetails-list :items="person.items" :mode="'advanced'" :level="0" v-if="advancedMode"></personaldetails-list>
            <!-- Modals -->
            <div id="modalEditPersonalDetail" class="modal">
                <div class="modal-content">
                    <h4>Edit</h4>
                    <div class="input-field">
                        <label for="editTag" :class="{active:modalEditPersonalDetail.tag}">Tag</label>
                        <input id="editTag" type="text" v-model="modalEditPersonalDetail.tag" />
                    </div>
                    <div class="input-field">
                        <label for="editValue" class="active">Value</label>
                        <textarea id="editValue" class="materialize-textarea" v-model="modalEditPersonalDetail.value"></textarea>
                    </div>
                </div>
                <div class="modal-footer">
                    <a class="modal-close waves-effect waves-green btn-flat">Close</a>
                </div>
            </div>
            <div id="modalAddPersonalDetail" class="modal">
                <div class="modal-content">
                    <h4>Add</h4>
                    <ul class="collection with-header">
                        <li class="collection-header"><h5>Foundation</h5></li>
                        <li class="collection-item modal-close" v-on:click="addItem('NAME')">Name<a class="secondary-content"><i class="material-icons">add</i></a></li>
                        <li class="collection-item modal-close" v-on:click="addItem('BIRTH')">Birth<a class="secondary-content"><i class="material-icons">add</i></a></li>
                        <li class="collection-item modal-close" v-on:click="addItem('DEATH')">Death<a class="secondary-content"><i class="material-icons">add</i></a></li>
                        <li class="collection-item modal-close" v-on:click="addItem('BURIAL')">Burial<a class="secondary-content"><i class="material-icons">add</i></a></li>
                        <li class="collection-header"><h5>Life Events</h5></li>
                        <li class="collection-item modal-close" v-on:click="addItem('BAPM')">Baptism<a class="secondary-content"><i class="material-icons">add</i></a></li>
                        <li class="collection-item modal-close" v-on:click="addItem('CHR')">Christening<a class="secondary-content"><i class="material-icons">add</i></a></li>
                        <li class="collection-item modal-close" v-on:click="addItem('CENS')">Census<a class="secondary-content"><i class="material-icons">add</i></a></li>
                        <li class="collection-item modal-close" v-on:click="addItem('CREM')">Cremation<a class="secondary-content"><i class="material-icons">add</i></a></li>
                        <li class="collection-item modal-close" v-on:click="addItem('GRAD')">Graduation<a class="secondary-content"><i class="material-icons">add</i></a></li>
                        <li class="collection-item modal-close" v-on:click="addItem('EMIG')">Emigration<a class="secondary-content"><i class="material-icons">add</i></a></li>
                        <li class="collection-item modal-close" v-on:click="addItem('IMMI')">Immigration<a class="secondary-content"><i class="material-icons">add</i></a></li>
                        <li class="collection-item modal-close" v-on:click="addItem('NATU')">Naturalization<a class="secondary-content"><i class="material-icons">add</i></a></li>
                        <li class="collection-item modal-close" v-on:click="addItem('RETI')">Retirement<a class="secondary-content"><i class="material-icons">add</i></a></li>
                        <li class="collection-item modal-close" v-on:click="addItem('PROB')">Probate<a class="secondary-content"><i class="material-icons">add</i></a></li>
                        <li class="collection-item modal-close" v-on:click="addItem('WILL')">Will<a class="secondary-content"><i class="material-icons">add</i></a></li>
                        <li class="collection-header"><h5>Attributes</h5></li>
                        <li class="collection-item modal-close" v-on:click="addItem('OCCU')">Occupation<a class="secondary-content"><i class="material-icons">add</i></a></li>
                        <li class="collection-item modal-close" v-on:click="addItem('EDUC')">Education<a class="secondary-content"><i class="material-icons">add</i></a></li>
                        <li class="collection-item modal-close" v-on:click="addItem('RELI')">Religion<a class="secondary-content"><i class="material-icons">add</i></a></li>
                        <li class="collection-item modal-close" v-on:click="addItem('RESI')">Residence<a class="secondary-content"><i class="material-icons">add</i></a></li>
                        <li class="collection-item modal-close" v-on:click="addItem('NATI')">Nationality<a class="secondary-content"><i class="material-icons">add</i></a></li>
                        <li class="collection-item modal-close" v-on:click="addItem('CAST')">Caste<a class="secondary-content"><i class="material-icons">add</i></a></li>
                        <li class="collection-item modal-close" v-on:click="addItem('DSCR')">Physical Description<a class="secondary-content"><i class="material-icons">add</i></a></li>
                        <li class="collection-item modal-close" v-on:click="addItem('NICK')">Nickname<a class="secondary-content"><i class="material-icons">add</i></a></li>
                        <li class="collection-item modal-close" v-on:click="addItem('IDNO')">Identification Number<a class="secondary-content"><i class="material-icons">add</i></a></li>
                        <li class="collection-item modal-close" v-on:click="addItem('SSN')">Social Security Number<a class="secondary-content"><i class="material-icons">add</i></a></li>
                        <li class="collection-header"><h5>Annotation</h5></li>
                        <li class="collection-item modal-close" v-on:click="addItem('NOTES')">Notes<a class="secondary-content"><i class="material-icons">add</i></a></li>
                        <li class="collection-item modal-close" v-on:click="addItem('TEXT')">Text<a class="secondary-content"><i class="material-icons">add</i></a></li>
                        <li class="collection-header"><h5>Custom</h5></li>
                        <li class="collection-item modal-close" v-on:click="addItem('CUSTOM')">Custom<a class="secondary-content"><i class="material-icons">add</i></a></li>
                    </ul>
                </div>
                <div class="modal-footer">
                    <a class="modal-close waves-effect waves-green btn-flat">Close</a>
                </div>
            </div>
            <div style="position: fixed; bottom: 45px; right: 24px;">
                <button data-target="modalAddPersonalDetail" class="btn modal-trigger btn-floating btn-large waves-effect waves-light red"><i class="material-icons">add</i></button>
            </div>
        </div>
    `,
    props: ["person"],
    data: function() {
        return {
            advancedModeState: false,
            modalEditPersonalDetail: {}
        }
    },
    computed: {
        advancedMode: {
            get() {
                return this.advancedModeState;
            },
            set(state) {
                if (state == true) {
                    this.advancedModeState = true;
                    window.setTimeout(function() { M.AutoInit(); }, 200);
                } else {
                    this.advancedModeState = false;
                }
            }
        }
    },
    methods: {
        addItem: function(item) {
            if (item == "NAME") {
                this.person.items.push({ 'level': 1, 'tag': 'NAME', 'value': '', 'items': [{ 'level': 2, 'tag': 'GIVN', 'value': '' }, { 'level': 2, 'tag': 'SURN', 'value': '' }] });
            } else if (item == "BIRTH") {
                this.person.items.push({ 'level': 1, 'tag': 'BIRT', 'value': '', 'items': [{ 'level': 2, 'tag': 'DATE', 'value': '' }, { 'level': 2, 'tag': 'PLAC', 'value': '' }] });
            } else if (item == "DEATH") {
                this.person.items.push({ 'level': 1, 'tag': 'DEAT', 'value': '', 'items': [{ 'level': 2, 'tag': 'DATE', 'value': '' }, { 'level': 2, 'tag': 'PLAC', 'value': '' }] });
            } else if (item == "BURIAL") {
                this.person.items.push({ 'level': 1, 'tag': 'BURI', 'value': '', 'items': [{ 'level': 2, 'tag': 'DATE', 'value': '' }, { 'level': 2, 'tag': 'PLAC', 'value': '' }] });
            } else if (item == "BAPM") {
                this.person.items.push({ 'level': 1, 'tag': 'BAPM', 'value': '', 'items': [{ 'level': 2, 'tag': 'DATE', 'value': '' }, { 'level': 2, 'tag': 'PLAC', 'value': '' }] });
            } else if (item == "CHR") {
                this.person.items.push({ 'level': 1, 'tag': 'CHR', 'value': '', 'items': [{ 'level': 2, 'tag': 'DATE', 'value': '' }, { 'level': 2, 'tag': 'PLAC', 'value': '' }] });
            } else if (item == "CENS") {
                this.person.items.push({ 'level': 1, 'tag': 'CENS', 'value': '', 'items': [{ 'level': 2, 'tag': 'DATE', 'value': '' }, { 'level': 2, 'tag': 'PLAC', 'value': '' }] });
            } else if (item == "CREM") {
                this.person.items.push({ 'level': 1, 'tag': 'CREM', 'value': '', 'items': [{ 'level': 2, 'tag': 'DATE', 'value': '' }, { 'level': 2, 'tag': 'PLAC', 'value': '' }] });
            } else if (item == "GRAD") {
                this.person.items.push({ 'level': 1, 'tag': 'GRAD', 'value': '', 'items': [{ 'level': 2, 'tag': 'DATE', 'value': '' }, { 'level': 2, 'tag': 'PLAC', 'value': '' }] });
            } else if (item == "EMIG") {
                this.person.items.push({ 'level': 1, 'tag': 'EMIG', 'value': '', 'items': [{ 'level': 2, 'tag': 'DATE', 'value': '' }, { 'level': 2, 'tag': 'PLAC', 'value': '' }] });
            } else if (item == "IMMI") {
                this.person.items.push({ 'level': 1, 'tag': 'IMMI', 'value': '', 'items': [{ 'level': 2, 'tag': 'DATE', 'value': '' }, { 'level': 2, 'tag': 'PLAC', 'value': '' }] });
            } else if (item == "NATU") {
                this.person.items.push({ 'level': 1, 'tag': 'NATU', 'value': '', 'items': [{ 'level': 2, 'tag': 'DATE', 'value': '' }, { 'level': 2, 'tag': 'PLAC', 'value': '' }] });
            } else if (item == "RETI") {
                this.person.items.push({ 'level': 1, 'tag': 'RETI', 'value': '', 'items': [{ 'level': 2, 'tag': 'DATE', 'value': '' }] });
            } else if (item == "PROB") {
                this.person.items.push({ 'level': 1, 'tag': 'PROB', 'value': '', 'items': [{ 'level': 2, 'tag': 'DATE', 'value': '' }] });
            } else if (item == "WILL") {
                this.person.items.push({ 'level': 1, 'tag': 'WILL', 'value': '', 'items': [{ 'level': 2, 'tag': 'DATE', 'value': '' }] });
            } else if (item == "OCCU") {
                this.person.items.push({ 'level': 1, 'tag': 'OCCU', 'value': '', 'items': [] });
            } else if (item == "EDUC") {
                this.person.items.push({ 'level': 1, 'tag': 'EDUC', 'value': '', 'items': [] });
            } else if (item == "RELI") {
                this.person.items.push({ 'level': 1, 'tag': 'RELI', 'value': '', 'items': [] });
            } else if (item == "RESI") {
                this.person.items.push({ 'level': 1, 'tag': 'RESI', 'value': '', 'items': [{ 'level': 2, 'tag': 'DATE', 'value': '' }, { 'level': 2, 'tag': 'ADDR', 'value': '' }] });
            } else if (item == "NATI") {
                this.person.items.push({ 'level': 1, 'tag': 'NATI', 'value': '', 'items': [] });
            } else if (item == "CAST") {
                this.person.items.push({ 'level': 1, 'tag': 'CAST', 'value': '', 'items': [] });
            } else if (item == "DSCR") {
                this.person.items.push({ 'level': 1, 'tag': 'DSCR', 'value': '', 'items': [] });
            } else if (item == "NICK") {
                this.person.items.push({ 'level': 1, 'tag': 'NICK', 'value': '', 'items': [] });
            } else if (item == "IDNO") {
                this.person.items.push({ 'level': 1, 'tag': 'IDNO', 'value': '', 'items': [] });
            } else if (item == "SSN") {
                this.person.items.push({ 'level': 1, 'tag': 'SSN', 'value': '', 'items': [] });
            } else if (item == "NOTES") {
                this.person.items.push({ 'level': 1, 'tag': 'NOTE', 'value': '', 'items': [] });
            } else if (item == "TEXT") {
                this.person.items.push({ 'level': 1, 'tag': 'TEXT', 'value': '', 'items': [] });
            } else if (item == "CUSTOM") {
                this.advancedMode = true;
                this.person.items.push({ 'level': 1, 'tag': '', 'value': '', 'items': [] });
                var rootField = this.$children[0];
                window.setTimeout(function() { rootField.$children[rootField.$children.length - 1].editItem(); }, 200);
            }
        }
    }
});

Vue.component('personaldetails-list', {
    template: `
        <div class="row">
            <template v-for="(detail, index) in items">
                <personaldetails-item :detail="detail" :index="index" :mode="mode" :level="level"></personaldetails-item>
            </template>
        </div>
    `,
    props: ["items", "mode", "level"]
});

Vue.component('personaldetails-item', {
    template: `
        <div class="row" style="padding: 0; margin: 0;">

            <div v-if="mode=='advanced'" class="col offset-s1" :class="{'s7':level==0,'s11':level!=0}">
                <div class="input-field">
                    <label :for="id" :class="{active:detail.value}">{{detail.tag}} ({{tag(detail.tag).name}})</label>
                    <input :id="id" type="text" v-model="detail.value"/>
                    <div class="fixed-action-btn horizontal direction-top direction-left" style="position: absolute; display: inline-block; right: 24px;">
                        <a class="btn-floating btn-large transparent z-depth-0" style="cursor: default;"><i class="large material-icons teal-text text-lighten-3">more_vert</i></a>
                        <ul>
                            <li v-if="index > 0"><a class="btn-floating teal lighten-4"><i class="material-icons" v-on:click="upItem();">arrow_drop_up</i></a></li>
                            <li v-if="index < $parent.items.length - 1"><a class="btn-floating teal lighten-4"><i class="material-icons" v-on:click="downItem();">arrow_drop_down</i></a></li>
                            <li><a class="btn-floating red"><i class="material-icons" v-on:click="deleteItem();">clear</i></a></li>
                            <li><a class="btn-floating yellow darken-1"><i class="material-icons" v-on:click="addItem();">add</i></a></li>
                            <li><a class="btn-floating green"><i class="material-icons" v-on:click="editItem();">mode_edit</i></a></li>
                        </ul>
                    </div>
                </div>
                <personaldetails-list :items="detail.items" :mode="mode" :level="level + 1"></personaldetails-list>
            </div>

            <div v-else-if="tag(detail.tag).visible==true" class="col s12 offset-m1">

                <template v-if="detail.tag=='OBJE'">
                    <div class="card">
                        <div class="card-image" v-if="((detail.items.find(item => item.tag=='FILE') || {}).value || '').startsWith('http')">
                            <img :src="(detail.items.find(item => item.tag=='FILE') || {}).value">
                            <span class="card-title">
                                {{(detail.items.find(item => item.tag=='_DATE') || {}).value}}
                            </span>
                        </div>
                        <div class="card-content">
                            {{(detail.items.find(item => item.tag=='TITL') || {}).value}}
                        </div>
                    </div>
                </template>

                <template v-else-if="detail.tag=='NAME'">
                    <div class="col s6">
                        <div class="input-field">
                            <label :for="id + '1'" class="active">{{tag('GIVN').name}}</label>
                            <input :id="id + '1'" type="text" v-model="(detail.items[detail.items.findIndex(x => x.tag=='GIVN')] || {}).value" v-on:input="detail.value=detail.items[detail.items.findIndex(x => x.tag=='GIVN')].value + ' /' + detail.items[detail.items.findIndex(x => x.tag=='SURN')].value + '/'"/>
                        </div>
                    </div>
                    <div class="col s6">
                        <div class="input-field">
                            <label :for="id + '2'" class="active">{{tag('SURN').name}}</label>
                            <input :id="id + '2'" type="text" v-model="(detail.items[detail.items.findIndex(x => x.tag=='SURN')] || {}).value" v-on:input="detail.value=detail.items[detail.items.findIndex(x => x.tag=='GIVN')].value + ' /' + detail.items[detail.items.findIndex(x => x.tag=='SURN')].value + '/'"/>
                        </div>
                    </div>
                </template>

                <template v-else-if="detail.tag=='BIRT'">
                    <div class="col s6">
                        <div class="input-field">
                            <label :for="id + '1'" class="active">Date of Birth</label>
                            <input :id="id + '1'" type="text" v-model="(detail.items[detail.items.findIndex(x => x.tag=='DATE')] || {}).value"/>
                        </div>
                    </div>
                    <div class="col s6">
                        <div class="input-field">
                            <label :for="id + '2'" class="active">Place of Birth</label>
                            <input :id="id + '2'" type="text" v-model="(detail.items[detail.items.findIndex(x => x.tag=='PLAC')] || {}).value"/>
                        </div>
                    </div>
                </template>

                <template v-else-if="detail.tag=='DEAT'">
                    <div class="col s6">
                        <div class="input-field">
                            <label :for="id + '1'" class="active">Date of Death</label>
                            <input :id="id + '1'" type="text" v-model="(detail.items[detail.items.findIndex(x => x.tag=='DATE')] || {}).value"/>
                        </div>
                    </div>
                    <div class="col s6">
                        <div class="input-field">
                            <label :for="id + '2'" class="active">Place of Death</label>
                            <input :id="id + '2'" type="text" v-model="(detail.items[detail.items.findIndex(x => x.tag=='PLAC')] || {}).value"/>
                        </div>
                    </div>
                </template>

                <template v-else-if="detail.tag=='BURI'">
                    <div class="col s6">
                        <div class="input-field">
                            <label :for="id + '1'" class="active">Date of Burial</label>
                            <input :id="id + '1'" type="text" v-model="(detail.items[detail.items.findIndex(x => x.tag=='DATE')] || {}).value"/>
                        </div>
                    </div>
                    <div class="col s6">
                        <div class="input-field">
                            <label :for="id + '2'" class="active">Place of Burial</label>
                            <input :id="id + '2'" type="text" v-model="(detail.items[detail.items.findIndex(x => x.tag=='PLAC')] || {}).value"/>
                        </div>
                    </div>
                </template>

                <template v-else-if="['BAPM','CHR','CENS','CREM','GRAD','EMIG','IMMI','NATU'].includes(detail.tag)">
                    <div class="col s6">
                        <div class="input-field">
                            <label :for="id + '1'" class="active">Date of {{tag(detail.tag).name}}</label>
                            <input :id="id + '1'" type="text" v-model="(detail.items[detail.items.findIndex(x => x.tag=='DATE')] || {}).value"/>
                        </div>
                    </div>
                    <div class="col s6">
                        <div class="input-field">
                            <label :for="id + '2'" class="active">Place of {{tag(detail.tag).name}}</label>
                            <input :id="id + '2'" type="text" v-model="(detail.items[detail.items.findIndex(x => x.tag=='PLAC')] || {}).value"/>
                        </div>
                    </div>
                </template>

                <template v-else-if="detail.tag=='RESI'">
                    <div class="col s6">
                        <div class="input-field">
                            <label :for="id + '1'" class="active">Date of Residence</label>
                            <input :id="id + '1'" type="text" v-model="(detail.items[detail.items.findIndex(x => x.tag=='DATE')] || {}).value"/>
                        </div>
                    </div>
                    <div class="col s6">
                        <div class="input-field">
                            <label :for="id + '2'" class="active">Address</label>
                            <textarea :id="id + '2'" class="materialize-textarea" v-model="(detail.items[detail.items.findIndex(x => x.tag=='ADDR')] || {}).value"></textarea>
                        </div>
                    </div>
                </template>

                <template v-else-if="tag(detail.tag).field=='textarea'">
                    <label :for="id" :class="{active:detail.value}">{{tag(detail.tag).name}}</label>
                    <blockquote class="teal lighten-5">
                        <span v-html="parseHtml(detail.value)"></span>
                    </blockquote>
                    <textarea :id="id" class="materialize-textarea" v-model="detail.value" v-if="edit"></textarea>
                    <div class="right-align">
                        <a class="waves-effect waves-light btn" v-if="!edit" v-on:click="edit=true; focus(id);"><i class="material-icons left">edit</i>Edit</a>
                        <a class="waves-effect waves-light btn" v-if="edit" v-on:click="edit=false"><i class="material-icons left">vertical_align_top</i>Collapse</a>
                    </div>
                </template>

                <template v-else>
                    <div class="col s12">
                        <div class="input-field">
                            <label :for="id" :class="{active:detail.value}">{{tag(detail.tag).name}}</label>
                            <input :id="id" type="text" v-model="detail.value"/>
                        </div>
                    </div>
                    <personaldetails-list :items="detail.items" :mode="mode" :level="level + 1" v-if="!tag(detail.tag).collapseChildren"></personaldetails-list>
                </template>

            </div>

        </div>
    `,
    props: ["detail", "index", "mode", "level"],
    data: function() {
        return {
            id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
            edit: false
        }
    },
    methods: {
        focus: function(id) {
            window.setTimeout(function() {
                document.getElementById(id).focus();
            }, 100)
        },
        parseHtml: function(html) {
            var temp = document.createElement("span");
            temp.innerHTML = html;
            temp.childNodes.forEach(function parseHtmlChild(node) {
                if (node.nodeType == 1) {
                    if (!["P", "BR", "SPAN", "B", "I", "U", "S", "OL", "UL", "LI"].includes(node.nodeName)) {
                        var p = document.createElement("P");
                        p.innerHTML = node.innerHTML;
                        node.parentNode.replaceChild(p, node);
                    }
                }
                if (node.style) {
                    Array.from(node.style).forEach(function(key, value) {
                        if (!["color", "background-color", "font-weight"].includes(key)) {
                            node.style[key] = null;
                        }
                    })
                }
                if (node.attributes) {
                    Array.from(node.attributes).forEach(function(key, value) {
                        if (!["style"].includes(key)) {
                            node[key] = null;
                        }
                    })
                }
                node.childNodes.forEach(parseHtmlChild);
            });
            return temp.innerHTML;
        },
        addItem: function() {
            this.detail.items.push({ 'level': this.detail.level + 1, 'tag': '', 'value': '', 'items': [] });
            var main = this.$parent;
            while (main.$options.name != "personaldetails") {
                main = main.$parent;
            }
            main.modalEditPersonalDetail = this.detail.items[this.detail.items.length - 1];
            var modal = M.Modal.init(document.querySelector("#modalEditPersonalDetail"), { "onCloseEnd": function() { M.FloatingActionButton.init(document.querySelectorAll('.fixed-action-btn')); } });
            modal.open();
        },
        editItem: function() {
            var main = this.$parent;
            while (main.$options.name != "personaldetails") {
                main = main.$parent;
            }
            main.modalEditPersonalDetail = this.detail;
            var modal = M.Modal.init(document.querySelector("#modalEditPersonalDetail"), { "onCloseEnd": function() { M.FloatingActionButton.init(document.querySelectorAll('.fixed-action-btn')); } });
            modal.open();
        },
        deleteItem: function() {
            if (window.confirm("Confirm you want to remove this item.")) {
                this.$parent.items.splice(this.index, 1);
            }
        },
        upItem: function() {
            var item = this.$parent.items.splice(this.index, 1);
            this.$parent.items.splice(this.index - 1, 0, item[0]);
        },
        downItem: function() {
            var item = this.$parent.items.splice(this.index, 1);
            this.$parent.items.splice(this.index + 1, 0, item[0]);
        },
        tag: function(tag) {
            // From tags.js
            return (tags[tag] || {
                name: tag,
                description: "",
                visible: false
            });
        }
    }
});