var db = require("../models");

module.exports = function (app) {
    app.get("/api/house/:house", function (req, res) {
        
        db.House.findAll({
            where: {
                houseName: req.params.house
            }
        })
            .then(function (dbHouse) {
                // console.log(dbHouse)
                res.json(dbHouse)
            })
            .catch(function (err) {
                console.log(err)
            })
    })

    app.post("/api/house", function (req, res) {
        // console.log("this:"+ req.body.house)
        db.House.create({
                houseName: req.body.house,
                user: req.body.username
            
        })
            .then(function (dbHouse) {
                res.json(dbHouse)
            })
            .catch(function (err) {
                console.log(err)
            })
    })

    app.delete("/api/house/users/:id", function(req, res){
        db.House.destroy({
            where:{
                id: req.params.id
            }
        })
        .then(function(result){
            res.status(200)
        })
    })
}

