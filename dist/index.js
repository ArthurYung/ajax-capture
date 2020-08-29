
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
var AC = (function () {
    'use strict';

    var j = 1;
    var index = (function () {
        console.log(j);
        var map = new Map();
        map.set(1, 5);
    });

    return index;

}());
