"use strict";
$(document).ready(function() {
    // Process about button: Pop up a message with an Alert
    function about() {
        alert(ODSA.AV.aboutstring(interpret(".avTitle"), interpret("av_Authors")));
    }
    $('#about').click(about);

    // Processes the reset button
    function initialize() {
        clearInterval(intv);
        if (stack)
            stack.clear(); // clear number in the stack
        if (userArr)
            userArr.clear(); // clear the array
        // generate the array
        initialArray = genArrNoRepeat(89, arraySize)
        stack = createStackLayout(av);
        stackArray = [];
        for (var i = 0; i < stackSize; i++) {
            var value = initialArray[Math.floor(Math.random() * initialArray.length)]
            while (stackArray.includes(value))
                value = initialArray[Math.floor(Math.random() * initialArray.length)]
            stackArray[i] = value
            stack.addLast(value);
        }
        // highlight the top number of the stack
        stack.first().highlight();
        stack.layout();
        // Create the array the user will intereact with
        userArr = createArrayLayout(av, initialArray, false, arrayLayout.val())
        return userArr;
    }

    // Create the model solution used for grading the exercise
    function modelSolution(av) {
        // create stack and populate with values from stackArray
        modelStack = createStackLayout(av)
        modelStack = buildStackFromArr(stackArray, stackSize, modelStack)
        modelStack.layout();

        // highlight top value
        modelStack.first().highlight();

        // create the array
        var modelArr = createArrayLayout(av, initialArray, false, arrayLayout.val())

        // initialize the display
        av.displayInit();

        while (modelStack.size() > 0) {
            // initialize ind to keep track of the highlight's position. Set to 1 to avoid out of bounds exception
            var ind = 1

            // highlight the array's first value
            modelArr.highlight(0)

            av.step()

            // while the current value is less than the stack's top value and not a blank string
            while (modelArr.value(ind) <= modelStack.first().value() && modelArr.value(ind) != "") {
                moveHighlight(ind - 1, ind, modelArr)
                av.step();
                ind++;
            }
            // decrement ind so its value matches the highlight position
            ind--;

            // unhighlight the value and add the correctIndex class
            modelArr.unhighlight(ind);
            modelArr.addClass(ind, "correctIndex");

            // "delete" the value by setting it to a blank string 
            modelArr.value(ind, "");

            av.gradeableStep();

            while (ind < arraySize - 1) {
                modelArr.value(ind, modelArr.value(ind + 1));
                modelArr.value(ind + 1, "");
                ind++;
            }
            modelStack.removeFirst()
            modelArr.removeClass(getFirstIndWithClass(modelArr, "correctIndex"), "correctIndex");
            av.step();
        }
        return modelArr;
    }

    // Fixstate function called if continuous feedback/fix mode is used
    function fixState(modelState) {
        var modelArray = modelState[0];
        // Get the raw array elements so we can access their list of class names
        var modArrElems = JSAV.utils._helpers.getIndices($(modelArray.element).find("li"));
        var userArrElems = JSAV.utils._helpers.getIndices($(userArr.element).find("li"));
        for (var i = 0; i < modelArray.size(); i++) {
            // Fix any incorrect values
            userArr.value(i, modelArray.value(i));
            // Ensure the classes of each element in the user array match those in the model solution
            userArrElems[i].className = modArrElems[i].className;
        }
    }

    function deleteButton() {
        if (arrHasHighlight(userArr)) {
            var hlPos = getHighlight(userArr);
            var array_value = userArr.value(hlPos);
            userArr.value(hlPos, "");
            if (array_value == stack.first().value())
                userArr.addClass(hlPos, "correctIndex");
            else
                userArr.addClass(hlPos, "wrongIndex");
            exercise.gradeableStep();
            userArr.unhighlight(hlPos);
            var ind = hlPos;
            stack.removeFirst();
            intv = setInterval(function animateStep() {
                while (ind < arraySize - 1) {
                    userArr.value(ind, userArr.value(ind + 1));
                    userArr.value(ind + 1, "");
                    ind++;
                }
                stopAnimation()
            }, 1800)
            userArr.removeClass(getFirstIndWithClass(userArr, "correctIndex"), "correctIndex");
            userArr.removeClass(getFirstIndWithClass(userArr, "wrongIndex"), "wrongIndex");
        }
    }

    function nextStepButton() {
        var hlPos = getHighlight(userArr);
        if (hlPos > -1)
            moveHighlight(hlPos, hlPos + 1, userArr)
        else
            userArr.highlight(0);
    }

    //attach the button handlers
    $('#Next').click(nextStepButton);
    $('#Delete').click(deleteButton);

    //////////////////////////////////////////////////////////////////
    // Start processing here
    //////////////////////////////////////////////////////////////////
    var arraySize = 13,
        stackSize = 5,
        initialArray = [],
        stack,
        intv,
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
    if (code)
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