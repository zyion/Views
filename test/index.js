
const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, 'www')));

app.use('/jquery', express.static(path.join(__dirname, 'node_modules/jquery/dist/jquery.min.js')));
app.use('/handlebars', express.static(path.join(__dirname, 'node_modules/handlebars/dist/handlebars.min.js')));
app.use('/views', express.static('../dist/views.min.js'));

app.get('/home/data', (req, res) => {
    res.send({
        title: 'Home',
        content: 'Lorem ipsum dolor amet taiyaki kogi skateboard, microdosing cliche viral shaman cornhole post-ironic pok pok PBR&B.'
    });
});

app.get('/about/data', (req, res) => {
    res.send({
        title: 'About',
        content: 'Lorem ipsum dolor amet cornhole raw denim roof party fashion axe, plaid biodiesel selfies aesthetic pok pok fam austin marfa.'
    })
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));
