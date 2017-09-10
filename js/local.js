var Local=function(){
	//游戏对象
	var game
	//时间间隔
	var INTERVAL=200;
	//定时器
	var timer=null;
	//时间计时器
	var timeCount=0;
	//时间
	var time=0;
	//绑定键盘事件
	var bindKeyEvent=function(){
		document.onkeydown=function(e){
			if(e.keyCode==38){    //up
				game.rotate();
			} else if(e.keyCode==39){	//right
				game.right();
			} else if(e.keyCode==40){     //down
			  	game.down();
			} else if(e.keyCode==37){     //left
				game.left();
			} else if(e.keyCode==32){	 //space
				game.fall();
			}	
		}
	}
	//移动
	var move=function(){
		timeFunc();
		if(!game.down()){
			game.fixed();
			var line=game.checkClear();
			if(line!=0){
				//console.log(line);
				game.addScore(line);
			}
			var gameOver=game.checkGameOver();
			if(gameOver){
				game.gameover(false);
				stop();
			}else{
				game.performNext(generateType(),generateDir());
			}
		}
	}
	//随机生成干扰行
	var generateBottomLine=function(lineNum){
		var lines=[];
		for(var i=0;i<lineNum;i++){
			var line=[];
			for(var j=0;j<10;j++){
				line.push(Math.ceil(Math.random()*2)-1);
			}
			lines.push(line);
		}
		return lines;
	}
	//计时函数
	var timeFunc=function(){
		timeCount=timeCount+1;
		if(timeCount==5){
			timeCount=0;
			time=time+1;
			game.setTime(time);
			if(time%10==0){
				//console.log(1);
				game.addTailLines(generateBottomLine(1));
			}
		}
	}
	//随机生成一个方块种类
	var generateType=function(){
		return Math.ceil(Math.random()*7)-1;
	}
	//随机生成一个旋转次数
	var generateDir=function(){
		return Math.ceil(Math.random()*4)-1;
	}
	//开始
	var start=function(){
		var doms={
			gameDiv:document.getElementById('local_game'),
			nextDiv:document.getElementById('local_next'),
			timeDiv:document.getElementById('local_time'),
			scoreDiv:document.getElementById('local_score'),
			resultDiv:document.getElementById('local_gameover')
		}
		game=new Game();
		game.init(doms,generateType(),generateDir());
		bindKeyEvent();
		game.performNext(generateType(),generateDir());
		timer=setInterval(move,INTERVAL);
	}
	var stop=function(){
		if(timer){
			clearInterval(timer);
			timer=null;
		}
		document.onkeydown=null;
	}
	//导出API
	this.start=start;
}