'use strict'

//矢印線書く関数( 始点x, 始点y, 終点x, 終点y, 矢印線角度, 矢印線長さ )
function aline(x1, y1, x2, y2, r, len){
	//元の線
	ctx.beginPath();
	ctx.moveTo( x1, y1 );
	ctx.lineTo( x2, y2 );
	ctx.stroke();

	//元の線の角度
	var rad = Math.atan2(y2-y1, x2-x1);
	//矢印線の角度
	var radA = r * Math.PI / 180;

	//矢印線1
	ctx.beginPath();
	ctx.moveTo( x2, y2 );
	ctx.lineTo( x2 - len * Math.cos(rad+radA), y2 - len * Math.sin(rad+radA) );
	ctx.stroke();

	//矢印線2
	ctx.beginPath();
	ctx.moveTo( x2, y2 );
	ctx.lineTo( x2 - len * Math.cos(rad-radA), y2 - len * Math.sin(rad-radA) );
	ctx.stroke();
}

BigNumber.config({
    ROUNDING_MODE: BigNumber.ROUND_DOWN // 切り下げ
});

class Direction{
	constructor(str,dirX,dirY){
		this.str = str;
		// ベクトルの長さ
		this.distance = Math.hypot(Math.abs(dirX), Math.abs(dirY));
	}
}

function getDirection(baseObj,toObj){
	let directions = new Array();
	directions.push(new Direction("R", toObj.getLeftPos() - baseObj.getRightPos(), toObj.y - baseObj.y));
	directions.push(new Direction("L", toObj.getRightPos() - baseObj.getLeftPos(), toObj.y - baseObj.y));
	directions.push(new Direction("T", toObj.x - baseObj.x, toObj.getBottomPos() - baseObj.getTopPos()));
	directions.push(new Direction("B", toObj.x - baseObj.x, toObj.getTopPos() - baseObj.getBottomPos()));

	let result = directions[0];
	directions.forEach(function(value,index){
		if(index == 0) return;
		if(value.distance < result.distance) result = value;
	});
	return result.str;
}

function drawLineDirection(dir,baseObj,toObj,space){
	switch(dir){
		case "R":
			ctx.moveTo( toObj.getLeftPos(), toObj.y + space);
			ctx.lineTo( baseObj.getRightPos(), baseObj.y + space);
			break;
		case "L":
			ctx.moveTo( toObj.getRightPos(), toObj.y + space);
			ctx.lineTo( baseObj.getLeftPos(), baseObj.y + space);
			break;
		case "T":
			ctx.moveTo( toObj.x + space, toObj.getBottomPos());
			ctx.lineTo( baseObj.x + space, baseObj.getTopPos());
			break;
		case "B":
			ctx.moveTo( toObj.x + space, toObj.getTopPos());
			ctx.lineTo( baseObj.x + space, baseObj.getBottomPos());
			break;
		default:
			alert("不明な方向が指定されました");
			break;
	}
}

function drawALineDirection(dir,baseObj,toObj){
	switch(dir){
		case "R":
			aline(baseObj.getRightPos(), baseObj.y, toObj.getLeftPos(), toObj.y, 30, 10);
			break;
		case "L":
			aline(baseObj.getLeftPos(), baseObj.y, toObj.getRightPos(), toObj.y, 30, 10);
			break;
		case "T":
			aline(baseObj.x, baseObj.getTopPos(), toObj.x, toObj.getBottomPos(), 30, 10);
			break;
		case "B":
			aline(baseObj.x, baseObj.getBottomPos(), toObj.x, toObj.getTopPos(), 30, 10);
			break;
		default:
			alert("不明な方向が指定されました");
			break;
	}
}

/** ポインタクラス */
class Pointer extends ObjectClass{
	constructor(parent,x,y,fillCollor){
		super("pointer",x,y);
		this.parent = parent;
		this.circle;
		this.fillCollor = fillCollor;
		this.init();
	}

	/** 初期化 */
	init(){
		this.setPositions();
		objects.push(this);
	}

	/** */
	setPositions(){
		this.circle = new DrawCircleClass(
			this,
			0,
			0,
			7,
			this.fillCollor
		);
	}

	/** 描画 */
	draw(){
		this.circle.draw();
	}
}

/**
 * 符号クラス
 */
class SignClass extends ObjectClass{
	constructor(x,y,signType){
		super("sign",x,y);
		this.typeText = signType;
		this.text;
		this.setTypeParam();
		this.signText = null;
		this.signBG = null;
		this.resultObj = null;
		this.nextPointer = null;
		this.oldPrevNumber = 0.0;
		this.oldNextNumber = 0.0;
		this.init();
	}

	/** 初期化 */
	init(){
		this.setPositions();
	}

	/** 表示するテキストと色セット */
	setTypeParam(){
		switch(this.typeText){
			case "+":	// 足し算
				this.text = "＋";
				this.fillColor = "#dc143c";
				break;
			case "-":	// 減算
				this.text = "－";
				this.fillColor = "#0000cd";
				break;
			case "*": 	// 掛け算
				this.text = "×";
				this.fillColor = "#ff8c00";
				break;
			case "/":	// 割り算
				this.text = "÷";
				this.fillColor = "#9400d3";
				break;
			default:
				alert("不明な符号タイプです");
				break;
		}
	}

	/** 計算処理 */
	calculate(){
		this.oldPrevNumber = this.prevObj[0].number;
		this.oldNextNumber = this.nextObj[0].number;
		switch(this.typeText){
			case "+":	return BigNumber(this.oldPrevNumber).plus(this.oldNextNumber);
			case "-":	return BigNumber(this.oldPrevNumber).minus(this.oldNextNumber);
			case "*":	return BigNumber(this.oldPrevNumber).times(this.oldNextNumber);
			case "/":	return BigNumber(this.oldPrevNumber).div(this.oldNextNumber);
			default:	alert("不明な符号タイプです");
		}
		return 0;
	}

	setPositions(){
		this.bounds.clear();

		// 符号テキスト
		this.signText = new DrawTextClass(
			this,
			this.text,
			"24px sans-serif",
			0,
			0,
			0,
			"#ffffff"
		);

		// 背景
		this.signBG = new DrawCircleClass(
			this,
			0,
			0,
			15,
			this.fillColor
		);
	}

	/** 描画 */
	draw(){
		if(this.prevObj.length == 0){
			// 計算元となる数字オブジェクトが無いなら
			this.isDelete();
			return;
		}

		// 計算元へ線を引く
		this.drawLineForPrevObj();

		// 計算先を判断
		let lineToObj;
		if(this.nextObj.length > 0){	// 計算先オブジェクトがあれば
			lineToObj = this.nextObj[0];
			if(this.nextPointer != null){
				this.nextPointer.isDelete();
				this.nextPointer = null;
			}
		}else{							// 計算先オブジェクトが無ければ
			this.createPointer();
			
			lineToObj = this.nextPointer;
		}
		// 計算先へ矢印を引く
		let dir = getDirection(this,lineToObj);
		drawALineDirection(dir, this, lineToObj);
		/*aline(
			this.getRightPos(), this.y,
			lineToObj.getLeftPos(), lineToObj.y,
			30,
			10
		);*/

		this.signBG.draw();
		this.signText.draw();

		// 計算結果へ線を引く
		this.drawLineForResult();
	}

	/** ポインタオブジェクトを生成 */
	createPointer(){
		if(this.nextPointer != null){
			return;
		}
		
		this.nextPointer = new Pointer(
			this,
			limitPosX( this.getRightPos() + 50 ),
			this.y,
			this.fillColor
		);
	}

	/** 計算元へ線を引く */
	drawLineForPrevObj(){
		ctx.beginPath();

		//ctx.moveTo( this.prevObj[0].getRightPos(), this.prevObj[0].y );
		//ctx.lineTo( this.getLeftPos(), this.y );
		let dir = getDirection(this.prevObj[0],this);
		drawLineDirection(dir,this.prevObj[0],this,0);

		ctx.globalAlpha = this.alpha;
		ctx.strokeStyle = this.fillColor;
		ctx.lineWidth = 3;
		ctx.stroke();

		ctx.closePath();
	}

	/** 計算結果へ線を引く */
	drawLineForResult(){
		if(this.resultObj == null)
			return;

		if(this.nextObj[0] == null){
			this.resultObj.clearCalcSource();
			this.resultObj = null;
			return;
		}
		
		let space = 5; // 線２本の間の間隔（これの２倍）
		ctx.beginPath();

		let dir = getDirection(this.nextObj[0],this.resultObj);
		drawLineDirection(dir,this.nextObj[0],this.resultObj,-space);
		drawLineDirection(dir,this.nextObj[0],this.resultObj,space);
		//ctx.moveTo( this.nextObj[0].getRightPos(), this.nextObj[0].y - space );
		//ctx.lineTo( this.resultObj.getLeftPos(), this.resultObj.y - space );

		//ctx.moveTo( this.nextObj[0].getRightPos(), this.nextObj[0].y + space );
		//ctx.lineTo( this.resultObj.getLeftPos(), this.resultObj.y + space );

		ctx.globalAlpha = this.alpha;
		ctx.strokeStyle = this.fillColor;
		ctx.lineWidth = 3;
		ctx.stroke();

		ctx.closePath();

		// 計算元と計算先の数値が前と違っていれば再計算
		if(	this.oldPrevNumber != this.prevObj[0].number ||
			this.oldNextNumber != this.nextObj[0].number)
		{
			this.createResultObj();
		}
	}

	/** 削除時 */
	isDelete(){
		super.isDelete();
		deleteArrayItem(objects, this.nextPointer);
		this.nextPointer = null;
		if(this.resultObj != null){
			this.resultObj.clearCalcSource();
		}
	}

	/** 計算結果オブジェクトを生成 */
	createResultObj(){
		if(this.resultObj === null){
			this.resultObj = new NumberClass(
				0,
				this.nextObj[0].y,
				this.prevObj[0].text + " " + this.text + " " + this.nextObj[0].text,
				this.calculate(),
				this
			);
			this.resultObj.x = limitPosX( this.nextObj[0].getRightPos() + (this.resultObj.bounds.width / 2) + 50 );
			objects.push(this.resultObj);
		}else{
			this.resultObj.setNumber(this.calculate());
		}
	}

	/** 計算先オブジェクトをセット */
	setNextObj(nextObj){
		this.nextObj[0] = nextObj;
		this.nextObj[0].prevObj.push(this);
		this.createResultObj();
	}
}