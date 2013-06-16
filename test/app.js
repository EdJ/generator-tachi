/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var fs = require('fs');
var helpers = require('yeoman-generator').test;
var assert = require('should');
var testHelpers = require('../testHelpers/fileSystem');

describe('Tachi generator', function() {
    var tachi;
    var rootDirectory = 'temp';
    beforeEach(function(done) {
        testHelpers.retryFileSystemCall(helpers.testDirectory, path.join(__dirname, rootDirectory), function(err) {
            if (err) {
                return done(err);
            }

            tachi = helpers.createGenerator('tachi:app', [
                    '../../app'
            ]);

            tachi.options['skip-install'] = true;
            done();
        });
    });

    afterEach(function() {
        testHelpers.deleteFolderRecursive(path.join(__dirname, rootDirectory));
    });

    describe('app', function() {
        describe('No Bootstrap', function() {
            beforeEach(function() {
                helpers.mockPrompt(tachi, {
                    'bootstrapTemplate': 'N'
                });
            })

            it('should create a basic scaffold if not using the Bootstrap template.', function(done) {
                var expected = [
                        '.jshintrc',
                        '.editorconfig',
                        'index.js',
                        'Controllers/DefaultController.js'
                ];

                tachi.run({}, function() {
                    helpers.assertFiles(expected);
                    done();
                });
            });

            it('should write the current directory name as the application name into the package.json.', function(done) {
                tachi.run({}, function() {
                    helpers.assertFile('package.json', new RegExp('"name": "' + rootDirectory + '"'));
                    done();
                });
            });
        });
    });
});
