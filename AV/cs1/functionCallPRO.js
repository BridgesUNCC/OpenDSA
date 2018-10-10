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

  //Check if the current direction generated is a valid direction based on if there is an element to move to
  // @param dir - the direction generated
  function checkDirection(dir, past){
    if(dir == "left"){
      if(destinations[0] === 0 || past == "left" || past == "right"){
        var dicision = true;
      }else{
        var dicision = false;
      }
    }else if(dir == "right"){
      if(destinations[0] === matrix_size-1 || past == "right" || past == "left"){
        var dicision = true;
      }else{
        var dicision = false;
      }
    }else if(dir == "up"){
      if (destinations[1] === 0 || past == "up" || past == "down"){
        var dicision = true;
      }else{
        var dicision = false;
      }
    }else if(dir == "down"){
      if(destinations[1] === matrix_size-1 || past == "down" || past == "up"){
        var dicision = true;
      }else{
        var dicision = false;
      }
    }
    return dicision;
  }


  function initialize() {
    av.clear();
    av._undo = [];

    var pastDir = "none";
    var count = 1;

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
    currentPosition = [0,0];
    destinations = [0,0];



    //Generate the destination points for the user to move the red square to
    for(var i = 0; i < 5; i++){
      var reroll = true;
      var dir;
      while(reroll != false){
        var tempDir = Math.floor((Math.random() * 5) + 1);
        switch(tempDir){
          case 1:
            var dir = "up";
            break;
          case 2:
            var dir = "left";
            break;
          case 3:
            var dir = "right";
            break;
          case 4:
            var dir = "down";
            break;
        }
        reroll = checkDirection(dir, pastDir);
      }
      if (dir == "left"){
        var tempX = Math.floor((Math.random() * (destinations[0]) + 1));
        user_matrix.value(destinations[1], destinations[0] - tempX, count);
        destinations[0] = destinations[0] - tempX;
      }else if(dir == "right"){
        var tempX = Math.floor((Math.random() * (matrix_size-1) - destinations[0]) + destinations[0]+1);
        user_matrix.value(destinations[1], tempX, count);
        destinations[0] = tempX;
      }else if(dir == "down"){
        var tempY = Math.floor((Math.random() * (matrix_size-1) - destinations[1]) + destinations[1]+1);
        user_matrix.value(tempY, destinations[0], count);
        destinations[1] = tempY;
      }else{
        var tempY = Math.floor((Math.random() * (destinations[1]) + 1));
        user_matrix.value(destinations[1] - tempY, destinations[0], count);
        destinations[1] = destinations[1] - tempY;
      }
      console.log(dir)
      pastDir = dir;
      count += 1;
    }

    av.displayInit();

    user_matrix.value(0,0,"♔")
    console.log(user_matrix.value(0,0));

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
                              {controls: $(".jsavexercisecontrols")}, {compare: {class: "jsavhighlight"}});
  exercise.reset();
});
