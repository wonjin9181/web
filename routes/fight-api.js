var db = require("../models");

module.exports = function (app) {

    app.put("/api/users/:id", function(req, res){
        console.log("+++++++++++"+req.body)
        db.Users.update(
            {strength: req.body},
            {where: {id:req.params.id}}
        )
        .then(function(rowUpdate){
            res.json(rowUpdate)
            res.status(200)
        })
    })

    app.put("/api/users/strength/:id", function(req, res){
        console.log(req.body)
        db.Users.update(
            {strength: req.body},
            {where: {id: req.params.id}}
        )
        .then(function(rowUpdate){
            res.json(rowUpdate)
            res.status(200)
        })
    })



}