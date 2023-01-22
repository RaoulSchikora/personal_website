// preload
document.getElementById('cv').style.display = 'none';

// constants
const none = 'none';
const flex = 'flex';
const unset = 'unset';
const fixed = 'fixed';
const sticky = 'sticky';
const hiddenElements = document.querySelectorAll('.hidden');
const toggleBtn = document.getElementById('toggle_menu');
const cvBtn = document.getElementById('cv_btn');
const firstName = document.getElementById('first_name');
const offsetFirstName = firstName.offsetTop;

// Observer constant for hidden elements adding show class
// to the element, which changes opacity from 0 to 1 in 
// several seconds
const hiddenElemObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log(entry)
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
});

/* ----- actions ----- */

// observe each hidden element
hiddenElements.forEach((el) => hiddenElemObserver.observe(el));

// add event listener to CV-button opening CV-Section on click
cvBtn.addEventListener('click', function () {
    var cvElement = document.getElementById('cv');
    if (cvElement.style.display != none) {
        cvElement.style.display = none;
    } else {
        cvElement.style.display = flex;
    }
});

// add event listener to circle canceling its wobble-animation
// toggle menu has been toggled for the first time
toggleBtn.addEventListener('click', function (){
    var circle = document.getElementById('toggle_circle');
    circle.style.animation = unset;
});