const container = document.querySelector('.container');
const startGameBtn = document.querySelector('button');


function shuffle(array) {
    array.sort(function () {
        return Math.random() - .5;
    });
}


function makeRand(min, max) {
    return Math.random() * (max - min) + min;
}

function arrayInRange(num) {
    let myArray = []
    for (let x of Array(num).keys()) {
        myArray.push(x)
    }
    return myArray
}

function ascNums(num1, num2) {
    return num1 - 1 === num2
}

const hideNum = function (delay) {
    return new Promise((resolve, refect) => {
        setTimeout(() => {
            listOfNum.forEach((x) => {
                x.classList.add('hideNum')
            })
            resolve();
        }, delay)
    })
}

// const timeForChoosing = function(delay){
//     return new Promise((resolve,reject)=>{

//     })
// }

// if spacesOnCol/Row.length < numCount then add more
function addNewSpaces(spacesOnCol,spacesOnRow,numCount){
    while (spacesOnCol.length < numCount || spacesOnRow.length < numCount) {
        if (spacesOnCol.length < numCount) {
            spacesOnCol.push(...spacesOnCol)
        } else if (spacesOnRow.length < numCount) {
            spacesOnRow.push(...spacesOnRow)
        } else {
            break
        }
    }
}

// max space occupied by num
let numSize = 38;
// how many num to gen
let numCount = 2;


// list of num in .container
let listOfNum = []
// list with position of nums
let listOfPositions = []

let choice = NaN
let listOfChoices = [-1]

let score = 0;

// let [spacesOnRow, spacesOnCol] = [[], []]
// spaces available on col
let spacesOnCol = [];
let spacesOnRow = [];

const startGame = () => {
    resetGameVar(numCount,score);
    
    [spacesOnRow, spacesOnCol] = spacesOnContainer(numSize)

    // avoid typig nums before hideNum
    container.removeEventListener('mouseup', startChoosing)

    genRandNum(numCount)

    hideNum(3000)
        .then(() => {
            container.addEventListener('mouseup', startChoosing)
        })
}

function newGame(){
    numCount = 2
    score = 0

    startGame()
    // remove e after newGame
    startGameBtn.removeEventListener('click', newGame)
}

startGameBtn.addEventListener('click',newGame)


function resetGameVar(currentCount,currentScore) {
    container.innerText = '';
    numCount = currentCount

    listOfNum = []
    listOfPositions = []

    [spacesOnRow, spacesOnCol] = [[], []]

    choice = NaN
    listOfChoices = [-1]
    score = currentScore
}



function spacesOnContainer(numSize) {
    // save and return available spaces in .container
    let numRow = Math.floor(container.offsetWidth / numSize);
    let numCol = Math.floor(container.offsetHeight / numSize);

    spacesOnRow.push(...arrayInRange(numRow))
    spacesOnCol.push(...arrayInRange(numCol))

    shuffle(spacesOnRow)
    shuffle(spacesOnCol)

    return [spacesOnRow, spacesOnCol]
}



const startChoosing = function (e) {

    if (e.target.classList[0] === 'randNum' && e.target.tagName === 'BUTTON') {

        choice = parseInt(e.target.innerText)
        prevChoice = listOfChoices[listOfChoices.length - 1]

        if (ascNums(choice, prevChoice)) {

            listOfChoices.push(choice)

            listOfNum[choice].remove()

            
            if (listOfNum.length === listOfChoices.length - 1) {
            //win: 
                numCount++
                score++

                startGame()
            }
        } else {
            // lose:
            resetGameVar(numCount,score)
            startGameBtn.addEventListener('click', newGame)
        }

    }

}



//gen rand num 
function genRandNum(numCount) {
    // tCountloop:
    for (let i = 0; i < numCount; i++) {
        /////////////////////////////////////////////////////////
        // check if size of spacesOnCol/Row is exceeded
        addNewSpaces(spacesOnCol,spacesOnRow,numCount)
        ////////////////////////////////////////////////////////
        const newNum = document.createElement('button')
        newNum.classList.add('randNum');
        newNum.innerText = i
        /////////////////////////////////////////////////
        //set position
        randLeft = `${spacesOnRow[i] * numSize}px`
        randTop = `${spacesOnCol[i] * numSize}px`
        ////////////////////////////////////////
        
        // check collision
        keepLoop = true
        while (keepLoop && listOfPositions.length > 1) {
            for (let x of listOfPositions) {
                if (randLeft === x.posLeft && randTop === x.posTop) {
                    shuffle(spacesOnRow)
                    shuffle(spacesOnCol)
                    randLeft = `${spacesOnRow[i] * numSize}px`
                    randTop = `${spacesOnCol[i] * numSize}px`
                    keepLoop = true
                    break
                } else {
                    keepLoop = false
                }
            }
        }
        
        ///////////////////////////////////////////////////////////
        listOfPositions.push({ posLeft: randLeft, posTop: randTop })
        listOfNum.push(newNum)
        ///////////////////////////////////////////////////////////////
        newNum.style.left = randLeft
        newNum.style.top = randTop
        container.append(newNum)
        //////////////////////////////////////////////////////////////
    }

}



// br




// function spacesOnContainer(numSize,spacesColOrRow,) {
//     // reset game var
    

//     // impartim containerul in spati disponibile pe rand si coloane pentru 
//     // grosimea si inaltimea numerelor
//     let numColOrRow = Math.floor(container.offsetWidth / numSize);
//     // let numCol = Math.floor(container.offsetHeight / numSize);
//     // let spacesOnRow = [];
//     // let spacesOnCol = [];
//     // salveaza numerele disponibile pe rand/col
//     spacesColOrRow.push(...arrayInRange(numColOrRow))
//     // spacesOnCol.push(...arrayInRange(numCol))
//     //amesteca spatiile disponibile
//     shuffle(spacesColOrRow)
//     // shuffle(spacesOnCol)

//     return spacesColOrRow
// }




// function checkCollision(){
//     keepLoop = true
//     while (keepLoop && listOfPositions.length > 1) {
//         for (let x of listOfPositions) {
//             if (randLeft === x.posLeft && randTop === x.posTop) {
//                 shuffle(spacesOnRow)
//                 shuffle(spacesOnCol)
//                 randLeft = `${spacesOnRow[i] * numSize}px`
//                 randTop = `${spacesOnCol[i] * numSize}px`
//                 keepLoop = true
//                 break
//             } else {
//                 keepLoop = false
//             }
//         }
//     }
// }
