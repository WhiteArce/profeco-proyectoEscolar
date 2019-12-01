const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcryptjs');

const UsuarioEsquema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

//La contraseña ingresada se cifra en un metodo HASH en 10 vuetas
UsuarioEsquema.methods.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10); //se obtiene la contraseña cifrada en 10 vueltas de HASH
  const hash = await bcrypt.hash(password, salt); //Genera el hash para la contraseña ingresada 
  return hash;
};

//Verifica si la contraseña ingresada es igual a la que se tiene en la base de datos, se hace la comparacion
UsuarioEsquema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', UsuarioEsquema);