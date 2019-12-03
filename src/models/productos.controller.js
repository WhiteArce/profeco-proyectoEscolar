const mongoose = require('mongoose');
const esquema = mongoose.Schema;

const productoEsquema = new esquema({
    nombre: {
        type: String,
        
    },
    precio: {
        type: Number,
        
    }

});

module.exports = mongoose.model('productos', productoEsquema);
                            //nombre de la tabla