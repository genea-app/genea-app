# Genea

Genea allows visually building and editing a family tree online. It consumes and saves genealogy data in the GEDCOM format without any server side components.

# Demo

* [Genea.app](https://www.genea.app/)
* [Android](https://play.google.com/store/apps/details?id=com.genea.app)
* [Screenshots](#screenshots-and-video)

# Installation

* Unpack files into directory and serve over HTTPS to have complete control over the version you are running.
* Alternatively, use the [Genea.app](https://www.genea.app/) website without having to ramp up your own server.
* Optionally, host your own Git instance like [Gitea](https://gitea.io/) or [GitLab](https://about.gitlab.com/install/) to privately store your data and make it accessible from multiple devices, or use a free repository with a service like [GitHub](https://github.com/). You can always directly interact with GEDCOM files as well.

# Family tree drawing

Genea uses the [Graphviz library compiled into WebAssembly](https://github.com/hpcc-systems/hpcc-js-wasm/) to draw the family tree. It uses a default structure that includes grandparents, parents, partners, siblings and children. An abstraction layer built on top of this allows for easily assigning the right data to the right node.

# GEDCOM format

* [GEDCOM 5.5.5 Specifications (PDF)](https://www.gedcom.org/specs/GEDCOM555.zip)
* [Grammar](https://www.genealogieonline.nl/GEDCOM-tags/gedcom-5.5-grammar.php)
* [Sample Files](https://www.gedcom.org/samples.html)

> Implementation of the GEDCOM format in Genea intentionally differentiates itself slightly from the true standard, as it allows a `FAM` record to contain either two `FAM.HUSB` or `FAM.WIFE` records to indicate a same sex marriage. Other types of relationships between people are not supported due to the lack of GEDCOM to specify a gender neutral `FAM.PART(NER)` record.

# Screenshots and video

## Family tree
![Family tree](https://user-images.githubusercontent.com/24693534/133051893-f20df54f-bfa6-431b-a82d-4f86fbff30e7.png)

## Editing detail
![Editing details](https://user-images.githubusercontent.com/24693534/133051948-dd85be2d-1ecf-4b83-affb-dbe1b4e8b3eb.png)

## Drawing family tree
https://user-images.githubusercontent.com/24693534/133051989-7ae42405-8c21-48f9-85d0-cc8f41586d4e.mp4

# Dependencies

* [Vue.js](https://vuejs.org/v2/guide/)
* [Graphviz library compiled into WebAssembly](https://github.com/hpcc-systems/hpcc-js-wasm/)
* [Materialize](https://materializecss.com/)
