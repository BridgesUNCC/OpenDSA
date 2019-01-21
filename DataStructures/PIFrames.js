/** mbhatia@vt.edu */
(function($) {


    $(document).ready(function() {


        //disable jsavend, as it allows student to jump to last slide
        //automatically enabled by injector once all questions for slideshow have been answered
        $(".jsavend").css("pointer-events", "none");


        //edge case: what if first slide has question?
        //1 signifies a forward click; used by injector to increment queue if necessary
        $(".jsavforward").click(function() {
                var buttonGroup = $(this).parent();
                var parentAV = $(buttonGroup).parent().attr('id')
                PIFRAMES.callInjector(parentAV, 1);

            }),

            //0 signifies a backward click; used by injector to decrement queue if necessary
            $(".jsavbackward").click(function() {
                var buttonGroup = $(this).parent();
                var parentAV = $(buttonGroup).parent().attr('id')
                PIFRAMES.callInjector(parentAV, 0)

            }),


            $(".jsavbegin").click(function() {
                var buttonGroup = $(this).parent();
                var parentAV = $(buttonGroup).parent().attr('id')
                PIFRAMES.callInjector(parentAV, -1)

            }),

            $(".jsavend").click(function() {
                var buttonGroup = $(this).parent();
                var parentAV = $(buttonGroup).parent().attr('id')
                PIFRAMES.callInjector(parentAV)

            })

    });


    var PIFrames = {

        Injector(data, av_name) {

            var obj = {
                myData: data,

                //if there are multiple frames on one page, we need a reference to the correct one
                av_name: av_name,

                //injection point for the reveal button
                buttonDiv: 'SHOWQUESTION',

                //the injection point on canvas
                class: "PIFRAMES",

                //holds the slide questions
                queue: {
                    elements: [],
                    current: 0,
                    slideCounter: 1,
                    lastEncounteredQuestionSlide: 1000

                },

                //used for dynamic resizing
                originalAVHeight: 0,

                //current dynamic height of AV
                currentAVHeight: 0,

                //may use this format if we decide to create a custom version of av.umsg()
                revealQuestionButton: $('<button />', {
                    "class": 'revealbutton',
                    "text": 'Show Question',
                    "onclick": `PIFRAMES.revealQuestion("${av_name}")`
                }),

                incrementQueue: function() {
                    if (this.queue.current != (this.queue.elements.length - 1)) {
                        this.queue.current++;
                    }
                },

                decrementQueue: function() {
                    if (this.queue.current > 0) {
                        this.queue.current--;
                    }
                },

                toggleButtonSpace(height) {
                    this.currentAVHeight = $(`#${this.av_name}`).outerHeight() + (2 * height);
                    $(`#${this.av_name}`).height(this.currentAVHeight + 2 * height);

                },

                //expands the canvas at bottom to allow injection of question
                resizeContainer: function(height) {

                    if (this.originalAVHeight == 0) {
                        this.currentAVHeight = $(`#${this.av_name}`).outerHeight();
                        this.originalAVHeight = this.currentAVHeight;
                    }

                    if ($(`.${this.buttonDiv}`).children().length > 0 && height == 0) {

                        $(`.${this.buttonDiv}`).empty();
                        this.updateCanvas(null);
                    }

                    if (height == 0) {
                        $(`#${this.av_name}`).outerHeight(this.originalAVHeight);
                        this.currentAVHeight = this.originalAVHeight;
                    } else {
                        this.currentAVHeight += 1.25 * height;
                        $(`#${this.av_name}`).outerHeight(this.currentAVHeight);

                    }

                },

                appendQuestion: function() {
                    var current = this.queue.current;
                    var question = this.getQuestion(this.queue.elements[current]);

                    if (question) {

                        var theHtml = this.buildElement(question);
                        this.updateCanvas(theHtml);

                        var childHeight = $(`#${this.av_name}`).children(`div.${this.class}`).outerHeight();
                        this.resizeContainer(childHeight);


                    }
                },

                //TODO: may need to pass av_name in the future if there are multiple frames on the page
                updateCanvas: function(theHtml) {
                    if ($(`.${this.class}`).children().length > 0) {
                        $(`.${this.class}`).empty();
                        $(`.${this.class}`).append(theHtml);
                    } else {
                        $(`.${this.class}`).append(theHtml);
                    }
                },

                updateSlideCounter: function(jsavControl) {
                    //jsavforward button clicked
                    if (jsavControl == 1) {
                        this.queue.slideCounter++;
                    }

                    //jsavback button clicked
                    else if (jsavControl == 0) {
                        if (this.queue.slideCounter > 1)
                            this.queue.slideCounter--;
                    }

                    //jsavbegin button clicked, so reset questions and counter
                    else if (jsavControl == -1) {
                        this.queue.slideCounter = 1;
                        this.lastEncounteredQuestionSlide = 1000;
                        this.queue.current = 0;

                    }
                    //jump to end of slideshow, push queue pointer to last question
                    else {
                        this.queue.slideCounter = 1;
                        this.queue.lastEncounteredQuestionSlide = 1;
                        this.queue.current = this.queue.elements.length - 1;

                    }

                },
                disableForwardButton: function() {
                    var forwardButton = $(`#${this.av_name}`).find("span.jsavforward");
                    $(forwardButton).css("pointer-events", "none");


                },

                enableForwardButton: function() {
                    var forwardButton = $(`#${this.av_name}`).find("span.jsavforward");
                    $(forwardButton).css("pointer-events", "auto");


                },

                disableFastForwardButton: function() {
                    var forwardButton = $(`#${this.av_name}`).find("span.jsavend");
                    $(forwardButton).css("pointer-events", "none");


                },

                enableFastForwardButton: function() {
                    var forwardButton = $(`#${this.av_name}`).find("span.jsavend");
                    $(forwardButton).css("pointer-events", "auto");


                },

                alertMessage: function() {

                    var message = `<p class="REVEAL">You must answer the question to proceed forward. Click Show Question</p>`;
                    return message;
                },

                getQuestion: function(id) {
                    var key = this.myData.translations.en;
                    var question = key[id];
                    return question;
                },

                setStudentAnswer: function(id, answer) {
                    (this.myData.translations.en)[id].studentAnswer = answer;
                },

                injectQuestion: function(id) {
                    this.queue.elements.push(id)
                    return this.alertMessage();

                },

                buildElement: function(question) {
                    var type = question.type;

                    switch (type) {

                        case "multiple":
                            return this.buildMultipleChoice(question);
                        case "true/false":
                        case "select":
                        case "drawing":

                    }

                },

                buildMultipleChoice: function(question) {
                    var choices = question.choices;
                    var execute = `PIFRAMES.saveAndCheckStudentAnswer("${this.av_name}")`;
                    var form = $(`<form class=${this.av_name} onsubmit='return ${execute}'></form>`);
                    var html = [];
                    var header = `<p>${question.question}</p>`
                    html.push(header);
                    for (var i = 0; i < choices.length; i++) {
                        var radio = `<input type="radio" name=${this.av_name} value='${choices[i]}' style='margin-right: 5px'>${choices[i]}</></br>`;
                        html.push(radio);
                    }
                    var submit = `<br><input type="submit" value="Submit">`;
                    html.push(submit);

                    return form.append(html.join(''));
                },

                saveAndCheckStudentAnswer(answer) {
                    var current = this.queue.current;
                    this.setStudentAnswer(this.queue.elements[current], answer);
                    if (this.studentHasAnsweredQuestionCorrectly(this.queue.elements[current])) {
                        this.enableForwardButton();
                        alert("you have answered the question correctly!")

                        //the last question in the slideshow has been answered correctly, so enable the jsavend button
                        if (current == (this.queue.elements.length - 1)) {
                            this.enableFastForwardButton();
                        }
                    } else {
                        //scenario where student submits an answer on a slide, and then resubmits a wrong answer without switching slides
                        alert("you have answered the question incorrectly!")
                        this.disableForwardButton();

                    }
                },

                studentHasAnsweredQuestionCorrectly: function(id) {
                    var question = this.getQuestion(id);
                    return (question.studentAnswer == question.answer);
                },

                checkIfSlideHasQuestion: function(jsavControl) {

                    this.updateSlideCounter(jsavControl);

                    this.resizeContainer(0);
                    if ($(`#${this.av_name}`).find('.REVEAL').length) {

                        // this.resizeContainer(0);
                        $(`.${this.buttonDiv}`).append(this.revealQuestionButton);
                        var height = $(`.${this.buttonDiv}`).outerHeight();

                        this.resizeContainer(4 * height);
                        // this.toggleButtonSpace(height);
                        this.questionSlideListener();

                    } else {
                        this.updateCanvas(null);
                        // this.resizeContainer(0);
                        this.enableForwardButton();

                    }
                },

                //injects the appropriate question into the slide handler
                //disables forward button(s) if student hasn't answered the question correctly in the past
                questionSlideListener: function() {

                    if (this.queue.slideCounter > this.queue.lastEncounteredQuestionSlide) {
                        this.incrementQueue();
                        this.queue.lastEncounteredQuestionSlide = this.queue.slideCounter;
                    }
                    if (this.queue.slideCounter < this.queue.lastEncounteredQuestionSlide) {
                        this.decrementQueue();
                        this.queue.lastEncounteredQuestionSlide = this.queue.slideCounter;
                    }
                    var current = this.queue.current;
                    if (!this.studentHasAnsweredQuestionCorrectly(this.queue.elements[current])) {
                        this.disableForwardButton();
                    } else {
                        this.enableForwardButton();
                    }
                }
            }
            return obj;

        },

        callInjector(av_name, jsavControl) {
            this.table[av_name].checkIfSlideHasQuestion(jsavControl);

        },
        getQuestions(av_name) {
            var json_url = $('script[src*="/' + av_name + '.js"]')[0].src + 'on';
            var json_data;
            $.ajax({
                url: json_url,
                dataType: 'json',
                async: false,
                success: function(data) {
                    json_data = data;
                }

            });

            var injector = this.Injector(json_data, av_name);
            PIFRAMES.table[av_name] = injector;

            return injector;
        },

        //add div to the av_name's jsavcanvas, so that dynamic questions have a hooking point
        init(av_name, av) {
            var container = $(`#${av_name}`);

            var div1 = $('<div />', {
                "class": 'SHOWQUESTION'
            });

            var div2 = $('<div />', {
                "class": 'PIFRAMES'
            });

            $(div2).css({
                "position": "absolute",
                "width": "100%",
                "overflow": "scroll",
                "border-top": "1px dotted black"

            });

            $(container).append(div1);
            $(container).append(div2);

            return this.getQuestions(av_name);
        },

        revealQuestion: function(av_name) {
            this.table[av_name].appendQuestion();
        },

        saveAndCheckStudentAnswer: function(av_name) {
            form = $(`form.${av_name}`);
            checked = form.children(`input[name=${av_name}]:checked`).val();
            console.log(checked)
            this.table[av_name].saveAndCheckStudentAnswer(checked);

            //prevents form from making crud call
            return false;

        }

    }
    PIFrames.table = {};
    window.PIFRAMES = PIFrames;
})(jQuery);