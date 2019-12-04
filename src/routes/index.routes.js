"use strict";
const express = require('express');
const router = express.Router();

const Producto = require('../models/producto.controller');
const Productos = require('../models/productos.controller');

const { isAuthenticated } = require('../helpers/auth');


router.get('/api/home-mercado/agregar-producto', isAuthenticated, async (req, res) => {
    const productos = await Productos.find();
    res.render('./mercado/agregarProducto', { productos });
});


router.get('/api/home-mercado', isAuthenticated, async (req, res) => {
    const listaProductos = await Producto.find({ user: req.user.id }).sort({ date: 'desc' });
    
    res.render('./mercado/home-mercado', { listaProductos });
});

router.get('/api/home-mercado/editar-producto/:id', isAuthenticated, async (req, res) => {
    const producto = await Producto.findById(req.params.id);
    res.render('./mercado/editarProducto', { producto });
});
router.get('/api/home-usuario/producto/:id', async (req, res) => {
    const producto = await Producto.findById(req.params.id);
    console.log(producto);
    
    res.render('./consumidores/producto-usuario', { producto });
});

router.get('/api/home-usuario', isAuthenticated, async (req, res) => {
    const listaProductos = await Producto.find();
    res.render('./consumidores/home-usuario', { listaProductos });
});


module.exports = router;