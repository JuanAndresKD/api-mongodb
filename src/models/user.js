const { Schema, model} = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

userSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
}

userSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
  };

module.exports = model('User', userSchema);
