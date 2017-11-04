# Andela Intermediate Web Assessment

This repo contains code for the Andela Intermediate Web Assessment. It contains node APIs for the following:

* **Creating Students’ resource**
* **Reading Students’ resource**
* **updating and deleting students**

### Setup

##### Prerequisites

First, install [Polymer CLI](https://github.com/Polymer/polymer-cli) using
[npm](https://www.npmjs.com) (I assume you have pre-installed [node.js](https://nodejs.org)).

    npm install -g polymer-cli

Second, install [Bower](https://bower.io/) using [npm](https://www.npmjs.com)

    npm install -g bower

##### Clone the repo and install dependencies

    git clone alc-intermediate-assessment-web.git
    cd alc-intermediate-assessment-web
    npm install
    bower install

### Start the development server

This command serves the app at `http://127.0.0.1:8081` and provides basic URL
routing for the app:

    npm run dev

### Folder structure

- **app** - contains a folder called routes which itself contains all the APIs for the app, specifically the resources.js
- **src** - contains the different components used in the app
- `index.html` - single page app so every route goes through this page
- `server.js` - express web server
