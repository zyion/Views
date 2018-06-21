

var Views = (function () {

    function View (name, partialUrl, dataUrl) {
        this.name = name;
        this.partial = partialUrl;
        this.data = dataUrl;
    }

    function render (url, dataUrl, callback) {
        $.when(
            $.ajax({
                method: 'GET',
                url: url,
                datatype: 'html'
            }),
            $.ajax({
                method: 'GET',
                url: dataUrl,
                datatype: 'json'
            })
        ).fail(function (jqXHR, textStatus) {
            if (typeof callback === 'function') callback(textStatus);
        }).done(function (template, data) {
            if (typeof callback === 'function') callback(false, Handlebars.compile(template[0])(data[0]));
        });
    };

    function showState (container, view, callback) {
        render(view.partial, view.data, function (err, html) {
            if (err) console.error('View rendering error', err);
            else {
                $(container).html(html);
                history.pushState(view.name, view.name, view.name);
                if (typeof callback === 'function') callback();
            }
        });
    }

    return function ViewHandler (id) {
        this.views = { };
        this.container = id;

        (function (self) {
            window.onpopstate = function(e) {
                if (self.views.hasOwnProperty(e.state)) {
                    var view = self.views[e.state];
                    render(view.partial, view.data, function (err, html) {
                        if (err) console.error('View rendering error', err);
                        else $(self.container).html(html);
                    });
                }
            }
        })(this);

        this.add = function (name, partialUrl, dataUrl) {
            this.views[name] = new View (name, partialUrl, dataUrl);
        }

        this.show = function (name, callback) {
            if (this.views.hasOwnProperty(name)) showState(this.container, this.views[name], callback);
            else console.error('View not found', name);
        }
    }

})();
