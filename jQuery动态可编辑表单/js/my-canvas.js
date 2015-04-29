

//绘制绘图区
var myCanvas = {
	parentId:"drawArea",
	Id:"myCanvas",
	cellWidth:40,
	cellHeight:18,
	pageWidth:18,
	pageHeight:50,
	init:function(){
		var parent = document.getElementById(myCanvas.parentId);
		var canvas = document.getElementById(myCanvas.Id);
		canvas.width = parent.offsetWidth;
		canvas.height = 3*parent.offsetHeight;
		var context = canvas.getContext("2d");
		//画线
		context.beginPath();
		var wc = parseInt(canvas.width/myCanvas.cellWidth);
		var hc = parseInt(canvas.height/myCanvas.cellHeight);
		for(var i=0;i<hc;i++){
			context.moveTo(0,i*myCanvas.cellHeight);
			context.lineTo(canvas.width,i*myCanvas.cellHeight);
		}
		for(var i=0;i<wc;i++){
			context.moveTo(i*myCanvas.cellWidth,0);
			context.lineTo(i*myCanvas.cellWidth,canvas.height);
		}
		context.globalAlpha = 0.5;
		context.strokeStyle="#bbbbbb";
		context.strokeStyle="dotted";
		context.stroke();
		//画矩形
		var left = (wc - myCanvas.pageWidth)  / 2;
		var top  = (hc - myCanvas.pageHeight) / 2;
		context.fillStyle="#ffffff";
		context.globalAlpha=0.9;
		context.fillRect(left*myCanvas.cellWidth,50,
				myCanvas.pageWidth*myCanvas.cellWidth,
				myCanvas.pageHeight*myCanvas.cellHeight);
		
		
	}

}
