'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');

var ControllerGenerator = module.exports = function ControllerGenerator(args, options, config) {
    yeoman.generators.NamedBase.apply(this, arguments);

    console.log('Creating "' + this.name + '" Controller.');
};

util.inherits(ControllerGenerator, yeoman.generators.NamedBase);

ControllerGenerator.prototype.files = function files() {
    var controllerName = this.name.replace(/(\w)(\w*)/g, function(g0, g1, g2) {
        return g1.toUpperCase() + g2.toLowerCase();
    });

    this.template('controllerTemplate.js', 'Controllers/' + controllerName + 'Controller.js');
    this.template('controllerTestTemplate.js', 'test/Controllers/' + controllerName + 'Controller.js');
};
