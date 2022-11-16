var obj = null;
var pages = ["page_main", "page_first", "page_second", "page_third"];
var current_page = 0;
var figures = {
            "Звезда": star,
            "Дом": house,
            "Часы": sundial,
            "Кольцо": ring
    }

function nextPage(parent) {
    current_page = (current_page + 1) % pages.length;
    createPage(parent);
}

function createPage(parent) {
    if (obj) obj.destroy();
    var component = Qt.createComponent(pages[current_page] + ".qml");
    obj = component.createObject(parent);
    if (! obj) console.log("Error creating object");
}
function getFigures() {
    return Object.keys(figures);
}
//-----------------------------------------------------
function moveTo(ctx, param) {
    ctx.moveTo(param.x, param.y);
}
function lineTo(ctx, param) {
    ctx.lineTo(param.x, param.y);
}
function fill(ctx, param) {
    ctx.fillStyle = param.color;
    ctx.fill();
}
function stroke(ctx, param) {
    ctx.lineWidth = param.weight;
    ctx.strokeStyle = param.color;
    ctx.stroke();
}
function begin(ctx, param) {
    ctx.beginPath();
}
function close(ctx, param) {
    ctx.closePath();
}
function clearRect(ctx, param) {
    ctx.clearRect(param.x, param.y, param.width, param.height);
}
function rect(ctx, param) {
    ctx.rect(param.x, param.y, param.width, param.height);
}
function circle(ctx, param) {
    ctx.arc(param.x, param.y, param.radius, 0, 2 * Math.PI, true);
}
function clearCircle(ctx, param) {
    ctx.globalCompositeOperation = "destination-out";
    begin(ctx);
    circle(ctx, param);
    ctx.fill();
    ctx.globalCompositeOperation = "source-over";
}
function arc(ctx, param) {
   ctx.arc(param.x, param.y, param.radius, param.start, param.end, !param.clock);
}
function clearArc(ctx, param) {
    ctx.globalCompositeOperation = "destination-out";
    begin(ctx);
    arc(ctx, param);
    ctx.fill();
    ctx.globalCompositeOperation = "source-over";
}

//-------------------------------------------------
function star(pic) {
    var res = [];
    var k = 5;
    var rMax = (pic.width > pic.height ? pic.height : pic.width)/2*0.8;
    var rMin = rMax/2;
    var x = pic.width/2;
    var y = pic.height/2;
    var ang = Math.PI/k;
    var cur = -0.5 * Math.PI;

    res.push({"fun": begin});
    for(var i=0; i<2*k; ++i) {
        res.push({
                     "fun": (i === 0 ? moveTo : lineTo),
                     "x": x + (i % 2 === 0 ? rMax : rMin) * Math.cos(cur),
                     "y": y + (i % 2 === 0 ? rMax : rMin) * Math.sin(cur)
                 });
        cur += ang;
    }
    res.push({"fun": close});
    res.push({"fun": fill, "color": Qt.rgba(1, 0, 0, 1)});
    res.push({"fun": stroke, "weight": 10, "color": Qt.rgba(0, 0, 1, 1)});
    return res;
}
function house(pic) {
    var res = [];
    var x = pic.width/2;
    var y = pic.height/2;
    var r = (x > 0.8 * y ? 0.3 * y : 0.3 * x);
    res.push({"fun": begin});
    res.push({"fun": rect, "x": 0.5 * x, "y": y, "width": x, "height": 0.8 * y});
    res.push({"fun": fill, "color": Qt.rgba(0, 0, 1, 1)});
    res.push({"fun": stroke, "weight": 10, "color": Qt.rgba(1, 0, 0, 1)});

    res.push({"fun": begin});
    res.push({"fun": circle, "x": x, "y": 1.4 * y, "radius": r});
    res.push({"fun": fill, "color": Qt.rgba(1, 1, 1, 1)});
    res.push({"fun": stroke, "weight": 10, "color": Qt.rgba(0, 0, 0, 1)});

    res.push({"fun": begin});
    res.push({"fun": moveTo, "x": x, "y": 0.2 * y});
    res.push({"fun": lineTo, "x": 0.2 * x, "y": y});
    res.push({"fun": lineTo, "x": 1.8 * x, "y": y});
    res.push({"fun": close});
    res.push({"fun": fill, "color": Qt.rgba(0, 1, 0, 1)});
    res.push({"fun": stroke, "weight": 10, "color": Qt.rgba(1, 1, 0, 1)});
    return res;
}
function sundial(pic) {
    var res = [];
    var x = pic.width/2;
    var y = pic.height/2;

    res.push({"fun": begin});
    res.push({"fun": arc, "x": x, "y": 0.2 * y, "radius": 0.8 * y, "start": 1/4 * Math.PI, "end": 3/4 * Math.PI, "clock": true});
    res.push({"fun": close});
    res.push({"fun": fill, "color": Qt.rgba(1, 1, 0, 1)});

    res.push({"fun": begin});
    res.push({"fun": arc, "x": x, "y": 1.8 * y, "radius": 0.8 * y, "start": 0, "end": Math.PI, "clock": false});
    res.push({"fun": fill, "color": Qt.rgba(1, 1, 0, 1)});

    res.push({"fun": clearArc, "x": x, "y": 1.8 * y, "radius": 0.8 * y, "start": -1/6 * Math.PI, "end": -5/6 * Math.PI, "clock": false})

    res.push({"fun": begin});
    res.push({"fun": arc, "x": x, "y": 0.2 * y, "radius": 0.8 * y, "start": 0, "end": Math.PI, "clock": true});
    res.push({"fun": close});
    res.push({"fun": stroke, "weight": 10, "color": Qt.rgba(1, 0, 0, 1)});

    res.push({"fun": begin});
    res.push({"fun": arc, "x": x, "y": 1.8 * y, "radius": 0.8 * y, "start": 0, "end": Math.PI, "clock": false});
    res.push({"fun": close});
    res.push({"fun": stroke, "weight": 10, "color": Qt.rgba(1, 0, 0, 1)});
    return res;
}

function ring(pic) {
    var res = [];
    var x = pic.width/2;
    var y = pic.height/2;
    var r = (pic.width > pic.height ? pic.height : pic.width)/2*0.8;
    res.push({"fun": begin});
    res.push({"fun": circle, "x": x, "y": y, "radius": 0.8 * r});
    res.push({"fun": fill, "color": Qt.rgba(1, 1, 0, 1)});
    res.push({"fun": stroke, "weight": 10, "color": Qt.rgba(1, 0, 0, 1)});

    res.push({"fun": clearCircle, "x": x, "y": y, "radius": 0.6 * r});

    res.push({"fun": begin});
    res.push({"fun": circle, "x": x, "y": y, "radius": 0.6 * r});
    res.push({"fun": stroke, "weight": 10, "color": Qt.rgba(1, 0, 0, 1)});
    return res;

}

function paintPicture(pic, tp) {
    var param = figures[tp](pic);
    var ctx = pic.getContext("2d");
    clearRect(ctx,  {"x": 0, "y": 0, "width": pic.width, "height": pic.height});
    for(var i=0; i<param.length; ++i)
        param[i]["fun"](ctx, param[i]);
}



