//-------------------------------------------------------------------------------
//DATA MODULE

const dataController = (function() {
    // class Input (questions)
    class Input {
        constructor(id, question, answers, rightOne) {
            this.id = id;
            this.question = question;
            this.answers = answers;
            this.rightAns = rightOne;
        }
    }
    return {
        dbS: function(question, answers) {
            const stockA = [];
            
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











