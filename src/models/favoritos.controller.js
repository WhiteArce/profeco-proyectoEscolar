const mongoose = require('mongoose');
const esquema = mongoose.Schema;

const carritoEsquema = new esquema({
    id: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    user: {
        type: String
    }

});

module.exports = mongoose.model('favoritos', carritoEsquema);
                            //nombre de la tabla