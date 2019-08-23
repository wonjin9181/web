
const db = require('../models');

module.exports = (app) => {


    app.post('/api/login', (req, res) => {
        var email = req.body.email;
        var password = req.body.password;
        console.log(email, password);
        if (email && password) {
            db.Users.findAll({
                where: {
                    email: email
                }
            }).then(async (results) => {
                if (results.length === 0) {
                    console.log("no result")
                    res.json({
                        isUser:false
                    })
                }
                let hasher = new PasswordHasher();
                let cool = await hasher.verify(password, results[0].dataValues.hash, results[0].dataValues.salt);
                if (cool) {
                    console.log(results[0].dataValues)
                    let data= results[0].dataValues
                    res.json({
                        isUser:true,
                        id: data.id
                    })
                } else {
                    console.log("not cool")
                    res.json({
                        isUser:false
                    })
                }
                res.end();
            })
        } else {
            res.send('Please enter Username and Password!');
            res.end();
        }
    });

    // app.post('/user/createuser', async (req, res) => {
    //     let hasher = new PasswordHasher();
    //     let hash = await hasher.create(req.body.password);
    //     console.log(hash);

    //     db.User.create({
    //         email: req.body.email,
    //         hash: hash.hash,
    //         salt: hash.salt,
    //         characterName: req.body.username,
    //         house: req.body.house,
    //         characterImg: req.body.img
    //     }).then(dbUser => {
    //         console.log(dbUser);
    //         res.redirect('/');
    //     });
    // });
}


const crypto = require('crypto');


function PasswordHasher() {
}
PasswordHasher.prototype.create = async function (password) {
    let salt = crypto.randomBytes(32).toString('hex');
    let rval = await this.hash(password, salt);
    return rval;
}
PasswordHasher.prototype.verify = async function (password, hashed, salt) {
    let hash = await this.hash(password, salt);
    return hashed === hash.hash;
}
PasswordHasher.prototype.hash = async function (password, salt) {
    return new Promise((resolve, reject) => {
        let hasher = crypto.createHmac('sha512', salt);
        let hash = hasher.update(password);
        let iterations = 25000;
        function doOne() {
            hash.update(password);
            if (iterations--) {
                process.nextTick(doOne);
            } else {
                resolve({
                    salt: salt,
                    hash: hash.digest('hex')
                });
            }
        }
        doOne();
    });
}
