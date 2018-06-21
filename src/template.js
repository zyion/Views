
var Template = (function () {

    var templates = {};

    return {
        build: function (url, data, callback) {
            if (templates.hasOwnProperty(url)) {
                if (typeof callback === 'function') callback(false, Handlebars.compile(templates[url])(data));
            } else {
                $.ajax({
                    method: 'GET',
                    url: url,
                    datatype: 'html'
                }).fail(function (jqXHR, textStatus) {
                    if (typeof callback === 'function') callback(textStatus);
                }).done(function (template) {
                    templates[url] = $(template).html();
                    if (typeof callback === 'function') callback(false, Handlebars.compile(templates[url])(data));
                });
            }
        },
        register: function (name, url, callback) {
            $.ajax({
                method: 'GET',
                url: url,
                datatype: 'html'
            }).fail(function (jqXHR, textStatus) {
                if (typeof callback === 'function') callback(textStatus);
            }).done(function (template) {
                Handlebars.registerPartial(name, $(template).html());
                if (typeof callback === 'function') callback(false, textStatus);
            });
        }
    };
})();
