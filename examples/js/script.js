$(document).ready(function(){
	$('.indicator').each(function(){
  		var gauge = $(this).Gauge().setValue(Math.floor((Math.random() * 100) + 1));
  		$(this).on('dcylabs.gauge.animate', function(event, value, total){
	  		$(this).find('.percentage').text(value.toFixed(0) + '%');
  		});
	    setInterval(function(){
	 		gauge.setValue(Math.floor((Math.random() * 100) + 1));
	    },4000);
	});
});