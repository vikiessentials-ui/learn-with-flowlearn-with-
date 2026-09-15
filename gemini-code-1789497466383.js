<script>
const categories=["All","Artificial Intelligence","Cybersecurity","Programming","Web Development","Data Science","UI/UX Design","Cloud Computing","DevOps","Networking","Databases","Mobile Development","Software Engineering"];
const titles=["Artificial Intelligence & Machine Learning","Cyber Security & Ethical Hacking","UI/UX Design & Figma Mastery","Introduction to Front-End Development","Full Stack Software Engineering","Cloud Computing & DevOps","Generative AI Fundamentals","Python Programming","JavaScript Essentials","TypeScript Development","React Development","Next.js Development","Angular Development","Vue.js Development","Node.js Backend Development","Django Web Development","Flask Web Development","Java Programming","C Programming","C++ Programming","C# Development","Go Programming","Rust Programming","PHP Development","SQL Fundamentals","PostgreSQL Mastery","MySQL Database Development","MongoDB Development","Data Analytics","Data Science Foundations","Machine Learning Engineering","Deep Learning","Natural Language Processing","Computer Vision","Prompt Engineering","AI Ethics","Cybersecurity Foundations","Ethical Hacking Foundations","Network Security","Cloud Security","Digital Forensics","Incident Response","SIEM Fundamentals","Security Operations","Threat Intelligence","Identity & Access Management","Zero Trust Security","Linux Security","Web Application Security","API Security","DevSecOps","Cybersecurity Risk Management","Security Awareness","Power BI Analytics","Microsoft Fabric","Data Engineering","Data Visualization","Statistics for Data Science","Excel for Data Analytics","BigQuery Analytics","Cloud Data Engineering","AWS Cloud Foundations","AWS Solutions Architecture","AWS DevOps","AWS Security","Microsoft Azure Fundamentals","Azure Administration","Azure DevOps","Azure Security","Google Cloud Fundamentals","Google Cloud Security","Google Cloud DevOps","Kubernetes","Docker","Terraform","CI/CD Engineering","Git & GitHub","GitHub Actions","Linux Administration","Bash Scripting","Computer Networking","Network Administration","TCP/IP Networking","Cisco Networking Foundations","System Design","Software Architecture","Clean Code","Object-Oriented Programming","Data Structures & Algorithms","Software Testing","QA Automation","API Development","Microservices","Backend Architecture","Frontend Architecture","Web Performance","Accessibility Engineering","HTML & CSS","Responsive Web Design","Tailwind CSS","Sass & CSS Architecture","Figma UI Design","Design Systems","UX Research","UX Writing","Interaction Design","Prototyping","Mobile UX","Android Development","Flutter Development","React Native","iOS Development","Game Development Foundations","Unity Development","Unreal Engine Foundations","Blockchain Fundamentals","Smart Contracts","Web3 Development","IT Support Foundations","Operating Systems","Computer Architecture","Virtualization","Observability","Site Reliability Engineering","Platform Engineering","MLOps","DataOps","Cloud FinOps","Agile Software Development","Scrum Foundations","Product Management for Technology","Technical Communication","Digital Project Management","Open Source Development","Technical Interview Preparation","Career Readiness for Developers","Responsible AI","Technology Entrepreneurship","Cybersecurity Career Foundations","Cloud Career Foundations","Data Career Foundations","Web Developer Career Foundations","Software Engineering Career Foundations","AI Project Portfolio","Cybersecurity Project Portfolio","Cloud Project Portfolio","Full Stack Project Portfolio","Data Analytics Project Portfolio","UI/UX Portfolio Mastery","AI Agents Engineering","RAG Application Development","LLM Application Engineering","Computer Science Foundations","Operating Systems Security","Network Automation with Python","Cloud Networking","Cloud Native Architecture","Serverless Application Development","Kubernetes Administration","Kubernetes Security","Infrastructure as Code","Observability Engineering","Prometheus & Grafana","Apache Spark Engineering","Apache Kafka Streaming","ETL & ELT Engineering","Data Warehousing","Data Modeling","Business Intelligence","Tableau Analytics","Looker Studio Analytics","Power Query","Power Automate","Microsoft Azure Data Engineering","Google Cloud Data Engineering","AWS Data Engineering","Secure Software Development","Application Security Testing","Bug Bounty Foundations","Digital Privacy & Online Safety","Technical Leadership","Technology Product Design"];

let courses=titles.map((title,i)=>{
  return {
    id: "lwf-"+String(i+1).padStart(3,"0"),
    title,
    category:categories[(i% (categories.length-1))+1],
    level:["Beginner","Intermediate","Advanced"][i%3]
  };
});

const progress=JSON.parse(localStorage.getItem("lwf-progress")||"{}");
let current=null,currentLesson=0,quizState=null,owner=false,filter="All";

function save(){localStorage.setItem("lwf-progress",JSON.stringify(progress));}

function show(id){
  document.querySelectorAll(".page").forEach(x=>x.classList.remove("show"));
  const el=document.getElementById(id);
  if(el)el.classList.add("show");
  if(id!=="owner")document.getElementById("owner").classList.remove("show");
  scrollTo(0,0);
}

function renderFilters(){
  document.getElementById("filters").innerHTML=categories.map(c=>`<button class="chip ${filter===c?"active":""}" onclick="filter='${c}';renderFilters();render()">${c}</button>`).join("");
}

function render(){
  const q=(document.getElementById("search").value||"").toLowerCase();
  const list=courses.filter(c=>(filter==="All"||c.category===filter)&&(c.title+" "+c.category).toLowerCase().includes(q));
  document.getElementById("count").textContent=`${list.length} of ${courses.length} courses`;
  document.getElementById("grid").innerHTML=list.map(c=>`
    <article class="card">
      <div class="cover"><span class="badge">${c.category}</span></div>
      <div class="cardbody">
        <div class="meta">${c.level} • 3 modules • Free</div>
        <h3>${c.title}</h3>
        <div class="meta">✔ Standard Stream Player</div>
        <div class="actions">
          <button class="primary" onclick="openCourse('${c.id}')">Start Track</button>
        </div>
      </div>
    </article>
  `).join("")||'<div class="meta">No courses found.</div>';
}

function pstate(){return progress[current.id]||(progress[current.id]={lessons:{},modules:{},final:false})}

function openCourse(id){
  current=courses.find(c=>c.id===id);
  currentLesson=0;
  document.getElementById("courseTitle").textContent=current.title;
  document.getElementById("courseDesc").textContent=`${current.level} • 3 modules • Structured assessments`;
  show("workspace");
  renderCurriculum();
  loadLesson();
}

function renderCurriculum(){
  const p=pstate();
  let out="";
  for(let m=1;m<=3;m++){
    out+=`<div class="module"><h4>Module ${m} ${p.modules[m]?"✔":""}</h4>`;
    for(let j=0;j<5;j++){
      let i=(m-1)*5+j,done=!!p.lessons[i],locked=i>0&&!p.lessons[i-1];
      out+=`<button class="lesson" ${locked?"disabled":`onclick="selectLesson(${i})"`}>${done?"✔":"▶"} Lesson ${j+1}<span class="tick">${done?"✔":""}</span></button>`;
    }
    out+="</div>";
  }
  out+=`<div style="padding:15px"><button class="primary" style="width:100%" ${[1,2,3].every(m=>p.modules[m])?"":"disabled"} onclick="startQuiz('final',0)">🎓 Final Graduation Assessment</button></div>`;
  document.getElementById("curriculum").innerHTML=out;
}

function selectLesson(i){
  currentLesson=i;
  loadLesson();
}

function loadLesson(){
  document.getElementById("lessonTitle").textContent=`${current.title} — Lesson ${currentLesson+1}`;
  document.getElementById("lessonStatus").textContent="Active Online Stream";
  
  // Safe Fallback Container - Opens video directly in player or YouTube safely
  const query = encodeURIComponent(`${current.title} tutorial lesson ${currentLesson+1}`);
  const safePlayerHTML = `
    <div style="width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;background:#0f172a;color:#fff;border-radius:15px;padding:20px;text-align:center;">
      <h3 style="margin-bottom:10px;">${current.title}</h3>
      <p style="color:#94a3b8;margin-bottom:20px;">Lesson ${currentLesson+1} is ready to watch</p>
      <a href="https://www.youtube.com/results?search_query=${query}" target="_blank" rel="noopener noreferrer" style="background:#0056D2;color:#fff;padding:12px 24px;border-radius:10px;text-decoration:none;font-weight:bold;display:inline-block;">
        ▶ Watch Video Tutorial
      </a>
    </div>
  `;
  
  document.getElementById("player").innerHTML = safePlayerHTML;
}

const baseQ=[["What is an algorithm?","A defined procedure for solving a problem",["A monitor cable","A photo filter","A domain name"],0],["What is responsive design?","Design that adapts to different screen sizes",["A CPU feature","A database backup","A password"],0],["Why keep API keys private?","They can authorize access to services",["They are CSS colors","They are images","They are fonts"],0],["What is phishing?","A deceptive attempt to obtain sensitive information",["A database","A programming language","A browser"],0],["What is encryption?","Transforming data so authorized parties can read it",["Deleting data","Changing brightness","Sorting fonts"],0]];

function questions(type,seed){const n=type==="lesson"?5:type==="module"?10:15;return Array.from({length:n},(_,i)=>baseQ[(i+seed)%baseQ.length])}

function startQuiz(type,id){
  quizState={type,id,qs:questions(type,id)};
  document.getElementById("quizTitle").textContent=type==="final"?"Final Graduation Assessment":type==="module"?`Module ${id} Assessment`:"Lesson Assessment";
  document.getElementById("quizRule").textContent=`Answer all ${quizState.qs.length} questions correctly to pass.`;
  document.getElementById("quizAlert").className="alert";
  document.getElementById("quizForm").innerHTML=quizState.qs.map((q,i)=>`<div class="question"><p>${i+1}. ${q[0]}</p>${[q[1],...q[2]].map((a,j)=>`<label><input required type="radio" name="q${i}" value="${j}"> ${a}</label>`).join("")}</div>`).join("");
  document.getElementById("quiz").classList.add("show");
}

function closeQuiz(){document.getElementById("quiz").classList.remove("show")}

function submitQuiz(e){
  e.preventDefault();
  let score=0;
  quizState.qs.forEach((q,i)=>{
    const x=document.querySelector(`input[name=q${i}]:checked`);
    if(x&&+x.value===q[3])score++;
  });
  if(score!==quizState.qs.length){
    const a=document.getElementById("quizAlert");
    a.className="alert error";
    a.textContent="⚠️ Assessment failed! Select correct options.";
    return;
  }
  const p=pstate();
  if(quizState.type==="lesson"){
    p.lessons[quizState.id]=true;
    if([4,9,14].includes(quizState.id)){
      const m=quizState.id===4?1:quizState.id===9?2:3;
      closeQuiz();
      renderCurriculum();
      setTimeout(()=>startQuiz("module",m),200);
      save();
      return;
    }
  }else if(quizState.type==="module"){
    p.modules[quizState.id]=true;
  }else{
    p.final=true;
    closeQuiz();
    save();
    generateCertificate();
    renderCurriculum();
    return;
  }
  save();
  closeQuiz();
  renderCurriculum();
}

function generateCertificate(){
  const name=prompt("Enter student name for certificate:")||"Learner";
  document.getElementById("certName").textContent=name;
  document.getElementById("certCourse").textContent=current.title;
  const certEl=document.getElementById("certificate");
  certEl.style.display="block";
  document.getElementById("qrcode").innerHTML="";
  if(window.QRCode){
    new QRCode(document.getElementById("qrcode"),{text:window.location.href,width:80,height:80});
  }
  document.getElementById("certVerify").textContent="ID: LWF-"+Math.random().toString(36).substr(2,9).toUpperCase();
  if(window.html2pdf){
    html2pdf().from(certEl).save(`${name}-${current.title}-Certificate.pdf`).then(()=>{
      certEl.style.display="none";
    });
  }
}

function setLanguage(val){console.log("Language selected:", val);}

function speakPage(){
  const text=document.querySelector(".page.show").innerText;
  if('speechSynthesis' in window){
    window.speechSynthesis.cancel();
    const msg=new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(msg);
  }
}

function stopSpeech(){
  if('speechSynthesis' in window) window.speechSynthesis.cancel();
}

window.addEventListener("DOMContentLoaded",()=>{
  renderFilters();
  render();
});
</script>