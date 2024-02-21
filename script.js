const colors= ["red", "orange", "yellow", "green", "blue", "pink", "purple", "white"]
let randCode= []

let selectSecretCode = false

function randomCode() { //return codeToGuess utilisé dans guessCode()
    while (randCode.length < 4) {
        newColor= colors[Math.floor(Math.random()*colors.length)]
        isInCode= randCode.filter(element => element === newColor).length
        if (isInCode === 0) {
            randCode.push(newColor)
        }
        else {
            return randomCode()
        }
    }
    console.log(randCode)
    document.getElementById("answer").innerHTML += "le code secret a été choisi !" + "<br>"
    codeToGuess = randCode
    randCode= []
    selectSecretCode = true
    return codeToGuess
}

function numberColors (arr) { // return true or false
    if (arr.length === 4) {
        return true
    }
    else {
        return false
    }
}

function nameColors (arr) { // return false
    i=0
    while (i<arr.length) {
        currentColor= arr[i]
        isValid= colors.filter(element => element === currentColor).length
        if (isValid === 0) {
            return false
        }
        i++
    } 
}

function multiColors (arr) { // return false
    i=0
    while (i<arr.length) {
        currentColor = arr[i]
        isMulti= arr.filter(element => element === currentColor).length
        if (isMulti > 1) {
            return false
        }
        i++
    }
}

// vérifie si l'input correspond aux règles imposées
function validInput () { //return true
    input = document.getElementById("input").value
    document.getElementById("input").value = ""
    answer = input.split(" ")
    checkNum = numberColors(answer)
    if (checkNum == false) {
        document.getElementById("answer").innerHTML += "Entrez 4 couleurs" + "<br>"
    }
    else {
        checkName= nameColors(answer)
        if (checkName == false) {
            document.getElementById("answer").innerHTML += "Entrez des noms valides" + "<br>"
        }
        else {
            checkMulti= multiColors(answer)
            if (checkMulti == false) {
                document.getElementById("answer").innerHTML += "Il ne peut pas y avoir deux fois la même couleur" + "<br>" 
            }
            else {
                return true
            }
        }
    }    
}

let tour=1

function guessCode () {
    while (selectSecretCode === false) {
        return document.getElementById("answer").innerHTML += "vous devez d'abord générer un code secret <br>"
    }
    checkAnswer= validInput() // contient le tableau answer
    if (checkAnswer === true) {
        while (tour<13) {
            document.getElementById("answer").innerHTML += "tour " + tour + " : " + answer + "<br>"
            x=0
            rightPlace= 0
            wrongPlace= 0
            while (x<answer.length) {
                if (answer[x] === codeToGuess[x]) {
                    rightPlace ++
                    //x++
                }
                else {
                    colorToCheck= answer[x]
                    isInCode = codeToGuess.filter(element => element === colorToCheck).length
                    if (isInCode !== 0) {
                        wrongPlace ++
                    }
                }
                x++
            }
            if (tour === 12 && rightPlace !== 4) {
                document.getElementById("answer").innerHTML += "perdu" + "<br>"
            }
            else if (rightPlace === 4) {
                document.getElementById("answer").innerHTML += "gagné" + "<br>"
                return
            }
            else {
                document.getElementById("answer").innerHTML += "bien placée: " + rightPlace + "<br>" + "mal placée: " + wrongPlace + "<br>"  
            }
            tour++
            return
        }   
    }
}


