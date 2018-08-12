'use strict';

const generator = require('cucumber-html-reporter');
const options = {
    theme: 'bootstrap',
    jsonFile: `./tests/results/chrome.json`,
    output: `./tests/results/chrome.html`
};

generator.generate(options);
