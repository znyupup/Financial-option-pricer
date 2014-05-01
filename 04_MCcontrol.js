'use strict';

var R  = R || {};
R.util = R.util || {};
R.control = R.control ||{};


//arithmetic Asian call/put options with control variates

//control variates = Geometric mean Asian.
R.control.GeoMean = (function(){

	function callOption (S, K, n, T, variance, r, m, geoK){

		if (geoK === undefined){
		geoK = K;}

		var drift = Math.exp((r-0.5*variance*variance)*(T/n));
		var arithPayoff = [];
		var geoPayoff = [];
		var product = [];

		for(var i = 0; i<m; i++){
			var spath = [];
			var former = S;
			for(var j = 0; j<n; j++){
				
				var growthFactor = drift*Math.exp(variance*Math.sqrt(T/n)*R.util.normNumber() );
				former = former*growthFactor;
				spath[j] = former;
			}

			var arithMean = R.util.average(spath);
			var geoMean = R.util.geoMean(spath);
			arithPayoff[i] = Math.exp(-r*T)*Math.max(arithMean-K, 0);
			geoPayoff[i] = Math.exp(-r*T)*Math.max(geoMean-K, 0);
			product[i] = arithPayoff[i]*geoPayoff[i];

		}

		//control variate
		var covXY = R.util.average(product) - R.util.average(arithPayoff)*R.util.average(geoPayoff);
		var theta = covXY/R.util.vari(geoPayoff);

		//Control Variate Version
		var geo = R.geo.Asian.callOption(S, K, n, T, variance, r);
		var Z = [];

		for (var a=0; a<arithPayoff.length; a++){
			Z[a] =  arithPayoff[a] + theta * (geo - geoPayoff[a]);
		}

		var Zmean = R.util.average(Z);
		var Zstd = R.util.std(Z);
		var confcv = [Zmean-1.96*Zstd/Math.sqrt(m), Zmean+1.96*Zstd/Math.sqrt(m)];

		var callValue = [Zmean, confcv];
		return callValue;
	}

	function putOption (S, K, n, T, variance, r, m, geoK){

		if (geoK === undefined){
		geoK = K;}

		var drift = Math.exp((r-0.5*variance*variance)*(T/n));
		var arithPayoff = [];
		var geoPayoff = [];
		var product = [];

		for(var i = 0; i<m; i++){
			var spath = [];
			var former = S;
			for(var j = 0; j<n; j++){
				
				var growthFactor = drift*Math.exp(variance*Math.sqrt(T/n)*R.util.normNumber() );
				former = former*growthFactor;
				spath[j] = former;
			}

			var arithMean = R.util.average(spath);
			var geoMean = R.util.geoMean(spath);
			arithPayoff[i] = Math.exp(-r*T)*Math.max(K-arithMean, 0);
			geoPayoff[i] = Math.exp(-r*T)*Math.max(K-geoMean, 0);
			product[i] = arithPayoff[i]*geoPayoff[i];

		}

		//control variate
		var covXY = R.util.average(product) - R.util.average(arithPayoff)*R.util.average(geoPayoff);
		var theta = covXY/R.util.vari(geoPayoff);

		//Control Variate Version
		var geo = R.geo.Asian.putOption(S, K, n, T, variance, r);
		var Z = [];

		for (var a=0; a<arithPayoff.length; a++){
			Z[a] =  arithPayoff[a] + theta * (geo - geoPayoff[a]);
		}

		var Zmean = R.util.average(Z);
		var Zstd = R.util.std(Z);
		var confcv = [Zmean-1.96*Zstd/Math.sqrt(m), Zmean+1.96*Zstd/Math.sqrt(m)];

		var putValue = [Zmean, confcv];
		return putValue;
	}

	return {
		callOption: callOption,
		putOption: putOption
	};

})();

//control variates = Geometric mean basket with adjusted strike.

R.control.GeoMeanWithAS = (function(){

	function callOption (S, K, n, T, variance, r, m){

		var a = Math.sqrt((n+1)*(2*n+1)/(6*n*n));
		var u = (r-0.5*variance*variance)*(n+1)/(2*n) + 0.5*a*a;

		var Eag = S*Math.exp(u*T);
		var Eaa;

		for(var i = 0; i<n; i++){
			var sum = Math.exp(r*(i+1)*T/n);
			Eaa = Eaa + sum;
		}

		Eaa = Eaa*S/n;
		var geoK = K + Eag -Eaa;
		var callValue = R.control.GeoMean.callOption(S, K, n, T, variance, r, m, geoK);

		return callValue;
	}

	function putOption (S, K, n, T, variance, r, m){

		var a = Math.sqrt((n+1)*(2*n+1)/(6*n*n));
		var u = (r-0.5*variance*variance)*(n+1)/(2*n) + 0.5*a*a;

		var Eag = S*Math.exp(u*T);
		var Eaa;

		for(var i = 0; i<n; i++){
			var sum = Math.exp(r*(i+1)*T/n);
			Eaa = Eaa + sum;
		}

		Eaa = Eaa*S/n;
		var geoK = K + Eag -Eaa;
		var callValue = R.control.GeoMean.putOption(S, K, n, T, variance, r, m, geoK);

		return callValue;
	}

	return {
		callOption: callOption,
		putOption: putOption
	};


})();
