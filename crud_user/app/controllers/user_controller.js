'use strict';

let db = require('../config/mysql_config');
let UserRepo = require('../repositories/user_repository');
let User = require('../domains/user');

// SAVE
let saveUserShowForm = (req, res, next) => {
    res.render('new_user', {'title': 'Add New User'})
};

let saveUser = (req, res, next) =>{

    if(!req.body){
        next('semua field harus diisi');
    }

    let data = req.body;
    let user = new User(data.username, data.password, data.fullname, data.city, data.status);
    let userRepo = UserRepo(db);

    userRepo.save(user, result => {
        res.redirect('/');
    }, err => {
        if(err){
            next(err);
        }
    });
};

//UPDATE

let updateUserShowForm = (req, res, next) => {

    if(!req.params){
        next('username tidak ada');
    }

    let id = req.params.id;
    let userRepo = new UserRepo(db);

    userRepo.findOne(id, result => {
        res.render('update_user', {'user' :result, 'title':'Update User'});
    }, err => {

        if(err){
            next(err);
        }
    });
}

let updateUser = (req, res, next) =>{

    if(!req.body){
        next('semua field harus diisi');
    }

    let data = req.body;
    let user = new User(data.username, data.password, data.fullname, data.city, data.status);
    let userRepo = UserRepo(db);

    userRepo.update(user, result => {
        res.redirect('/');
    }, err => {
        if(err){
            next(err);
        }
    });
};

//DELETE

let deleteUser = (req, res, next) =>{

    if(!req.params){
        next('username tidak ada');
    }

    let username = req.params.username;
    let userRepo = UserRepo(db);

    userRepo.delete(user, result => {

    }, err => {
        if(err){
            next(err);
        }
    });
};

// GET User

let getUser = (req, res, next) =>{

    if(!req.params){
        next('username tidak ada');
    }

    let username = req.params.username;
    let userRepo = UserRepo(db);

    userRepo.findOne(username, result => {
        res.render('user_detail', {'user': result, 'title': 'User Detail'});
    }, err => {
        if(err){
            next(err);
        }
    });
};

let getAllUser = (req, res, next) => {
    let userRepo = new UserRepo(db);
    userRepo.findAll(results => {
      res.render('index', {'users': results, 'title': 'User List'});
    }, err => {
      if(err){
        next(err);
      }
    });
  };

module.exports = {
    saveUserShowForm:saveUserShowForm,
    saveUser:saveUser,
    updateUserShowForm:updateUserShowForm,
    updateUser:updateUser,
    deleteUser:deleteUser,
    getUser:getUser,
    getAllUser:getAllUser
}

