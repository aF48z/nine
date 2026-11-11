const quizWords = document.getElementById("quizWords");
const previousWord = document.getElementById("previousWord");
const currentWord = document.getElementById("currentWord");
const nextWord = document.getElementById("nextWord");
const resultWord = document.getElementById("resultWord");
const previousBtn = document.getElementById("previousBtn");
const nextBtn = document.getElementById("nextBtn");
const judgeBtn = document.getElementById("judgeBtn");
const restartBtn = document.getElementById("restartBtn");
let words = [];
let successIndex = 0;
let currentIndex = 0;

async function getWords() {
    try {
        const response = await fetch("./data/quizWords.json");
        // console.log("response: ", response);

        if(!response.ok) {
            throw new Error(`Failed to fetch: ${response.status}`);
        }

        const data = await response.json();
        // console.log("data: ", data);
        // console.log("data[0]: ", data[0]);

        const shuffledData = [...data];
        // console.log("shuffledData:", shuffledData);

        for(let i = shuffledData.length - 1; i > 0; i--){
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledData[i], shuffledData[j]] = [shuffledData[j], shuffledData[i]];
            // console.log("i-string, j-string; ", i, j, shuffledData[i], shuffledData[j]);
        }

        return shuffledData;

    } catch (error) {
        console.error(error);
        quizWords.textContent = "Failed to load words";
    }
}

async function init() {
    words = await getWords();
    console.log("words: ", words);

    if (!words) {
        console.error("Error: Failed to retrieve words.");
        return;
    }

    if (words.length < 3) {
        console.error("Error: words must contain at least 3 elements.");
        return;
    }

    successIndex = words.indexOf("nine");
    console.log("word - successIndex: ", words[successIndex], successIndex);

    if (successIndex === -1) {
        console.error("Error: Failed to find the specified string.");
        return;
    }

    currentIndex = Math.floor((words.length) / 2);
    console.log("currentIndex: ", currentIndex);

    resultWord.textContent = "Playing"

    displayWord();
}

function displayWord() {
    previousWord.textContent = words[(currentIndex - 1 + words.length) % words.length];
    currentWord.textContent = words[currentIndex];
    nextWord.textContent = words[(currentIndex + 1) % words.length];
    console.log("previousWord-currentWord-nextWord: ", previousWord, currentWord, nextWord);
    console.log("currntIndex: ", currentIndex);
}

function next() {
    currentIndex = (currentIndex + 1) % words.length;
    console.log("next: ", currentIndex);
    displayWord();
}

function previous() {
    currentIndex = (currentIndex - 1 + words.length) % words.length;
    displayWord();
}

function judge(word) {
    if(word === "nine"){
        console.log("successIndex - currentIndex", successIndex, currentIndex);
        resultWord.textContent = "That is nine!!"
    } else {
        console.log("successIndex - currentIndex", successIndex, currentIndex);
        resultWord.textContent = "No!!"
    }
}

function restart() {
    init();
}

previousBtn.addEventListener("click", previous);
nextBtn.addEventListener("click", next);
judgeBtn.addEventListener("click", () => {
    judge(words[currentIndex]);
});
restartBtn.addEventListener("click", restart);

init();
// 制限時間
// 徐々に暗黒
