/*	
*	JavaScript Document Developed by Richard Coulson 01st May 2013 - www.3stepsforward.co.uk
*	Please do not remove any comment if you reuse this code and credit Richard Coulson. 
*	This work is licensed under a Creative Commons Attribution-NonCommercial-ShareAlike
*	3.0 Unported License - http://creativecommons.org/licenses/by-nc-sa/3.0/
*/

function P_E(){

	this.config = this.config || {
		
		count:			0,
		run:			true,
		ctx:			document.getElementById('p_e').getContext('2d'),
		p_eBody:		{
							b1:{px:0, py:0, vx:-.2, vy:.7}
						},
		t:				1000/60,
		planes:			[
							[1,0,.8],	//Right
							[0,-1,.8],	//Top
							[-1,0,.8],	//Left
							[0,1,.8]	//Bottom
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
		
		/*
		*	Set target
		*/
		var _this = this.config;
		var t = this.config.t;
		var body = this.config.p_eBody.b1;
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
			*	Planes distance from origin:
			*/
			var dfo = _this.planes[i][2];
			/*
			*	Plane's normals:
			*		- Current plane's X & plane's Y
			*/
			var n = [_this.planes[i][0], _this.planes[i][1]];
			/*
			*	Get distance between particle and plane:
			*		- Current body's X * plane's X + body's Y * plane's Y + plane's distance from origin 
			*/
			var d = (body.px/100 * n[0] + body.py/100 * n[1] + dfo);		
			/*
			*	Normal velocity:
			*		- The particle’s velocity in the direction of the normal 
			*/
			var nv = (body.vx * n[0] + body.vy * n[1]);	
			/*
			*	Coefficient of Restitution:
			*		- 1 = totally plastic / 2 = totally elastic
			*/
			var e = 1.3;
			/*
			*	Gravity:
			*		- X / Y
			*/
			var G = [0,-0.0001];
			/*
			*
			*
			*/
			if(d > 2 && nv > 0){
				body.vx += G[0]*t;
				/*
				*	Reflection Vector:
				*		- Particle's velocity - Restitution * Current Plane's X normal * Normal velocity		
				*		- V - 2 * N * NV
				*/
				body.vx -= e*n[0]*nv;
			}
			
			if(d < 0 && nv < 0){
				body.vy += G[1]*t;
				/*
				*	Reflection Vector:
				*		- Particle's velocity - Restitution * Current Plane's Y normal * Normal velocity		
				*		- V - 2 * N * NV
				*/
				body.vy -= e*n[1]*nv;
			}
			
			if(d < 0 && nv < 0){
				body.vx += G[0]*t;
				/*
				*	Reflection Vector:
				*		- Particle's velocity - Restitution * Current Plane's X normal * Normal velocity		
				*		- V - E * N * NV
				*/
				body.vx -= e*n[0]*nv;
			}

			if(d > 2 && nv > 0){
				body.vy += G[1]*t;
				/*
				*	Reflection Vector:
				*		- Particle's velocity - Restitution * Current Plane's Y normal * Normal velocity		
				*		- V - 2 * N * NV
				*/
				body.vy -= e*n[1]*nv;
			}
					
		}
		/*
		*	Position: 	speed = distance / time 	|| 		distance = speed * time
		*				v = p/t 					|| 		p = v*t 
		*/
		body.px += body.vx*t; 
		body.py += body.vy*t;
		/*
		*
		*/
	}
}
/*
*
*	Request Animation Frame Shim
*
*/
window.requestAnimFrame = (function(){
	return	window.requestAnimationFrame       ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame    ||
	 		function(fn){
				window.setTimeout(fn, 1000/60);
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


