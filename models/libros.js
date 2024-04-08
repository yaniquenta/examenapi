const mongoose = require('mongoose');

const libroSchema = new mongoose.Schema({
    NombreLibro : String,
    Descripcion :String,
    autor :String,
    publicado :Date,
    Estado :String,
    Prestamo :Date,
    Devolucion :Date,
    idioma :String,
    editorial :String,
    cantidad : Number,
    genero :String,
})

const libroModel = mongoose.model('Proyect',libroSchema,'proyect');
module.exports = libroModel;