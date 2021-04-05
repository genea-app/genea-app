# Genea

Genea allows visually building and editing a family tree online. It consumes and saves genealogy data in the GEDCOM format without any server side components.

* [Genea.app](https://www.genea.app/)

# Installation

Unpack files into directory and serve over HTTPS.

# Family tree drawing

Genea uses the [Graphviz library compiled into WebAssembly](https://github.com/hpcc-systems/hpcc-js-wasm/) to draw the family tree. It uses a default structure that includes grandparents, parents, partners, siblings and children. An abstraction layer built on top of this allows for easily assigning the right data to the right node.

# GEDCOM format

* [GEDCOM 5.5.5 Specifications (PDF)](https://www.gedcom.org/specs/GEDCOM555.zip)
* [Grammar](https://www.genealogieonline.nl/GEDCOM-tags/gedcom-5.5-grammar.php)
* [Sample Files](https://www.gedcom.org/samples.html)

> Implementation of the GEDCOM format in Genea intentionally differentiates itself slightly from the true standard, as it allows a `FAM` record to contain either two `FAM.HUSB` or `FAM.WIFE` records to indicate a same sex marriage. Other types of relationships between people are not supported due to the lack of GEDCOM to specify a gender neutral `FAM.PART(NER)` record.

# Dependencies

* [Vue.js](https://vuejs.org/v2/guide/)
* [Graphviz library compiled into WebAssembly](https://github.com/hpcc-systems/hpcc-js-wasm/)
* [Materialize](https://materializecss.com/)
