"use strict";
const express = require('express');
const router = express.Router();

const Usuario = require('../models/users.controller');
const passport = require('passport');
const { isAuthenticated } = require('../helpers/auth');


router.get('/market/signin', (req, res) => {
    res.render('mercado/signin');
});

router.post('/market/signin', passport.authenticate('local', {
    successRedirect: '/api/home-mercado',
    failureRedirect: '/market/signin',
    failureFlash: true
}));

router.get('/market/logout', isAuthenticated, (req, res) => {
    req.logOut();
    res.redirect('/market/signin');
});

router.get('/market/signup', (req, res) => {
    res.render('mercado/signup');
});

router.post('/market/signup', async (req, res) => {
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
        res.render('mercado/signup', { errors, nombre, correo });
    }
    else {
        const correoUsuario = await Usuario.findOne({ correo: correo });
        if (correoUsuario) {
            req.flash('error_msg', 'El correo ya existe');
            res.redirect('/market/signup');
        } else {
            const nuevoUsuario = new Usuario({ nombre, correo, password });
            nuevoUsuario.password = await nuevoUsuario.encryptPassword(password);
            await nuevoUsuario.save();
            req.flash('success_msg', 'Registro completo');
            res.redirect('/market/signin');
        }
    }
});

module.exports = router;