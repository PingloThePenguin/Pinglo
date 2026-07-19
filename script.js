const questions = [

{
    title:"Let's build something amazing.",
    subtitle:"First, tell us your business name.",
    type:"input",
    placeholder:"Example: Crescent Coffee"
},


{
    title:"What type of business are you?",
    subtitle:"Choose the category that fits you best.",
    type:"choices",
    options:[
        "☕ Restaurant",
        "🏠 Real Estate",
        "🔨 Construction",
        "💈 Local Service",
        "🛒 Store",
        "Other"
    ]
},


{
    title:"What level of website are you looking for?",
    subtitle:"Choose the investment level that fits your goals.",
    type:"choices",
    options:[
        "Starter ($500-$1000)",
        "Growth ($1000-$2500)",
        "Premium ($2500+)"
    ]
},


{
    title:"Where can we contact you?",
    subtitle:"Phone number for your website consultation.",
    type:"input",
    placeholder:"(555) 555-5555"
},


{
    title:"Almost finished.",
    subtitle:"What email should we send updates to?",
    type:"input",
    placeholder:"business@email.com"
}

];



let currentQuestion = 0;

let answers = [];





function openQuote(){

    document.getElementById("quote").style.display="flex";

    loadQuestion();

}






function loadQuestion(){


const q = questions[currentQuestion];


document.getElementById("question").innerHTML=q.title;

document.getElementById("subtitle").innerHTML=q.subtitle;



let container=document.getElementById("quoteContent");



let oldInput=document.getElementById("answer");

if(oldInput){
    oldInput.remove();
}



document.querySelectorAll(".choice")
.forEach(e=>e.remove());



if(q.type==="input"){


let input=document.createElement("input");

input.id="answer";

input.placeholder=q.placeholder;


container.insertBefore(
input,
document.querySelector(".quote-box button")
);


}



else{


q.options.forEach(option=>{


let button=document.createElement("button");

button.className="choice";

button.innerHTML=option;


button.onclick=()=>{

answers.push(option);

nextQuestion();

};



container.insertBefore(
button,
document.querySelector(".quote-box button")
);


});

}


updateProgress();


}







function nextQuestion(){



let input=document.getElementById("answer");



if(input){


if(input.value.trim()==""){

input.style.border="2px solid #ef4444";

return;

}


answers.push(input.value);

}



currentQuestion++;



if(currentQuestion>=questions.length){

startLoading();

return;

}



animateQuestion();


}






function animateQuestion(){


const content=document.getElementById("quoteContent");


content.style.opacity="0";

content.style.transform="translateY(20px)";


setTimeout(()=>{


loadQuestion();


content.style.opacity="1";

content.style.transform="translateY(0)";


},300);



}







function updateProgress(){


let percent=((currentQuestion+1)/questions.length)*100;


document.getElementById("progressBar")
.style.width=percent+"%";


}







function startLoading(){


document.getElementById("quoteContent")
.classList.add("hidden");



document.getElementById("loading")
.classList.remove("hidden");



let texts=[

"Analyzing your business...",

"Planning your website strategy...",

"Creating your project profile...",

"Preparing your Pinglo experience..."

];



let i=0;



let interval=setInterval(()=>{


document.getElementById("loadingText")
.innerHTML=texts[i];


i++;


if(i>=texts.length){

clearInterval(interval);


setTimeout(()=>{

finish();

},800);


}


},900);



}







function finish(){



document.getElementById("loading")
.classList.add("hidden");



document.getElementById("complete")
.classList.remove("hidden");



sendLead();



}








function sendLead(){



const webhookURL =
"YOUR_PRIVATE_API_ENDPOINT";



const payload={


business:answers[0],

industry:answers[1],

budget:answers[2],

phone:answers[3],

email:answers[4],

time:new Date().toISOString()


};




/*

DO NOT PUT YOUR DISCORD WEBHOOK HERE.

Use a backend endpoint.

Example:

fetch("/api/contact",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify(payload)
});


*/



console.log("Pinglo Lead:",payload);



}







// smoother transitions


document.getElementById("quoteContent")
.style.transition=".3s";
