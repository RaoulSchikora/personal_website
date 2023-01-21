document.getElementById("cv").style.display = "none";

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log(entry)
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
});

const hiddenElements = document.querySelectorAll('.hidden');
const toggleBtn = document.getElementById("toggle_menu");
const cvBtn = document.getElementById("cv_btn");

hiddenElements.forEach((el) => observer.observe(el));
cvBtn.addEventListener('click', function () {
    var cvElement = document.getElementById("cv");
    if (cvElement.style.display != "none") {
        cvElement.style.display = "none";
    } else {
        cvElement.style.display = "flex";
    }
});
toggleBtn.addEventListener('click', function (){
    var circle = document.getElementById("toggle_circle");
    circle.style.animation = "unset";
});