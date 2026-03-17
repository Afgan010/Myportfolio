const burger = document.querySelector(".menuIcon");
const closeMenu = document.querySelector(".closeIcon");
const navlist = document.querySelector(".mobileNavList");
const { createClient } = supabase;
const supabaseUrl = "https://comvweccwecmhxnqoryp.supabase.co";
const supabaseKey = "sb_publishable_25xBBIn_9QGjLBjxIC-lLA_OhVGHggR";
const supabaseClient = createClient(supabaseUrl, supabaseKey);
const projectCard = document.querySelector(".projectCardContainer");

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

getData();
