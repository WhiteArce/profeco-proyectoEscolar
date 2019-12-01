const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/profeco-crud', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false
})
.then(db => console.log("Conectado a la base de datos"))
.catch(err => console.error(err));
