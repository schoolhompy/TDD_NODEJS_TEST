const models = require('../../models');

// var users = [
//     {id: 1, name: 'alice'},
//     {id: 2, name: 'bek'},
//     {id: 3, name: 'chlis'}
// ];

const index = function(req,res){
    req.query.limit = req.query.limit || 10;
    const limit = parseInt(req.query.limit, 10);
    if (Number.isNaN(limit)) {
        return res.status(400).end();
    }
    models.User.findAll({limit})
    .then(users => {
        res.json(users);
    });
}

const show = function(req, res){
    const id = parseInt(req.params.id);
    if (Number.isNaN(id))  return res.status(400).end();
 
    
    models.User.findOne({
        where :{id}
    })
    .then(user => {
        if (!user)  return res.status(404).end();
        res.json(user);
    });
     
 }

 const destroy = function(req, res){
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id))  return res.status(400).end();
    
    models.User.destroy({
        where :{id}
    })
    .then(() => {
        res.status(204).end();
    });
 }
 
 const create = function(req, res){
    const name = req.body.name;
    if (!name) return res.status(400).end();
 
    models.User.create({name})
    .then(user => {
        res.status(201).json(user);
    })
    .catch(err => {
        if (err.name === 'SequelizeUniqueConstraintError'){
            return res.status(409).end();
        }
         res.status(500).end();
    })
 }

const update = function(req, res){
    const id = parseInt(req.params.id, 10);
    const name = req.body.name;

    const user = users.filter((user) => user.id == id)[0];
    user.name = name;
 
    res.json(user);
 }

module.exports = {
    index,
    show,
    destroy,
    create,
    update
}