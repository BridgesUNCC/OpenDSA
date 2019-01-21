"use strict";
/*global alert: true, BST, ODSA, PARAMS */
$(document).ready(function () {
  // Process about button: Pop up a message with an Alert
  function about() {
    alert(ODSA.AV.aboutstring(interpret(".avTitle"), interpret("av_Authors")));
  }

  // Set click handlers
  $("#about").click(about);

  //recursive function to grayout the entire bst
  //@param root - is the root of the tree to start
  function grayOut(root){
    root.css({"background-color": "gray"});
    if(!root.left() && !root.right()){
      return;
    }
    if(root.left()){
      grayOut(root.left());
    }
    if(root.right()){
      grayOut(root.right());
    }
  }


  function initialize() {
    function dataTest(array) {
      var bst = av.ds.binarytree();
      bst.insert(array);
      var result = bst.height() <= maxHeight;
      bst.clear();
      return result;
    }

    insertArray = JSAV.utils.rand.numKeys(10, 100, insertSize, {test: dataTest, tries: 10});
    if (stack) {
      stack.clear();
    }
    stack = av.ds.stack({center: true, xtransition: 10, ytransition: -3});
    //pick the values to delete and push them in the stack
    for (var i = 0; i < insertSize; i++) {
      stack.addLast(insertArray[i]);
    }
    stack.first().highlight();
    stack.layout();

    if (jsavTree) {
      jsavTree.clear();
    }
    //generate random tree
    jsavTree = av.ds.binarytree({center: true, visible: true, nodegap: 25});
    do {
      initialArray = [];
      perfectBinTree(initialArray, 1, 10, 100, 3, 1);
      initialArray = initialArray.concat(JSAV.utils.rand.numKeys(10, 100, treeSize-7));
    } while (!dataTest(initialArray));
    jsavTree.insert(initialArray);
    jsavTree.click(clickHandler);
    grayOut(jsavTree.root());
    jsavTree.root().highlight();
    jsavTree.root().left().css({"background-color": "white"});
    jsavTree.root().right().css({"background-color": "white"});
    jsavTree.layout();

    av.container.find(".jsavcanvas").css("min-height", 442);

    return jsavTree;
  }

  function modelSolution(av) {
    var i;
    av._undo = [];
    var modelStack = av.ds.stack({center: true});
    for (i = 0; i < insertSize; i++) {
      modelStack.addLast(insertArray[i]);
    }
    modelStack.layout();
    modelStack.first().highlight();

    var modelTree = av.ds.binarytree({center: true, visible: true, nodegap: 20});
    modelTree.insert(initialArray);
    grayOut(modelTree.root());
    modelTree.root().highlight();
    modelTree.root().left().css({"background-color": "white"});
    modelTree.root().right().css({"background-color": "white"});
    modelTree.layout();
    av.displayInit();

     for (i = 0; i < insertSize; i++){
       var val = insertArray[i];
       var node = modelTree.root();
       while(node.value() != "?"){
         if(!node.left() || !node.right()){
           if (!node.left()){
             node.left("?");
             modelTree.layout();
           }
           if (!node.right()){
             node.right("?");
             modelTree.layout();
           }
         }
        //  av.step();
         if(val <= node.value()){
           if(node.left().value() == "?"){
             node = node.left();
             break;
           }
           node.left().highlight();
           node = node.left();
           if(!node.left() || !node.right()){
             if (!node.left()){
               node.left("?");
               modelTree.layout();
             }
             if (!node.right()){
               node.right("?");
               modelTree.layout();
             }
           }
           if(node.left()){
             node.left().css({"background-color": "white"});
           }
           if(node.right()){
             node.right().css({"background-color": "white"});
           }
           node.edgeToParent().addClass("blueline");
           av.gradeableStep();

         } else {
           if(node.right().value() == "?"){
             node = node.right();
             break;
           }
           node.right().highlight();
           node = node.right();
           if(!node.left() || !node.right()){
             if (!node.left()){
               node.left("?");
               //modelTree.layout();
             }
             if (!node.right()){
               node.right("?");
               //modelTree.layout();
             }
           }
           if(node.left()){
             node.left().css({"background-color": "white"});
           }
           if(node.right()){
             node.right().css({"background-color": "white"});
           }
           node.edgeToParent().addClass("blueline");
           //av.gradeableStep();
           modelTree.layout();
           av.gradeableStep();
         }
       }
       node.value(val);
       removeStyle(node);
       removeEmpty(modelTree.root());
       removeStyle(modelTree.root());
       grayOut(modelTree.root());
       modelTree.root().highlight();
       modelTree.root().left().css({"background-color": "white"});
       modelTree.root().right().css({"background-color": "white"});
       modelTree.layout();
       modelStack.removeFirst();
       modelStack.layout();
       if (modelStack.first()) {
         modelStack.first().highlight();
       }
       av.gradeableStep();
    }

    return modelTree;
  }

  //recursive function to remove the highlighing of tree nodes and edges
  //@param node - root node to start at
  function removeStyle(node){
    node.unhighlight();
    if(node.edgeToParent()){
      node.edgeToParent().removeClass("blueline");
    }
    if(node.left() || node.right()){
      if(node.left()){
        node.left().unhighlight();
        removeStyle(node.left());
      }
      if(node.right()){
        node.right().unhighlight();
        removeStyle(node.right());
      }
    }else{
      return;
    }
  }

  function removeEmpty(node){
    if (node.value() == "?"){
      node.remove();
    }
    if (node.left()){
      removeEmpty(node.left())
    }
    if (node.right()){
      removeEmpty(node.right())
    }
    if (!node.left() && !node.right()){
      return;
    }
  }

  function checkPath(node){
    if(node.value() == jsavTree.root().value()){
      if(node.isHighlight()){
        pathcomplete = true;
        return;
      }else{
        pathcomplete = false;
        return;
      }
    }
    else{
      node = node.parent();
      if(node.isHighlight()){
        checkPath(node);
        //return true;
      }else{
        pathcomplete = false;
        return;
      }
    }
  }

  var clickHandler = function () {
    BST.turnAnimationOff();
    if (stack.size() && this.parent().isHighlight()) {
      if(!this.left()){
        this.edgeToParent().addClass("blueline");
        this.addChild("?");
        this.highlight();
      }
      if(!this.right()){
        this.edgeToParent().addClass("blueline");
        this.addChild("?");
        this.highlight();
      }
      jsavTree.layout();
      av.step();
      if(this.value != "?"){
        this.highlight();
        //set the children of the new explored node to be 'white'
        if(this.left()){
          this.left().css({"background-color": "white"});
        }
        if(this.right()){
          this.right().css({"background-color": "white"});
        }
        this.edgeToParent().addClass("blueline");
        jsavTree.layout();
        if(this.value() != "?"){
          exercise.gradeableStep();
        }
      }
      if(this.value() == "?"){
        this.value(stack.first().value());
        removeStyle(jsavTree.root());
        removeEmpty(jsavTree.root());
        grayOut(jsavTree.root());
        jsavTree.root().highlight();
        jsavTree.root().left().css({"background-color": "white"});
        jsavTree.root().right().css({"background-color": "white"});
        stack.removeFirst();
        stack.layout();
        jsavTree.layout();
        if(stack.first()){
          stack.first().highlight();
        }
        exercise.gradeableStep();
      }
      jsavTree.layout();
    }
  };

  // helper function for creating a perfect binary tree

  function perfectBinTree(arr, level, min, max, levelsInTotal, arrayIndex) {
    var diff = max - min;
    var value = JSAV.utils.rand.numKey(min + Math.floor(diff / 3), max - Math.floor(diff / 3));
    arr[arrayIndex - 1] = value;
    if (level < levelsInTotal) {
      perfectBinTree(arr, level + 1, min, value - 1, levelsInTotal, 2 * arrayIndex);
      perfectBinTree(arr, level + 1, value + 1, max, levelsInTotal, 2 * arrayIndex + 1);
    }
  }

  //////////////////////////////////////////////////////////////////
  // Start processing here
  //////////////////////////////////////////////////////////////////

  // AV variables
  var initialArray = [],
      insertArray = [],
      jsavTree,
      stack,
      pathcomplete,
      insertSize = 5,
      treeSize = 14,          //20 nodes
      maxHeight = 6,
      pseudo,

      // Load the configurations created by odsaAV.js
      config = ODSA.UTILS.loadConfig(),
      interpret = config.interpreter,
      //code = config.code,
      //codeOptions = {after: {element: $(".instructions")}, visible: false},

      // Settings for the AV
      settings = config.getSettings(),

      // Create a JSAV instance
      av = new JSAV($(".avcontainer"), {settings: settings});

  av.recorded(); // we are not recording an AV with an algorithm

  // show a JSAV code instance only if the code is defined in the parameter
  // and the parameter value is not "none"
  // if (code) {
  //   pseudo = av.code($.extend(codeOptions, code));
  // }

  var exercise = av.exercise(modelSolution, initialize,
                              {controls: $(".jsavexercisecontrols"), compare: {class: "jsavhighlight"}});
  exercise.reset();
});
