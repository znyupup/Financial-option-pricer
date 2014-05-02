// 'use strict';

// var R  = R || {};
// R.util = R.util || {};

// var S = 100;
// var K = 100;
// var T = 3;
// var variance = 0.3;
// var r = 0.05;
// var m = 10000;
// var n = 50;
// var t = 0;

// var S1 = 100;
// var S2 = 100;
// var var1 = 0.3;
// var var2 = 0.3;
// var p = 0.5;

// console.log('-----------Question 1 ------------');
// console.log(R.euro.callOption(S, K, t, T, variance, r));
// console.log(R.euro.putOption(S, K, t, T, variance, r));

// console.log('-----------Question 2 ------------');
// console.log('geometric Asian call/put options:');
// console.log(R.geo.Asian.callOption(S, K, n, T, variance, r));
// console.log(R.geo.Asian.putOption(S, K, n, T, variance, r));
// console.log('geometric basket call/put options:');
// console.log(R.geo.basket.callOption(S1, S2, K, T, var1, var2, p, r));
// console.log(R.geo.basket.putOption(S1, S2, K, T, var1, var2, p, r));

// console.log('-----------Question 3 ------------');
// console.log('arithmetic Asian call/put options, control = standard' );
// console.log('callOption:',R.std.Asian.callOption(S, K, T, variance, r, m , n));
// console.log('putOption:',R.std.Asian.putOption(S, K, T, variance, r, m , n));
// console.log('arithmetic basket call/put options: control = standard');
// console.log('callOption:',R.std.basket.callOption(S1, S2, K, T, var1, var2, r, m, p));
// console.log('putOption: ',R.std.basket.putOption(S1, S2, K, T, var1, var2, r, m, p));

// console.log('-----------Question 4.1 ------------');
// console.log('Arithmetic Asian call/put options.');
// console.log('control variates = Geometric mean Asian.');
// console.log('callOption:',R.control.GeoMean.callOption(S, K, n, T, variance, r, m));
// console.log('putOption:',R.control.GeoMean.putOption(S, K, n, T, variance, r, m));

// console.log('-----------Question 4.2 ------------');
// console.log('Arithmetic Asian call/put options.');
// console.log('control variates = adjusted strike.');
// console.log('callOption:',R.control.GeoMeanWithAS.callOption(S, K, n, T, variance, r, m));
// console.log('putOption:',R.control.GeoMeanWithAS.putOption(S, K, n, T, variance, r, m));

// console.log('-----------Question 5.1 ------------');
// console.log('Arithmetic mean basket call/put options.');
// console.log('control variates = Geometric mean basket..');
// console.log('callOption:',R.basketControl.GeoMean.callOption(S1, S2, K, T, var1, var2, r, m, p));
// console.log('putOption:',R.basketControl.GeoMean.putOption(S1, S2, K, T, var1, var2, r, m, p));

// console.log('-----------Question 5.2 ------------');
// console.log('Arithmetic mean basket call/put options.');
// console.log('control variates = adjusted strike.');
// console.log('callOption:', R.basketControl.GeoMeanWithAS.callOption(S1, S2, K, T, var1, var2, r, m, p));
// console.log('putOption:', R.basketControl.GeoMeanWithAS.putOption(S1, S2, K, T, var1, var2, r, m, p));


