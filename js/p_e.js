/*
*	My Physics Engine
*/
function P_E(){

	this.config = this.config || {
		
		count:			0,
		run:			true,
		ctx:			document.getElementById('p_e').getContext('2d'),
		p_eBody:		{
							b1:{px:0, py:0, vx:.3, vy:.2}
						},
		t:				1000/60,
		planes:			[
							[1,0,1],
							[0,-1,1],
							[-1,0,1],
							[0,1,1]
						]
	}
	
}
/*
*	Prototype
*/
P_E.prototype = {
	
	constructor:P_E,
	
	init:function(){
		
	},
	
	bodyUpdate:function(){
		
	},
	
	step:function(){
		
		//console.log('___ *** STEP *** ___')
		/*
		*	Set target
		*/
		var _this = this.config;
		var t = this.config.t;
		var body = this.config.p_eBody.b1;
		//console.log((body.px/100).toFixed(1),(body.py/100).toFixed(1),body.vx,body.vy);	
		/*
		*	Redraw circle
		*/	
		_this.ctx.clearRect(0,0,200,200);
		_this.ctx.beginPath();
		_this.ctx.arc((body.px)+100,(body.py)+100,2,0,2*Math.PI);
		_this.ctx.fillStyle = '#333';
		_this.ctx.fill();
		/*
		*	For each plane
		*/
		for(var i = 0; i < _this.planes.length; i++){
			/*
			*	Get distance between particle and plane:
			*		- Current body's X * plane's X + body's Y * plane's Y + plane's distance from origin 
			*/
			var d = (body.px/100 * _this.planes[i][0] + body.py/100 * _this.planes[i][1] + _this.planes[i][2]);		
			/*
			*	Set normal:
			*		- Current plane's X & plane's Y
			*/
			var n = [_this.planes[i][0], _this.planes[i][1]];
			
			
			
			
			if(d > 2 && (body.vx * n[0] + body.vy * n[1]) > 0){
				console.log(d.toFixed(1), (body.px/100).toFixed(1), (body.py/100).toFixed(1), (body.vx * n[0] + body.vy * n[1]));			
				console.log('_____________________________________________>2');
				body.vx = -body.vx;
			}
			
			if(d > 2 && (body.vx * n[0] + body.vy * n[1]) > 0){
				console.log(d.toFixed(1), (body.px/100).toFixed(1), (body.py/100).toFixed(1), (body.vx * n[0] + body.vy * n[1]));			
				console.log('_____________________________________________>2');
				body.vy = -body.vy;
			}
			
			if(d < 0 && (body.vx * n[0] + body.vy * n[1]) < 0){
				console.log(d.toFixed(1), (body.px/100).toFixed(1), (body.py/100).toFixed(1), (body.vx * n[0] + body.vy * n[1]));			
				console.log('_____________________________________________<0');
				body.vx = -body.vx;
			}
			
			if(d < 0 && (body.vx * n[0] + body.vy * n[1]) < 0){
				console.log(d.toFixed(1), (body.px/100).toFixed(1), (body.py/100).toFixed(1), (body.vx * n[0] + body.vy * n[1]));			
				console.log('_____________________________________________<0');
				body.vy = -body.vy;
			}
						
		}
		//(_this.count==200) ? _this.run = false : _this.count++;
		/*
		*	Position: 	speed = distance / time 	|| 		distance = speed * time
		*				v = p/t 					|| 		p = v*t 
		*/
		body.px += body.vx*t; 
		body.py += body.vy*t;
		
	}
}
/*
*
*	Request Animation Frame Shim
*
*/
window.requestAnimFrame = (function(){
	return  window.requestAnimationFrame       ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame    ||
			function(fn){
				window.setTimeout(fn, 1000 / 60);
			};
})();
/*
*
*	Request Animation Frame Shim
*
*/
init = function(){
	/*
	*	Initiate Physics Engine
	*/
	var p_e = new P_E();
	p_e.init();	
	/*
	*	Animate
	*/
	(function anim(){
		
		if(!p_e.config.run){
			
		}else{
			requestAnimFrame(anim);
			p_e.step()	
		}
		
	})()
}


