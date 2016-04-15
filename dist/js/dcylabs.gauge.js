var Gauge = function($holder, options){
	var thys = this;
	$.extend(thys, {
	  	'options': {
    		'foreground-color': '#333',
      		'background-color': '#ccc',
			'foreground-width': 6,
      		'background-width': 8,
      		'max': 100,
      		'value': 0
    	},
    	'holder': $holder
	});
	thys.init(options);
};

$.extend(Gauge.prototype, {
	init: function(options){
		var thys = this;
		thys.options = $.extend(thys.options, options);
		thys.fetchDataAttributes()
			.initPaper()
			.draw();
		thys.holder.get(0).gauge = thys;
		thys.trigger('dcylabs.gauge.initialized');
		return thys;
	},
	fetchDataAttributes: function(){
		var thys = this;
		$.each(['foreground-color', 'background-color', 'foreground-width', 'background-width', 'value'], function(k,v){
			if(thys.holder.data(v)){
				thys.options[v] = thys.holder.data(v);
			}
		});
		return thys;
	},
	trigger: function(name, args){
		var thys = this;
		thys.holder.trigger(name, args);
		return thys;
	},
	initPaper: function(){
		var thys = this;
		thys.width = Math.min(thys.holder.width(), thys.holder.height());
		thys.paper = new Raphael(thys.holder.get(0), thys.width, thys.width );
		thys.paper.customAttributes.arc = function (value, total, R) {
			var alpha = 360 / total * value,
				a = (90 - alpha) * Math.PI / 180,
				x = thys.width/2 + R * Math.cos(a),
				y = thys.width/2 - R * Math.sin(a),
				path;
			if (total == value) {
				path = [["M", thys.width/2, thys.width/2 - R], ["A", R, R, 0, 1, 1, thys.width/2 - 0.1, thys.width/2 - R]];
			} else {
				path = [["M", thys.width/2, thys.width/2 - R], ["A", R, R, 0, +(alpha > 180), 1, x, y]];
			}
			thys.trigger('dcylabs.gauge.animate', [value, total]);
			return {path: path};
		};
		return thys;
	},
	drawBackground: function(attr){
		var thys = this;
		var strokeWidth = Math.max(thys.options['foreground-width'], thys.options['background-width'])/2;
		var circle = thys.paper.circle(thys.width/2, thys.width/2, thys.width/2 - strokeWidth);
		circle.attr({'stroke-width': thys.options['background-width'], 'stroke': thys.options['background-color']});  
		return thys;
	},
	drawForeground: function(){
		var thys = this;
		var strokeWidth = Math.max(thys.options['foreground-width'], thys.options['background-width'])/2;
		thys.progressPath = thys.paper.path().attr({
			'arc': [ 0, thys.options.max, thys.width/2 - strokeWidth],
			'stroke-width': thys.options['foreground-width'], 
			'stroke': thys.options['foreground-color']
		});
		return thys.setValue(thys.options.value);
	},
	draw: function(){
		var thys = this;
		thys.drawBackground();
		thys.drawForeground();
		return thys;
	},  
	setValue: function(value){
		var thys = this;
		var strokeWidth = Math.max(thys.options['foreground-width'], thys.options['background-width'])/2;
		thys.progressPath.animate({'arc': [ value, thys.options.max, thys.width/2 - strokeWidth]}, 900, ">",function(){
			thys.trigger('dcylabs.gauge.changed', [value]);
		});
		return thys;
	}
});

$(document).ready(function(){
	$.fn.Gauge = function(options){
		return new Gauge(this, options);
	};
});