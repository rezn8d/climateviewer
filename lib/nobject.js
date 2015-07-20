"use strict";


/** schema table reserved NObject field names */
var nfield = {
    'I': {
        N: 'id'
    },
    'N': {
        N: 'name'
    },
    '>': {
        N: 'contains' /* extensional inheritance */
    }
};


function nobjectize(x) {
    if (!x.I) {
        if (x.N)
            x.I = x.N;
        else
            x.I = '_' + parseInt(Math.random() * 10000000.0);  //TODO uuid
    }

    return x;
}

function nobjectsIn(x, onVertex /* (contained, container) */, onEdge) {

    x = nobjectize(x);

    var kk = Object.keys(x);


    for (var i = 0; i < kk.length; i++) {

        var k = kk[i];

        if (!nfield[k]) {
            var w = x[k];

            if (!w || typeof(w)!=='object')
                continue;

            w = nobjectize(w);

            onVertex(w, x);

            onEdge(x, '>', w);

            nobjectsIn(w, onVertex, onEdge);
        }
    }

    var arrayContents;
    if (arrayContents = x['>']) {
        for (var i = 0; i < arrayContents.length; i++) {

            var ac = arrayContents[i];

            if (ac) {
                var w = nobjectize(ac);

                onVertex(w, x);

                onEdge(x, '>', w);

                nobjectsIn(w, onVertex, onEdge);
            }
        }

    }
};







/** graph memory */
function Self() {

    var g = new graphlib.Graph();


    g.addEdge = function(s, p, o) {

        var si = s.I;

        if (!p && !o) {
            g._index(si, s);
            return s;
        }

        var oi = o.I;
        if (typeof(p)!=="string") {
            console.error('invalid edge type: ' + p);
            return null;
        }

        g.setNode(si, s);
        g.setNode(oi, o);
        g.setEdge(si, oi, p);



        return p;
    };


    return g;
}

/*
 var layers = require('./climate-viewer-layers.js');

 //console.log(layers);

 var graph = require('./graph/graph.js');


var self = Self();

nobjectsIn(layers, function(x) {
    //console.log(x);

}, function(s, p, o) {
    self.addEdge(s, p, o);
});

console.log(self.order(), self._vertices, self._vertex );


    */