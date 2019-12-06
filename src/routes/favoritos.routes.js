"use strict";
const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../helpers/auth');
//const Wishlist = require('../models/wishlist.controller');
const Favoritos = require('../models/favoritos.controller');

// router.post('/api/home-usuario/producto/favoritos/:id', isAuthenticated, async (req, res) => {
//     console.log("El luisma es joto");
//     const { nombre, precio, descripcion } = req.body;
//     const errors = [];

//         const newFavorito = new Favoritos({ nombre });
//         newFavorito.user = req.user.id;
//         await newFavorito.save();
//         req.flash('success_msg', 'Producto guardado');
//         res.redirect('/api/home-mercado')
    
// });
