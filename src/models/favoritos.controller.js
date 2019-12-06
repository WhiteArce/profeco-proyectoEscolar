const mongoose = require('mongoose');
const esquema = mongoose.Schema;

const favoritosEsquema = new esquema({
    nombre: {
        type: String,
       
    },
    user: {
        type: String
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

});

module.exports = mongoose.model('favoritos', favoritosEsquema);
                            //nombre de la tabla