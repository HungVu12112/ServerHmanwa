const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/doc-truyen_tranh')
        .catch((err)=>{
            console.log('Loi ket noi csdl');
            console.log(err);
        });
module.exports = {mongoose}