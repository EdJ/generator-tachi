module.exports = function <%= _.capitalize(name) %>Controller() {
    this.index = function() {
        return this.Json({
            message: 'This is the <%= _.capitalize(name) %> Controller.'
        });
    }
};
