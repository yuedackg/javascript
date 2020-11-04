function translateX(param) {

}
function translateY(param) {

}
// Global variable
//  迷路を格納する配列
var maze;           
// 迷路のサイズ
// 壁のサイズを考えて奇数個　壁―道ー壁―道―壁
var MazeSize = 51
// 壁を表すマーク
var MazeWall = 1
// 道を表すマーク
var MazeStreet = 0
// 自分を表すマーク
var MazeMarker = 2
// HTML上に表示するための拡大率
var ScaleSize = 10
// 自分の位置
var mainX, mainY

function random4() {
    // Math.random()は０から1未満の乱数
    // 4倍で0~3.99999；　＋１で1~4.9999
    // Math.floor()は少数以下を切り捨てる
    var houkou = Math.floor(Math.random() * 4 + 1)
    // 乱数1から4を返す
    return houkou
}
function init() {

    // alert( "makedata...")
    // 迷路の二次元配列を作る
    // 二次元配列は、最初は一次元配列から作る
    maze = new Array(MazeSize)
    // 二次元配列は、1次元配列の各要素に、さらに配列を接続する
    for (var i = 0; i < MazeSize; i++) {
        // maze[i]は配列を表す
        maze[i] = new Array(MazeSize)
    }
    // 全て道にする
    // 51と書くよりも、MazeSizeと書くほうが分かりやすい
    // 配列の要素は、0~MazeSize-1
    for (var i = 0; i < 51; i++) {
        for (var j = 0; j < 51; j++) {
            // MazeStreetは道（０）を表す
            maze[i][j] = MazeStreet
        }
    }
    // 外周部を壁にする
    // 要素は、０からMazeSize-1
    for (var i = 0; i < 51; i++) {
        maze[0][i] = MazeWall
        maze[i][0] = MazeWall
        maze[MazeSize - 1][i] = MazeWall
        maze[i][MazeSize - 1] = MazeWall

    }
    //  通れない壁を設定する（奇数位置に杭を立てるイメージ）
    for (var i = 2; i < 51 - 2; i += 2) {
        for (var j = 2; j < 51 - 2; j += 2) {
            maze[i][j] = MazeWall
        }
    }
    // 壁を作る
    for (var i = 2; i < 51 - 2; i += 2) {
        for (var j = 2; j < 51 - 2; j += 2) {
            // 乱数を生成し、その乱数の値により、壁を立てる
            var houkou = random4()
            switch (houkou) {
                case 1:
                    maze[i - 1][j] = MazeWall
                    break;
                case 2:
                    maze[i + 1][j] = MazeWall
                    break;
                case 3:
                    maze[i][j - 1] = MazeWall
                    break;
                case 4:
                    maze[i][j + 1] = MazeWall
                    break;
                // 1から4以外の数字は発生しない。
                default:
                    alert("error")
            }
        }
    }
    // 入口と出口の設定
    // 左上と右下の２ｘ２のマスについては、壁を作らない
    // 入口、出口とする
    maze[0][0] = maze[1][0] = maze[1][1] = maze[0][1] = 0
    maze[51 - 1][51 - 1] = maze[51 - 1 - 1][51 - 1] = maze[51 - 1][51 - 1 - 1] = maze[51 - 1 - 1][51 - 1 - 1] = 0

    // 自分のキャラ位置を設定
    mainX = mainY = 0
    maze[mainX][mainY] = MazeMarker

    // alert("init ...end")
    // ブラウザの開発者コンソールに迷路の状態を表示する
    dumpMaze()

    // イベント初期化
    var element = document.getElementById("myCanvas")
    // キーボードからのイベント取得
    element.onkeydown = function (event) {
        var keyEvent = event || window.event;

        alert(keyEvent.keyCode);

        // charCodeは存在する？ (IE9より前はcharCodeをサポートしない)
        if ('charCode' in keyEvent) {
            alert(keyEvent.charCode);
        }
    }
}
// 画面上に迷路を表示する
function drawBlock(x, y) {
    var item = document.getElementById("myCanvas")
    var context = item.getContext("2d")
    if (item.getContext) {
        // for (var i = 0; i < 51; i++) {
        //     for (var j = 0; j < 51; j++) {
                switch (maze[x][y]) {
                    case 1:
                        // 色の設定
                        context.fillStyle = "rgb(0, 0, 0)";
                        // 座標とサイズの設定
                        context.fillRect(10 * x, 10 * y, 10, 10)
                        break;
                    case 0:
                        context.fillStyle = "rgb(255, 255, 255)";
                        context.fillRect(10 * x, 10 * y, 10, 10)

                        break
                    case 2:
                        context.fillStyle = "rgb(255, 0, 0)";
                        context.fillRect(10 * x, 10 * y, 10, 10)

                        break
                    default:

                }
        //     }
        // }

    }
}
// 開発者コンソールに壁の設定を表示する
function dumpMaze() {
    var str = ""
    for (var i = 0; i < 51; i++) {
        for (var j = 0; j < 51; j++) {
            str = str + maze[i][j]
        }
        str = str + "\n"
    }
    // alert( str)
    console.log(str)
}
// (i,j)の位置のブロックを描画する
function drawMaze() {
    // alert("button start ...")
    for (var i = 0; i < 51; i++) {
        for (var j = 0; j < 51; j++) {
            drawBlock(i, j)
        }
    }
    // alert("button end.")

}
function hitkey() {
    var item = window.event.keyCode

}