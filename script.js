let current=0,score=0,timeLeft=05,timer;
let studentName="",studentId="";

function startQuiz(){
studentName=document.getElementById("studentName").value;
studentId=document.getElementById("studentId").value;
if(!studentName||!studentId) return alert("املأ البيانات");

document.getElementById("loginBox").classList.add("hidden");
document.getElementById("quizBox").classList.remove("hidden");

showQuestion();

timer=setInterval(()=>{
timeLeft--;
document.getElementById("time").innerText=timeLeft;
if(timeLeft<=0) finish();
},1000);
}

function showQuestion(){
let q=questions[current];
document.getElementById("count").innerText=(current+1)+"/"+questions.length;
document.getElementById("time").innerText=timeLeft;
document.getElementById("question").innerText=q.q;

let div=document.getElementById("answers");
div.innerHTML="";

q.a.forEach((a,i)=>{
let b=document.createElement("button");
b.innerText=a;
b.onclick=()=>{ if(i==q.correct) score++; next(); };
div.appendChild(b);
});
}

function next(){
current++;
if(current>=questions.length) finish();
else showQuestion();
}

function finish(){
clearInterval(timer);
let data=JSON.parse(localStorage.getItem("results")||"[]");

data.push({
name:studentName,
id:studentId,
score:score,
total:questions.length,
date:new Date().toLocaleString()
});

localStorage.setItem("results",JSON.stringify(data));
alert("تم إرسال الاختبار");
location.href="index.html";
}

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
div.innerHTML+=`<p>👤 ${r.name} | 🆔 ${r.id} | ✔ ${r.score}/${r.total} | 🕒 ${r.date}</p>`;
});
}

function downloadExcel(){
let data=JSON.parse(localStorage.getItem("results")||"[]");
let csv="الاسم,الرقم,النتيجة,التاريخ\n";
data.forEach(r=>{
csv+=`${r.name},${r.id},${r.score}/${r.total},${r.date}\n`;
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
