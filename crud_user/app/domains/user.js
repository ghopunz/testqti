'use strict';

let User = function(id, username, password, fullname, city, status){

    this.id = id;
    this.username = username;
    this.password = password;
    this.fullname = fullname;
    this.city = city;
    this.status = status;
};

module.exports = User;