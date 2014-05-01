'use strict';

var R  = R || {};
R.util = R.util || {};
R.basketControl = R.basketControl ||{};

//Arithmetic mean basket call/put options

// Control = Geometric mean basket
R.basketControl.GeoMean = (function(){

	function callOption (S1, S2, K, T, var1, var2, r, m, p, geoK){

		if (geoK === undefined){
		geoK = K;}

		var arithPayoff = [];
		var geoPayoff = [];
		var product = [];

		for(var i = 0; i<m; i++){
			var ran1, ran2;
			ran1 = R.util.normNumber();
			ran2 = p*ran1 + Math.sqrt(1-p*p)*R.util.normNumber();

			var a1 = S1*Math.exp((r-0.5*var1*var1)*T+ var1*Math.sqrt(T)*ran1);
			var a2 = S2*Math.exp((r-0.5*var2*var2)*T+ var2*Math.sqrt(T)*ran2);

			var arithMean = (a1+a2)/2;
			var geoMean = Math.sqrt(a1*a2);

			arithPayoff[i] = Math.exp(-r*T)*Math.max(arithMean-K, 0);
			geoPayoff[i] = Math.exp(-r*T)*Math.max(geoMean-geoK, 0);
			product[i] = arithPayoff[i]*geoPayoff[i];
		}

		//control variate
		var covXY = R.util.average(product) - R.util.average(arithPayoff)*R.util.average(geoPayoff);
		var theta = covXY/R.util.vari(geoPayoff);

		//Control Variate Version
		var geo = R.geo.basket.callOption(S1, S2, geoK, T, var1, var2, p, r);
		
		var Z = [];
		for (var a=0; a<arithPayoff.length; a++){
			Z[a] =  arithPayoff[a] + theta * (geo - geoPayoff[a]);
		}

		var Zmean = R.util.average(Z);
		var Zstd = R.util.std(Z);
		var confmc = [Zmean-1.96*Zstd/Math.sqrt(m), Zmean+1.96*Zstd/Math.sqrt(m)];

		var callValue = [Zmean, confmc];
		return callValue;
	}


	function putOption (S1, S2, K, T, var1, var2, r, m, p, geoK){

		if (geoK === undefined){
		geoK = K;}

		var arithPayoff = [];
		var geoPayoff = [];
		var product = [];

		for(var i = 0; i<m; i++){
			var ran1, ran2;
			ran1 = R.util.normNumber();
			ran2 = p*ran1 + Math.sqrt(1-p*p)*R.util.normNumber();

			var a1 = S1*Math.exp((r-0.5*var1*var1)*T+ var1*Math.sqrt(T)*ran1);
			var a2 = S2*Math.exp((r-0.5*var2*var2)*T+ var2*Math.sqrt(T)*ran2);

			var arithMean = (a1+a2)/2;
			var geoMean = Math.sqrt(a1*a2);

			arithPayoff[i] = Math.exp(-r*T)*Math.max(K-arithMean, 0);
			geoPayoff[i] = Math.exp(-r*T)*Math.max(geoK-geoMean, 0);
			product[i] = arithPayoff[i]*geoPayoff[i];
		}

		//control variate
		var covXY = R.util.average(product) - R.util.average(arithPayoff)*R.util.average(geoPayoff);
		var theta = covXY/R.util.vari(geoPayoff);

		//Control Variate Version
		var geo = R.geo.basket.putOption(S1, S2, geoK, T, var1, var2, p, r);
		
		var Z = [];
		for (var a=0; a<arithPayoff.length; a++){
			Z[a] =  arithPayoff[a] + theta * (geo - geoPayoff[a]);
		}

		var Zmean = R.util.average(Z);
		var Zstd = R.util.std(Z);
		var confmc = [Zmean-1.96*Zstd/Math.sqrt(m), Zmean+1.96*Zstd/Math.sqrt(m)];

		var putValue = [Zmean, confmc];
		return putValue;
	}
	
	return {
		callOption: callOption,
		putOption: putOption
	};

})();


R.basketControl.GeoMeanWithAS = (function(){

	function callOption (S1, S2, K, T, var1, var2, r, m, p){

		var B = Math.sqrt(S1*S2);

		var a, u;
		a = Math.sqrt(var1*var1 + var1*var2*p + var2*var1*p + var2*var2)/2;
		u = r - 0.5*(var1*var1 + var2*var2)/2 + 0.5*a*a;

		var Ebg = B*Math.exp(u*T);
		var Eba = (S1*Math.exp(r*T) + S2*Math.exp(r*T))/2;

		var geoK = K + Ebg -Eba;
		var callValue = R.basketControl.GeoMean.callOption(S1, S2, K, T, var1, var2, r, m, p, geoK);

		return callValue;
	}

	function putOption (S1, S2, K, T, var1, var2, r, m, p){

		var B = Math.sqrt(S1*S2);

		var a, u;
		a = Math.sqrt(var1*var1 + var1*var2*p + var2*var1*p + var2*var2)/2;
		u = r - 0.5*(var1*var1 + var2*var2)/2 + 0.5*a*a;

		var Ebg = B*Math.exp(u*T);
		var Eba = (S1*Math.exp(r*T) + S2*Math.exp(r*T))/2;

		var geoK = K + Ebg -Eba;

		var putValue = R.basketControl.GeoMean.putOption(S1, S2, K, T, var1, var2, r, m, p, geoK);
		return putValue;
	}

	return {
		callOption: callOption,
		putOption: putOption
	};


})();