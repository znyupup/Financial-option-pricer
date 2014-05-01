'use strict';

var R  = R || {};
R.util = R.util || {};
R.std = R.std ||{};

//03  standard Monte Carlo method

R.std.Asian = (function(){

	function callOption (S, K, T, variance, r, m , n){
		var drift = Math.exp((r-0.5*variance*variance)*(T/n));
		var arithPayoff = [];
		for(var i = 0; i<m; i++){
			var spath = [];
			var former = S;
			var x = [];
			for(var j = 0; j<n; j++){
				
				x[j] = R.util.normNumber();
				var growthFactor = drift*Math.exp(variance*Math.sqrt(T/n)*x[j]);
				former = former*growthFactor;
				spath[j] = former;
			}
			var arithMean = R.util.average(spath);
			arithPayoff[i] = Math.exp(-r*T)*Math.max(arithMean-K, 0);
		}

		var Pmean = R.util.average(arithPayoff);
		var Pstd = R.util.std(arithPayoff);
		var confmc = [Pmean-1.96*Pstd/Math.sqrt(m), Pmean+1.96*Pstd/Math.sqrt(m)];

		var callValue = [Pmean, confmc];
		return callValue;
	}

	function putOption (S, K, T, variance, r, m , n){
		var drift = Math.exp((r-0.5*variance*variance)*(T/n));
		var arithPayoff = [];
		for(var i = 0; i<m; i++){
			var spath = [];
			var former = S;
			var x = [];
			for(var j = 0; j<n; j++){
				
				x[j] = R.util.normNumber();
				var growthFactor = drift*Math.exp(variance*Math.sqrt(T/n)*x[j]);
				former = former*growthFactor;
				spath[j] = former;
			}
			//var xMean = R.util.average(x);
			//console.log(xMean);
			var arithMean = R.util.average(spath);
			arithPayoff[i] = Math.exp(-r*T)*Math.max(K - arithMean, 0);
		}

		var Pmean = R.util.average(arithPayoff);
		var Pstd = R.util.std(arithPayoff);
		var confmc = [Pmean-1.96*Pstd/Math.sqrt(m), Pmean+1.96*Pstd/Math.sqrt(m)];

		var putvalue = [Pmean, confmc];
		return putvalue;
	}

	return {
		callOption: callOption,
		putOption: putOption
	};
})();

R.std.basket = (function(){

	function callOption (S1, S2, K, T, var1, var2, r, m, p){
		var arithPayoff = [];
		for(var i = 0; i<m; i++){

			var ran1, ran2;
			ran1 = R.util.normNumber();
			ran2 = p*ran1 + Math.sqrt(1-p*p)*R.util.normNumber();

			var a1 = S1*Math.exp((r-0.5*var1*var1)*T+ var1*Math.sqrt(T)*ran1);
			var a2 = S2*Math.exp((r-0.5*var2*var2)*T+ var2*Math.sqrt(T)*ran2);

			var arithMean = (a1+a2)/2;
			arithPayoff[i] = Math.exp(-r*T)*Math.max(arithMean-K, 0);
		}

		var Pmean = R.util.average(arithPayoff);
		var Pstd = R.util.std(arithPayoff);
		var confmc = [Pmean-1.96*Pstd/Math.sqrt(m), Pmean+1.96*Pstd/Math.sqrt(m)];

		var callValue = [Pmean, confmc];
		return callValue;
	}

	function putOption (S1, S2, K, T, var1, var2, r, m, p){
		var arithPayoff = [];
		for(var i = 0; i<m; i++){

			var ran1, ran2;
			ran1 = R.util.normNumber();
			ran2 = p*ran1 + Math.sqrt(1-p*p)*R.util.normNumber();

			var a1 = S1*Math.exp((r-0.5*var1*var1)*T+ var1*Math.sqrt(T)*ran1);
			var a2 = S2*Math.exp((r-0.5*var2*var2)*T+ var2*Math.sqrt(T)*ran2);

			var arithMean = (a1+a2)/2;
			arithPayoff[i] = Math.exp(-r*T)*Math.max(K-arithMean, 0);
		}

		var Pmean = R.util.average(arithPayoff);
		var Pstd = R.util.std(arithPayoff);
		var confmc = [Pmean-1.96*Pstd/Math.sqrt(m), Pmean+1.96*Pstd/Math.sqrt(m)];

		var putValue = [Pmean, confmc];
		return putValue;
	}

	return {
		callOption: callOption,
		putOption: putOption
	};

})();


