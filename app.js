//-------------------------------------------------------------------------------
//DATA MODULE

const dataController = (function() {
    // class Input (questions)
    class Input {
        constructor(id, question, answers, rightOne) {
            this.id = id;
            this.question = question;
            this.answers = answers;
            this.rightOne = rightOne;
        }
    }
    return {
        dbS: function(typedQ, answers) {
            // FORMAT/ COMPROBATIONS 
            const stockA = []; //to storage
            let rigOne, qId;
            qId = 0;
            let nods = Array.from(answers); //nodeL to arr
            nods.forEach((current) => { //if values, stored them
                if (current.value !== '') {
                    stockA.push(current.value)
                    if (current.previousElementSibling.checked) {
                        rigOne = current.value; //right answer/checked
                        console.log(rigOne);
                    }
                }
            })
            console.log(rigOne);
            // INSTANCE OF QUESTIONS FORMATTED
            typedQ = new Input(qId, typedQ.value, stockA, rigOne);
            console.log(typedQ);
        }

    }
})();


//-------------------------------------------------------------------------------
//UI MODULE

const UIController = (function() {
    const DOM = {
        // input
        insert: document.getElementById('question-insert-btn'),
        nueQ: document.getElementById('new-question-text'),
        options: document.querySelectorAll('.admin-option')
    }
    return {
        getDom: DOM

    }
})();



//-------------------------------------------------------------------------------
//EVENTS MODULE

const EController = (function(da, ui) {
    // Input click Event
    const input = ui.getDom;
    input.insert.addEventListener('click', function() {
        // get input from data Module
        console.log(input);
        dataController.dbS(input.nueQ, input.options);
    });

})(dataController, UIController);