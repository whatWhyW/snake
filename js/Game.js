/**
 * Game 整个游戏类
 * @map 地图的实例
 * @snake 蛇的实例
 * @food 食物的实例
 * @block 障碍物的实例
 ***/
function Game(map, snake, food, block) {
	this.map = map;
	this.snake = snake;
	this.food = food;
	this.block = block;
	this.timer = null;
	this.flag = null;

	this.init();
}

// 初始化方法
Game.prototype.init = function() {
	this.renderMap();
	this.renderFood();
	this.renderSnake();
	this.bindEvent();
	this.start();
}

// 渲染地图
Game.prototype.renderMap = function() {
	this.map.fill();
}

// 渲染食物
Game.prototype.renderFood = function() {
	// 获取食物的坐标
	var row = this.food.row;
	var col = this.food.col;
	this.map.arr[row][col].style.backgroundImage = "url(" + this.food.img + ")";
	this.map.arr[row][col].style.backgroundSize = "cover";
}

// 渲染蛇
Game.prototype.renderSnake = function() {
	var head = this.snake.arr[this.snake.arr.length - 1];
	this.map.arr[head.row][head.col].style.backgroundImage = "url(" + this.snake.head_pic[this.snake.head_idx] + ")";
	for (var i = 1; i < this.snake.arr.length - 1; i++) {
		var row = this.snake.arr[i].row;
		var col = this.snake.arr[i].col;
		this.map.arr[row][col].style.backgroundImage = "url(" + this.snake.body_pic[0] + ")";
	}

	var tail = this.snake.arr[0];
	this.map.arr[tail.row][tail.col].style.backgroundImage = "url(" + this.snake.tail_pic[this.snake.tail_idx] + ")";
}


// 游戏开始
Game.prototype.start = function() {
	this.flag = true;
	// 备份this
	var me = this;
	var index = 0;
	this.timer = setInterval(function() {
		me.snake.move();
		me.checkMap();
		me.checkFood(index);
		me.checkSnake();
		if (me.flag) {
			me.map.clear();
			me.renderFood();
			me.renderSnake();
		}
	}, 200)
}


Game.prototype.bindEvent = function() {
	var me = this;
	document.onkeydown = function(e) {
		var code = e.keyCode;
		if (code === 37 || code === 38 || code === 39 || code === 40) {
			me.snake.change(code);
		}
	}
}

// 游戏结束
Game.prototype.gameOver = function() {
	// 为this.flag赋值
	this.flag = false;
	// 清除定时器
	clearInterval(this.timer);
}

// 检测蛇是否撞墙
Game.prototype.checkMap = function() {
	var head = this.snake.arr[this.snake.arr.length - 1];
	if (head.row < 0 || head.row >= this.map.row || head.col < 0 || head.col >= this.map.col) {
		// 说明撞墙了
		alert("撞墙了");
		// 结束游戏
		this.gameOver();

	}
}

// 检测是否吃到食物
Game.prototype.checkFood = function(index) {
	var head = this.snake.arr[this.snake.arr.length - 1];
	var food = this.food;
	if (head.row === food.row && head.col === food.col) {
		index++;
		console.log(index);
		this.snake.growUp();
		this.resetFood();
	}
}

// 重置食物
Game.prototype.resetFood = function() {
	var row = parseInt(Math.random() * this.map.row);
	var col = parseInt(Math.random() * this.map.col);
	for (var i = 0; i < this.snake.arr.length; i++) {
		var one = this.snake.arr[i];
		if (one.row === row && one.col === col) {
			this.resetFood();
			return;
		}
	}
	this.food.resetFood(row, col);
}

// 检测蛇是否吃到自己
Game.prototype.checkSnake = function() {
	var head = this.snake.arr[this.snake.arr.length - 1];
	for (var i = 0; i < this.snake.arr.length - 1; i++) {
		var one = this.snake.arr[i];
		if (head.row === one.row && head.col === one.col) {
			alert("蛇吃到自己了");
			this.gameOver();
		}
	}
}