"use strict";
/*global alert: true, BST, ODSA, PARAMS */
$(document).ready(function () {
  // Process about button: Pop up a message with an Alert
  function about() {
    alert(ODSA.AV.aboutstring(interpret(".avTitle"), interpret("av_Authors")));
  }

  // Set click handlers
  $("#about").click(about);

  $("#container").bind("keypress", function(e) {
            if (e.keyCode == 13) {
                event.preventDefault();
            }
  });

  function formatLine(lineIndex){

  }


  function initialize() {

    //get the pseudo code used for this module and get the number of lines for iterating over the object.
    JSAV_EXERCISE_OPTIONS.code = "first";                 // get the code object
    pseudo = av.code(code[0]);
    codeLength = pseudo.element[0].childElementCount
    pseudo.hide();//hide the code because no more use

    if(arr){
      arr.clear();//clear the array if there is one
    }

    // console.log(pseudo.element[0])//visualize the Object structure for the code object

    //create a jsav array and add the code contents to the array indicies and format if in a function or not
    arr = av.ds.array(nextArray, {visible: true, center: true, layout: "vertical"});
    var infunction = false;
    for (var i = 0; i < codeLength; i++) {
      arr.value(i, pseudo.element[0].children[i].innerHTML)
      if(infunction){
        arr.css([i], {"text-align" : "left", "padding-left" : '40px'})
        arr.value(i, '\t' + arr.value(i))
      }else{
        arr.css([i], {"text-align" : "left", "padding-left" : '10px'})
      }
      if(arr.value(i).indexOf('{') > -1){
        arr.css([i], {"text-align" : "left"})
        infunction = true;
      }else if(arr.value(i).indexOf('}') > -1){
        arr.css([i], {"text-align" : "left", "padding-left" : '10px'})
        infunction = false;
      }
    }

    arr.layout();
    arr.click(clickHandler);

    var pointer = av.pointer("This", arr.index(0), {anchor: "left left",arrowAnchor: "left center", left: '-130px', top: '30px'});

    return arr;
  }


  function modelSolution(av) {
    var modelarr = arr;
    modelarr.layout();
    return arr;
  }

  var fixState = function(){

  }

  var clickHandler = function(index) {
    arr.highlight(index);
  };


  //////////////////////////////////////////////////////////////////
  // Start processing here
  //////////////////////////////////////////////////////////////////

  // AV variables
  var nextArray = [],
      pseudo,
      codeLength,
      arr

      // dir,
      //pastDir = "none"



  // Load the configurations created by odsaAV.js
  var config = ODSA.UTILS.loadConfig();
  var interpret = config.interpreter;
  var code = config.code;

  var settings = config.getSettings();

  // Create a JSAV instance
  var av = new JSAV($(".avcontainer"), {settings: settings}, {animationMode: "none"});

  av.recorded(); // we are not recording an AV with an algorithm

  var exercise = av.exercise(modelSolution, initialize,
                              {controls: $(".jsavexercisecontrols"), compare: {class: "jsavhighlight"}});
  exercise.reset();
});
