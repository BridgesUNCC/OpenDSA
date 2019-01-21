document.write('<script src="../../../AV/Development/formal_language/contextFree/ParseTree.js"></script>');
document.write('<script src="../../../AV/FLA/resources/underscore-min.js"></script>');

$(document).ready(function() {
"use strict";
var av_name = "ParseTree1CON";
var av = new JSAV(av_name);
var arrow = String.fromCharCode(8594);
var grammar = "[[\"S\",\"→\",\"AcB\"],[\"A\",\"→\",\"aAa\"],[\"A\",\"→\",\"λ\"],[\"B\",\"→\",\"Bbb\"],[\"B\",\"→\",\"λ\"]]";
var grammerArray = JSON.parse(grammar);
var lastRow = grammerArray.length;
grammerArray.push(["", arrow, ""]);
var grammerMatrix = av.ds.matrix(grammerArray, {style: "table", left: 10});
av.displayInit();
var pt = new ParseTreeController(av, grammar, "aacbb", {top: 0, left: 400});
pt.displayTree();

av.recorded();
});
