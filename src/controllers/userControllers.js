const userSchema = require('../models/user'); // Importa el esquema de usuario desde el archivo correspondiente
const jwt = require('jsonwebtoken'); 
require('dotenv').config();

exports.addUsers = async (req, res) => { // Define una función asíncrona para agregar usuarios
    try {
        const { username, email, password } = req.body;
        const user = new userSchema({
            username,
            email,
            password
        })
        user.password = await user.encryptPassword(user.password)
        await user.save(); // Guarda el nuevo usuario en la base de datos y espera a que la operación se complete
        
        const token = jwt.sign({id: user._id}, process.env.SECRET_KEY, {
            expiresIn: 60 * 60 * 2
        })

        res.json({auth: true, token}); // Envía la respuesta con los datos del usuario guardado en formato JSON
    } catch (error) {
        res.status(500).json({ message: error.message }); // Si ocurre un error, envía una respuesta con el estado 500 y el mensaje de error
    }
};

exports.listUsers = async (req, res) => { // Define una función asíncrona para listar usuarios
    try {
        const users = await userSchema.find(); // Busca todos los documentos en la colección de usuarios y espera a que la operación se complete
        res.json(users); // Envía la respuesta con los datos de los usuarios en formato JSON
    } catch (error) {
        res.status(500).json({ message: error.message }); // Si ocurre un error, envía una respuesta con el estado 500 y el mensaje de error
    }
};

exports.listUsersById = async (req, res) => { // Define una función asíncrona para listar un usuario por su ID
    try {
        const { id } = req.params; // Extrae el ID de los parámetros de la solicitud
        const user = await userSchema.findById(id); // Busca el usuario en la base de datos por su ID y espera a que la operación se complete
        res.json(user); // Envía la respuesta con los datos del usuario en formato JSON
    } catch (error) {
        res.status(500).json({ message: error.message }); // Si ocurre un error, envía una respuesta con el estado 500 y el mensaje de error
    }
};

exports.updateUsers = async (req, res) => { // Define una función asíncrona para actualizar usuarios
    try {
        const { id } = req.params; // Extrae el ID de los parámetros de la solicitud
        const { name, age, email } = req.body; // Extrae los campos name, age y email del cuerpo de la solicitud

        // Actualiza el usuario con el ID especificado, estableciendo los nuevos valores para name, age y email
        const data = await userSchema.updateOne({ _id: id }, { $set: { name, age, email } });

        res.json(data); // Envía la respuesta con los datos de la actualización en formato JSON
    } catch (error) {
        res.status(500).json({ message: error.message }); // Si ocurre un error, envía una respuesta con el estado 500 y el mensaje de error
    }
};

exports.deleteUsers = async (req, res) => { // Define una función asíncrona para eliminar usuarios
    try {
        const { id } = req.params; // Extrae el ID de los parámetros de la solicitud
        const data = await userSchema.deleteOne({ _id: id }); // Elimina el usuario con el ID especificado de la base de datos y espera a que la operación se complete
        res.json(data); // Envía la respuesta con los datos de la operación de eliminación en formato JSON
    } catch (error) {
        res.status(500).json({ message: error.message }); // Si ocurre un error, envía una respuesta con el estado 500 y el mensaje de error
    }
};
