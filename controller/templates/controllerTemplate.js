module.exports = {
    index: function() {
        return this.Json({
            message: 'This is the <%= _.capitalize(name) %> Controller.'
        });
    }
};
