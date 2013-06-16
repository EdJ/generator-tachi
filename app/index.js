'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

var TachiGenerator = module.exports = function TachiGenerator(args, options, config) {
    yeoman.generators.Base.apply(this, arguments);

    // Cannot get parameters working during tests for some reason...
    this.appname = path.basename(process.cwd());

    this.on('end', function() {
        this.installDependencies({
            skipInstall: options['skip-install']
        });
    });

    this.hookFor('tachi:controller', {
        args: "Default",
        options: {
            options: {
                'skip-install': true
            }
        }
    });

    this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(TachiGenerator, yeoman.generators.NamedBase);

TachiGenerator.prototype.askFor = function askFor() {
    var callback = this.async();

    // have Yeoman greet the user.
    console.log(this.yeoman);

    var prompts = [{
            type: 'confirm',
            name: 'useBootstrapTemplate',
            message: 'Would you like to use the Twitter Bootstrap demo project?',
            default: false
        }
    ];

    this.prompt(prompts, function(props) {
        this.useBootstrapTemplate = props.useBootstrapTemplate;

        callback();
    }.bind(this));
};

TachiGenerator.prototype.app = function app() {
    this.template('_package.json', 'package.json');
    this.template('_bower.json', 'bower.json');
};

TachiGenerator.prototype.basic = function basic() {
    if (!this.useBootstrapTemplate) {
        this.directory('Basic', '.');
    }
};

TachiGenerator.prototype.projectfiles = function projectfiles() {
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
};
