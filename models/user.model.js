var db = require('./db');
const userSchema = new db.mongoose.Schema({
    username: { type: String, require: true },
    password: { type: String, require: true },
    fullname: { type: String, require: true },
    email: { type: String, require: true }
},

    {
        collection: 'use'
    }
);
let userModel = db.mongoose.model('userModel',userSchema);
module.exports = {userModel};