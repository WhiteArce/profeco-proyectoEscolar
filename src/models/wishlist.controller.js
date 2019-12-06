const mongoose = require('mongoose');
const esquema = mongoose.Schema;

const wishlistEsquema = new esquema({
    nombre: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    user: {
        type: String
    },
});

module.exports = mongoose.model('wishlist', wishlistEsquema);
                            //nombre de la tabla