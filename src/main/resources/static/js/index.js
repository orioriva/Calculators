'use strict'

$('.slider').slick({
    autoplay: true,       //自動再生
    autoplaySpeed: 2000,  //自動再生のスピード
    speed: 800,           //スライドするスピード
    dots: true,           //スライド下のドット
    arrows: true,         //左右の矢印
    infinite: true,       //永久にループさせる
});


$("#main-slider").slick({
	//ここにオプション
	asNavFor:"#text-slider", //テキストスライダーを追従させる
	autoplay:false,            //自動再生
	arrows: true, // 前・次のボタンを表示する
	dots: true,
	arrows: true,
	appendDots: $('.dots'),
	speed: 1000, // スライドさせるスピード（ミリ秒）
    slidesToShow: 1, // 表示させるスライド数
    centerMode: true, // slidesToShowが奇数のとき、現在のスライドを中央に表示する
    variableWidth: true, // スライド幅の自動計算を無効化
});

$("#text-slider").slick({
    //ここにオプション
    draggable:false,         //ドラッグでのスライド禁止
    arrows:false             //矢印非表示
});