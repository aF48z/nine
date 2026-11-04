const quizWord = document.getElementById("quizWord");
console.log("quizWord: ", quizWord);

async function getWords() {
    try {
        const response = await fetch("./data.json");
        console.log("response: ", response);

        if(!response.ok) {
            throw new Error(`Failed to fetch: ${response.status}`);
        }

        const data = await response.json();
        console.log("data: ", data);
        console.log("data[0]: ", data[0]);

        const shuffledData = [...data];
        console.log("shuffledData:", shuffledData);

        for(let i = shuffledData.length - 1; i > 0; i--){
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledData[i], shuffledData[j]] = [shuffledData[j], shuffledData[i]];
            console.log("i-string, j-string; ", i, j, shuffledData[i], shuffledData[j]);
        }

        return shuffledData;

    } catch (error) {
        console.error(error);
        quizWord.textContent = "Failed to load words";
    }
}


async function displayWord() {
    quizWord.textContent = await getWords();
}


displayWord();
