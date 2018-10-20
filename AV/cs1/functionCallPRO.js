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

  //Take in the function selected from the dropdown list and the parameter the user specifies. Concatinates the number as the paramter and adds this to the textarea
  $(document).on('click', '#funcAdd', function() {
    param = document.getElementById('para').value;
    if(param.length === 0 || !param.trim()){
      alert("Please enter a number as parameter");
      return;
    }
    input = document.getElementById('func').value;
    var tempPos = input.indexOf("(") + 1;
    input = [input.slice(0, tempPos), param, input.slice(tempPos)].join('');

    var textareaContent = document.getElementById('functext').value;
    if (functionCount == 0){
        input = '\n' + '\t' + input + ';';
        tempPos = textareaContent.indexOf('{') + 1;
        textareaContent=[textareaContent.slice(0,tempPos),input,textareaContent.slice(tempPos)].join('');
        document.getElementById('functext').value = textareaContent;
    }else{
        input = '\t' + input + ';\n';
        tempPos = textareaContent.indexOf('}');
        textareaContent=[textareaContent.slice(0,tempPos),input,textareaContent.slice(tempPos)].join('');
        document.getElementById('functext').value = textareaContent;
    }
    functionCount += 1;
  });

  //this ges the substring between {} and runs each individual method within it
  $(document).on('click', '#run', function() {
    var textareaContent = document.getElementById('functext').value;
    var tempPos1 = textareaContent.indexOf("{") + 1;//position of {
    var tempPos2 = textareaContent.indexOf("}");//position of }
    functionSubstring = textareaContent.substring(tempPos1, tempPos2);//gets the substring between them
    functionSubstring = functionSubstring.replace(/\s/g, "");//removes whitespace
    functionSubstring = functionSubstring.split(';');//puts each method in an array by dilimeter ';'
    for (i=0; i<functionSubstring.length; i++){
      compileInput(functionSubstring[i]);//compile each function
    }
    document.getElementById('functext').value = textareaContent.replace(textareaContent.substring(tempPos1, tempPos2), "\n")
  });

  $(document).on('click', '#remove', function() {
    var textareaContent = document.getElementById('functext').value;
    var tempPos1 = textareaContent.indexOf("{") + 1;//position of {
    var tempPos2 = textareaContent.indexOf("}");//position of }
    functionSubstring = textareaContent.substring(tempPos1, tempPos2);//gets the substring between them
    functionSubstring = functionSubstring.replace(/\s/g, "");//removes whitespace
    functionSubstring = functionSubstring.split(';');//puts each method in an array by dilimeter ';'
    functionSubstring.pop();//remove the last function in the main method.
    functionSubstring.pop();//remove the last function in the main method.
    document.getElementById('functext').value = textareaContent.replace(textareaContent.substring(tempPos1, tempPos2), "\n")
    textareaContent = document.getElementById('functext').value;

    for(i = 0; i < functionSubstring.length; i++){
      if (i == 0){
          input = '\n' + '\t' + functionSubstring[i] + ';';
          textareaContent=[textareaContent.slice(0,tempPos1),input,textareaContent.slice(tempPos1)].join('');
          document.getElementById('functext').value = textareaContent;
          console.log(textareaContent)
      }else{
          input = '\t' + functionSubstring[i] + ';\n';
          var tempPos = textareaContent.indexOf('}');
          textareaContent=[textareaContent.slice(0,tempPos),input,textareaContent.slice(tempPos)].join('');
          document.getElementById('functext').value = textareaContent;
          console.log(textareaContent)
      }
      tempFunctionCount += 1;
    }
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
      // if(isBlank(input)){
      //   alert("Please Type the function and parameters.");
      //   return;
      // }

      var functionUsed = input.substring(0, input.indexOf('('));//split the function before the first perenthises to know the method name.
      var parameterUsed = input.substring(input.lastIndexOf("(") + 1, input.lastIndexOf(")")); //get the parameter of the distance passed in.

      //move the function linerly in the direction specified, if not alert the user. The current position keeps track of the position of the square.
      if (functionUsed == "move_down"){
        if(Number(parameterUsed) + currentPosition[1] >= matrix_size){
          alert("One ore more functions moves square out of bounds.");
          return;
        }
        for(var i = currentPosition[1]; i < currentPosition[1] + Number(parameterUsed); i++){
          user_matrix.addClass(i, currentPosition[0], "circleGreen");
        }
        currentPosition[1] = currentPosition[1] + Number(parameterUsed);
        user_matrix.removeClass(currentPosition[1], currentPosition[0], "circleGreen");
        user_matrix.addClass(currentPosition[1], currentPosition[0], "circle");

      }else if(functionUsed == "move_up"){
        if(currentPosition[1] - Number(parameterUsed) < 0){
          alert("One ore more functions moves square out of bounds.");
          return;
        }
        for(var i = currentPosition[1] - Number(parameterUsed) + 1; i < currentPosition[1] + 1; i++){
          user_matrix.addClass(i, currentPosition[0], "circleGreen");
        }
        currentPosition[1] = currentPosition[1] - Number(parameterUsed);
        console.log(currentPosition)
        user_matrix.removeClass(currentPosition[1], currentPosition[0], "circleGreen");
        user_matrix.addClass(currentPosition[1], currentPosition[0], "circle");

      }else if(functionUsed == "move_left"){
        if(currentPosition[0] - Number(parameterUsed) < 0){
          alert("One ore more functions moves square out of bounds.");
          return;
        }
        for(var i = currentPosition[0] - Number(parameterUsed) + 1; i < currentPosition[0] + 1; i++){
          user_matrix.addClass(currentPosition[1], i, "circleGreen");
        }
        currentPosition[0] = currentPosition[0] - Number(parameterUsed);
        user_matrix.removeClass(currentPosition[1], currentPosition[0], "circleGreen");
        user_matrix.addClass(currentPosition[1], currentPosition[0], "circle");

      }else if(functionUsed == "move_right"){
        if(Number(parameterUsed) + currentPosition[0] >= matrix_size){
          alert("One ore more functions moves square out of bounds.");
          return;
        }
        for(var i = currentPosition[0]; i < currentPosition[0] + Number(parameterUsed); i++){
          user_matrix.addClass(currentPosition[1], i, "circleGreen");
        }
        currentPosition[0] = currentPosition[0] + Number(parameterUsed);
        user_matrix.removeClass(currentPosition[1], currentPosition[0], "circleGreen");
        user_matrix.addClass(currentPosition[1], currentPosition[0], "circle");

      }//else{
      //   alert("Please type in one of the four designated fucntions.");//if none of the 4 functions are used.
      //   return;
      // }
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
      functionCount = 0,
      tempFunctionCount = 0,
      param,
      functionSubstring,
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
