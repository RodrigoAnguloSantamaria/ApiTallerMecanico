const mongoose = require("mongoose");

const Cliente = require ("../api/models/cliente.model");

const arrayClientes=[
    {
        "email": "alguno@alguno.com",
        "password": "12345",
        "nombre_completo": "Pepito perez",
        "telefono": 666554433,
        "direccion":"mi casa",
        "coches": []
    },
    {
        "email": "alguno@alguno.com",
        "password": "12345",
        "nombre_completo": "Abel perez",
        "telefono": 666223344,
        "direccion":"mi casa de abel",
        "coches": []
    },
    {
        "email": "alguno@alguno.com",
        "password": "12345",
        "nombre_completo": "Roberto garcia",
        "telefono": 666115599,
        "direccion":"mi casa de roberto",
        "coches": []
    },
    {
        "email": "alguno@alguno.com",
        "password": "12345",
        "nombre_completo": "Rodrigo perez",
        "telefono": 666445588,
        "direccion":"mi casa rodrigo",
        "coches": []
    },
    {
        "email": "alguno@alguno.com",
        "password": "12345",
        "nombre_completo": "Carol perez",
        "telefono": 666665577,
        "direccion":"mi casa carol",
        "coches": []
    },
    {
        "email": "alguno@alguno.com",
        "password": "12345",
        "nombre_completo": "Natalia perez",
        "telefono": 666222222,
        "direccion":"mi casa Natalia",
        "coches": []
    },
    {
        "email": "alguno@alguno.com",
        "password": "12345",
        "nombre_completo": "Daniela perez",
        "telefono": 666889966,
        "direccion":"mi casa Daniela",
        "coches": []
    },
    {
        "email": "alguno@alguno.com",
        "password": "12345",
        "nombre_completo": "Santi perez",
        "telefono": 666998833,
        "direccion":"mi casa Santi",
        "coches": []
    },
    {
        "email": "alguno@alguno.com",
        "password": "12345",
        "nombre_completo": "Jose perez",
        "telefono": 666999911,
        "direccion":"mi casa Jose",
        "coches": []
    },
    {
        "email": "alguno@alguno.com",
        "password": "12345",
        "nombre_completo": "Carlos perez",
        "telefono": 666335515,
        "direccion":"mi casa Carlos",
        "coches": []
    },

]

mongoose.connect("mongodb+srv://root:root@cluster0.8phs6yk.mongodb.net/tallerMecanico?retryWrites=true&w=majority")

.then(async () => {
    const allClientes = await Cliente.find();
    if(allClientes.length > 0){
        await Cliente.collection.drop();
        console.log("Cientes borrados");
    }
})
.catch((error) => console.log("error borrando clientes", error))
.then(async () => {
    const clientesMap = arrayClientes.map((cliente) => new Cliente(cliente));
    await Cliente.insertMany(clientesMap);
    console.log("Clientes insertados");
})
.catch((error) => console.log("error insertando clientes", error))
.finally(() => mongoose.disconnect());