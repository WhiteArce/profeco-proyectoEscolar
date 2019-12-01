const mongoose = require('mongoose');
const esquema = mongoose.Schema;

const carritoEsquema = new esquema({
    id: {
        type: String
    },
    nombre: {
        type: String,
       
    },
    precio: {
        type: Number,
        
    },
    descripcion: {
        type: String,
       
    },
    date: {
        type: Date,
        default: Date.now
    },
    user: {
        type: String
    }

});

module.exports = mongoose.model('carrito', carritoEsquema);
                            //nombre de la tabla