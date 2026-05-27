# Genea

Genea allows visually building and editing a family tree online. It consumes and saves genealogy data in the GEDCOM format without any server side components.

# Fork additional features

* Containerfile (Dockerfile equivalent but platform-agnostic) & podman-compose file.
  * `podman build -t genea-app .` 
* Load GEDCOM mounted file. The folder containing the file must be mounted when running the container.
* Fix relationship finder clearing results when the field is empty.
* Add date and place of birth fields when adding a new person.
* Gender selection is no longer a field but a choice button.
* Birth and death dates are visible in the tree.
* Save to git or load from git is fixed.
* Download the whole tree (assisted by AI). The downloaded tree isn't as well drawn as the main tree. Accepting help on this feature.
* Updated tests to reflect new changes.
* Published docker image.

Automatically saving the mounted GEDCOM file is not possible. As an alternative, either download the file and manually copy it to the mounted folder or use git.

# Docker usage
Start genea container using this command (either with docker or podman):
```
podman run -d --name genea-app -p 3010:3010 -v /path/to/your/data:/usr/share/nginx/html/data:ro ghcr.io/netsho/genea-app:latest
```
Alternatively, use the provided [podman-compose.yml](https://github.com/netsho/genea-app/blob/main/podman-compose.yml) from the Git repository.

Then open `http://localhost:8080` in your browser.

The mounted directory must contain your GEDCOM file named `genea.app.ged`.

# Demo

* [Genea.app](https://www.genea.app/)
* [Android](https://play.google.com/store/apps/details?id=com.genea.app) - No longer exists
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
