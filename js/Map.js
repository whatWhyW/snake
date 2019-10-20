/**
 * Map 地图类
 * @row 行属性
 * @col 列属性
 * @width 宽度属性
 * @height 高度属性
 **/
function Map(row, col, width, height) {
	this.row = row;
	this.col = col;
	this.width = width;
	this.height = height;
	// 数组属性
	this.arr = [];
	this.dom = document.createElement("div");
}

// 填充的方法
Map.prototype.fill = function() {
	for (var j = 0; j < this.row; j++) {
		var row_dom = document.createElement("div");
		var row_arr = [];
		row_dom.className = "row";
		for (var i = 0; i < this.col; i++) {
			var col_dom = document.createElement("span");
			col_dom.className = "grid";
			row_dom.appendChild(col_dom);
			row_arr.push(col_dom);
		}
		this.dom.appendChild(row_dom);
		this.arr.push(row_arr);
		this.dom.className = "box";
	}
	// 上树
	document.body.appendChild(this.dom);
}

// 清屏
Map.prototype.clear = function() {
	for (var i = 0; i < this.arr.length; i++) {
		for (var j = 0; j < this.arr[i].length; j++) {
			this.arr[i][j].style.backgroundImage = "none";
		}
	}
}