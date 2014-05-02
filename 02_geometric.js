'use strict';

var R  = R || {};
R.util = R.util || {};
R.geo = R.geo ||{};

//02  geometric Asian call/put options
R.geo.Asian = (function(){

	function callOption (S, K, n, T, variance, r){

		//console.log(S, K, n, T, variance, r);
		var a, u;
		a = variance*Math.sqrt((n+1)*(2*n+1)/(6*n*n));
		u = (r-0.5*variance*variance)*((n+1)/(2*n))+0.5*a*a;

		var d1, d2;
		d1 = (Math.log(S/K)+(u+0.5*a*a)*T)/(a*Math.sqrt(T));
		d2 = d1-a*Math.sqrt(T);

		var Nd1, Nd2;
		Nd1 = R.util.norm(d1);
		Nd2 = R.util.norm(d2);

		var callValue = Math.exp(-r*T)*(S*Math.exp(u*T)*Nd1-K*Nd2);
		return callValue;
	}

	function putOption (S, K, n, T, variance, r){

		var a, u;
		a = variance*Math.sqrt((n+1)*(2*n+1)/(6*n*n));
		u = (r-0.5*variance*variance)*((n+1)/(2*n))+0.5*a*a;

		var d1, d2;
		d1 = (Math.log(S/K)+(u+0.5*a*a)*T)/(a*Math.sqrt(T));
		d2 = d1-a*Math.sqrt(T);

		var Nd1, Nd2;
		Nd1 = R.util.norm(-d1);
		Nd2 = R.util.norm(-d2);

		var putValue = Math.exp(-r*T)*(K*Nd2 - S*Math.exp(u*T)*Nd1);
		return putValue;
	}

	return {
		callOption: callOption,
		putOption: putOption
	};

})();


//02 geometric basket call/put options
R.geo.basket = (function(){

	function callOption (S1, S2, K, T, var1, var2, p, r){

		var B;
		B = Math.sqrt(S1*S2);

		var a, u;
		a = Math.sqrt(var1*var1 + var1*var2*p + var2*var1*p + var2*var2)/2;
		u = r - 0.5*(var1*var1 + var2*var2)/2 + 0.5*a*a;

		var d1, d2;
		d1 = (Math.log(B/K)+(u+0.5*a*a)*T)/(a*Math.sqrt(T));
		d2 = d1-a*Math.sqrt(T);

		var Nd1, Nd2;
		Nd1 = R.util.norm(d1);
		Nd2 = R.util.norm(d2);

		var callValue = Math.exp(-r*T)*(B*Math.exp(u*T)*Nd1 - K*Nd2);
		return callValue;
	}

	function putOption (S1, S2, K, T, var1, var2, p, r){

		var B;
		B = Math.sqrt(S1*S2);

		var a, u;
		a = Math.sqrt(var1*var1 + var1*var2*p + var2*var1*p + var2*var2)/2;
		u = r - 0.5*(var1*var1 + var2*var2)/2 + 0.5*a*a;

		var d1, d2;
		d1 = (Math.log(B/K)+(u+0.5*a*a)*T)/(a*Math.sqrt(T));
		d2 = d1-a*Math.sqrt(T);

		var Nd1, Nd2;
		Nd1 = R.util.norm(-d1);
		Nd2 = R.util.norm(-d2);

		var putValue = Math.exp(-r*T)*(K*Nd2 - B*Math.exp(u*T)*Nd1);
		return putValue;
	}

	return {
		callOption: callOption,
		putOption: putOption
	};


})();


