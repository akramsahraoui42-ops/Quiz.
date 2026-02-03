let current=0,score=0,timeLeft=60,timer;

function startQuiz(){
let name=document.getElementById("username").value;
if(!name) return alert("اكتب اسمك");

document.getElementById("start").classList.add("hidden");
document.getElementById("quiz").classList.remove("hidden");

document.getElementById("time").innerText=timeLeft;

showQuestion();

timer=setInterval(()=>{
timeLeft--;
document.getElementById("time").innerText=timeLeft;
if(timeLeft==0) finish(name);
},1000);
}

function showQuestion(){
let q=questions[current];

document.getElementById("question").innerText=q.q;

let ansDiv=document.getElementById("answers");
ansDiv.innerHTML="";

q.a.forEach((a,i)=>{
let b=document.createElement("button");
b.innerText=a;
b.onclick=()=>{
if(i==q.correct) score++;
next();
};
ansDiv.appendChild(b);
});
}

function next(){
current++;
if(current>=questions.length) finish(document.getElementById("username").value);
else showQuestion();
}

function finish(name){
clearInterval(timer);

let data=JSON.parse(localStorage.getItem("results")||"[]");

data.push({
name:name,
score:score,
total:questions.length,
date:new Date().toLocaleString()
});

localStorage.setItem("results",JSON.stringify(data));

alert("تم التسليم");
location.href="index.html";
}

//////////////////////
// المشرف
//////////////////////

function login(){
let pass=prompt("كلمة السر");
if(pass!=="admin123") return;

document.getElementById("panel").classList.remove("hidden");
showResults();
}

function showResults(){
let data=JSON.parse(localStorage.getItem("results")||"[]");
let div=document.getElementById("results");

div.innerHTML="";

data.forEach(r=>{
div.innerHTML+=`<p>${r.name} | ${r.score}/${r.total} | ${r.date}</p>`;
});
}

function downloadExcel(){
let data=JSON.parse(localStorage.getItem("results")||"[]");

let csv="الاسم,النتيجة,التاريخ\n";

data.forEach(r=>{
csv+=`${r.name},${r.score}/${r.total},${r.date}\n`;
});

let blob=new Blob([csv]);
let a=document.createElement("a");
a.href=URL.createObjectURL(blob);
a.download="results.csv";
a.click();
}

function clearData(){
localStorage.removeItem("results");
showResults();
}
