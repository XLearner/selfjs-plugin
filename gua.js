/*
 *		此处为一个对象调用
 *		实现了像“刮刮乐”一样的效果，在移动端使用。
 *
 */

// 直接调用 gua.createCanvas(canvas, width, height)
// 传入对应的参数 此处canvas需要element的javascript对象
var gua = {
	ctx: "",	// 画笔
	upText: "刮一刮",	// 刮层上的文字,默认为“刮一刮”
	backImg: "",	// 背景图像，默认灰色背景
	ismousedown: false,// 标志用户是否按下鼠标或开始触摸
	isOk: 0,	//初始化涂抹面积
	fontem: parseInt(window.getComputedStyle(document.documentElement, null)["font-size"]),
	// 这是为了不同分辨率上配合@media自动调节刮的宽度

	// 此处canvas需要element的javascript对象
	// width height为画布的宽高
	createCanvas: function(canvas, width, height){
		gua.ctx = canvas.getContext('2d');

		canvas.width = width;
		canvas.height = height;

		//PC端的处理
		canvas.addEventListener("mousemove",gua.eventMove,false);
		canvas.addEventListener("mousedown",gua.eventDown,false);
		canvas.addEventListener("mouseup",gua.eventUp,false);

		//移动端的处理
		canvas.addEventListener('touchstart', gua.eventDown,false);
    	canvas.addEventListener('touchend', gua.eventUp,false);
    	canvas.addEventListener('touchmove', gua.eventMove,false);

    	gua.initCanvas(gua.ctx);
	},
	//初始化画布，画灰色的矩形铺满
	initCanvas: function(ctx){
		//网上的做法是给canvas设置一张背景图片，我这里的做法是直接在canvas下面另外放了个div。
		//c1.style.backgroundImage="url(中奖图片.jpg)";
		gua.ctx.globalCompositeOperation = "source-over";
		gua.ctx.fillStyle = '#ccc';
		gua.ctx.fillRect(0,0,c1.clientWidth,c1.clientHeight);
		// var img = new Image();
		// img.src = $('.guize').attr('src');
		// img.onload = function(){
			// gua.ctx.drawImage(img, 0, 0, c1.clientWidth, c1.clientHeight);
		gua.ctx.fill();

		gua.ctx.font = "Bold 30px Arial";
				gua.ctx.textAlign = "center";
				gua.ctx.fillStyle = "#999999";
				gua.ctx.fillText(gua.upText,c1.width/2,50);

		//把这个属性设为这个就可以做出圆形橡皮擦的效果
		//有些老的手机自带浏览器不支持destination-out,下面的代码中有修复的方法
		gua.ctx.globalCompositeOperation = 'destination-out';
		// }
	},
	//鼠标按下 和 触摸开始
	eventDown: function(e){
		e.preventDefault();
		gua.ismousedown=true;
	},

	//鼠标抬起 和 触摸结束
	eventUp: function(e){
		e.preventDefault();

		//得到canvas的全部数据
		var a = gua.ctx.getImageData(0,0,c1.width,c1.height);
		var j=0;
		for(var i=3;i<a.data.length;i+=4){
				if(a.data[i]==0)j++;
		}

		//当被刮开的区域等于一半时，则可以开始处理结果
		if(j>=a.data.length/8){
			gua.isOk = 1;
			$('canvas').fadeOut();
		}
		gua.ismousedown=false;
	},

	//鼠标移动 和 触摸移动
	eventMove: function(e){
		 e.preventDefault();
		if(gua.ismousedown) {
			 if(e.changedTouches){
				 e=e.changedTouches[e.changedTouches.length-1];
			 }
		var topY = document.getElementById("top").offsetTop;
		var oX = c1.offsetLeft,
	    	oY = c1.offsetTop+topY;

		var x = (e.clientX + document.body.scrollLeft || e.pageX) - oX || 0,
			y = (e.clientY + document.body.scrollTop || e.pageY) - oY || 0;

			//画360度的弧线，就是一个圆，因为设置了ctx.globalCompositeOperation = 'destination-out';
			//画出来是透明的
			 gua.ctx.beginPath();
			 gua.ctx.arc(x, y, gua.fontem*1.2, 0, Math.PI * 2,true);

			 //下面3行代码是为了修复部分手机浏览器不支持destination-out
			 //我也不是很清楚这样做的原理是什么
			 c1.style.display = 'none';
			 c1.offsetHeight;
			 c1.style.display = 'inherit';

			 gua.ctx.fill();
		}

		if(gua.isOk){
			var btn = document.getElementsByClassName("btn");
			for(var i=0; i<btn.length; i++){
				btn[i].style.zIndex = '3';
			}
		}
	}
}
