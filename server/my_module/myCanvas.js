var Canvas = require('./node-canvas'), Image = Canvas.Image;
var fs = require('fs'), path = require('path');

var filePath = path.resolve('./my_module/font');
let i = 0;
fs.readdir(filePath, function (err, files) {
    if (err) {
        console.warn(err)
    } else {
        files.forEach(function (filename) {
            Canvas.registerFont(filePath + "/" + filename, { family: "font" + i });
            console.log(i);
            i++;
        });
    }
});
/**
 * 扫描字体文件
 */
var showFont = function () {
    var i = 0;
    var Font = [];
    fs.readdir(filePath, function (err, files) {
        if (err) {
            console.warn(err)
        } else {
            files.forEach(function (filename) {
                Font[i++] = filename.substring(0, filename.length - 4);
            });
        }
    });
    return Font;  
}
/**
 * 
 * @param {汉字内容} str 
 * @param {字体索引} site 
 * @param {res} res 
 */
function generateDisplay(str, site, res) {
    var row = 1, col = 15, width = 1500;
    row = str.length / 15 + 1;
    var fontsize = width / col;
    var height = fontsize * row + 200;
    if (height < 1000) { height = 1000 }
    var canvas = new Canvas.Canvas(width, height), ctx = canvas.getContext('2d')
    res.writeHead(200, { "Content-Type": "image/png" });
    ctx.fillStyle = '#FFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#000';
    if (row < 2) {
        let num = str.length
        fontsize = 1200 / num;
        ctx.font = fontsize + 'px "font' + site + '"';
        ctx.fillText(str, (width - num * fontsize) / 2, (height - fontsize) / 2 - 200 + fontsize);
    }
    else {
        ctx.font = fontsize + 'px "font' + site + '"';
        for (let i = 0; i < row; i++) {
            ctx.fillText(str.substring(i * 15, (i + 1) * 15), 0, fontsize * (i + 1));
        }
    }
    fs.readFile(__dirname + '/img/brand.png', function (err, squid) {
        if (err) throw err;
        img = new Image;
        img.src = squid;
        ctx.fillStyle = '#42b983';
        ctx.fillRect(0, canvas.height - 230, canvas.width, 230);
        ctx.drawImage(img, canvas.width - img.width / 2 - 50, canvas.height - img.height / 2 - 50, img.width / 2, img.height / 2);
        res.end(canvas.toBuffer());
    });
};
exports.showFont = showFont;
exports.generateDisplay = generateDisplay;
