//-------------------------------------------------------------------------------
//DATA MODULE

const dataController = (function() {
// PRIVATE
// 1. QUESTIONS CLASS
    class Input {
        constructor(id, question, answers, rightOne) {
            this.id = id;
            this.question = question;
            this.answers = answers;
            this.rightOne = rightOne;
        }
    }
// 2. DATABASE FOR QUESTIONS
    const DB = {
        //DB Checker
        readyDB: function() { //key: questions
            let dBase;
            if (localStorage.getItem('questions') === null) { //empty
                dBase = []; //prepare to stock
            } else {
                dBase = JSON.parse(localStorage.getItem('questions'));
            }
            return dBase;
        },
        // 2.2 SECURITY CHECK FOR DB
        setCollection: function(data) {
            let dBase = this.readyDB(); //check
            //stock
            dBase.push(data); //storage them in array...
            localStorage.setItem('questions', JSON.stringify(dBase)); //..as strings
        }
    }
    return {
// PUBLIC
// 1. FORMAT & DATA PROCESSOR --> TO DB
        dbS: function(typedQ, answers) {
            // FORMAT
            const stockA = []; //to storage
            let rigOne, qId;
            let nods = Array.from(answers); //Answers nodeL to arr
            nods.forEach((current) => { //if values, stored them
                if (current.value !== '') {
                    stockA.push(current.value)
                    if (current.previousElementSibling.checked) {
                        rigOne = current.value; //right answer/checked
                        console.log(rigOne); //right one Check point
                    }
                }
            }) //ASSIGNING proper Id to every element
            if (DB.readyDB().length > 0) {
                qId = DB.readyDB()[DB.readyDB().length - 1].id + 1; //assign Id
            } else {
                qId = 0;
            }
            // INSTANCE to storage formatted date
            typedQ = new Input(qId, typedQ.value, stockA, rigOne);
            console.log(typedQ);
            // SAVE instance on DB
            DB.setCollection(typedQ, qId);

        }

    }
})();


//-------------------------------------------------------------------------------
//UI MODULE

const UIController = (function() {
// PRIVATE
    // DOM-WORKFORCE
    const DOM = {
        // input
        insert: document.getElementById('question-insert-btn'),
        nueQ: document.getElementById('new-question-text'),
        options: document.querySelectorAll('.admin-option'),
        adminInput: document.querySelector('.admin-options-container'),
        nueQList: document.querySelector('.inserted-questions-wrapper')
    }
    return {
// PUBLIC
// 1.
        getDom: DOM,
// 2. + INPUT OPTION ON SELECTION
        dinamicAddInput: function() {
                            //2nd son        2nd son
            DOM.adminInput.lastElementChild.lastElementChild.addEventListener('focus', function add(){
                let n = document.querySelectorAll('.admin-option').length;
                // htmtl creation
                const html=`<div class="admin-option-wrapper">
                            <input type="radio" class="admin-option-${n}" name="answer" value="-${n}">
                            <input type="text" class="admin-option admin-option-${n}" value ="">
                            </div>` ;
                // Inject
                DOM.adminInput.insertAdjacentHTML('beforeend', html);
                //REMOVE listener to last element
                DOM.adminInput.lastElementChild.previousElementSibling.lastElementChild.removeEventListener('focus', add);
                //PASS it to newly created
                DOM.adminInput.lastElementChild.lastElementChild.addEventListener('focus', add);
            })
        },
// 3. DISPLAY DATABASE
        displayLS: function(questionAdded){
            console.log('i ran');
            // SIMPLE WAY
            // let n = document.querySelectorAll('.admin-option').length;
            // const htmlII = `<p><span>${questionAdded}</span><button id="question-${n}">Edit</button></p>`;
            // DOM.nueQList.insertAdjacentHTML('afterbegin', htmlII);
            // BEST WAY
            
        },

        showError: function(message) {
            const di = document.createElement('div');
            di.className = 'error';
            di.textContent = message;
            //location

        }

    }
})();



//-------------------------------------------------------------------------------
//EVENTS MODULE

const EController = (function(da, ui) {
    //DOM
    const input = ui.getDom;
    // Inputs ADDED dinamically as user focus on 
    ui.dinamicAddInput();
    // Input click Event ADD
    input.insert.addEventListener('click', function() {
        let stock = Array.from(input.options);
        //re-select added options so that they are taken into account for localStorage and clearfileds
        const addedNewAnswers = document.querySelectorAll('.admin-option'); 
        if (input.nueQ.value.length > 0) {
            // get input from data Module and save it into DB
            console.log(input);
            dataController.dbS(input.nueQ, addedNewAnswers); //123
            // ui.displayLS(input.nueQ.value);      //SIMPLE WAY
            // Clear input fields
            input.nueQ.value = '';
            addedNewAnswers.forEach(current => {
                current.value = '';
                current.previousElementSibling.checked = false;
            });
        } else {
            ui.showError('Please complete the fields');
        }
        
    }); //ADD event ends here
})(dataController, UIController);