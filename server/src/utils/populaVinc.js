const User = require('../models/user');

const Vincular = {
    async geraVinculos(vinculos) {
        return new Promise(async(resolve, reject) => {
            const vinculados = [];
            for (let item of vinculos) {
                const user = await User.findOne({
                    email: item
                })
                if (user) {
                    vinculados.push({
                        name: user.name,
                        email: user.email,
                        _id: user._id
                    })
                }
            }

            if (vinculados.length) {
                resolve(vinculados);
            } else {
                reject(null);
            }
        });
    }
}

module.exports = Vincular;