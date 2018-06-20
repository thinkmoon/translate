var parse = require('parse-svg-path')
var d;
export default {
    render(canvas_id){
        const ctx = wx.createCanvasContext(canvas_id)
        ctx.setFillStyle('black')
        parse(d).forEach(function (element) {
            if(element[0] == "M"){
                ctx.moveTo(element[1], element[2])
            }else if(element[0] == "Q"){
                ctx.quadraticCurveTo(element[1], element[2], element[3], element[4])
            }
        });
        ctx.fill()
        ctx.draw();
    },
    getsvg(svgUrl,callback){
        var options = {
            url:svgUrl,
            success:function(res){
                var str = res.data.match(/d="(.*?)"/);
                d = str[1];
            }
        }
        wx.request(options); 
    },
    draw(canvas_id,svgUrl){
        this.getsvg(svgUrl,this.render(canvas_id));
    }
}