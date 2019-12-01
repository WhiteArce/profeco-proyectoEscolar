"use strict";
const express = require('express');
const router = express.Router();

const Usuario = require('../models/users.controller');
const passport = require('passport');
const { isAuthenticated } = require('../helpers/auth');

router.get('/users/signin', (req, res) => {
    res.render('users/login');
});


router.post('/users/signin', passport.authenticate('local', {
    successRedirect: '/api/home-usuario',
    failureRedirect: '/users/signin',
    failureFlash: true
}));

router.get('/users/logout', isAuthenticated, (req, res) => {
    req.logOut();
    res.redirect('/users/signin');
});

router.get('/users/signup', (req, res) => {
    res.render('users/signup');
});

router.post('/users/signup', async (req, res) => {
    const { nombre, correo, password, confirm_password } = req.body;
    const errors = [];
    console.log(req.body);

    if (nombre.length <= 0) {
        errors.push({ text: 'Ingrese el nombre' });
    }
    if (correo.length <= 0) {
        errors.push({ text: 'Ingrese el correo' });
    }
    if (password.length < 4 || password <= 0) {
        errors.push({ text: 'La contraseña debe de ser mayor a 4 caracteres' });
    }
    if (password.length > 4) {
        if (password != confirm_password) {
            errors.push({ text: 'Las contraseñas no son coinciden' });
        }
    }

    if (errors.length > 0) {
        res.render('users/signup', { errors, nombre, correo });
    }
    else {
        const correoUsuario = await Usuario.findOne({ correo: correo });
        if (correoUsuario) {
            req.flash('error_msg', 'El correo ya existe');
            res.redirect('/users/signup');
        } else {
            const nuevoUsuario = new Usuario({ nombre, correo, password });
            nuevoUsuario.password = await nuevoUsuario.encryptPassword(password);
            await nuevoUsuario.save();
            req.flash('success_msg', 'Registro completo');
            res.redirect('/users/signin');
        }
    }
});

module.exports = router;