'use strict';

let User = require('../domains/user');

let UserRepository = function(db){
  this.db = db;
};

UserRepository.prototype = {
  save: function(u, cb, errCb){
    let db = this.db;
    let data = {id:u.id, username: u.username, password: u.password, fullname: u.fullname, city:u.city, status:u.status};
    // let data = {code: s.code, name: s.name, department: s.department, age: s.age};
    let query = 'INSERT INTO user SET ?';
    db.query(query, data, (err, results) => {
      if(err){
        errCb(err);
      }
      cb(results);
    });
  },

  update: function(u, cb, errCb){
    let db = this.db;
    let data = [u.username, u.password, u.fullname, u.city, u.status, u.id];
    let query = 'UPDATE user SET username = ?, password = ?, fullname = ?, city = ?, status = ? WHERE id = ?';
    db.query(query, data, (err, results) => {
      if(err){
        errCb(err);
      }
      cb(results);
    });
  },

  delete: function(id, cb, errCb){
    let db = this.db;
    let query = 'DELETE FROM user WHERE code = ?';
    db.query(query, [id], (err, results) => {
      if(err){
        errCb(err);
      }
      cb(results);
    });
  },

  findOne: function(id, cb, errCb){
    let db = this.db;
    let query = 'SELECT * FROM user WHERE id = ?';
    db.query(query, [id], (err, results, fields) => {
      if(err){
        errCb(err);
      }
      if(!results){
        cb('Data dengan id ${id}, tidak di temukan');
      }else{
        let u = results[0];
        let user = new User(u.id, u.username, u.password, u.fullname, u.city, u.status);
        cb(user);
      }
    });
  },

  findAll: function(cb, errCb){
    let db = this.db;
    let query = 'SELECT * FROM user';
    db.query(query, (err, results, fields) => {
      if(err){
        errCb(err);
      }
      if(!results){
        cb('tabel user kosong');
      }else{
        let userArray = [];
        for(let i=0;i<results.length;i++){
          let u = results[i];
          let user = new User(u.id, u.username, u.password, u.fullname, u.city, u.status);
          userArray.push(user);
        }
        cb(userArray);
      }
    });
  }
};

module.exports = UserRepository;