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

            tachi = helpers.createGenerator('tachi:controller', [
                    '../../app'
            ]);

            tachi.options['skip-install'] = true;
            done();
        });
    });

    afterEach(function() {
        testHelpers.deleteFolderRecursive(path.join(__dirname, rootDirectory));
    });

    describe('controller', function() {
        it('should create a controller in the Controllers directory.', function(done) {
            tachi.run({}, function() {
                helpers.assertFile('Controllers/DefaultController.js');

                done();
            });
        });
    });
});
