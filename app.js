const $=s=>document.querySelector(s);const $$=s=>[...document.querySelectorAll(s)];
let player="Player", score=0, timer=null;

function name(){player=($("#playerName").value||"Player").trim().slice(0,20)||"Player"}
function showGame(html){$("#home").classList.add("hidden");$("#result").classList.add("hidden");$("#game").classList.remove("hidden");$("#game").innerHTML=html}
function home(){clearInterval(timer);$("#game").classList.add("hidden");$("#result").classList.add("hidden");$("#home").classList.remove("hidden")}
function finish(title,sub){clearInterval(timer);$("#game").classList.add("hidden");$("#result").classList.remove("hidden");$("#result").innerHTML=`<button class="back" id="homeBtn">← Home</button><h2>${title}</h2><p>${sub}</p><div class="stat"><div><small>Player</small><strong>${player}</strong></div><div><small>Score</small><strong>${score}</strong></div></div><button class="action" id="again">PLAY AGAIN</button>`;$("#homeBtn").onclick=home;$("#again").onclick=()=>$("#game").classList.add("hidden")||start(current)}
let current;

const ceoEvents=[
["09:00 — Your server is down. 40% of users cannot access the app.",["Move users to backup cloud (-₹30K)","Wait and save money (−15 reputation)","Shut down the service (−25 growth)"],0],
["12:00 — Your best developer is exhausted before launch.",["Give the team a break (−₹10K)","Force overtime (−20 morale)","Cancel a feature (−15 growth)"],0],
["17:00 — A competitor launches a similar product.",["Launch your strongest feature (−₹25K)","+50% marketing (−₹40K)","Ignore them (−25 reputation)"],0],
["21:00 — A major customer wants a discount.",["Offer 10% discount (−₹15K)","Refuse (−20 customer score)","Offer a longer contract (+10 customer score)"],2]
];
function startCEO(){current="ceo";score=1000;let i=0;showGame(`<div class="topline"><b>🧑‍💼 24 HOURS: CEO</b><span id="ceoScore">Score: 1000</span></div><div id="ceoQ"></div>`);renderCEO(i)}
function renderCEO(i){if(i>=ceoEvents.length){finish("🚀 COMPANY SURVIVED!", "Your leadership decisions are complete.");return}let [q,opts,best]=ceoEvents[i];$("#ceoQ").innerHTML=`<div class="question">${q}</div><div class="choices">${opts.map((x,n)=>`<button class="choice" data-n="${n}">${x}</button>`).join("")}</div>`;$$(".choice").forEach(b=>b.onclick=()=>{let n=+b.dataset.n;score+=n===best?300:100;$("#ceoScore").textContent="Score: "+score;setTimeout(()=>renderCEO(i+1),250)})}

const rounds=[
["Pattern",["2, 4, 8, 16, ?","20","24","32","36"],2],
["Logic",["If all Bloops are Razzies and all Razzies are Lazzies, Bloops are...","Lazzies","Not Lazzies","Neither","Impossible"],0],
["Binary",["What is decimal 5 in binary?","100","101","110","111"],1],
["Algorithm",["Which is generally fastest for searching a sorted list?","Linear search","Binary search","Bubble sort","Random search"],1],
["Observation",["Which character is different?","AA8AA","AA8AA","AAOAA","AA8AA"],2]
];
function startMachine(){current="machine";score=0;let i=0;showGame(`<div class="topline"><b>🤖 HUMAN VS MACHINE</b><span id="round">Round 1/5</span></div><div id="machineQ"></div>`);renderMachine(i)}
function renderMachine(i){if(i>=rounds.length){let machine=430+Math.floor(Math.random()*260);let win=score>=machine;finish(win?"🧠 YOU BEAT THE MACHINE!":"🤖 MACHINE WINS",`Your score: ${score}. Machine benchmark: ${machine}. ${win?"Nice work!":"Try again and beat it."}`);return}let [type,q,...rest]=rounds[i];let arr=rest[0],best=rest[1];$("#round").textContent=`Round ${i+1}/5`;$("#machineQ").innerHTML=`<div class="badge">${type}</div><div class="question">${q}</div><div class="choices">${arr.slice(1).map((x,n)=>`<button class="choice" data-n="${n}">${x}</button>`).join("")}</div>`;$$(".choice").forEach(b=>b.onclick=()=>{let n=+b.dataset.n;if(n===best)score+=200;else score+=40;setTimeout(()=>renderMachine(i+1),180)})}

const escapeSteps=[
["📧 EMAIL","From: admissions@skill-quest.example<br><br>Subject: Your access code<br><br><b>Remember the date: 12 / 24 / 36</b>","Which number comes next?","48"],
["📁 FILE","A note says: <span class='code'>01010011 01001001</span>","Decode the two 8-bit binary values as ASCII.","SI"],
["🔐 SAFE","The safe accepts a 3-letter key. The file says <b>SI</b>. Add the first letter of <b>ESCAPE</b>.","What is the key?","SIE"],
["🚪 EXIT","Final clue: <b>12 + 24 + 36 = ?</b>","Enter the final number to escape.","72"]
];
function startEscape(){current="escape";score=0;let i=0;showGame(`<div class="topline"><b>🚪 DIGITAL ESCAPE</b><span id="escapeTimer" class="timer">05:00</span></div><div id="escapeQ"></div>`);let left=300;timer=setInterval(()=>{left--;$("#escapeTimer").textContent=`${String(Math.floor(left/60)).padStart(2,"0")}:${String(left%60).padStart(2,"0")}`;if(left<=0)finish("⏰ TIME'S UP","The system locked before you escaped.");},1000);renderEscape(i)}
function renderEscape(i){if(i>=escapeSteps.length){finish("🔓 YOU ESCAPED!","All clues solved. Great problem-solving.");return}let [title,clue,q,answer]=escapeSteps[i];$("#escapeQ").innerHTML=`<h2>${title}</h2><div class="clue">${clue}</div><div class="question">${q}</div><input id="answer" placeholder="Enter your answer"><button class="action" id="submit">UNLOCK →</button>`;$("#submit").onclick=()=>{let v=$("#answer").value.trim().toUpperCase();if(v===answer){score+=500;renderEscape(i+1)}else{$("#answer").value="";$("#answer").placeholder="Try again…" }}} 

function start(g){name();if(g==="ceo")startCEO();if(g==="machine")startMachine();if(g==="escape")startEscape()}
$$(".game-card").forEach(b=>b.onclick=()=>start(b.dataset.game));
