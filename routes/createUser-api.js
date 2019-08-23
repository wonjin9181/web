db = require("../models")

const { hashedPassword } = require('../util/passwordService')

module.exports = function (app) {

    app.post("/api/users", async function (req, res) {
        let hasher = new PasswordHasher();
        let hash = await hasher.create(req.body.password);
        //find info from database user
        //check the email of databases to req.body.email
        //if it exists send error
        //else we post

        db.Users.findAll({
            where: {
                email: req.body.email
            }
        })
            .then(function (results) {
                console.log("------" + results)
                //when result comes out as []
                //it creates user
                if (results.length === 0) {
                    db.Users.create({
                        email: req.body.email,
                        house: req.body.house,
                        characterName: req.body.username,
                        hash: hash.hash,
                        salt: hash.salt,
                        characterImage: req.body.characterImage
                    })
                        .then(function (dbUser) {
                            res.json(dbUser)
                            res.status(200)
                        })
                        .catch(function (err) {
                            console.log(err)
                        })
                }
                //when we get a user
                //we send status 404?
                else {
                    console.log("username exists")
                    res.end()
                }
            });


    })


    app.get("/api/users/:id", function (req, res) {
        // console.log(req.params.id)
        db.Users.findAll({
            where: {
                id: req.params.id
            }
        })
            .then(function (dbUser) {

                res.json({
                    characterName: dbUser[0].dataValues.characterName,
                    house: dbUser[0].dataValues.house,
                    strength: dbUser[0].dataValues.strength,
                    characterImage: dbUser[0].dataValues.characterImage
                })
            
            })
            .catch(function (err) {
                throw err;
            })
    })


    app.delete("/api/users/:id", function (req, res){
        console.log(req.params.id)
        db.Users.destroy({
            where:{
                id: req.params.id
            }
        })
        .then(function(result){
            res.status(200)
        })
    })

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