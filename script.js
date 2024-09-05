document.addEventListener('DOMContentLoaded', () => {
    const createQuizBtn = document.getElementById('createQuizBtn');
    const takeQuizBtn = document.getElementById('takeQuizBtn');
    const quizListBtn = document.getElementById('quizListBtn');
    const quizForm = document.getElementById('quizForm');
    const questionContainer = document.getElementById('questionContainer');
    const quizContainer = document.getElementById('quizContainer');
    const submitQuizBtn = document.getElementById('submitQuizBtn');
    const results = document.getElementById('results');
    const retryQuizBtn = document.getElementById('retryQuizBtn');
    const quizList = document.getElementById('quizList');

    let quizzes = [];
    let currentQuiz = null;

    function showSection(section) {
        document.querySelectorAll('main > section').forEach(sec => sec.classList.add('hidden'));
        section.classList.remove('hidden');
    }

    createQuizBtn.addEventListener('click', () => showSection(document.getElementById('createQuizSection')));
    takeQuizBtn.addEventListener('click', () => showSection(document.getElementById('takeQuizSection')));
    quizListBtn.addEventListener('click', () => {
        showSection(document.getElementById('quizListSection'));
        displayQuizList();
    });

    document.getElementById('addQuestionBtn').addEventListener('click', () => {
        const questionDiv = document.createElement('div');
        questionDiv.innerHTML = `
            <input type="text" placeholder="Question" required>
            <input type="text" placeholder="Option 1" required>
            <input type="text" placeholder="Option 2" required>
            <input type="text" placeholder="Option 3" required>
            <input type="text" placeholder="Option 4" required>
            <input type="text" placeholder="Correct Answer (1-4)" required>
        `;
        questionContainer.appendChild(questionDiv);
    });

    quizForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const questions = [];
        questionContainer.querySelectorAll('div').forEach(div => {
            const inputs = div.querySelectorAll('input');
            const question = {
                text: inputs[0].value,
                options: [inputs[1].value, inputs[2].value, inputs[3].value, inputs[4].value],
                correct: parseInt(inputs[5].value) - 1
            };
            questions.push(question);
        });
        quizzes.push(questions);
        questionContainer.innerHTML = '';
        alert('Quiz saved!');
    });

    function displayQuizList() {
        quizList.innerHTML = '';
        quizzes.forEach((quiz, index) => {
            const quizItem = document.createElement('button');
            quizItem.textContent = `Quiz ${index + 1}`;
            quizItem.addEventListener('click', () => startQuiz(index));
            quizList.appendChild(quizItem);
        });
    }

    function startQuiz(index) {
        currentQuiz = quizzes[index];
        quizContainer.innerHTML = '';
        currentQuiz.forEach((question, i) => {
            const questionDiv = document.createElement('div');
            questionDiv.innerHTML = `
                <p>${i + 1}. ${question.text}</p>
                ${question.options.map((opt, j) => `
                    <label>
                        <input type="radio" name="question${i}" value="${j}">
                        ${opt}
                    </label>
                `).join('')}
            `;
            quizContainer.appendChild(questionDiv);
        });
        submitQuizBtn.classList.remove('hidden');
        showSection(document.getElementById('takeQuizSection'));
    }

    submitQuizBtn.addEventListener('click', () => {
        let score = 0;
        currentQuiz.forEach((question, i) => {
            const selectedOption = quizContainer.querySelector(`input[name="question${i}"]:checked`);
            if (selectedOption && parseInt(selectedOption.value) === question.correct) {
                score++;
            }
        });
        results.textContent = `You scored ${score} out of ${currentQuiz.length}`;
        showSection(document.getElementById('quizResultsSection'));
    });

    retryQuizBtn.addEventListener('click', () => {
        showSection(document.getElementById('takeQuizSection'));
    });
});
