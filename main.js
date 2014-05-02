'use strict';
var R  = R || {};
R.util = R.util || {};

$(function(){

	//Define the restriction--------------------
	var main_rule = {
		required: true,
		number: true,
		min: 0
	};

	var main_message = {
		required: 'needed',
		number: 'number',
		min: 'This should be positive'
	};

	var dec_rule = {
		required: true,
		number: true,
		range: [0, 1]
	};

	var dec_message = {
		required: 'needed',
		number: 'number',
		range: 'This should between 0 and 1'
	};

	var p_rule = {
		required: true,
		number: true,
		range: [-1, 1]
	};

	var p_message = {
		required: 'needed',
		number: 'number',
		range: 'This should between -1 and 1'
	};
	//Complete define the restriction--------------------


	//Black-Scholes Formulas--------------------
	var BS_euro = function(){

		var $form = $('form.BS_Euro_form');
		var get = function(name){
			return parseFloat($form.find('input[name="'+name+'"]').val());
		};

		var S = get('S');
		var K = get('K');
		var T = get('T');
		var variance = get('variance');
		var r = get('r');
		var t = get('t');

		var callvalue = R.euro.callOption(S, K, t, T, variance, r);
		var putvalue = R.euro.putOption(S, K, t, T, variance, r);

		$form.find('span.call_result').text(callvalue);
		$form.find('span.put_result').text(putvalue);

		return false;
	};

	var BS_euro_option = {
		rules:{
			S: main_rule,
			K: main_rule,
			T: main_rule,
			variance:dec_rule,
			r:dec_rule,
			t: main_rule
		},

		messages:{
			S: main_message,
			K: main_message,
			T: main_message,
			variance: dec_message,
			r: dec_message,
			t: main_rule
		},
		submitHandler: BS_euro
	};
	$('form.BS_Euro_form').validate(BS_euro_option);



	//Geometric Asian option--------------------
	var geo_Asian = function(){

		var $form = $('form.geo_Asian_from');
		var get = function(name){
			return parseFloat($form.find('input[name="'+name+'"]').val());
		};

		var S = get('S');
		var K = get('K');
		var T = get('T');
		var variance = get('variance');
		var r = get('r');
		var n = get('n');

		var callvalue = R.geo.Asian.callOption(S, K, n, T, variance, r);
		var putvalue = R.geo.Asian.putOption(S, K, n, T, variance, r);

		$form.find('span.call_result').text(callvalue);
		$form.find('span.put_result').text(putvalue);

		return false;
	};
	var Geo_Asian_option = {
		rules:{
			S: main_rule,
			K: main_rule,
			T: main_rule,
			variance:dec_rule,
			r:dec_rule,
			n: main_rule
		},

		messages:{
			S: main_message,
			K: main_message,
			T: main_message,
			variance: dec_message,
			r: dec_message,
			n: main_message
		},
		submitHandler: geo_Asian
	};
	$('form.geo_Asian_from').validate(Geo_Asian_option);


	//Geometric basket option--------------------	
	var geo_basket = function(){

		var $form = $('form.geo_basket_from');
		var get = function(name){
			return parseFloat($form.find('input[name="'+name+'"]').val());
		};

		var S1 = get('S1');
		var S2 = get('S2');
		var K = get('K');
		var T = get('T');
		var var1 = get('var1');
		var var2 = get('var2');
		var r = get('r');
		var p = get('p');

		var callvalue = R.geo.basket.callOption(S1, S2, K, T, var1, var2, p, r);
		var putvalue = R.geo.basket.putOption(S1, S2, K, T, var1, var2, p, r);

		$form.find('span.call_result').text(callvalue);
		$form.find('span.put_result').text(putvalue);

		return false;
	};
	var Geo_basket_option = {
		rules:{
			S1: main_rule,
			S2: main_rule,
			K: main_rule,
			T: main_rule,
			var1: dec_rule,
			var2: dec_rule,
			r: dec_rule,
			p: p_rule
		},

		messages:{
			S1: main_message,
			S2: main_message,
			K: main_message,
			T: main_message,
			var1: dec_message,
			var2: dec_message,
			r: dec_message,
			p: p_message
		},
		submitHandler: geo_basket
	};
	$('form.geo_basket_from').validate(Geo_basket_option);


	//Standard Monte Carlo method for Asian option--------------------
	var arth_Asian = function(){

		var $form = $('form.arth_Asian_from');
		var get = function(name){
			return parseFloat($form.find('input[name="'+name+'"]').val());
		};

		var S = get('S');
		var K = get('K');
		var T = get('T');
		var variance = get('variance');
		var r = get('r');
		var n = get('n');
		var m = get('m');

		var callvalue = R.std.Asian.callOption(S, K, T, variance, r, m , n);
		var putvalue = R.std.Asian.putOption(S, K, T, variance, r, m , n);

		$form.find('span.call_result').text(callvalue[0]);
		$form.find('span.call_interval').text(callvalue[1]);
		$form.find('span.put_result').text(putvalue[0]);
		$form.find('span.put_interval').text(putvalue[1]);

		return false;
	};
	var Arth_Asian_option = {
		rules:{
			S: main_rule,
			K: main_rule,
			T: main_rule,
			variance:dec_rule,
			r:dec_rule,
			n: main_rule,
			m: main_rule
		},

		messages:{
			S: main_message,
			K: main_message,
			T: main_message,
			variance: dec_message,
			r: dec_message,
			n: main_message,
			m: main_message
		},
		submitHandler: arth_Asian
	};
	$('form.arth_Asian_from').validate(Arth_Asian_option);


	//Standard Monte Carlo method for basket option--------------------	
	var arth_basket = function(){

		var $form = $('form.arth_basket_from');
		var get = function(name){
			return parseFloat($form.find('input[name="'+name+'"]').val());
		};

		var S1 = get('S1');
		var S2 = get('S2');
		var K = get('K');
		var T = get('T');
		var var1 = get('var1');
		var var2 = get('var2');
		var r = get('r');
		var m = get('m');
		var p = get('p');

		var callvalue = R.std.basket.callOption(S1, S2, K, T, var1, var2, r, m, p);
		var putvalue = R.std.basket.putOption(S1, S2, K, T, var1, var2, r, m, p);

		$form.find('span.call_result').text(callvalue[0]);
		$form.find('span.call_interval').text(callvalue[1]);
		$form.find('span.put_result').text(putvalue[0]);
		$form.find('span.put_interval').text(putvalue[1]);

		return false;
	};
	var arth_basket_option = {
		rules:{
			S1: main_rule,
			S2: main_rule,
			K: main_rule,
			T: main_rule,
			var1: dec_rule,
			var2: dec_rule,
			r: dec_rule,
			p: p_rule,
			m: main_rule
		},

		messages:{
			S1: main_message,
			S2: main_message,
			K: main_message,
			T: main_message,
			var1: dec_message,
			var2: dec_message,
			r: dec_message,
			p: p_message,
			m: main_message
		},
		submitHandler: arth_basket
	};
	$('form.arth_basket_from').validate(arth_basket_option);


	//Arithmetic Asian options. Control variate = Geometric mean Asian.--------------------
	var control_geo = function(){

		var $form = $('form.control_geo_from');
		var get = function(name){
			return parseFloat($form.find('input[name="'+name+'"]').val());
		};

		var S = get('S');
		var K = get('K');
		var T = get('T');
		var variance = get('variance');
		var r = get('r');
		var n = get('n');
		var m = get('m');

		var callvalue = R.control.GeoMean.callOption(S, K, n, T, variance, r, m);
		var putvalue = R.control.GeoMean.putOption(S, K, n, T, variance, r, m);

		$form.find('span.call_result').text(callvalue[0]);
		$form.find('span.call_interval').text(callvalue[1]);
		$form.find('span.put_result').text(putvalue[0]);
		$form.find('span.put_interval').text(putvalue[1]);

		return false;
	};
	var control_geo_option = {
		rules:{
			S: main_rule,
			K: main_rule,
			T: main_rule,
			variance:dec_rule,
			r:dec_rule,
			n: main_rule,
			m: main_rule
		},

		messages:{
			S: main_message,
			K: main_message,
			T: main_message,
			variance: dec_message,
			r: dec_message,
			n: main_message,
			m: main_message
		},
		submitHandler: control_geo
	};
	$('form.control_geo_from').validate(control_geo_option);


	//Arithmetic Asian options. Control variate = Adjusted strike--------------------
	var control_geoAS = function(){

		var $form = $('form.control_geoAS_from');
		var get = function(name){
			return parseFloat($form.find('input[name="'+name+'"]').val());
		};

		var S = get('S');
		var K = get('K');
		var T = get('T');
		var variance = get('variance');
		var r = get('r');
		var n = get('n');
		var m = get('m');

		var callvalue = R.control.GeoMeanWithAS.callOption(S, K, n, T, variance, r, m);
		var putvalue = R.control.GeoMeanWithAS.putOption(S, K, n, T, variance, r, m);

		$form.find('span.call_result').text(callvalue[0]);
		$form.find('span.call_interval').text(callvalue[1]);
		$form.find('span.put_result').text(putvalue[0]);
		$form.find('span.put_interval').text(putvalue[1]);

		return false;
	};
	var control_geoAS_option = {
		rules:{
			S: main_rule,
			K: main_rule,
			T: main_rule,
			variance:dec_rule,
			r:dec_rule,
			n: main_rule,
			m: main_rule
		},

		messages:{
			S: main_message,
			K: main_message,
			T: main_message,
			variance: dec_message,
			r: dec_message,
			n: main_message,
			m: main_message
		},
		submitHandler: control_geoAS
	};
	$('form.control_geoAS_from').validate(control_geoAS_option);


	//Monte Carlo method for basket option. Control variate = Geometric mean Asian.--------------------	
	var control_basket = function(){

		var $form = $('form.control_basket_from');
		var get = function(name){
			return parseFloat($form.find('input[name="'+name+'"]').val());
		};

		var S1 = get('S1');
		var S2 = get('S2');
		var K = get('K');
		var T = get('T');
		var var1 = get('var1');
		var var2 = get('var2');
		var r = get('r');
		var m = get('m');
		var p = get('p');

		var callvalue = R.basketControl.GeoMean.callOption(S1, S2, K, T, var1, var2, r, m, p);
		var putvalue = R.basketControl.GeoMean.putOption(S1, S2, K, T, var1, var2, r, m, p);

		$form.find('span.call_result').text(callvalue[0]);
		$form.find('span.call_interval').text(callvalue[1]);
		$form.find('span.put_result').text(putvalue[0]);
		$form.find('span.put_interval').text(putvalue[1]);

		return false;
	};
	var control_basket_option = {
		rules:{
			S1: main_rule,
			S2: main_rule,
			K: main_rule,
			T: main_rule,
			var1: dec_rule,
			var2: dec_rule,
			r: dec_rule,
			p: p_rule,
			m: main_rule
		},

		messages:{
			S1: main_message,
			S2: main_message,
			K: main_message,
			T: main_message,
			var1: dec_message,
			var2: dec_message,
			r: dec_message,
			p: p_message,
			m: main_message
		},
		submitHandler: control_basket
	};
	$('form.control_basket_from').validate(control_basket_option);

	//Monte Carlo method for basket option. Control variate = Adjusted strike.--------------------	
	var controlAS_basket = function(){

		var $form = $('form.controlAS_basket_from');
		var get = function(name){
			return parseFloat($form.find('input[name="'+name+'"]').val());
		};

		var S1 = get('S1');
		var S2 = get('S2');
		var K = get('K');
		var T = get('T');
		var var1 = get('var1');
		var var2 = get('var2');
		var r = get('r');
		var m = get('m');
		var p = get('p');

		var callvalue = R.basketControl.GeoMeanWithAS.callOption(S1, S2, K, T, var1, var2, r, m, p);
		var putvalue = R.basketControl.GeoMeanWithAS.putOption(S1, S2, K, T, var1, var2, r, m, p);

		$form.find('span.call_result').text(callvalue[0]);
		$form.find('span.call_interval').text(callvalue[1]);
		$form.find('span.put_result').text(putvalue[0]);
		$form.find('span.put_interval').text(putvalue[1]);

		return false;
	};
	var controlAS_basket_option = {
		rules:{
			S1: main_rule,
			S2: main_rule,
			K: main_rule,
			T: main_rule,
			var1: dec_rule,
			var2: dec_rule,
			r: dec_rule,
			p: p_rule,
			m: main_rule
		},

		messages:{
			S1: main_message,
			S2: main_message,
			K: main_message,
			T: main_message,
			var1: dec_message,
			var2: dec_message,
			r: dec_message,
			p: p_message,
			m: main_message
		},
		submitHandler: controlAS_basket
	};
	$('form.controlAS_basket_from').validate(controlAS_basket_option);


});