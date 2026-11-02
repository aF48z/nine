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
        console.log("data[0]", data[0]);

        return data[0];

    } catch (error) {
        console.error(error);
        quizWord.textContent = "Failed to load words";
    }
}


async function displayWord() {
    quizWord.textContent = await getWords();
}


displayWord();
