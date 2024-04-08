const express = require('express');
const rutas = express.Router();
const libroModel = require('../models/libros');

rutas.get('/litar', async (req, res) =>{
    try {
        const proy = await libroModel.find();
        // console.log(tareas);
        res.json(proy);
    }
    catch(error){
        res.status(404).json({mensaje: error.message});
    }
});

rutas.post('/agregar', async (req, res) =>{
    // console.log(req.body);
    const nuevaTarea = new libroModel({
        NombreLibro : req.body.NombreLibro,
        Descripcion :req.body.descripcion,
        autor :req.body.autor,
        publicado :req.body.publicado,
        Estado :req.body.Estado,
        Prestamo :req.body.Prestamo,
        Devolucion :req.body.Devolucion,
        idioma :req.body.idiaoma,
        editorial :req.body.editorial,
        cantidad : req.body.cantidad,
        genero :req.body.genero

    });
    try {
        const guardarTarea = await nuevaTarea.save();
        res.status(201).json(guardarTarea);
        
    } catch(error){
        res.status(400).json({mensaje: error.message});
    }
});

rutas.put('/editar/:id', async (req, res) =>{
    try {
        const actualizarlibro = await libroModel.findByIdAndUpdate(req.params.id, req.body, { new: true});
        res.status(201).json(actualizarlibro);
        
    } catch(error){
        res.status(400).json({mensaje: error.message});
    }
});

rutas.delete('/eliminar/:id', async (req, res) =>{
    try {
        const eliminarTarea = await libroModel.findByIdAndDelete(req.params.id);
        res.json({mensaje: 'libro eliminado correctamente'});
        
    } catch(error){
        res.status(400).json({mensaje: error.message});
    }
});
//// - Consultar la tarea mas reciente anadida a la base de datos
rutas.get('/Libro-reciente', async (req, res) =>{
    try {
        const tarea = await libroModel.findOne().sort({_id: -1});
        res.json(tarea);
    }
    catch(error){
        res.status(404).json({mensaje: error.message});
    }
});
//// - Consultar una libro especifica por Id
rutas.post('/libros-esp/', async (req, res) =>{
    try {
        const nuevaTarea = new libroModel({
            NombreLibro : req.body.NombreLibro

        });
        const libros = await libroModel.find({ NombreLibro: req.body.NombreLibro });
        res.json(libros);
    }
    catch(error){
        res.status(404).json({mensaje: error.message});
    }
});
//// - Ordenar las tareas por prioridad de forma ascendente
rutas.get('/ordenarCantidad', async (req, res) =>{
    try {
        const libros = await libroModel.find().sort({cantidad: -1});
        res.json(libros);
    }
    catch(error){
        res.status(404).json({mensaje: error.message});
    }
});

module.exports = rutas;
