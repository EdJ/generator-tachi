'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');

var ControllerGenerator = module.exports = function ViewGenerator(args, options, config) {
    yeoman.generators.NamedBase.apply(this, arguments);

    this.viewDirectory = args[1] || 'Shared';

    this.viewDirectory = this.viewDirectory.replace(/(\w)(\w*)/g, function(g0, g1, g2) {
        return g1.toUpperCase() + g2.toLowerCase();
    });


    console.log('Creating "' + this.name + '" View.');
};

util.inherits(ControllerGenerator, yeoman.generators.NamedBase);

ControllerGenerator.prototype.files = function files() {
    this.copy('view.html', 'Views/' + this.viewDirectory + '/' + this.name + '.html');
};
