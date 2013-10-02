var gamejs = require('gamejs');

var Camera = exports.Camera = function(scene, options) {
	this.width = options.width || 1024;
	this.height = options.height || 500;
	this.rect = new gamejs.Rect([0,0], [this.width, this.height]);
	this.scene = scene;
	this.center = null;
	this.dest = null;
	this.xSpeed = 0;
	this.ySpeed = 0;
	this.zoom = 1;
	this.zoom_multiplier = 1;
	this.targetZoom = null;
	this.sharp = options.sharp || true;
	this.view = new gamejs.Surface([this.width, this.height]);
	return this;
};

Camera.prototype.update = function(msDuration) {
	//pan to dest
	if (this.dest !== null) {
		if (this.rect.center[0] < this.dest[0]) {this.rect.moveIp(this.xSpeed,0);}
		if (this.rect.center[0] > this.dest[0]) {this.rect.moveIp(this.xSpeed,0);}
		if (this.rect.center[1] < this.dest[1]) {this.rect.moveIp(0,this.ySpeed);}
		if (this.rect.center[1] > this.dest[1]) {this.rect.moveIp(0,this.ySpeed);}
		
		this.xSpeed = (this.dest[0] - this.rect.center[0]) / 10;
		this.ySpeed = (this.dest[1] - this.rect.center[1]) / 10;
				
		if (this.dest == this.rect.center) {
			this.dest = null;
			this.xSpeed = 0;
			this.ySpeed = 0;
		}
	}
	if (this.center !==null) {
		this.dest = this.center;
	}
	
	if (this.targetZoom !== null) {
		if (this.targetZoom > this.zoom) {
			this.zoom_multiplier = 1 + ((this.targetZoom - this.zoom) * 0.1); 
		}
		if (this.targetZoom < this.zoom) {
			this.zoom_multiplier = 1 + ((this.targetZoom - this.zoom) * 0.1); 
		}
		if (this.targetZoom == this.zoom) {
			this.targetZoom = null;
			this.zoom_multiplier = 1;
		}
	}
	
	scene_size = this.scene.view.getSize();
	
	if (this.rect.width <= scene_size[0] && this.rect.height <= scene_size[1]) {
		this.zoom = this.zoom * this.zoom_multiplier;
	}
	this.rect.width = this.width / this.zoom;
	this.rect.height = this.height / this.zoom;
	
	if (this.sharp) {
		this.rect.left = Math.round(this.rect.left);
		this.rect.top = Math.round(this.rect.top);
	}
	
	//The camera's extent cannot be bigger than the current scene's size
	if (this.rect.width > scene_size[0]) {this.rect.width = scene_size[0];}
	if (this.rect.height > scene_size[1]) {this.rect.height = scene_size[1];}
	
	//The camera cannot pan beyond the extents of the scene
	if (this.rect.top < 0) {this.rect.top = 0;}
	if (this.rect.left < 0) {this.rect.left = 0;}
	if (this.rect.bottom > scene_size[1]) {this.rect.bottom = scene_size[1];}
	if (this.rect.right > scene_size[0]) {this.rect.right = scene_size[0];}
	
	this.view.blit(this.scene.view, [0,0], this.rect);
	
	this.display = this.view;
	return;
}

Camera.prototype.draw = function() {
	return this.display;
};

Camera.prototype.panto = function(pos) {
	this.dest = [pos[0], pos[1]];
	return;
};

Camera.prototype.follow = function(pos) {
	this.center = pos;
	this.scene.scroll = true;
	return;
};

Camera.prototype.unfollow = function() {
	this.scene.scroll = false;
	this.center = null;
	return;
};

Camera.prototype.zoomTo = function(zoom) {
	this.targetZoom = zoom;
	return;
};