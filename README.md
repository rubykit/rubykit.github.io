<img align="left" width="50" height="90" src="https://raw.githubusercontent.com/rubykit/kit/master/docs/assets/logo.v1.svg">

# Rubykit Framework static website.

## Table of Contents

- [Installation](#installation)
- [Deploy](#deploy)
- [License](#license)

## Installation

### Node

You will need Node js, which you should install through [asdf](https://github.com/asdf-vm).

Then install NPM dependencies by running:
```shell
npm install
```

### Gulp

You should now be able to use Gulp. Have a look at `gulpfile.js` to see what's available (mainly `compile`, `serve`, `deploy`).

## Deploy

Since this is hosted on Github Pages with an Org repository, the branch containing the compiled assets needs to be `master`, so the protected source branch is `src`.

To compile and deploy, checkout `src` and run:
```
gulp deploy
```
