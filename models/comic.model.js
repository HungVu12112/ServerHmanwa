var db = require('./db');
const comicSchema = new db.mongoose.Schema({
    name: { type: String, require: true },
    des: { type: String, require: true },
    nametg: { type: String, require: true },
    img: { type: String, require: true },
    imgnd: { type: Array, required: true },
    yearxb: { type: String, require: true },
    status : {type : Boolean ,require : true}
},
    {
        collection: 'truyentranh'
    }
);
let comicModel = db.mongoose.model("comicModel",comicSchema);
module.exports = {comicModel}