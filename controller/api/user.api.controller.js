const { render } = require('ejs')
var myMD = require('../../models/user.model')

exports.listUser = async (req, res, next) => {
    let listUser = await myMD.userModel.find()
    res.status(200).json(
        {
            listUser : listUser
        }
            
    );
}
exports.loginApp = async (req, res, next) => {
    var msg = ""
    var checkLogin = false;
    let objectUser = await myMD.userModel.find({ username: req.query.username });
    try {
        let objectUser = await myMD.userModel.findOne({ username: req.query.username });
        if (objectUser) {
            if (objectUser.password == req.query.password) {
                msg = "Đăng nhập thành công"
                checkLogin = true
            }
            else {
                msg = "Đăng nhập không thành công"
                checkLogin = false;
            }
        }
    } catch (error) {
        console.log('không thể login')
    }
    res.status(200).json(
        {
            msg : msg,
            checkLogin : checkLogin,
            objectUser : objectUser
        }
    );
}
////
exports.changerPassword = async (req, res, next) => {
    var msg = ""
    var isCheck = false;
    // let objectUser = await myMD.userModel.find({ username: req.query.username });
    if(req.method == 'POST'){

    try {
        let objectUser = await myMD.userModel.findOne({ username: req.query.username });
        if (objectUser) {
            if (objectUser.password == req.query.password) {
                objectUser.password = req.query.newpassword
                try {
                    await myMD.userModel.findByIdAndUpdate(objectUser._id,objectUser);
                    msg = "Đổi mật khẩu thành công"
                    isCheck = true
                } catch (error) {
                    msg = "Đổi mật khâu không thành công"
                    isCheck = false
                }
            }
            else {
                msg = "Mật khẩu không đúng"
                isCheck = false;
            }
        }
    } catch (error) {
        console.log('không thể login')
    }
}
    res.status(200).json(
        {
            msg : msg,
            isCheck : isCheck,
        }
    );
}
exports.register = async (req, res, next) => {
    var msg = ""
    var isCheck = false;
    if (req.method == 'POST'){
        let objectCheck = await myMD.userModel.findOne({username : req.body.username});
        let objectUser = new myMD.userModel();
        if (objectCheck){
            msg = "Tài khoản này đã tồn tại  ! Vui lòng đăng kí tài khoản khác"
        }
        else {
            objectUser.username = req.body.username
            objectUser.fullname = req.body.fullname
            objectUser.email = req.body.email
            objectUser.password = req.body.password
            try {
                await objectUser.save();
                msg = "Đăng kí thành công"
                isCheck = true;
            } catch (error) {
                console.log(error)
                msg = "Đăng kí thất bại"
            }
        }
    }
    res.status(200).json(
        {
            msg : msg, 
            isCheck : isCheck
        }
    );
}
exports.updateUser = async (req, res, next) => {
    var msg = ""
    var isCheck = false;
    let iduser = req.params.iduser;
    if (req.method == 'PUT') {
        let objectUser = new myMD.userModel();
        objectUser.fullname = req.body.fullname
        objectUser.email = req.body.email
        objectUser._id = iduser;
            try {
                await myMD.userModel.findByIdAndUpdate(iduser,objectUser)
                msg = "Cập nhật thành công"
                isCheck = true;
            } catch (error) {
                console.log(error)
                msg = "Cập nhật thất bại"
            }
    }
    res.status(200).json(
        {
            msg : msg, 
            isCheck : isCheck
        }
    );
}
exports.deleteUser = async (req, res, next) => {
    let msg = "";
    if (req.method == "DELETE"){
        await myMD.userModel.findByIdAndDelete(req.params.iduser,req.body);
        msg = "Xóa thành công"
    }
    else{
        msg = "Xóa không thành công "
    }
    res.status(200).json(
        {
            msg : msg
        }
    );
}