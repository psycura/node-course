const express = require ( 'express' );
const hbs     = require ( 'hbs' );
const fs      = require ( 'fs' );

const port = process.env.PORT || 3000;
const app  = express ();

hbs.registerPartials ( __dirname + '/views/partials' );
app.set ( 'view engine', 'hbs' );

app.use ( ( req, res, next ) => {
    let now = new Date ().toString ();
    let log = `${now}:${req.method} ${req.url} `;
    console.log ( log );
    
    fs.appendFileSync ( 'server.log', log + '\n' );
    next ();
} );

// app.use ( ( req, res, next ) => {
//     res.render ( 'maintenance.hbs', {
//         pageTitle     : 'Under Construction',
//         welcomeMessage: 'Site is under construction',
//     } )
// } );

app.use ( express.static ( __dirname + '/public' ) );

hbs.registerHelper ( 'getCurrentYear', () => {
    return new Date ().getFullYear ()
} );

hbs.registerHelper ( 'screamIt', ( text ) => {
    return text.toUpperCase ();
} );

app.get ( '/', ( req, res ) => {
    res.render ( 'home.hbs', {
        pageTitle     : 'Home Page',
        welcomeMessage: 'Hello to my site',
    } );
} );

app.get ( '/about', ( req, res ) => {
    res.render ( 'about.hbs', {
        pageTitle: 'About Page',
    } );
} );

app.get ( '/projects', ( req, res ) => {
    res.render ( 'projects.hbs', {
        pageTitle: 'Projects Page',
        welcomeMessage: 'this is my projects',
    } );
} );

app.get ( '/bad', ( req, res ) => {
    res.send ( {
        errorMessage: 'Unable to connect'
    } )
} );

app.listen ( port, () => {
    console.log ( `Server is up on port ${port} ` );
} );