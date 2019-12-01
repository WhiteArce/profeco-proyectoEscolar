"use strict";
const express = require('express');
const router = express.Router();
const Producto = require('../models/producto.controller');
const { isAuthenticated } = require('../helpers/auth');
const Wishlist = require('../models/wishlist.controller');

router.post('/api/home-mercado/agregar-producto', isAuthenticated, async (req, res) => {
    const { nombre, precio, descripcion } = req.body;
    const errors = [];

    if (!nombre) {
        errors.push({ text: "El producto debe de tener nombre " });
    }
    if (!descripcion) {
        errors.push({ text: "El producto debe de tener una descripcion" });
    }
    if (!precio) {
        errors.push({ text: "El producto debe de tener un precio" });
    }
    if (errors.length > 0) {
        res.render('./mercado/agregarProducto', {
            errors,
            nombre,
            descripcion,
            precio
        });
    } else {
        const newProducto = new Producto({ nombre, precio, descripcion });
        newProducto.user = req.user.id;
        await newProducto.save();
        req.flash('success_msg', 'Producto guardado');
        res.redirect('/api/home-mercado')
    }
});

router.post('/api/home-usuario/producto/wishlist/:id', async (req, res) => {
    const {nombre, precio, descripcion } = req.body;
   const producto =  await Producto.findById({ nombre, precio, descripcion });

    await newWishlist.save(producto);
    req.flash('success_msg', 'Se ha agregado a la wishlist');
    res.redirect('/api/home-usuario/producto');
});

router.put('/api/home-mercado/editar-producto/:id', isAuthenticated, async (req, res) => {
    const { nombre, precio, descripcion } = req.body;
    await Producto.findByIdAndUpdate(req.params.id, { nombre, precio, descripcion });
    req.flash('success_msg', 'Producto actualizado');
    res.redirect('/api/home-mercado');

});


router.delete('/api/home-mercado/eliminar-producto/:id', isAuthenticated, async (req, res) => {
    await Producto.findByIdAndRemove(req.params.id);
    req.flash('success_msg', 'Producto eliminado');
    res.redirect('/api/home-mercado');
});







module.exports = router;