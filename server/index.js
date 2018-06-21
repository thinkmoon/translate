// var http = require('http');
// var url = require("url");
// var path = require('path');  
// var filePath = path.resolve('./font');
// var transFont = [],Font=[];
// var showFont = function(){
//     fs.readdir(filePath,function(err,files){  
//         if(err){  
//             console.warn(err)  
//         }else{
//             var i=0;
//             files.forEach(function(filename){
//                 console.log(filename + "开始解析");
//                 transFont[i] = fontCarrier.transfer('./font/'+filename);
//                 Font[i] =  filename.substring(0,filename.length-4);
//                 console.log(i+ ":" + filename)
//                 console.log(filename + "解析完成");
//                 i++;
//             });
//          }
//     });
// }
// showFont();
// http.createServer(function (req, res) {
//     var params = url.parse(req.url, true).query;
//     var str = params.str + '';
//     var site = params.site;
//     if(str.length == 1){
//         res.writeHead(200,{
//             "Content-Type": "image/svg+xml"
//         });
//         res.end(transFont[site].getSvg(str,{
//             skipViewport:true
//           }))
//     }else{
//         res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
//         res.end(JSON.stringify(Font));
//     }
    
// }).listen(80);
// console.log("SERVER START");
// var Canvas = require('./node-canvas')
//   , Image = Canvas.Image
//   , canvas = new Canvas.Canvas(1082, 720)
//   , ctx = canvas.getContext('2d');
//   const fs = require('fs')
//   const out = fs.createWriteStream(__dirname + '/test.png')
//   const stream = canvas.createPNGStream()
//   stream.pipe(out)
//   out.on('finish', () =>  console.log('The PNG file was created.'))
// Canvas.registerFont('./font/方正小篆.ttf', {family: 'Comic Sans'});
// ctx.fillStyle = '#FFF';
// ctx.fillRect(0,0,canvas.width, canvas.height);
// ctx.fillStyle = '#000';
// ctx.font = '100px "Comic Sans"';
// ctx.fillText("百度熊掌号是内容和服务提供者入驻百度开放生态的实名认证账号，致力于帮助内容和服务提供者方便、快捷、高效地连接全网用户，以及充分利用百度搜索生态开放的优势，来进行流量获取、沉淀用户和塑造品牌，实现自身内容与服务价值的快速增长。", 200, 110);
var fs = require('fs'),path = require('path');
var http = require('http'),url = require("url");
var Canvas = require('./node-canvas'),Image = Canvas.Image;
var Fonts = [];
var filePath = path.resolve('./font');

let promise = new Promise(function(resolve, reject) {
  let i=0;
  fs.readdir(filePath,function(err,files){  
    if(err){  
      console.warn(err)  
    }else{
      files.forEach(function(filename){
        Canvas.registerFont(filePath + "/" + filename, {family: "font" + i});
        console.log(i);
        i++;
      });
    }
  });
  
});

promise.then(function() {
  console.log("ASDF");
  Fonts.forEach((Element) =>{
    console.log(Element);
  });
});

console.log('Hi!');


http.createServer(function (req, res) {
  var params = url.parse(req.url, true).query;
  var str = params.str + '\r',site = params.site;
  var row =  1,col = 15,width = 1500;
  row = str.length / 15 + 1;
  var fontsize = width/col;
  var height = fontsize * row + 200;
  if(height < 1000){height = 1000}
  var canvas = new Canvas.Canvas(width, height), ctx = canvas.getContext('2d')
  res.writeHead(200,{"Content-Type": "image/png"});
  ctx.fillStyle = '#FFF';
  ctx.fillRect(0,0,canvas.width, canvas.height);
  ctx.fillStyle = '#000';
  if(row < 2){
    let num = str.length
    fontsize = 1200 / num;
    ctx.font = fontsize + 'px "font'+ site +'"';
    ctx.fillText(str,( width - num * fontsize ) / 2, (height-fontsize)/2 -200 + fontsize);
  }
  else{
    ctx.font = fontsize + 'px "font'+ site +'"';
    for(let i = 0;i < row ; i++){
      ctx.fillText(str.substring(i*15,(i+1)*15), 0, fontsize*(i+1));
    }
  }
  
  fs.readFile(__dirname + '/img/brand.png', function(err, squid){
    if (err) throw err;
    img = new Image;
    img.src = squid;
    ctx.fillStyle = '#42b983';
    ctx.fillRect(0,canvas.height - 230,canvas.width, 230);
    ctx.drawImage(img, canvas.width - img.width / 2 - 50, canvas.height - img.height / 2 - 50, img.width / 2, img.height / 2);
    res.end(canvas.toBuffer());
  });
}).listen(8080);