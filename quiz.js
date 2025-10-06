 const quizData =[
    {question:"what is 2+2?",options:["3","5","4"],answer:"4"},
    {question:"capital of france?",options:["berlin","paris","london"],answer:"paris"},
    {question:"which is a js framework?",options:["React","Django","Laravel"],answer:"React"},


 ];

 let currentIndex =0;
 let score =0;
 let timer ;
 let timeleft =10;
 let userAnswers =[];

//  startquiz
function startquiz(){
    document.getElementById("start-screen").style.display="none";
    document.getElementById("quiz-container").style.display="block";
    loadQuiz();
    startTimer();
}

// load questions
function loadQuiz(){
    const current = quizData[currentIndex];
    document.getElementById("questions").innerText = current.question;

    const answersDiv =document.getElementById("answers") ;
    answersDiv.innerHTML="" ;

    const letters = ["A","B","C","D"]

    current.options.forEach((opt , index)=> {
        const btn =document.createElement("button");
        btn.classList.add("option-btn");
        btn.innerText = `${letters[index]}.${opt}`;
        btn.onclick =() => checkAnswer(opt);

        
        answersDiv.appendChild(btn);
        
    });
    
}

// check answer
function checkAnswer(selected){
    userAnswers[currentIndex] = selected;

      
    clearInterval(timer);


    document.getElementById("next-btn").style.display = "inline-block";

    
}

function nextQuestion(){
    currentIndex++;
    if(currentIndex < quizData.length){
        document.getElementById("next-btn").style.display = "none";

        loadQuiz();
        resetTimer();
    }else{
        document.getElementById("questions").innerText =" 🎉Quiz Finished !";
        document.getElementById("answers").innerHTML ="";
        document.getElementById("timer").innerText ="";
        document.getElementById("score").innerText = `Final Score: ${calculateScore()} / ${quizData.length}`;
        showScoreMeter();
        document.getElementById("next-btn").style.display = "none";

        document.getElementById("Restart-btn").style.display ="inline-block";
        document.getElementById("review-btn").style.display = "inline-block"; // show review button



    }
}

function showScoreMeter() {
    const meter = document.getElementById("score-meter");
    const circle = document.querySelector(".progress");
    const text = document.getElementById("meter-text");

    meter.style.display = "block";

    const percentage = Math.round((score / quizData.length) * 100);

    // circle circumference
    const circumference = 2 * Math.PI * 54;
    const offset = circumference - (percentage / 100) * circumference;

    circle.style.strokeDashoffset = offset;
    text.textContent = percentage + "%";
}



function calculateScore() {
    score = 0;
    quizData.forEach((q, i) => {
        if (userAnswers[i] === q.answer) {
            score++;
        }
    });
    return score;
}

function showReview() {
    const reviewDiv = document.createElement("div");
    reviewDiv.id = "review";
    reviewDiv.innerHTML = "<h2>📝 Review</h2>";

    quizData.forEach((q, i) => {
        const userAns = userAnswers[i] || "No answer";
        const correctAns = q.answer;

        const reviewItem = document.createElement("div");
        reviewItem.classList.add("review-item");

        reviewItem.innerHTML = `
            <p><b>Q${i+1}:</b> ${q.question}</p>
            <p>👉 Your Answer: <span class="${userAns === correctAns ? 'correct' : 'wrong'}">${userAns}</span></p>
            <p>✅ Correct Answer: <span class="correct">${correctAns}</span></p>
            <hr>
        `;

        reviewDiv.appendChild(reviewItem);
    });

    document.getElementById("quiz-container").appendChild(reviewDiv);
    document.getElementById("review-btn").style.display = "none"; // hide button after showing

}

    

function startTimer(){
    timeleft =10;
    document.getElementById("timer").innerText = `⏳ time left: ${timeleft}s`;
    timer = setInterval(() => {
        timeleft--;
        document.getElementById("timer").innerText =`⏳ time left: ${timeleft}s`;
        if(timeleft <= 0){
            clearInterval(timer);
            nextQuestion();
        }
    },1000);
}

function resetTimer(){
    clearInterval(timer);
    startTimer();
}

function restartQuiz(){
    currentIndex=0;
    score=0; 
    userAnswers =[];

    document.getElementById("quiz-container").style.display ="none";
    document.getElementById("start-screen").style.display ="block";

    document.getElementById("Restart-btn").style.display ="none";
    document.getElementById("next-btn").style.display="none";
    document.getElementById("review-btn").style.display = "none"
    document.getElementById("score").innerText ="";

    document.getElementById("score-meter").style.display = "none";
    document.querySelector(".progress").style.strokeDashoffset = 339.292;
    document.getElementById("meter-text").textContent = "0%";


    const reviewEl = document.getElementById("review");
    if(reviewEl) reviewEl.remove();
}