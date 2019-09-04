"use strict";

export default {
	// NES palette.
	palette: [
		[124, 124 ,124],
		[0, 0 ,252],
		[0, 0 ,188],
		[68, 40 ,188],
		[148, 0 ,132],
		[168, 0 ,32],
		[168, 16 ,0],
		[136, 20 ,0],
		[80, 48 ,0],
		[0, 120 ,0],
		[0, 104 ,0],
		[0, 88 ,0],
		[0, 64 ,88],
		[0, 0, 0],
		[188, 188 ,188],
		[0, 120 ,248],
		[0, 88 ,248],
		[104, 68 ,252],
		[216, 0 ,204],
		[228, 0 ,88],
		[248, 56 ,0],
		[228, 92 ,16],
		[172, 124 ,0],
		[0, 184 ,0],
		[0, 168 ,0],
		[0, 168 ,68],
		[0, 136 ,136],
		[248, 248 ,248],
		[60, 188 ,252],
		[104, 136 ,252],
		[152, 120 ,248],
		[248, 120 ,248],
		[248, 88 ,152],
		[248, 120 ,88],
		[252, 160 ,68],
		[248, 184 ,0],
		[88, 216 ,84],
		[88, 248 ,152],
		[0, 232 ,216],
		[120, 120 ,120],
		[252, 252 ,252],
		[164, 228 ,252],
		[184, 184 ,248],
		[216, 184 ,248],
		[248, 184 ,248],
		[248, 164 ,192],
		[240, 208 ,176],
		[252, 224 ,168],
		[248, 216 ,120],
		[216, 248 ,120],
		[184, 248 ,184],
		[184, 248 ,216],
		[0, 252 ,252],
		[216, 216 ,216],
	],
	
	step: 1,
	
	/**
	* Perform an error diffusion dither on the image
	* */
	errorDiffusionDither: function(in_imgdata, w, h) {
		// Create a new empty image
		// var out_imgdata = $.ctx.createImageData(in_imgdata);
		var d = new Uint8ClampedArray(in_imgdata.data);
		var out = new Uint8ClampedArray(in_imgdata.data);
		// Step
		var step = this.step;
		// Ratio >=1
		var ratio = 1/16;
		// Threshold Matrix
		var m = new Array(
			[  1,  9,  3, 11 ],
			[ 13,  5, 15,  7 ],
			[  4, 12,  2, 10 ],
			[ 16,  8, 14,  6 ]
		);

		// var w = width;
		// var h = height;
	
		for (var y=0;y<h;y += step) {
			for (var x=0;x<w;x += step) {
				var i = (4*x) + (4*y*w);
				
				var $i = function(x,y) {
					return (4*x) + (4*y*w);
				};
	
				// Define bytes
				var r = i;
				var g = i+1;
				var b = i+2;
				var a = i+3;
	
				var color = new Array(d[r],d[g],d[b]); 
				var approx = this.approximateColor(color);
				
				var q = [];
				q[r] = d[r] - approx[0];
				q[g] = d[g] - approx[1];
				q[b] = d[b] - approx[2];
									
				// Diffuse the error
				d[$i(x+step,y)] =  d[$i(x+step,y)] + 7 * ratio * q[r];
				d[$i(x-step,y+1)] =  d[$i(x-1,y+step)] + 3 * ratio * q[r];
				d[$i(x,y+step)] =  d[$i(x,y+step)] + 5 * ratio * q[r];
				d[$i(x+step,y+step)] =  d[$i(x+1,y+step)] + 1 * ratio * q[r];
	
				d[$i(x+step,y)+1] =  d[$i(x+step,y)+1] + 7 * ratio * q[g];
				d[$i(x-step,y+step)+1] =  d[$i(x-step,y+step)+1] + 3 * ratio * q[g];
				d[$i(x,y+step)+1] =  d[$i(x,y+step)+1] + 5 * ratio * q[g];
				d[$i(x+step,y+step)+1] =  d[$i(x+step,y+step)+1] + 1 * ratio * q[g];
	
				d[$i(x+step,y)+2] =  d[$i(x+step,y)+2] + 7 * ratio * q[b];
				d[$i(x-step,y+step)+2] =  d[$i(x-step,y+step)+2] + 3 * ratio * q[b];
				d[$i(x,y+step)+2] =  d[$i(x,y+step)+2] + 5 * ratio * q[b];
				d[$i(x+step,y+step)+2] =  d[$i(x+step,y+step)+2] + 1 * ratio * q[b];
	
				// Color
				var tr = approx[0];
				var tg = approx[1];
				var tb = approx[2];
	
				// Draw a block
				for (var dx=0;dx<step;dx++){
					for (var dy=0;dy<step;dy++){
						var di = i + (4 * dx) + (4 * w * dy);
	
						// Draw pixel
						out[di] = tr;
						out[di+1] = tg;
						out[di+2] = tb;
	
					}
				}
			}
		}
		// out_imgdata.data.set(out);
		// return out_imgdata;
		return out;
	},
	/**
	* Perform an ordered dither on the image
	* */
	dither: function(in_imgdata, w, h) {
    // Create a new empty image
    // var canvas = document.createElement('canvas');
    // canvas.width = 512;
    // canvas.height = 480;
    // var ctx = canvas.getContext('2d');
		// var out_imgdata = ctx.createImageData(in_imgdata);
		var d = new Uint8ClampedArray(in_imgdata.data);
		// Step
		var step = 1; //this.step;
		// Ratio >=1
		var ratio = 2;
		// Threshold Matrix
		var m = new Array(
			[  1,  9,  3, 11 ],
			[ 13,  5, 15,  7 ],
			[  4, 12,  2, 10 ],
			[ 16,  8, 14,  6 ]
		);
		
		// var w = 512;
		// var h = 480;
	
		for (var y=0;y<h;y += step) {
			for (var x=0;x<w;x += step) {
				var i = (4*x) + (4*y*w);
	
				// Define bytes
				var r = i;
				var g = i+1;
				var b = i+2;
				var a = i+3;
	
				d[r] += m[x%4][y%4] * ratio; 
				d[g] += m[x%4][y%4] * ratio; 
				d[b] += m[x%4][y%4] * ratio; 
	
				//var tr = threshold(d[r]);
				//var tg = threshold(d[g]);
				//var tb = threshold(d[b]);
				var color = new Array(d[r],d[g],d[b]); 
				var approx = this.approximateColor(color);
				var tr = approx[0];
				var tg = approx[1];
				var tb = approx[2];
	
				// d[r] = t;
				// d[g] = t;
				// d[b] = t;
	
				// Draw a block
				for (var dx=0;dx<step;dx++){
					for (var dy=0;dy<step;dy++){
						var di = i + (4 * dx) + (4 * w * dy);
	
						// Draw pixel
						d[di] = tr;
						d[di+1] = tg;
						d[di+2] = tb;
	
					}
				}
			}
		}
		// out_imgdata.data.set(d);
		return d; // out_imgdata;
	},
	
	/**
	* Return the most closer color vs a common palette
	* @param array - the color
	* @return i - the index of the coloser color
	* */
	approximateColor: function(color) {
		var palette = this.palette;
		var findIndex = function(fun,arg,list,min) {
			if (list.length == 2) {
				if (fun(arg,min) <= fun(arg,list[1])) {
					return min;
				}else {
					return list[1];
				}
			} else {
				//var hd = list[0];
				var tl = list.slice(1);
				if (fun(arg,min) <= fun(arg,list[1])) {
					min = min; 
				} else {
					min = list[1];
				}
				return findIndex(fun,arg,tl,min);
			}
		};
		var found_color = findIndex(this.colorDistance,color,palette,palette[0]);
		return found_color;
	},
	
	/**
	* Return a distance of two colors ina three dimensional space
	* @param array
	* @param array
	* @return number
	* */
	colorDistance: function(a,b) {
		//if (a == null) return b;
		//if (b == null) return a;
		return Math.sqrt( 
			Math.pow( ((a[0]) - (b[0])),2 )
			+ Math.pow( ((a[1]) - (b[1])),2 ) 
			+ Math.pow( ((a[2]) - (b[2])),2 )
		);
	},
}