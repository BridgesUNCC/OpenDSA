"use strict";

$(document).ready(function() {
	// Process about button: Pop up a message with an Alert
	function about() {
		alert(ODSA.AV.aboutstring(interpret(".avTitle"), interpret("av_Authors")));
	}
	$('#about').click(about);

	// Processes the reset button
	function initialize() {
		if(stack)
			stack.clear(); // clear number in the stack
		if(userArr)
			userArr.clear(); // clear the array
		// generate the array
		initialArray = genArrNoRepeat(89, arraySize)
		stack = createStackLayout(av);
		stackArray = [];
		for(var i = 0; i < stackSize; i++) {
			var new_val = initialArray[Math.floor(Math.random() * initialArray.length)];
			stack.addLast(new_val);
			stackArray[i] = new_val;
		}
		// highlight the stack's top number
		stack.first().highlight();
		stack.layout();
		// Create the array the user will intereact with
		userArr = createArrayLayout(av, initialArray, false, arrayLayout.val())
		return userArr;
	}

	// Create the model solution for grading the exercise
	function modelSolution(modelav) {
		modelStack = createStackLayout(modelav);
		modelStack = buildStackFromArr(stackArray, stackSize, modelStack)
		modelStack.layout();
		modelStack.first().highlight();
		// Initialize the display or the model answer won't show up until
		// the second step of the slideshow
		var modelArr = createArrayLayout(modelav, initialArray, true, arrayLayout.val())
		modelav.displayInit();
		// while the model stack contains values
		while(modelStack.size() > 0) {
			var ind = 1;
			modelArr.highlight(0);
			modelav.step();
			while(modelArr.value(ind) <= modelStack.first().value()) {
				modelArr.unhighlight(ind - 1);
				modelArr.highlight(ind);
				modelav.step();
				ind++;
			}
			ind--;
			modelArr.unhighlight(ind);
			modelArr.addClass(ind, "correctIndex");
			modelStack.removeFirst();
			modelav.gradeableStep();
			modelArr.removeClass(getFirstIndWithClass(modelArr, "correctIndex"), "correctIndex");
		}
		return modelArr;
	}

	// Fixstate function called if continuous feedback/fix mode is used
	function fixState(modelState) {
		var modelArray = modelState[0];
		// Get the raw array elements so we can access their list of class names
		var modArrElems = JSAV.utils._helpers.getIndices($(modelArray.element).find("li"));
		var userArrElems = JSAV.utils._helpers.getIndices($(userArr.element).find("li"));
		for(var i = 0; i < modelArray.size(); i++) {
			// Fix incorrect values
			userArr.value(i, modelArray.value(i));
			// Ensure the classes of each element in the user array match those in the model solution
			userArrElems[i].className = modArrElems[i].className;
		}
	}

	function foundButton() {
		if(!arrayHasClass(userArr, "correctIndex")) {
			clearClassFromArr(userArr, "wrongIndex");
			var hlPos = getHighlight(userArr);
			var array_value = userArr.value(hlPos);
			if(array_value == stack.first().value()) 
				userArr.addClass(hlPos, "correctIndex");
			else
				userArr.addClass(hlPos, "wrongIndex");
			stack.removeFirst();
			exercise.gradeableStep();
			userArr.unhighlight(hlPos);
		}
	}

	function nextStepButton() {
		if(stack.size() != 0) {
			userArr.removeClass(getFirstIndWithClass(userArr, "correctIndex"), "correctIndex")
			var hlPos = getHighlight(userArr);
			if(hlPos > -1)
        moveHighlight(hlPos, hlPos + 1, userArr)
			else // the beginning of the exercise. Highlight the first value.
				userArr.highlight(0);
		}
	}
	
	//attach the button handlers
	$('#Next').click(nextStepButton);
	$('#Found').click(foundButton);
	
	//////////////////////////////////////////////////////////////////
	// Start processing here
	//////////////////////////////////////////////////////////////////
	var arraySize = 13,
		stackSize = 5,
		initialArray = [],
		stack,
		modelStack,
		stackArray,
		last_first,
		// Load the config object with interpreter created by odsaUtils.js
		config = ODSA.UTILS.loadConfig(),
		interpret = config.interpreter, // get the interpreter
		code = config.code,
		codeOptions = {
			after: {
				element: $(".instructions")
			},
			visible: true
		},
		settings = config.getSettings(), // Settings for the AV
		av = new JSAV($('.avcontainer'), {
			settings: settings
		});
	av.recorded(); // we are not recording an AV with an algorithm
	// show a JSAV code instance only if the code is defined in the parameter
	// and the parameter value is not "none"
	if(code)
		pseudo = av.code($.extend(codeOptions, code));
	var exercise = av.exercise(modelSolution, initialize, {
		compare: {
			class: "correctIndex"
		},
		controls: $(".jsavexercisecontrols")
	});
	// add the layout setting prelow, high, valference
	var arrayLayout = settings.add("layout", {
		"type": "select",
		"options": {
			"bar": "Bar",
			"array": "Array"
		},
		"label": "Array layout: ",
		"value": "array"
	});
	exercise.reset();
	// Initialize userArr
	var userArr; // JSAV array
});
