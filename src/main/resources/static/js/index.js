'use strict'

class ObjectClass {
	constructor() {
		this.x = 10;
		this.y = 50;
	}
}

class NumberClass extends ObjectClass{
	constructor() {
		super();
		this.word = 'Hello world';
		this.number = 3;
	}

	draw(ctx){
		ctx.font = '48px serif';
		ctx.fillText(this.word,this.x, this.y);
		//ctx.fillText('3', 10, 10);
	}
}

// ページのロードが終わったら
window.addEventListener("load", init);

function draw(){
	var canvas = $('#canvas').get(0);
	if (canvas.getContext){
		var ctx = canvas.getContext('2d');
		/*ctx.fillRect(50,50,300,260);
		ctx.clearRect(120,80,200,180);
		ctx.strokeRect(180,20,180,180);

		ctx.font = '48px serif';
		ctx.fillText('Hello world', 10, 10);
		ctx.fillText('3', 10, 10);*/

		var obj = new NumberClass();
		obj.draw(ctx);
	}
}

function init() {
    // Stageオブジェクトを作成します
    var stage = new createjs.Stage("canvas");

    // 円を作成します
    var shape = new createjs.Shape();
    shape.graphics.beginFill("DarkRed"); // 赤色で描画するように設定
    shape.graphics.drawCircle(0, 0, 100); //半径 100px の円を描画
    shape.x = 200; // X 座標 200px の位置に配置
    shape.y = 200; // Y 座標 200px の位置に配置
    stage.addChild(shape); // 表示リストに追加

    // 四角形を作成します
    var shape = new createjs.Shape();
    shape.graphics.beginFill("DarkRed"); // 赤色で描画するように設定
    shape.graphics.drawRect(0, 0, 200, 100); // 長方形を描画
    stage.addChild(shape); // 表示リストに追加

    // Stageの描画を更新します
    stage.update();
}