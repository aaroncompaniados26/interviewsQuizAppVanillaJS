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
        // DBase Status Check
        getCheck: function() {
            return DB.readyDB();
        },
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

const UIController = (function(DBase) {
    // PRIVATE
    let questions;
    // DOM-WORKFORCE
    const DOM = {
        // input
        insert: document.getElementById('question-insert-btn'),
        nueQ: document.getElementById('new-question-text'), //questions
        options: document.querySelectorAll('.admin-option'), //answers
        adminInput: document.querySelector('.admin-options-container'),
        nueQList: document.querySelector('.inserted-questions-wrapper'),
        updateBtn: document.querySelector('#question-update-btn'),
        deleteBtn: document.querySelector('#question-delete-btn')
    }
    return {
        // PUBLIC
        // 1.
        getDom: DOM,
        // 2. + INPUT OPTION ON SELECTION
        dynamicAddInput: function() {
            //2nd son        2nd son
            DOM.adminInput.lastElementChild.lastElementChild.addEventListener('focus', function add() {
                let n = document.querySelectorAll('.admin-option').length;
                // html creation
                const html = `<div class="admin-option-wrapper">
                            <input type="radio" class="admin-option-${n}" name="answer" value="-${n}">
                            <input type="text" class="admin-option admin-option-${n}" value ="">
                            </div>`;
                // Inject
                DOM.adminInput.insertAdjacentHTML('beforeend', html);
                //REMOVE listener to last element
                DOM.adminInput.lastElementChild.previousElementSibling.lastElementChild.removeEventListener('focus', add);
                //PASS it to newly created
                DOM.adminInput.lastElementChild.lastElementChild.addEventListener('focus', add);
            })
        },
        // 3. DISPLAY DATABASE
        displayLS: function() {
            let stock, stockII;
            // STOCK STATUS
            stock = DBase.getCheck; //DataBase status function
            stockII = stock(); //invoke 113

            if (stockII.length > 0) {
                stockII.forEach((current) => {
                    // html creation
                    const htmlII = `<p>${current.id}. <span>${current.question}</span><button class="selected" 
                                    id="${current.id}">Edit</button></p>`;
                    DOM.nueQList.insertAdjacentHTML('afterbegin', htmlII);
                });
            }
        },
        // 4. EDIT OPTION
        editQList: function(idButton, status, dynamicAdd) {
            // STOCK STATUS
            var foundQuestion, position, check; //status on localStorage
            check = status;
            check.forEach((current, index) => {
                if (current.id === parseInt(idButton)) { //same id on DB, EDIT
                    console.log('found');
                    foundQuestion = current; //storage question to be edited
                    position = index; //back on same place after EDIT
                    console.log(foundQuestion, position);
                    DOM.nueQ.value = foundQuestion.question; //EDIT
                    DOM.adminInput.innerHTML = ''; //Clear fields for answers
                    current.answers.forEach((answer, index) => {
                        let htmlR = `<div class="admin-option-wrapper">
                        <input type="radio" class="admin-option-${index}" name="answer" value="${current.rightOne}"> 
                        <input type="text" class="admin-option admin-option-${index}" value="${answer}"></div>`;
                        // Inject
                        DOM.adminInput.insertAdjacentHTML('beforeend', htmlR);
                        // NAV for EDIT option
                        DOM.deleteBtn.style.visibility = 'visible';
                        DOM.updateBtn.style.visibility = 'visible';
                        DOM.insert.style.visibility = 'hidden';
                        // dynamic add on focus
                        dynamicAdd();
                    });
                    questions = foundQuestion;
                    //console.log(questions);
                }
            })
        },
        // 5. UPDATE QUESTIONS
        updateQuestions: function(){
            console.log(questions);
        }


    } //R87
})(dataController);



//-------------------------------------------------------------------------------
//CONTROLLER MODULE

const EController = (function(da, ui) {
    // PRIVATE
    const input = ui.getDom; //DOM
    let stock, stockII;
    //1. ANSWERS OPTIONS dynamically ADDED  on FOCUS
    ui.dynamicAddInput();
    //2. DISPLAY DATA in dBASE
    ui.displayLS();
    //3. Input ADDER
    const addedNewAnswers = document.querySelectorAll('.admin-option');
    input.insert.addEventListener('click', function() {
        let stock = Array.from(input.options);
        //re-select added options so that they are taken into account for localStorage and clearfileds

        if (input.nueQ.value.length > 0 && input.options[1].value.length > 0) {
            // get input from data Module and save it into DB
            console.log(input);
            dataController.dbS(input.nueQ, addedNewAnswers); //123
            // Clear input fields
            input.nueQ.value = '';
            addedNewAnswers.forEach(current => {
                current.value = '';
                current.previousElementSibling.checked = false;
            });
            ui.displayLS(); //after new question
        } else {
            // ui.showError('Please complete the fields');
            console.log('wrong input , error');
        }
    }); // 147
    // 4. EDIT answers/questions
    input.nueQList.addEventListener('click', function(e) {
        let chosenId;
        if (e.target.className === 'selected') { //clicked 'edit' button 
            chosenId = e.target.id; //grab id
            ui.editQList(chosenId, da.getCheck(), ui.dynamicAddInput); //3rd dynamic method
        };
    });

    // 5. UPDATE questions
    input.updateBtn.addEventListener('click', function(e) {
        console.log("update in process");
        UIController.updateQuestions();    
    }); 
})(dataController, UIController);