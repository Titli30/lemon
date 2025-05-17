function startBuilding() {
  document.getElementById("landing-page").style.display = "none";
  document.getElementById("resume-builder").style.display = "flex";
}

function addEducation() {
  const container = document.getElementById("edu-container");
  const div = document.createElement("div");
  div.innerHTML = `
    <input placeholder="Degree" />
    <input placeholder="Institution" />
    <input placeholder="Duration" />
    <input placeholder="Grade" />
  `;
  container.appendChild(div);
}

function addExperience() {
  const container = document.getElementById("exp-container");
  const div = document.createElement("div");
  div.innerHTML = `
    <input placeholder="Job Title" />
    <input placeholder="Company Name" />
    <input placeholder="Duration" />
    <textarea placeholder="Work Description"></textarea>
  `;
  container.appendChild(div);
}

function addProject() {
  const container = document.getElementById("proj-container");
  const div = document.createElement("div");
  div.innerHTML = `
    <input placeholder="Project Title" />
    <input placeholder="Link (optional)" />
    <textarea placeholder="Project Description"></textarea>
  `;
  container.appendChild(div);
}

function generateCV() {
  const name = document.getElementById("nameField").value;
  const guardian = document.getElementById("guardianField").value;
  const contact = document.getElementById("contactField").value;
  const email = document.getElementById("emailField").value;
  const address = document.getElementById("addressField").value;
  const github = document.getElementById("githubField").value;
  const summary = document.getElementById("summaryField").value;
  const skills = document.getElementById("skillsField").value.split(',');
  const languages = document.getElementById("languagesField").value;
  const hobbies = document.getElementById("hobbiesField").value;

  const reader = new FileReader();
  const file = document.getElementById("imgField").files[0];

  reader.onloadend = function () {
    const image = file ? `<img src="${reader.result}" alt="Profile Photo">` : "";

    const eduHTML = Array.from(document.querySelectorAll("#edu-container > div")).map(div => {
      const [degree, inst, dur, grade] = div.querySelectorAll("input");
      return `<p><strong>${degree.value}</strong> (${dur.value})<br>${inst.value} - Grade: ${grade.value}</p>`;
    }).join('');

    const expHTML = Array.from(document.querySelectorAll("#exp-container > div")).map(div => {
      const [title, company, dur, desc] = div.querySelectorAll("input, textarea");
      return `<p><strong>${title.value}</strong> (${dur.value})<br>${company.value}<br>${desc.value}</p>`;
    }).join('');

    const projHTML = Array.from(document.querySelectorAll("#proj-container > div")).map(div => {
      const [title, link, desc] = div.querySelectorAll("input, textarea");
      if (!title.value && !desc.value) return '';
      const projectTitle = link.value ? `<a href="${link.value}" target="_blank">${title.value}</a>` : title.value;
      return `<p><strong>${projectTitle}</strong><br>${desc.value}</p>`;
    }).join('');

    document.getElementById("cv-preview").innerHTML = `
      <div class="left-section">
        ${image}
        <h2>${name}</h2>
        <p>Guardian: ${guardian}</p>
        <p>📞 ${contact}</p>
        <p>📧 ${email}</p>
        <p>📍 ${address}</p>
        <p>GitHub: <a href="${github}" style="color:#58c6ef" target="_blank">${github}</a></p>
        <h2>SKILLS</h2>
        <ul>${skills.map(skill => `<li>${skill.trim()}</li>`).join('')}</ul>
        <h2>LANGUAGES</h2>
        <p>${languages}</p>
        <h2>HOBBIES</h2>
        <p>${hobbies}</p>
      </div>
      <div class="right-section">
        <h2>PROFILE</h2>
        <p>${summary}</p>
        <h2>WORK EXPERIENCE</h2>
        ${expHTML}
        <h2>PROJECTS</h2>
        ${projHTML}
        <h2>EDUCATION</h2>
        ${eduHTML}
      </div>
    `;
  };

  if (file) reader.readAsDataURL(file);
  else reader.onloadend();
}

function downloadPDF() {
  const cv = document.getElementById("cv-preview");
  const opt = {
    margin: 0.5,
    filename: 'resume.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
  };
  html2pdf().from(cv).set(opt).save();
}
