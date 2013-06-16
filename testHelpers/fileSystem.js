var path = require('path');
var fs = require('fs');

var deleteFolderRecursive = function(pathToCleanUp) {
    if (process.cwd() === pathToCleanUp) {
        // Windows doesn't clean up file handles properly...
        process.chdir(path.join(pathToCleanUp, '..'));
    }

    if (fs.existsSync(pathToCleanUp)) {
        fs.readdirSync(pathToCleanUp).forEach(function(file, index) {
            var curPath = pathToCleanUp + "/" + file;
            if (fs.statSync(curPath).isDirectory()) { // recurse
                deleteFolderRecursive(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });

        fs.rmdirSync(pathToCleanUp);
    }
};

var retryFileSystemCall = function(toCall, pathToCallOn, callback, tries) {
    tries = tries || 0;
    toCall(pathToCallOn, function(err) {
        if (err && err.code === 'EBUSY' && tries < 5) {
            if (process.cwd() === pathToCallOn) {
                // Windows doesn't clean up file handles properly...
                process.chdir(path.join(pathToCallOn, '..'));
            }

            retryFileSystemCall(toCall, pathToCallOn, callback, ++tries);
            return;
        }

        callback(err);
    })
};

module.exports = {
    deleteFolderRecursive: deleteFolderRecursive,
    retryFileSystemCall : retryFileSystemCall,
};