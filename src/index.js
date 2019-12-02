const express = require('express');
const path = require('path');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash-plus/lib');
const passport = require('passport');

//conectar a la BD
require('./database');

//importacion de rutas
const app = express();
const indexRoutes = require('./routes/index.routes');
const usersRoutes = require('./routes/users.routes');
const productoRoutes = require('./routes/producto.routes');
const marketRoutes = require('./routes/mercado.routes');
require('./config/passport');


//configuraciones
app.set('port', process.env.PORT || 5000);
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');


//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(session({
    secret: 'mysecretapp',
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//Variables globales
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});

//rutas
app.use('/', indexRoutes);
app.use('/', usersRoutes);
app.use('/', productoRoutes);
app.use('/', marketRoutes);


//Static files
app.use(express.static(path.join(__dirname, 'public')));

//inciando server
app.listen(app.get('port'), () => {
    console.log(`Servidor escuchando en ${app.get('port')}`);
});