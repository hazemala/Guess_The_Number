main()
function main() {
    let randomNumber1 = Math.floor(Math.random() * 10);
    let randomNumber2 = Math.floor(Math.random() * 10);
    let randomNumber3 = Math.floor(Math.random() * 10);
    let secretNumbr = [randomNumber1, randomNumber2, randomNumber3];
    console.log(secretNumbr)

    let numberOfNums = 3;
    let currentField = 0;
    let numberOfTries = 5;
    let WinOrLose;
    
    createInputs(numberOfNums,currentField,numberOfTries,WinOrLose,secretNumbr)
}

// Create The Inputs
function createInputs(numberOfNums,currentField,numberOfTries,WinOrLose,secretNumbr) {
    let inputContainer = document.querySelector(".inputs");
    let entryField = document.createElement("div");
    entryField.classList.add("entry-field")
    entryField.dataset = currentField;

    for (let i = 0; i < numberOfNums; i++) {
        let input = document.createElement("input");
        input.type = "text";
        input.maxLength = 1;
        input.setAttribute("index", i);
        entryField.appendChild(input);
    }

    inputContainer.appendChild(entryField);

    entryField.children[0].focus()


    let inputs = document.querySelectorAll("input");
    inputs.forEach((input, index) => {
        input.addEventListener("input", function () {
            if (isNaN(parseInt(input.value))) {
                input.value = "";
            } else {
                let nextInput = inputs[index + 1];
                if (nextInput) nextInput.focus()
            }
        });
        input.addEventListener("keydown", function (event) {
            let currentIndex = index
            let nextInput = inputs[currentIndex + 1];
            let prevInput = inputs[currentIndex - 1];
            if (event.key === "ArrowRight") {
                if (nextInput) nextInput.focus()
            } else if (event.key === "ArrowLeft") {
                if (prevInput) prevInput.focus()
            } else if (event.key === "Backspace") {
                if (input.value === "") {
                    if (prevInput) prevInput.focus()
                } else {
                    input.value = ""
                }
            } else if (event.key === "Enter") {
                check(numberOfNums,currentField,numberOfTries,WinOrLose,secretNumbr)
            }
        })
    });

    let checkBtn = document.querySelector(".check");
    checkBtn.onclick = function () { 
        check(numberOfNums,currentField,numberOfTries,WinOrLose,secretNumbr,checkBtn)
    }

    let allEntryField = document.querySelectorAll(".entry-field");
    allEntryField.forEach((field, index) => {
        if (index === currentField) {
            for (let i = 0; i < field.children.length; i++) {
                field.children[i].disabled = false;
            }
        } else {
            for (let i = 0; i < field.children.length; i++) {
                if (field.children[i].disabled) {
                    continue
                } else {
                    field.children[i].disabled = true;
                }
            }
        }
    })

    
}

function check(numberOfNums,currentField,numberOfTries,WinOrLose,secretNumbr,checkBtn) {
    let user_sol = []
    let allEntryField = document.querySelectorAll(".entry-field");
    console.log(allEntryField)
    allEntryField.forEach((field, index) => {
        if (index === currentField) {
            for (let i = 0; i < field.children.length;i++) {
                user_sol.push(parseInt(field.children[i].value));
                if (secretNumbr.includes(parseInt(field.children[i].value))) {
                    if (parseInt(field.children[i].value) === secretNumbr[i]) {
                        field.children[i].classList.add("right")
                    } else {
                        field.children[i].classList.add("semi-right")
                    }
                } else {
                    field.children[i].classList.add("wrong")
                }
            }
        } 
    });

    console.log(user_sol)
    if (user_sol.join() === secretNumbr.join()) {
        WinOrLose = "win";
        popUp(numberOfNums,currentField,numberOfTries,WinOrLose,secretNumbr,checkBtn);
    } else {
        if (currentField === numberOfTries - 1) {
            WinOrLose = "lose";
            popUp(numberOfNums,currentField,numberOfTries,WinOrLose,secretNumbr,checkBtn);
        } else {
            currentField++;
            createInputs(numberOfNums,currentField,numberOfTries,WinOrLose,secretNumbr)
        }
    }
}

function popUp(numberOfNums,currentField,numberOfTries,WinOrLose,secretNumbr,checkBtn) {
    let pop = document.querySelector(".pop-up");
    let h3 = document.createElement("h3");
    let p = document.createElement("p");

    if (WinOrLose === "win") {
        h3.innerHTML = "Congratulation!";
        p.innerHTML = `You Guessed The Number Correctly, The Number Was <span style="--mcolor:green;">${secretNumbr.join("")}</span>`;
        h3.style.color = "green";
    } else {
        h3.innerHTML = "Game Over!";
        p.innerHTML = `You Couldn't Guess The Number Correctly, The Number Is <span style="--mcolor:red;">${secretNumbr.join("")}</span>`;
        h3.style.color = "red";
    }

    pop.appendChild(h3);
    pop.appendChild(p);

    pop.style.display = "block";

    let h3Again = document.createElement("h3");
    let btnContainer = document.createElement("div")
    let yBtn = document.createElement("button");
    let nBtn = document.createElement("button");

    h3Again.innerHTML = "Are You Want To Play Again?";
    h3Again.classList.add("again")
    yBtn.innerHTML = "Yes";
    nBtn.innerHTML = "No";
    yBtn.classList.add("y-btn");
    nBtn.classList.add("n-btn");

    btnContainer.appendChild(yBtn);
    btnContainer.appendChild(nBtn);

    pop.appendChild(h3Again);
    pop.appendChild(btnContainer);

    document.querySelector(".check").disabled = true;
    document.querySelectorAll("input").forEach((input) => {
        if (input.disabled === false) {
            input.disabled = true;
        }
    })

    nBtn.onclick = function () {
        pop.style.display = "none";
    }
    yBtn.onclick = function () {
        location.reload();
    }
}

