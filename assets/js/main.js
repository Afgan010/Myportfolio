const burger = document.querySelector(".menuIcon");
const closeMenu = document.querySelector(".closeIcon");
const navlist = document.querySelector(".mobileNavList");
const { createClient } = supabase;
const supabaseUrl = "https://comvweccwecmhxnqoryp.supabase.co";
const supabaseKey = "sb_publishable_25xBBIn_9QGjLBjxIC-lLA_OhVGHggR";
const supabaseClient = createClient(supabaseUrl, supabaseKey);
const projectCard = document.querySelector(".projectCardContainer");
const tech = document.querySelector(".skills");
const form = document.querySelector("#contactForm");
const btn = document.querySelector(".submit");

(function () {
  emailjs.init("F_wfsgCLnFz9mwQLy");
})();

const SKILLS = [
  "HTML5",
  "CSS3",
  "JavaScript",
  "TypeScript",
  "React.js",
  "Tailwind CSS",
  "RESTful APIs",
  "Git",
  "Responsive Design",
];

burger.addEventListener("click", () => {
  burger.style.display = "none";
  closeMenu.style.display = "block";
  navlist.style.display = "flex";
});

closeMenu.addEventListener("click", () => {
  burger.style.display = "block";
  closeMenu.style.display = "none";
  navlist.style.display = "none";
});

const getData = async () => {
  const { data, error } = await supabaseClient.from("Portfolio").select("*");

  if (error) {
    console.error("Xəta baş verdi:", error.message);
    return;
  }

  console.log("Gələn məlumatlar:", data);
  renderProjects(data);
};

const renderProjects = (project) => {
  if (!project) {
    projectCard.innerHTML = "<p>No project yet </p>";
    return;
  }

  projectCard.innerHTML = project
    .map(
      (item) => `
    <div class="projectCard">
    <div class="projectImage">
              <img src="${item.Image}" alt="${item.Project}">
            </div>
            <h3 class="projectTitle">
              ${item.Project}
            </h3>
            <p class="desc">${item.Description}</p>
            <div class = "links"> 
              <a href="${item.GitHub}" class="link"  target = "_blank"><img src="./assets/icons/github.svg" alt="icon"> Github</a>
              <a href="${item.Demo}" class="link" target = "_blank"><img src="./assets/icons/link.svg" alt="icon"> Demo</a>
            </div>
            
    </div> 
  `,
    )
    .join("");
};

const getSkills = () => {
  const fragment = document.createDocumentFragment();

  SKILLS.forEach((item) => {
    const span = document.createElement("span");
    span.className = "skill";
    span.textContent = item;
    fragment.appendChild(span);
  });

  tech.appendChild(fragment);
};

const nameRegex = /^[A-Za-zƏəÖöÜüĞğŞşÇçİı' -]{2,50}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const messageRegex = /^(?!\s*$).{10,1000}$/;

function validateForm({ name, email, message }) {
  const errors = {};

  if (!nameRegex.test(name)) {
    errors.name = "Please enter valid name";
  }

  if (!emailRegex.test(email)) {
    errors.email = "Please enter valid email";
  }

  if (!messageRegex.test(message)) {
    errors.message = "Message must be at least 10 characters";
  }

  return errors;
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();

  const errors = validateForm({ name, email, message });

  document.querySelectorAll(".error").forEach((el) => {
    el.textContent = "";
  });

  if (Object.keys(errors).length > 0) {
    if (errors.name) form.name.nextElementSibling.textContent = errors.name;
    if (errors.email) form.email.nextElementSibling.textContent = errors.email;
    if (errors.message)
      form.message.nextElementSibling.textContent = errors.message;

    return;
  }

  btn.textContent = "Sending...";
  btn.disabled = true;

  emailjs
    .sendForm("service_issbp0c", "template_wlhsbz3", form)
    .then(
      () => {
        alert("Success!");
        form.reset();
      },
      (err) => {
        alert("Failed: " + JSON.stringify(err));
      },
    )
    .finally(() => {
      btn.textContent = "Send Message";
      btn.disabled = false;
    });
});

getSkills();

getData();
