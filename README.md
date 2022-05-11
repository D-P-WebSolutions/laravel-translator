# laravel-translator

This module implements a function that can parse laravel localization strings.

https://laravel.com/docs/9.x/localization

## Installation

`npm install @dp-websolutions/laravel-translator`

## Usage

This module will expose a Translator function that creates a translator instance.

You can load this module in different ways:

Load the script directly into a page

- `<script src="node_modules/@dp-websolutions/laravel-translator/dist/laravel-translator.umd.js"></script>`

In a compilation step, that will later generate a javascript bundle and loaded into a page

- `const {Translator} = require('@dp-websolutions/laravel-translator')`

Using imports

- `import {Translator} from '@dp-websolutions/laravel-translator'`

Then you can initialize the Translator:

```js
const strings = {
  welcome: "Welcome :name",
};
const translator = Translator(strings);
const text = translator.__("welcome", { name: "Carlos" });
console.log(text); // Welcome Carlos
```

## Development

To develop locally, clone the repository and run the following commands from within the directory

1. `npm run install`
2. `npm run dev`
3. Go to `localhost:8080` any changes will automatically reload the page

## Tests

To run tests and watch for file changes

`npm run test:dev`

For a single test run

`npm run test`

## Coverage

To check the test coverage run

`npm run coverage`
