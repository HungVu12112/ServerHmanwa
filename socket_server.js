// Cài đặt socket .io bằng lệnh: npm i socket.io

const io = require( "socket.io" )();
const socketapi = {
    io: io
};
//==== Viết code tương tác ở trước dòng export

io.on("connection", (client) =>{
    console.log("Client connected : " + client.id);
    // định nghĩa 1 sự kiện 
    client.on('new msg', (data)=>{
        // nhận dữ liệu từ client gửi lên
        console.log("New msg:  " + data );
        // gửi phản hồi
        client.emit('new msg', "Chào mừng " + data + " đã đến với HTOON");
    });
    client.on('new comment', (datacomment)=>{
        // nhận dữ liệu từ client gửi lên
        console.log("New msg:  " + datacomment );
        // gửi phản hồi
        client.emit('new comment', "đã phát ngôn :" + datacomment + " trong truyện");
    });

    // sự kiện ngắt kết nối

    client.on('disconnect', ()=>{
        console.log("Client disconected!");
    })

});

module.exports = socketapi;