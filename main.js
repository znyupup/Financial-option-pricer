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
	//Complete define the restriction--------------------


	//Black-Scholes Formulas--------------------
	var BS_euro = function(){

		var $form = $('form.BS_Euro_form');
		var get = function(name){
			return $form.find('input[name="'+name+'"]').val();
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



	//Geometric Asian option--------------------!!!!!!!!!!!!!!	
	var geo_Asian = function(){

		var $form = $('form.geo_Asian_from');
		var get = function(name){
			return $form.find('input[name="'+name+'"]').val();
		};

		var S = get('S');
		var K = get('K');
		var T = get('T');
		var variance = get('variance');
		var r = get('r');
		var n = get('n');

		var callvalue = R.geo.Asian.callOption(S, K, n, T, variance, r);
		console.log(S, K, n, T, variance, r);
		console.log(R.geo.Asian.callOption(S, K, n, T, variance, r));
		console.log(R.geo.Asian.callOption(100, 100,50,3,0.3,0.05));

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
			n: main_rule
		},
		submitHandler: geo_Asian
	};
	$('form.geo_Asian_from').validate(Geo_Asian_option);


	//Geometric Asian option--------------------	
	var geo_basket = function(){

		var $form = $('form.geo_basket_from');
		var get = function(name){
			return $form.find('input[name="'+name+'"]').val();
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
			n: main_rule
		},
		submitHandler: geo_basket
	};
	$('form.geo_basket_from').validate(Geo_basket_option);



});