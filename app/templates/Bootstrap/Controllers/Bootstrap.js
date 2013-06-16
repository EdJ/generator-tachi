function DemoItem (copyFrom) {
    copyFrom = copyFrom || {};
    this.Id = copyFrom.Id || 0;
    this.Title = copyFrom.Title || '';
    this.Timestamp = copyFrom.Timestamp || new Date();
    this.Enabled = copyFrom.Enabled === 'on' || false;
    this._additional = {
        'Id': { preventEditing: true }
    };
};

var demoItems = [
    new DemoItem({ Id: 1, Title: 'Test Item', Enabled: true })
];

demoItems.findById = function (id) {
    if (typeof id !== 'number') {
        id = parseInt(id, 10);
    }

    var item;
    for (var i = demoItems.length; i--;) {
        var possibleItem = demoItems[i];

        if (possibleItem.Id == id) {
            return i;
        }
    }

    return -1;
};

demoItems.getById = function (id) {
    if (typeof id !== 'number') {
        id = parseInt(id, 10);
    }

    var item;
    for (var i = demoItems.length; i--;) {
        var possibleItem = demoItems[i];

        if (possibleItem.Id == id) {
            return possibleItem;
        }
    }

    return 0;
};

demoItems.getNextId = function () {
    var maxId = -1;
    for (var i = demoItems.length; i--;) {
        var item = demoItems[i];

        maxId = item.Id > maxId ? item.Id : maxId;
    }

    return maxId + 1 || 1;
};

module.exports = function () {
    this._authenticate = [
        'edit',
        'edit_post',
        'delete',
        'create',
        'create_post'
    ];

    var getModel = function (item) {
        return {
            title: 'Demo',
            item: item
        };
    };

    this.index = function (data) {
        var model = getModel(demoItems);

        if (data.id) {
            var item = demoItems.getById(data.id);
            if (item) {
                model._alerts = [{
                   severity: 'info',
                   message: item.Title + ' was saved.' 
               }];
            }
        }

        if (data.email) {
            model._alerts = [{
               severity: 'info',
               message: 'Welcome, ' + data.email 
           }];
        }

        return this.View('List', model);
   };

    this.create = function (data) {
        var item = new DemoItem(-1);
        var model = getModel(item);
        return this.View('Edit', model);
    };

    this.create_post = function (data) {
        var item = data.model;

        item.Id = demoItems.getNextId();

        item = new DemoItem(item);

        demoItems.push(item);

        return this.RedirectToAction('Index', { id: item.Id });
    };

    this.details = function (data) {
        var id = data.id;

        var item = demoItems.getById(id);
        if (!item){
            return this.RedirectToAction('Index');
        }

        var model = getModel(item);
        return this.View('Details', model);
    };

    this.edit = function (data) {
        var id = data.id;

        var item = demoItems.getById(id);
        if (!item){
            return this.RedirectToAction('Index');
        }

        var model = getModel(item);
        return this.View('Edit', model);
    };

    this.edit_post = function (data) {
        var item = data.model;
        var id = item.Id;

        var itemIndex = demoItems.findById(id);
        if (itemIndex === -1) {
            return this.RedirectToAction('Index');
        }

        item = new DemoItem(item);

        demoItems[itemIndex] = item;

        return this.RedirectToAction('Index', { id: item.Id });
    };

    this.delete = function (data) {
        var id = data.id;

        var itemIndex = demoItems.findById(id);
        if (itemIndex === -1){
            return this.RedirectToAction('Index');
        }

        demoItems.splice(itemIndex, 1);

        return this.RedirectToAction('Index');
    };

    this.login = function () {
        return this.View('Login');
    };

    this.login_post = function (data) {
        if (data.email == 'admin@admin.com' && data.password == 'admin') {
            this.Authenticate();

            return this.RedirectToAction('Index', { email: data.email }); 
        }

        var model = {};
        model._alerts = [{
           message: 'Unrecognised username or password, why not try "admin@admin.com", "admin".' 
        }];

        return this.View('Login', model);
    };
};