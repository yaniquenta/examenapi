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
rutas.get('/libro-reciente', async (req, res) =>{
    try {
        const tarea = await libroModel.findOne().sort({_id: -1});
        res.json(libros);
    }
    catch(error){
        res.status(404).json({mensaje: error.message});
    }
});
//// - Consultar una libro especifica por Id
rutas.get('/libros-esp/:id', async (req, res) =>{
    try {
        console.log(req.params.id);
        const tarea = await libroModel.findById(req.params.id);
        res.json(libros);
    }
    catch(error){
        res.status(404).json({mensaje: error.message});
    }
});
//// - Listar todas las libros por cantidad 5
rutas.get('/tarea-prioridad/:id', async (req, res) =>{
    try {
        console.log(req.params.id);
        const tareasPrioridad = await TareaModel.find({ prioridad: req.params.id});
        res.json(tareasPrioridad);
    }
    catch(error){
        res.status(404).json({mensaje: error.message});
    }
});

////consultas ----------------------

//
//// - Ordenar las tareas por prioridad de forma ascendente
//rutas.get('/ordenar-tarea', async (req, res) =>{
//    try {
//        const tareasASC = await TareaModel.find().sort({prioridad: 1});
//        res.json(tareasASC);
//    }
//    catch(error){
//        res.status(404).json({mensaje: error.message});
//    }
//});

//// - Eliminar todas las tareas con una prioridad determinada
//rutas.delete('/eliminar-prioridad/:prioridad', async (req, res) =>{
//    try {
//        console.log(req.params.prioridad);
//        const prioridad = req.params.prioridad
//        const eliminarTareas = await TareaModel.deleteMany({prioridad});
//        res.json({mensaje: 'Tareas eliminada correctamente'});
//        
//    } catch(error){
//        res.status(400).json({mensaje: error.message});
//    }
//});

module.exports = rutas;