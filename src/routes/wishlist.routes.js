"use strict";
const express = require('express');
const router = express.Router();
const Producto = require('../models/producto.controller');
const { isAuthenticated } = require('../helpers/auth');
const Wishlist = require('../models/wishlist.controller');



