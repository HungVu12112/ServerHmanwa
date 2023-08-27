const { name } = require('ejs');
var myMD = require('../../models/comment.model');
exports.listComment = async (req, res, next) => {
    let listcomment = await myMD.commentModel.find().populate('id_use');
    res.status(200).json(
        {
            listcomment: listcomment
        }
    );
}
exports.findlistComment = async (req, res, next) => {
    let dieu_kien_loc = { id_truyen: req.query.id_truyen }
    let listcomment = await myMD.commentModel.find(dieu_kien_loc).populate('id_use').populate('id_truyen')
    res.status(200).json(
        {
            listcomment: listcomment
        }
    );
}
exports.addcomment = async (req, res, next) => {
    let msg = "";
    let isCheck = false;
    if (req.method == "POST") {
        let objComment = new myMD.commentModel();
        objComment.comment_time = req.query.comment_time;
        objComment.id_truyen = req.query.id_truyen;
        objComment.id_use = req.query.id_use;
        objComment.content = req.query.content;
        try {
            await objComment.save();
            msg = "Comment thành công "
            isCheck = true;
        } catch (error) {
            msg = "Lỗi comment !"
        }
    }
    res.status(200).json(
        {
            msg: msg,
            isCheck: isCheck
        }
    );

}
exports.updatecomment = async (req, res, next) => {
    let msg = '';
    let isCheck = false;
    let idcomment = req.params.idcomment;
    if (req.method == "PUT") {
        let objComment = new myMD.commentModel();
        objComment.comment_time = req.query.comment_time;
        objComment.id_truyen = req.query.id_truyen;
        objComment.id_use = req.query.id_use;
        objComment.content = req.query.content;
        objComment._id = idcomment
        try {
            await myMD.commentModel.findByIdAndUpdate(idcomment, objComment);
            msg = "Sửa thành công "
            isCheck = true;
        } catch (error) {
            msg = "Lỗi update comment !"
        }
    }
    res.status(200).json(
        {
            isCheck: isCheck,
            msg: msg
        }
    )

}
exports.deletecomment = async (req, res, next) => {
    let msg ='';
    let isCheck = false;
    if (req.method =="DELETE"){
        await myMD.commentModel.findByIdAndDelete(req.params.idcomment,req.body);
        msg = 'Xóa thành công'
        isCheck = true;
    }
    else{
        msg = 'Xóa không thành công'
        isCheck = false;
    }
    res.status(200).json(
        {
            msg : msg,
            isCheck : isCheck
        }
    )
}