"use strict";
/*global alert: true, BST, ODSA, PARAMS */
$(document).ready(function () {
  // Process about button: Pop up a message with an Alert
  function about() {
    alert(ODSA.AV.aboutstring(interpret(".avTitle"), interpret("av_Authors")));
  }

  // Set click handlers
  $("#about").click(about);

  $(document).on('click', '#func', function() {
    input = document.getElementById('text').value;
    document.getElementById('text').value = ""; //clear the text box after submitted.
    compileInput(input);
  });


  function initialize() {
    av.clear();
    av._undo = [];

    // create the array of arrays
    var first_arr = []
    for (var i = 0; i < matrix_size; i++)
        first_arr[i] = " ";
    matrix[0] = first_arr
    for (var j = 1; j < matrix_size; j++) {
        var arr = []
        arr[0] = " ";
        for (var i = 1; i < matrix_size; i++)
            arr[i] = " ";
        matrix[j] = arr
    }

    user_matrix = av.ds.matrix(matrix, {style: "table"})
    user_matrix.addClass(0, 0, "circle");
    user_matrix.layout();

    for(var i = 0; i < 1; i++){
      // var tempDir = Math.floor((Math.random() * 6) + 1);
      var tempDir = 3;
      if (tempDir == 2){
        var dir = "left";
      }else if(tempDir == 3){
        var dir  = "right";
        var tempX = Math.floor((Math.random() * 10) + 1);
        user_matrix.addClass(0, tempX, "circleBlack");
      }else if(tempDir == 4){
        var dir = "up";
      }else{
        var dir = "down";
      }
    }
    var tempX = Math.floor((Math.random() * 10) + 1);
    var tempY = Math.floor((Math.random() * 10) + 1);

    av.displayInit();
    currentPosition = [0,0];

    return user_matrix;
  }

  //check if the sring is blank
  function isBlank(str){
    return (!str||/^\s*$/.test(str));
  }

  //Function to process the input the user types for the movement of the square. It dtermines the method used and the parameters passed in for distance to move.
  function compileInput(input){
    //begin by removing beginning and trailing spaces in the string typed by the user.
      input = input.replace(/^[ ]+|[ ]+$/g,'')
      //check if the string is empty or null and alert the user to type a function.
      if(isBlank(input)){
        alert("Please Type the function and parameters.");
        return;
      }

      var functionUsed = input.substring(0, input.indexOf('('));//split the function before the first perenthises to know the method name.
      var parameterUsed = input.substring(input.lastIndexOf("(") + 1, input.lastIndexOf(")")); //get the parameter of the distance passed in.

      //move the function linerly in the direction specified, if not alert the user. The current position keeps track of the position of the square.
      if (functionUsed == "move_down"){
        for(var i = currentPosition[1]; i < currentPosition[1] + Number(parameterUsed); i++){
          user_matrix.addClass(i, currentPosition[0], "circleGreen");
        }
        currentPosition[1] = currentPosition[1] + Number(parameterUsed);
        user_matrix.addClass(currentPosition[1], currentPosition[0], "circle");

      }else if(functionUsed == "move_up"){
        for(var i = currentPosition[1] - Number(parameterUsed) + 1; i < currentPosition[1] + 1; i++){
          user_matrix.addClass(i, currentPosition[0], "circleGreen");
        }
        currentPosition[1] = currentPosition[1] - Number(parameterUsed);
        console.log(currentPosition)
        user_matrix.addClass(currentPosition[1], currentPosition[0], "circle");

      }else if(functionUsed == "move_left"){
        for(var i = currentPosition[0] - Number(parameterUsed) + 1; i < currentPosition[0] + 1; i++){
          user_matrix.addClass(currentPosition[1], i, "circleGreen");
        }
        currentPosition[0] = currentPosition[0] - Number(parameterUsed);
        user_matrix.addClass(currentPosition[1], currentPosition[0], "circle");

      }else if(functionUsed == "move_right"){
        for(var i = currentPosition[0]; i < currentPosition[0] + Number(parameterUsed); i++){
          user_matrix.addClass(currentPosition[1], i, "circleGreen");
        }
        currentPosition[0] = currentPosition[0] + Number(parameterUsed);
        user_matrix.addClass(currentPosition[1], currentPosition[0], "circle");

      }else{
        alert("Please type in one of the four designated fucntions.");//if none of the 4 functions are used.
        return;
      }
  }

  function colorBackPath(){

  }

  function modelSolution(av) {

  }

  var fixState = function(){

  }

  var clickHandler = function () {

  };


  //////////////////////////////////////////////////////////////////
  // Start processing here
  //////////////////////////////////////////////////////////////////

  // AV variables
  var matrix_size = 16,
      matrix = [],
      user_matrix,
      input,
      currentPosition = [],
      destinations = []



  // Load the configurations created by odsaAV.js
  var config = ODSA.UTILS.loadConfig();
  var interpret = config.interpreter;
  var code = config.code;

  var settings = config.getSettings();

  // Create a JSAV instance
  var av = new JSAV($(".avcontainer"), {settings: settings}, {animationMode: "none"});

  av.recorded(); // we are not recording an AV with an algorithm

  var exercise = av.exercise(modelSolution, initialize,
                              {controls: $(".jsavexercisecontrols")}, {compare: {class: "jsavhighlight"}});
  exercise.reset();
});
