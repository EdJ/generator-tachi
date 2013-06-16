# Generator-tachi
[![Build Status](https://secure.travis-ci.org/EdJ/generator-tachi.png?branch=master)](https://travis-ci.org/EdJ/generator-tachi)

A Yeoman generator for Tachi.

## Getting started
- Make sure you have [yo](https://github.com/yeoman/yo) installed:
    `npm install -g yo`
- Install the generator: `npm install -g generator-tachi`
- Make a new directory for your Tachi application: `mkdir tachi; cd tachi`
- Run: `yo tachi`

## Notes
- It's assumed that you'll want to use Mocha and ShouldJS for your unit testing.
- No Bower packages will be configured.
- Grunt is not currently configured.

## Generators

Available generators:

* [tachi](#app) (aka [tachi:app](#app))
* [tachi:controller](#controller)

**Note: Generators are to be run from the root directory of your app.**

### App
Sets up a new Tachi app, generating some basic boilerplate that'll get you up and running. The app generator also optionally installs a Twitter Bootstrap demo, which contains a number of quick-start views, and a demo Controller.

Example:
```bash
yo tachi
```

### Controller
Generates a controller in `./Controllers`, and a matching test scaffold in `./test/Controllers`.

Example:
```bash
yo tachi:controller demo
```

Produces `./Controllers/DemoController.js`:
```javascript
module.exports = function DemoController() {
  // ...
};
```

## Testing
The Tachi generator is configured to hook Mocha into npm.
This means you can run your tests by just doing:
```bash
npm test
```

## License

Copyright (c) 2013 Ed J <ed@ed-j.co.uk>

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
