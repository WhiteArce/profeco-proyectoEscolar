const mongoose = require('mongoose');
const esquema = mongoose.Schema;

const productoEsquema = new esquema({
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
    comentario: {
        type: String
    }

});

module.exports = mongoose.model('products', productoEsquema);
                            //nombre de la tabla