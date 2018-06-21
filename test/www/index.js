
$(function() {

    // create view container
    var view = new Views ('#container');

    // add template views and data routes
    view.add('home', '/home.html', '/home/data');
    view.add('about', '/about.html', '/about/data');

    // change view container on click
    $('#home').on('click', function(){
        view.show('home', function () {
            console.log('Home page shown!');
        });
    });

    // change view container on click
    $('#about').on('click', function(){
        view.show('about', function () {
            console.log('About page shown!')
        });
    });

    // show view
    view.show('home');
});
