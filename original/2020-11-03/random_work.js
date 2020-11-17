startX = 300
startY = 200
var SCALE = 50
WIDTH = 600
HEIGHT = 400
var timer = null

function makeTheta() {
    return Math.random() * Math.PI * 2
}
function doAction() {
    var log = function () {
        var dx = SCALE * Math.cos(makeTheta())
        var dy = SCALE * Math.sin(makeTheta())
        var item = document.getElementById("myCanvas")
        var context = item.getContext("2d")
        if (item.getContext) {
            context.beginPath()
            context.moveTo(startX, startY)
            if (startX + dx > WIDTH) startX = WIDTH
            if (startY + dy > HEIGHT) startY = HEIGHT
            if (startX < 0) startX = 0
            if (startY < 0) startY = 0
            //    console.log( "   :"+startX+ ", startY:"+startY)
            context.lineTo(startX + dx, startY + dy)
            startX = startX + dx
            startY = startY + dy
            context.closePath()
            context.stroke()
        }
        //    console.log  ("test")
    }
    timer = setInterval(log, 10)
}
function stopAction() {
    if (null != timer) {
        clearInterval(timer)
    }
}