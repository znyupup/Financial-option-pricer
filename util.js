'use strict';

var R  = R || {};

R.util = R.util || {};
R.util.norm = function (d)
{
    var mean  = 0;
    var sigma = 1;
    var z = (d-mean)/Math.sqrt(2*sigma*sigma);
    var t = 1/(1+0.3275911*Math.abs(z));
    var a1 =  0.254829592;
    var a2 = -0.284496736;
    var a3 =  1.421413741;
    var a4 = -1.453152027;
    var a5 =  1.061405429;
    var erf = 1-(((((a5*t + a4)*t) + a3)*t + a2)*t + a1)*t*Math.exp(-z*z);
    var sign = 1;
    if(z < 0)
    {
        sign = -1;
    }
    return (1/2)*(1+sign*erf);
};


R.util.normNumber = function(mean, variance) {
  if (mean === undefined){
    mean = 0.0;}
    if (variance === undefined){
        variance = 1.0;}
        var V1, V2, S;
        do {
            var U1 = Math.random();
            var U2 = Math.random();
            V1 = 2 * U1 - 1;
            V2 = 2 * U2 - 1;
            S = V1 * V1 + V2 * V2;
        } while (S > 1);

        var X = Math.sqrt(-2 * Math.log(S) / S) * V1;
//  Y = Math.sqrt(-2 * Math.log(S) / S) * V2;
X = mean + Math.sqrt(variance) * X;
//  Y = mean + Math.sqrt(variance) * Y ;
return X;
};

R.util.average = function (arrays){
    var sum = 0;
    for(var x = 0; x < arrays.length; x ++){
        sum = sum + arrays[x];
    }
    var average = sum / arrays.length;
    return average;
};

R.util.std = function (arrays){
    var sum = 0;
    var average = R.util.average(arrays);

    for(var y = 0; y < arrays.length; y ++){
        sum = sum + (arrays[y]-average)*(arrays[y]-average);
    }

    var variance = Math.sqrt(sum / arrays.length);
    return variance;
};

R.util.vari = function (arrays){
    var sum = 0;
    var average = R.util.average(arrays);

    for(var y = 0; y < arrays.length; y ++){
        sum = sum + (arrays[y]-average)*(arrays[y]-average);
    }

    var variance = sum / arrays.length;
    return variance;
};

R.util.geoMean = function (arrays){
    var sum = 0;

    for(var y = 0; y < arrays.length; y ++){
        sum = sum + Math.log(arrays[y]);
    }

    var geoMean = Math.exp(sum/arrays.length);
    return geoMean;
};

