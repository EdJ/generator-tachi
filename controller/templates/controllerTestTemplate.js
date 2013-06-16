var assert = require('should');

describe('<%= _.capitalize(name) %>Controller', function() {
	var <%= _.capitalize(name) %>Controller = require('../../Controllers/<%= _.capitalize(name) %>Controller');
	var controller;
	beforeEach(function () {
		controller = new <%= _.capitalize(name) %>Controller();
	});

	describe('#index()', function() {
		it('should return some JSON data.', function() {
			// Arrange
			controller.Json = JSON.stringify;

			// Act
			var result = controller.index();

			// Assert
			result.should.include('<%= _.capitalize(name) %> Controller');

			var jsonResult = JSON.parse(result);
			jsonResult.should.have.property('message');
		});
	});
});