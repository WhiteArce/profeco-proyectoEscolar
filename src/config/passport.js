const passport = require('passport');
const LocalStrategy = require('passport-local');

const User = require('../models/users.controller');

passport.use(new LocalStrategy({
    usernameField: 'correo'
}, async (correo, password, done) => {
    const user = await User.findOne({ correo: correo });
    if (!user) {
        return done(null, false, { message: 'El usuario no existe, registrese para ingresar' });
    } else {
        const match = await user.matchPassword(password);
        if (match) {
            return done(null, user);
        } else {
            return done(null, false, { message: 'Contraseña incorrecta' });
        }
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});