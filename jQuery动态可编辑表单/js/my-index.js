

$(function(){
	//屏蔽文字拖曳选择
	cantSelectText();
	//初始化控件
	init.init();
	
}
);

//初始化函数
var init = {
	init:function(){
		init.initButton();			//初始化按钮
		init.initEdit();			//初始化编辑框
		init.initText();			//初始化文本框
		init.initTable();			//初始化表格
		init.initAccordion();		//最后初始化折叠面板
		//初始化所有备份控件
		init.initSpare();
		
		//初始化监听号
		init.initListenClick();
	},
	initAccordion:function(){
		$("#accordion").accordion();
		
	},
	initButton:function(){
		$("#button_submit").button();
		$("#button_cancel").button();
	},
	initText:function(){
	},
	initEdit:function(){
	},
	initTable:function(){
	},
	initSpare:function(){
		//先在Button1上生成一个待拖曳控件
		spareElement.add($("#button_submit"),"button","accordion-button");
		spareElement.add($("#button_cancel"),"button","accordion-button");
	},
	initListenClick:function(){
		//监听a-Button点击事件
		$("#a-button,#a-edit,#a-table,#a-text").click(function(){
			switch($(this).attr("id")){
				case "a-button":
				
					$(".accordion-button").show();
					break;
				default:
					$(".accordion-button").hide();
					
			}
		});
	}
}

//创建在控件表面上的备用控件
var spareElement = {
	add:function(x,tag,classType){
		//在现有控件之上生成一个新控件
		var classAttr = classType + " graggable ";
		//获取元素内容
		var text = x.text();
		//元素CSS样式，主要是设置位置与原有元素相同
		var styleAttr = 'style="position: absolute;top:'+
						x.position().top +'px;left:'+
						x.position().left+'px;"';
		//设置元素
		$elem = '<'+tag+' '+styleAttr+'class="'+classAttr+' " >'+
				''+text+'</'+tag+'>';
		$('body').append($elem);	//添加元素
		spareElement.setSpareByClassType(classType);
		$("."+classType).draggable({cancel:".title"});//设置元素可拖曳
		//给所有控件注册鼠标弹起事件,每弹起一次，就生成一个新的当前控件
		$("."+classType).on("mouseup",function(){
			spareElement.add(x,tag,classType);
		});
	},
	setSpareByClassType:function(classType){
		switch(classType){
			case "accordion-button":
				$(".accordion-button").button();	//设置元素
				break;
		};
	}
}


//屏蔽选择文字
function cantSelectText(){

if (typeof(document.onselectstart) != "undefined") {        
    // IE下禁止元素被选取        
    document.onselectstart = function (event){ 
        if(event.target.tagName!="INPUT"){ 
            return false; 
        } 
    }       
} else { 
    // firefox下禁止元素被选取的变通办法        
    document.onmousedown = function (event){ 
        if(event.target.tagName!="INPUT"){ 
            return false; 
        } 
    }       
    document.onmouseup = function(event){ 
        if(event.target.tagName!="INPUT"){ 
            return false; 
        } 
    }        
}
	
}
