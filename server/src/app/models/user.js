// Importando
const mongoose = require('../../database');
const bcrypt = require('bcryptjs');

// Definindo um Schema
const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    passwordResetToken: {
        type: String,
        select: false,
    },
    passwordResetExpires: {
        type: Date,
        select: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Antes de salvar o password, utiliza-se encriptação hash na senha
UserSchema.pre('save', async function(next){
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;

    next();
});

// Definir nosso User model
const User = mongoose.model('User', UserSchema);

// Exportar módulo
module.exports = User;