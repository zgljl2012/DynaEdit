

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
		
		init.initSpareButton();
		
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
	initSpareButton:function(){
		//先在Button1上生成一个待拖曳控件
		spareElement.add($("#button_submit"),"button","accordion-button-copy");
		spareElement.add($("#button_cancel"),"button","accordion-button-copy");
	},
	initSpareText : function(){
		//在文本框上生成备用文本
		spareElement.add($("#text-large") ,"span","accordion-text-copy text-large-copy");
		spareElement.add($("#text-medium"),"div","accordion-text-copy text-medium-copy");
		spareElement.add($("#text-small") ,"div","accordion-text-copy text-small-copy");
	},
	initListenClick:function(){
		//监听a-Button点击事件
		$("#a-button,#a-edit,#a-table,#a-text").click(function(){
			switch($(this).attr("id")){
				case "a-button":
					setTimeout(function(){$(".accordion-button-copy").show()},500);
					$(".accordion-text-copy").hide();	
					break;
				case "a-text":
					if($(".accordion-text-copy").size() == 0);
						setTimeout(function(){init.initSpareText();init.initSpareText();},600);
					setTimeout(function(){$(".accordion-text-copy").show()},500);
					$(".accordion-button-copy").hide();
					break;
				default:
					$(".accordion-button-copy").hide();
					$(".accordion-text-copy").hide();					
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
		//if(tag=="div")
			//alert(x.position().top);
		var styleAttr = 'style="position: absolute;top:'+
						x.position().top +'px;left:'+
						x.position().left+'px;"';
		//设置元素
		$elem = '<'+tag+' '+styleAttr+'class="'+classAttr+' " >'+
				''+text+'</'+tag+'>';
		$('body').append($elem);	//添加元素
		var space = classType.indexOf(" ");
		var cty;
		if(space > 0)
			cty = classType.substring(0,space);
		else
			cty = classType;
		spareElement.setSpareByClassType(x,classType);
		$("."+cty).draggable({cancel:".title"});//设置元素可拖曳
		//给所有控件注册鼠标弹起事件,每弹起一次，就生成一个新的当前控件
		$("."+cty).on("mouseup",function(){
			spareElement.add(x,tag,classType);
		});
	},
	
	setSpareByClassType:function(x,classType){
		switch(classType){
			case "accordion-button-copy":
				$(".accordion-button-copy").button();	//设置元素
				break;
			case "accordion-text-copy":
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
