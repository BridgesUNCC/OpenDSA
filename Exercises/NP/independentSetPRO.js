/*global define */
(function() {
  "use strict";
  var
    jsav,            // The JSAV object
    jsavGraph, adjacencyMat, solutionShowStat, 
    maxIS,
    Solution; // Boolean: Tells us if user ever did anything

  function calcMaxIS(){
    var nodenum = jsavGraph.nodeCount();
    var gnodes = jsavGraph.nodes();
    var subsets = new Array(2);
    var tmparr,prev=0;
    subsets[prev]= new Array(nodenum);
    for(var i=0;i<nodenum;i++){
      tmparr = new Array(1);
      tmparr[0]=i;
      subsets[prev][i]=tmparr;
    } 
    for(var n=2; n<=nodenum ;n++){
      subsets[(prev+1)%2] = [];
      var chk=0;
      for(var i=0;i<subsets[prev].length;i++){
        var start=getMaxOfArray(subsets[prev][i]);
        for(var j=start+1;j<nodenum;j++){
          tmparr=new Array(subsets[prev][i].length+1);
          for(var k=0;k<subsets[prev][i].length;k++)
            tmparr[k]=subsets[prev][i][k];
          var flag=0;
          for(var l=0;l<tmparr.length;l++)
            if(jsavGraph.hasEdge(gnodes[tmparr[l]],gnodes[j])){
              flag = 1;
              break;
            }
            if(flag==1)
              continue;
            chk=1;
            tmparr[k] = j;   
            subsets[(prev+1)%2].push(tmparr);
          }
        }
        if(chk==0){
          maxIS=subsets[prev].pop();
          return maxIS.length;
        }
        prev = (prev+1)%2;
      }
      return 1;
  }


  function getMaxOfArray(numArray) {
      return Math.max.apply(null,  numArray);
  }

  function populateAdjacencyMatrix(){
    var gnodes = jsavGraph.nodes();
    var n = gnodes.length;
    adjacencyMat = new Array(n);
    for(var i=0;i<n;i++){
      adjacencyMat[i] = new Array(n);
      for(j=0;j<n;j++){
        if(jsavGraph.hasEdge(gnodes[i], gnodes[j]))
    adjacencyMat[i][j]=1;
        else
    adjacencyMat[i][j]=0;
      }
    }

  }
  // Click event handler on the graph 
  var clickHandler = function () {
    var i,  edge;
     
  /*  if(this.hasClass('prohibited')){
      alert("Selecting two adjacent nodes violates the definition of Independent Set");
      return;
    }   
  */
    if (!this.hasClass('marked')) {
      this.addClass('marked');
      this.addClass('selected')
     // tmpnodes = this.neighbors();
    //  for(i = 0 ; i< tmpnodes.length; i++){
      //  tmpnodes[i].addClass('prohibited');
     // }
    }
    else if(this.hasClass('marked')) {
      this.removeClass('marked');
      this.removeClass('selected');
      //tmpnodes = this.neighbors();
      //for(i = 0 ; i< tmpnodes.length; i++){
       // tmpnodes[i].removeClass('prohibited');
        //var tmpnodes2 = tmpnodes[i].neighbors();
       // for(var j=0;j<tmpnodes2.length;j++) 
         // if(tmpnodes2[j].hasClass('marked')){
          //  tmpnodes[i].addClass('prohibited');
         //   break;
        //}      
      //}
    }
    independentSet_KA.userInput = true;
  };

  // reset function definition
  var f_reset = function () {
    if (jsavGraph) {
      var nodes = jsavGraph.nodes();
      for(var i=0;i<nodes.length;i++){
        nodes[i].removeClass('marked');
        nodes[i].removeClass('prohibited');
      }
    }
    independentSet_KA.userInput = false;
  };

  var f_solution = function () {
    var gnodes=jsavGraph.nodes();
    if(solutionShowStat==0){
      for(var i=0;i<gnodes.length;i++){
        gnodes[i].removeClass('marked');
        gnodes[i].removeClass('prohibited');
      }
      for(var i=0;i<maxIS.length;i++){
        gnodes[maxIS[i]].css({"background-color":"Orange","opacity":0.5});
      }
        solutionShowStat=1;
    }
    else{
      for(var i=0;i<maxIS.length;i++){
         gnodes[maxIS[i]].css({"background-color":"White","opacity":1});
      }
        solutionShowStat=0;
    }
  };
  var independentSet_KA = {
    // Initialise the exercise
    userInput:false,

    initJSAV:function (nnodes, nedges) {
      
      solutionShowStat=0;

      jsav = new JSAV("jsav");
    //  jsav.recorded();
      
      if (jsavGraph) {
          jsavGraph.clear();
      }

      jsavGraph = jsav.ds.graph({width: 400,  height: 280,  layout: "automatic",  
                                  directed: false});
      graphUtils.generate(jsavGraph, {weighted:false, nodes:nnodes, edges:nedges});
      jsavGraph.layout();

      // Bind the clickHandler to handle click events on the array
      jsavGraph.click(clickHandler);
      maxIS=[];
      calcMaxIS(); 
      var gnodes = jsavGraph.nodes();
      Solution="A Maximum Independent Set is : { "+gnodes[maxIS[0]].value();
      for(var i=1;i<maxIS.length;i++)
        Solution+=" , "+gnodes[maxIS[i]].value();
      Solution+=" }";
      jsav.displayInit();
      // Set up handler for reset button
      $("#reset").click(f_reset);
    },


    // Check user's answer for correctness: User's array must match answer
    checkAnswer:function () {
      var gnodes=jsavGraph.nodes();
      var ctr=0;
      var edges = jsavGraph.edges();
      for(var i=0;i<edges.length;i++)
           if(edges[i].start().hasClass('marked') && edges[i].end().hasClass('marked'))
              return false;
      for(var i=0;i<gnodes.length;i++)
        if(gnodes[i].hasClass('marked'))
          ctr++;
      if(ctr<maxIS.length)
        return false;
      return true;
      
    },
    // return the solution
    getSolution: function() {
      return Solution;
    },
  };

  window.independentSet_KA = window.independentSet_KA || independentSet_KA;

}());