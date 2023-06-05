const cliente = require("../api/models/cliente.model");

const validateEmail = (email) => {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return regex.test(String(email).toLowerCase());
}

const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/; // password valida Abcd123$

    return regex.test(String(password));
}

const usedEmail = async(email) => {
    const clientes = await cliente.find({ email: email });
    console.log(cliente.length)
    return clientes.length;
}

module.exports = { validatePassword, validateEmail, usedEmail }