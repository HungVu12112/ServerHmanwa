var myMD = require('../../models/comic.model')
var fs = require('fs');
const path = require('path');
var sock = require('../../socket_server');
exports.listComic = async (req , res , next) => {
    let listComic  = await myMD.comicModel.find();
    res.status(200).json(
        {
            listComic : listComic
        }
    );
}
exports.listComicFavorite = async (req , res , next) => {
    let listComic  = await myMD.comicModel.find({status : true});
    res.status(200).json(
        {
            listComic : listComic
        }
    );
}
exports.addFavorite = async (req , res , next) => {
    let msg = '';
    let isCheack = false; 
    let idcomic = req.params.idcomic;
    if (req.method == "PUT"){
        let obj = new myMD.comicModel();
        obj.status = req.query.status;
        obj._id = idcomic;
        try {
            await myMD.comicModel.findByIdAndUpdate(idcomic,obj);
            msg = "Thêm vào fa Thành công"
            isCheack = true;
        } catch (error) {
            msg = "Lỗi thêm vào Fa"
        }
    }
    res.status(200).json(
        {
            msg : msg,
            isCheack : isCheack
        }
    );
}
exports.addComic = async (req , res , next) => {
    let msg = '';
    let isCheack = false;
    var arr = new Array();
    if(req.method == "POST"){
        let obj = new myMD.comicModel();
        obj.name = req.body.name;
        obj.nametg = req.body.nametg;
        obj.des = req.body.des;
        obj.yearxb = req.body.yearxb;

        // fs.renameSync(req.files.path, "./public/uploads" + req.files.originalname);
        // let url_file1 = '/uploads' + req.files.originalname;
        // obj.img = url_file1;

       
        const images = req.files;
        // images.forEach((image) => {
        //     // // Xử lý tập tin ảnh
        //     const fileExtension = path.extname(image.originalname); // Phần mở rộng của tệp
        //     fs.renameSync(image.path,"./public/uploads" + image.originalname);
        //     var url_file = "/uploads"+image.originalname;
        //     arr.unshift(url_file);
            
        //     console.log(image);
        //   });
        //   obj.imgnd = arr;
          

          if(images){
             for(let key in images){
                if(key == "img"){
                    images[key].forEach(element => {
                        fs.renameSync(element.path,"./public/uploads" + element.originalname);
                        obj.img = "/uploads" + element.originalname
                    });
                }
                else if (key =="imgnd"){
                    images[key].forEach(element => {
                        fs.renameSync(element.path,"./public/uploads" + element.originalname);
                        let url = "/uploads" + element.originalname
                        obj.imgnd.push(url);
                    });
                }
             }
          }



        try {
            sock.io.emit("new", "thêm truyện thành công");
            await obj.save();
            isCheack = true;
            msg = 'Thêm truyện thành công'            
        } catch (error) {
            msg = 'Thêm thất bại'
        }
    }
    res.status(200).json(
        {
            isCheack : isCheack,
            msg : msg
        }
    );
}
exports.updateComic = async (req , res , next) => {
    let msg = '';
    let isCheack = false;
    let idcomic = req.params.idcomic;
    if (req.method =="PUT"){
        
        let obj = new myMD.comicModel();
        obj.name = req.body.name;
        obj.nametg = req.body.nametg;
        obj.des = req.body.des;
        obj.yearxb = req.body.yearxb;
        obj._id = idcomic;
    
        const images = req.files;
          if(images){
             for(let key in images){
                if(key == "img"){
                    images[key].forEach(element => {
                        fs.renameSync(element.path,"./public/uploads" + element.originalname);
                        obj.img = "/uploads" + element.originalname
                    });
                }
                else if (key =="imgnd"){
                    images[key].forEach(element => {
                        fs.renameSync(element.path,"./public/uploads" + element.originalname);
                        let url = "/uploads" + element.originalname
                        obj.imgnd.push(url);
                    });
                }
             }
          }



        try {
            await myMD.comicModel.findByIdAndUpdate(idcomic,obj);
            isCheack = true;
            msg = 'Cập nhật truyện thành công'
        } catch (error) {
            msg = 'Cập nhật thất bại'
        }
    }
    res.status(200).json(
        {
            isCheack : isCheack,
            msg : msg
        }
    );
}
exports.deleteComic = async (req , res , next) => {
    let msg = "";
    if (req.method == "DELETE"){
        await myMD.comicModel.findByIdAndDelete(req.params.idcomic,req.body);
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
