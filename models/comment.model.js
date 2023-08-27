var db = require('./db');
const commentSchema = new db.mongoose.Schema({
    id_use: { type: db.mongoose.Schema.Types.ObjectId, ref: 'userModel' },
    id_truyen: { type: db.mongoose.Schema.Types.ObjectId, ref: 'comicModel' },
    content: { type: String, require: true },
    comment_time: { type: String, require: true }
},
    {
        collection: 'comment'
    }
);
let commentModel = db.mongoose.model('commentModel',commentSchema);
module.exports = {commentModel};