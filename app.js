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
        dataBase: function(question, answers){
            
        }

    }
})();


//-------------------------------------------------------------------------------
//UI MODULE

const UIController = (function() {
    const DOM = {
        insert: document.getElementById('question-insert-btn')
    }
    return {
        getDom: DOM

    }
})();


//-------------------------------------------------------------------------------
//EVENTS MODULE

const EController = (function(da, ui) {
    // Input click Event
    const input = ui.getDom.insert;
    input.addEventListener('click', function() {
        console.log('wroks');
    });

})(dataController, UIController);