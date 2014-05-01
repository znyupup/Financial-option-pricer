'use strict';

var R  = R || {};
R.util = R.util || {};
R.euro = R.euro ||{};

//European call/put options: 01_blackShores
R.euro = (function(){

    function callOption (S, K, t, T, variance, r){
        var time  = T -t;
        var d1, d2;
        d1 = (Math.log(S/K)+r*time)/(variance*Math.sqrt(time)) + 0.5*variance*Math.sqrt(time);
        d2 = (Math.log(S/K)+r*time)/(variance*Math.sqrt(time)) - 0.5*variance*Math.sqrt(time);
        
        var Nd1, Nd2;
        Nd1 = R.util.norm(d1);
        Nd2 = R.util.norm(d2);

        var callValue = S*Nd1 - K*Math.exp(-r*time)*Nd2;
        return callValue;
    }

    function putOption (S, K, t, T, variance, r) {
        var time  = T -t;
        var d1, d2;
        d1 = (Math.log(S/K)+r*time)/(variance*Math.sqrt(time)) + 0.5*variance*Math.sqrt(time);
        d2 = (Math.log(S/K)+r*time)/(variance*Math.sqrt(time)) - 0.5*variance*Math.sqrt(time);
        
        var Nd1, Nd2;
        Nd1 = R.util.norm(-d1);
        Nd2 = R.util.norm(-d2);

        var putValue = K*Math.exp(-r*time)*Nd2 - S*Nd1;
        return putValue;
    }

    return {
        callOption: callOption,
        putOption: putOption
    };


})();



