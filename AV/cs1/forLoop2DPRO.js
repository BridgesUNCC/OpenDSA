"use strict";

$(document).ready(function() {
    // Process about button: pop up a message with an alert
    function about() {
        alert(ODSA.AV.aboutstring(interpret(".avTitle"), interpret("av_Authors")));
    }
    $('#about').click(about);

    function initialize() {
        if (user_matrix)
            user_matrix.clear()
        av.clearumsg();
        document.getElementById("number_complete").innerHTML = "Array 1 of 5 (Easy)";
		paint_type = "paint_lvl"
        matr_ind = 0;

		// fill the random value arrays
		for (var i = 0; i < 5; i++) 
			randomizeElements(i);
        
		setUpTextMaps()
        setUpText()

        // create the array of arrays
        var first_arr = []
        for (var i = 0; i < matrix_size; i++)
            first_arr[i] = i + ", " + 0
        matrix[0] = first_arr
        for (var j = 1; j < matrix_size; j++) {
            var arr = []
            arr[0] = 0 + ", " + j
            for (var i = 1; i < matrix_size; i++)
                arr[i] = i + ", " + j
            matrix[j] = arr
        }
        // create the matrix the user will interact with
        user_matrix = av.ds.matrix(matrix, {
            style: "table"
        })
        for (var i = 0; i < matrix_size; i++) {
            for (var j = 0; j < matrix_size; j++)
                user_matrix.addClass(i, j, "matrix_cell")
        }
        user_matrix.click(function(row, col) {
            user_matrix.addClass(row, col, paint_type + matr_ind);
			user_matrix.addClass(row, col, "paint")
            exercise.gradeableStep();
        })
        return user_matrix;
    }
	
	function setUpMediumText(ind) {
		var t = "<br/>&emsp;for (int i = "	
		var r = Math.floor(Math.random() * 5)
		switch(r) {
			case 0:
				t = t + i_starts[ind] + "; i " + " < " + i_ends[ind] + "; i = i * " + i_steps[ind] + ") {<br/>&emsp;&emsp;for (int j = " 
					+ j_starts[ind] + "; j < " + j_ends[ind] + "; j = j + " + j_steps[ind]
				arr_outer[ind] = [ind, "mlt"]
				arr_inner[ind] = [ind, "basic"]
				
			break;
			case 1:
				t = t  + i_starts[ind] + "; i " + " < " + i_ends[ind] + "; i =  i + " + i_steps[ind] + ") {<br/>&emsp;&emsp;for (int j = "
					+ j_starts[ind] + "; j < " + j_ends[ind] + "; j *= " + j_steps[ind]
				arr_outer[ind] = [ind, "basic"]
				arr_inner[ind] = [ind, "mlt"]
			break;
			case 2:
				t = t  + i_ends[ind] + "; i " + " > " + i_starts[ind] + "; i = i - " + i_steps[ind] + ") {<br/>&emsp;&emsp;for (int j = " 
					+ j_starts[ind] + "; j < " + j_ends[ind] + "; j = j + " + j_steps[ind]
				arr_outer[ind] = [ind, "dec"]
				arr_inner[ind] = [ind, "basic"]
			break;
			case 3:
				t = t  + i_starts[ind] + "; i " + " < " + i_ends[ind] + "; i = i + " + i_steps[ind] + ") {<br/>&emsp;&emsp;for (int j = " 
					+ j_starts[ind] + "; j > " + j_ends[ind] + "; j = j - " + j_steps[ind]
				arr_outer[ind] = [ind, "basic"]
				arr_inner[ind] = [ind, "dec"]
			break;
			case 4:
				t = t  + i_starts[ind] + "; i " + " < " + i_ends[ind] + "; i = i + " + i_steps[ind] + ") {<br/>&emsp;&emsp;for (int j = i"
					+ "; j < " + j_ends[ind] + "; j = j + " + j_steps[ind]
				arr_outer[ind] = [ind, "basic"]
				arr_inner[ind] = [ind, "j=i"]
			break;
			default:
				t = t + i_starts[ind] + "; i " + " < " + i_ends[ind] + "; i = i + " + i_steps[ind] + ") {<br/>&emsp;&emsp;for (int j = " 
					+ j_starts[ind] + "; j < i; j = j + " + j_steps[ind]
				arr_outer[ind] = [ind, "basic"]	
				arr_inner[ind] = [ind, "j<i"]
			break;
		}
		t = t + ";) {<br/>&emsp;&emsp;&emsp;paint(i, j);<br/>&emsp;&emsp;}<br/>&emsp;}"
		arr_if[ind] = [ind, "none"]
		map_arr[ind] = [ind, t]
	}
	
	function setUpMedHardText(ind) {
		var t = "<br/>&emsp;for (int i = "
		t = t + findMedHardOuter(ind) + findMedHardInner(ind) + ") {<br/>&emsp;&emsp;&emsp;paint(i, j);<br/>&emsp;&emsp;}<br/>&emsp;}"
		map_arr[ind] = [ind, t]
		arr_if[ind] = [ind, "none"]
	}
	
	function findMedHardOuter(ind) {
		var t = ""
		var r = Math.floor(Math.random() * 2)
			switch(r) {
			case 0:
				t = t + i_starts[ind] + "; i  < " + i_ends[ind] + "; i *= " + i_steps[ind] 
				arr_outer[ind] = [ind, "mlt"]				
			break;
			default:
				t = t + i_ends[ind] + "; i > " + i_starts[ind] + "; i = i - " + i_steps[ind] 
				arr_outer[ind] = [ind, "dec"]
			break;
		}
		return t + ") {<br/>&emsp;&emsp;";
	}
	
	function findMedHardInner(ind) {
		var t = " for (int j = "
		var r = Math.floor(Math.random() * 14)
		switch(r) {
			case 0:
				t = t + j_starts[ind] + "; j < " + j_ends[ind] + "; j *= " + j_steps[ind]
				arr_inner[ind] = [ind, "mlt"]	
			break;
			case 1:
				t = t + j_ends[ind] + "; j > " + j_starts[ind] + "; j = j - " + j_steps[ind]
				arr_inner[ind] = [ind, "dec"]
			break;
			case 2:
				t = t + " i; j < " + j_ends[ind] + "; j = j + " + j_steps[ind]
				arr_inner[ind] = [ind, "j=i"]
			break;
			case 3:
				t = t + j_starts[ind] + "; j < i; j = j + " + j_steps[ind]
				arr_inner[ind] = [ind, "j<i"]
			break;
			default:
				t = t + j_starts[ind] + "; j < " + j_ends[ind] + "; j = j + " + j_steps[ind]
				arr_inner[ind] = [ind, "basic"]
			break;
		}
		return t;
	}
	
	function setUpHardText(ind) {
		var t = "<br/>&emsp;for (int i = "
		t = t + findMedHardOuter(ind) + findMedHardInner(ind) + ") {<br/>&emsp;&emsp;&emsp;"
		t = t + "if (" + setUpIf(ind) + ") {<br/>&emsp;&emsp;&emsp;&emsp;"
		t = t + "paint(i, j);<br/>&emsp;&emsp;&emsp;}<br/>&emsp;&emsp;}<br/>&emsp;}"
		map_arr[ind] = [ind, t]
	}
	
	function setUpIf(ind) {
		var t = ""
		var r = Math.floor(Math.random() * 7)
		switch(r) {
			case 0:
				t = "i % 2 != 0 && j % 2 != 0"
				arr_if[ind] = [ind, "ijmod"]
			break;
			case 1:
				t = "i == 4 || j == 4"
				arr_if[ind] = [ind, "cross"]
			break;
			case 2:
				t = "i % 2 == 0"
				arr_if[ind] = [ind, "mod0"]
			break;
			case 3:
				t = "i % 2 != 0"
				arr_if[ind] = [ind, "mod!0"]
			break;
			case 4:
				t = "i < j"
				arr_if[ind] = [ind, "diag"]
			break;
			case 5:
				t = "i < j + 2"
				arr_if[ind] = [ind, "diag2"]
			break;
			case 6:
				t = "i > -j + 5"
				arr_if[ind] = [ind, "negj"]
			break;
			default:
				t = "i > j"
				arr_if[ind] = [ind, "i>j"]
		}
		return t;
	}
	
	// set up the maps that keep track of the loops
	function setUpTextMaps() {
		map_arr[0] = [0, "<br/>&emsp;for (int i = " + i_starts[0] + "; i < " + i_ends[0] +
                    "; i = i + " + i_steps[0] + ") {<br/> &emsp;&emsp;for (int j = " + j_starts[0] + "; j < " + j_ends[0] +
                    "; j = j + " + j_steps[0] + ") {<br/>&emsp;&emsp;&emsp;paint(i, j);<br/>&emsp;&emsp;}<br/>&emsp;}"];
		arr_outer[0] = [0, "basic"]
		arr_inner[0] = [0, "basic"]
		arr_if[0] = [0, "none"]
		map_arr[1] = [1, "<br/>&emsp;for (int i = " + i_starts[1] + "; i < " + i_ends[1] +
                    "; i = i + " + i_steps[1] + ") {<br/> &emsp;&emsp;for (int j = " + j_starts[1] + "; j < " + j_ends[1] +
                    "; j = j + " + j_steps[1] + ") {<br/>&emsp;&emsp;&emsp;paint(i, j);<br/>&emsp;&emsp;}<br/>&emsp;}"]
		arr_outer[1] = [1, "basic"]
		arr_inner[1] = [1, "basic"]
		arr_if[1] = [1, "none"]
		setUpMediumText(2)
		setUpMedHardText(3)
		setUpHardText(4)
		text_map = new Map(map_arr)
		map_outer = new Map(arr_outer)
		map_inner = new Map(arr_inner)
		map_if = new Map(arr_if)
	}

    function setUpText() {
        // clear the old text
        av.clearumsg()
        av.umsg(text_map.get(matr_ind))
	}

    // set up the randomized elements 
    function randomizeElements(difficulty) {
		// for easy and medium cases, loops will always paint something
		switch (difficulty) {
			case 0:
				i_starts[difficulty] = Math.floor(Math.random() * (matrix_size / 3))
				j_starts[difficulty] = Math.floor(Math.random() * (matrix_size / 3))
				i_ends[difficulty] = matrix_size - 1 - Math.floor(Math.random() * (matrix_size / 3))
				j_ends[difficulty] = matrix_size - 1 - Math.floor(Math.random() * (matrix_size / 3))
				i_steps[difficulty] = Math.floor(Math.random() * 3) + 1
				j_steps[difficulty] = Math.floor(Math.random() * 3) + 1
			break;
			case 2: case 4:
				i_starts[difficulty] = Math.floor(Math.random() * (matrix_size / 3)) + 1
				j_starts[difficulty] = Math.floor(Math.random() * (matrix_size / 3)) + 1
				i_ends[difficulty] = matrix_size - 1 - Math.floor(Math.random() * (matrix_size / 3))
				j_ends[difficulty] = matrix_size - 1 - Math.floor(Math.random() * (matrix_size / 3))
				i_steps[difficulty] = Math.floor(Math.random() * 2) + 2
				j_steps[difficulty] = Math.floor(Math.random() * 2) + 2
			break;
			default:
				i_starts[difficulty] = Math.floor(Math.random() * (matrix_size / 3)) + 1
				j_starts[difficulty] = Math.floor(Math.random() * (matrix_size / 3)) + 1
				i_ends[difficulty] =  Math.floor(Math.random() * (matrix_size - 1))
				j_ends[difficulty] =  matrix_size - 1 - Math.floor(Math.random() * (matrix_size / 2))
				i_steps[difficulty] =  matrix_size - 1 - Math.floor(Math.random() * (matrix_size / 2))
				j_steps[difficulty] =  Math.floor(Math.random() * (matrix_size - 3)) + 2
			break;
		}
    }

    function modelSolution(av) {
        model_matrix = av.ds.matrix(matrix, {style: "table" })
        av.displayInit();
		for (var i = 0; i < 5; i++) 
			modelOuter(i, model_matrix, av);
        return model_matrix;
    }
	
	// functions to execute the different model loops
	function modelOuter(ind, model_matrix, av) {
		var loop_id = map_outer.get(ind)
		switch(loop_id) {
			case "basic":
			//alert("basic outer " + ind)
			for (var i = i_starts[ind]; i < i_ends[ind]; i = i + i_steps[ind])
				modelInner(ind, i, model_matrix, av)
			break;
			case "mlt":
				for (var i = i_starts[ind]; i < i_ends[ind]; i = i * i_steps[ind])
					modelInner(ind, i, model_matrix, av)
				break;
			case "dec":
				for (var i = i_ends[ind]; i > i_starts[ind]; i = i - i_steps[ind])
					modelInner(ind, i, model_matrix, av)
				break;
			default:
			break;
		}
		clearMatrixPaint(ind, model_matrix)
	}
	
	function clearMatrixPaint(ind, matrix) {
		clearClassFromMatrix(matrix, matrix_size, matrix_size, paint_type + ind)
		clearClassFromMatrix(matrix, matrix_size, matrix_size, "paint")
	} 
	
	function modelInner(ind, i, model_matrix, av) {
		//alert("i = " + i)
		var loop_id = map_inner.get(ind)
		if (j_starts[ind] < j_ends[ind]) {
		switch(loop_id) {
			case "basic":
			//alert("basic inner" + ind)
				for (var j = j_starts[ind]; j < j_ends[ind]; j = j + j_steps[ind]) 
					ifStatement(ind, av, i, j)
			break;
			case "mlt":
			//alert("mlt inner" + ind)
				for (var j = j_starts[ind]; j < j_ends[ind]; j = j * j_steps[ind]) 
					ifStatement(ind, av, i, j)
			break;
			case "dec":
			//alert("dec inner" + ind)
				for (var j = j_ends[ind]; j > j_starts[ind]; j = j - j_steps[ind]) 
					ifStatement(ind, av, i, j)
			break;
			case "j=i":
			//alert("j=i inner" + ind)
			if (i < j_ends[ind]) {
				for (var j = i; j < j_ends[ind]; j = j + j_steps[ind]) 
					ifStatement(ind, av, i, j)
			}
			break;
			case "j<i":
			//alert("j<i inner" + ind)
			if (j_starts[ind] < i) {
				for (var j = j_starts[ind]; j < i; j = j + j_steps[ind]) 
					ifStatement(ind, av, i, j)
			}
			break; 
			default:
			break;
		}
		}
	}
	
	function ifStatement(ind, av, i, j) {
		var if_key = map_if.get(ind)
		switch(if_key) {
			case "ijmod":
				if (i % 2 != 0 && j % 2 != 0) 
					paint(ind, j, i, av)
			break;
			case "cross":
				if (i == 4 || j == 4) 
					paint(ind, j, i, av)
			break;
			case "mod0":
				if (i % 2 == 0)
					paint(ind, j, i, av)
			break;
			case "mod!0":
				if (i % 2 != 0)
					paint(ind, j, i, av)
			break;
			case "diag":
				if (i <j)
					paint(ind, j, i, av)
			break;
			case "diag2":
				if (i < j + 2)
					paint(ind, j, i, av)
			break;
			case "negj":
				if (i > -j + 5)
					paint(ind, j, i, av)
			break;
			case "i>j":
				if (i > j)
					paint(ind, j, i, av)
			break; 
			default:
				paint(ind, j, i, av)
				//alert("should have painted")
			break;
		}
	}
	
	function paint(ind, j, i, av) {
		model_matrix.addClass(j, i, paint_type + ind)
		model_matrix.addClass(j, i, "paint")
		av.gradeableStep();
	}
	
    function nextMatrix() {
        if (user_matrix && matr_ind < 4) {
			clearMatrixPaint(matr_ind, user_matrix)
            matr_ind = matr_ind + 1;
            document.getElementById("number_complete").innerHTML = "Array " + (matr_ind + 1) + " of 5 (" + difficultyString(matr_ind) + ")" 
			setUpText()
		}
    }
	
	function backMatrix() {
		if (user_matrix && matr_ind > 0) {
			clearMatrixPaint(matr_ind, user_matrix)
			matr_ind = matr_ind - 1;
			document.getElementById("number_complete").innerHTML = "Array " + (matr_ind + 1) + " of 5 (" + difficultyString(matr_ind) + ")" 
			setUpText()	
		}
	}
	
	function setColorType(pt_type) {
		if (pt_type != paint_type) {
			var painted_ind = get2DIndicesWithClass(user_matrix, matrix_size, matrix_size, paint_type + matr_ind)
			var old_paint = paint_type
			paint_type = pt_type;
			for (var i = 0; i < painted_ind.length; i++) {
				user_matrix.addClass(painted_ind[i][0], painted_ind[i][1], paint_type + matr_ind)
				user_matrix.removeClass(painted_ind[i][0], painted_ind[i][1], old_paint + matr_ind)
			}
		}
	}
	
	document.getElementById("default_col").addEventListener("click", function() {
		setColorType("paint_lvl");
	}, false);
	document.getElementById("pd_col").addEventListener("click", function() {
		setColorType("deut_prot");
	}, false);
	document.getElementById("trit_col").addEventListener("click", function() {
		setColorType("trit");
	}, false);
	document.getElementById("mono_col").addEventListener("click", function() {
		setColorType("mono");
	}, false);
	
	$('#next').click(nextMatrix)
	$('#back').click(backMatrix)

    //////////////////////////////////////////////////////////////////
    // Start processing here
    //////////////////////////////////////////////////////////////////
    var matrix_size = 8,
		paint_type,
		model_matrix,
        i_starts = [],
        j_starts = [],
        i_ends = [],
        j_ends = [],
        i_steps = [],
        j_steps = [],
		map_arr = [], // map the matrix's order to the loop text
		arr_outer = [], // map the outer loop type case to the order/difficulty
		arr_inner = [], // map the inner loop type case to the order/difficulty
		arr_if = [], // map the if statement type case to the order/difficulty
		text_map, map_outer, map_inner, map_if,
        config = ODSA.UTILS.loadConfig(),
        interpret = config.interpreter, // get the interpreter
        code = config.code,
        matr_ind = 0,
        matrix = [],
        codeOptions = {
            after: {element: $(".instructions")},
            visible: true
        },
        settings = config.getSettings(), // Settings for the AV
        av = new JSAV($('.avcontainer'), {settings: settings});
    // we are not recording an AV with an algorithm
    av.recorded();
    // show a JSAV code instance only if the code is defined in the parameter
    // and the parameter value is not "none"
    if (code)
        pseudo = av.code($.extend(codeOptions, code));
    var exercise = av.exercise(modelSolution, initialize, {
        compare: {
            class: "paint"
        },
        controls: $(".jsavexercisecontrols")
    });
    exercise.reset();
    //initialize matrix
    var user_matrix;
})