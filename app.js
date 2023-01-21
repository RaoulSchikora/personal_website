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