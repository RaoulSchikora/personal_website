// preload
document.getElementById('cv').style.display = 'none';
document.getElementById('social_media').style.display = 'none';

// constants
const none = 'none';
const flex = 'flex';
const unset = 'unset';
const fixed = 'fixed';
const sticky = 'sticky';
const toggleBtn = document.getElementById('toggle_menu');
const circle = document.getElementById('toggle_circle');
const cvBtn = document.getElementById('cv_btn');
const firstName = document.getElementById('first_name');
const surname = document.getElementById('surname');
const cvSection = document.getElementById('cv');
const cvTimesFrom = document.querySelectorAll('.cv__item .from');
const cvTimesTo = document.querySelectorAll('.cv__item .to');
const cvItemDivs = document.querySelectorAll('.cv__item div');
const cvTimeline = document.getElementById('timeline');
const cvTimelineDotList = document.getElementById('timeline_dot_list');
const cvTimelineContainer = document.getElementById('timeline__container');
const cvListContainer = document.getElementById('cv__list_container');
const cvItems = document.querySelectorAll('.cv__item');
const toggleMenusSmall = document.querySelectorAll('.toggle_menu_small');
const socialMedia = document.getElementById('social_media');
const contactsBtn = document.getElementById('contacts_btn');

const DIST_TIMELINE_EVENTS = 10;
const PADDING_TOP = 5;

const offsetFirstName = firstName.offsetTop;

const cvMinDate = minDate(cvTimesFrom);
const cvMaxDate = maxDate(cvTimesTo);

// Observer constant letting a div slide in from left or right
// when the parent becomes visible (enters the viewport) 
const slideElemObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show__slide_in');
        }
    });
});

// Observer constant letting a small toggle menu appear once
// the surname is out of the ViewPort
const surnameObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) {
            toggleMenusSmall.forEach((entry) => {
                entry.classList.add('show__opacity');
            });
        } else {
            toggleMenusSmall.forEach((entry) => {
                entry.classList.remove('show__opacity');
                if(entry.querySelector('.toggle_circle_small')
                        .classList.contains('menu__clicked')){
                    entry.querySelector('.toggle_circle_small')
                        .classList.remove('menu__clicked');
                }
            });
        }
    });
});

/* ----- actions ----- */

// observe all divs of CV items
cvItemDivs.forEach((elem) => slideElemObserver.observe(elem));

// observe surname
surnameObserver.observe(surname);

// add event listeners to small toggle menus
toggleMenusSmall.forEach((elem) => elem.addEventListener('click', function () {
    var toggleCircle = this.querySelector('.toggle_circle_small');
    if(toggleCircle.classList.contains('menu__clicked')){
        toggleCircle.classList.remove('menu__clicked');
    } else {
        toggleCircle.classList.add('menu__clicked');
        firstName.scrollIntoView();
    }
}));

// add event listener to CV-button opening CV-Section on click
cvBtn.addEventListener('click', function () {
    if (cvSection.style.display == none)  {
        cvSection.style.display = flex;
        if (cvListContainer.style.transform == '') {
            // translate the container of the CV list such that it overlays
            // the container of the timeline
            let yDirect = cvTimelineContainer.offsetHeight;
            cvListContainer.style.transform = 
            'translateY(' + (-yDirect + 55) + 'px)';
            // the plus 55 arise from padding top (40px) on the timeline
            // and 15px from the dot
        }
    }
    if (socialMedia.style.display == none) {
        socialMedia.style.display = flex;
    }
});

// add event listener to Contacts-button opening the social_media container
// and hides the cvSection container and removes the slide_in class from
// the contained divs
contactsBtn.addEventListener('click', function () {
    if (socialMedia.style.display == none) {
        socialMedia.style.display = flex;
    }
    if (cvSection.style.display == flex) {
        console.log('yeah1');
        cvSection.style.display = none;
        cvItemDivs.forEach((elem) => {
            elem.classList.remove('show__slide_in');
        });
    }
});

// add event listener to toggleBtn canceling the wobble-animation
// once the toggle menu has been toggled for the first time
toggleBtn.addEventListener('click', function (){
    circle.style.animation = unset;
});

// calculate and set the length of the cv-timeline
cvTimeline.style.height =
    ((getNumOfMonths(cvMinDate, cvMaxDate) + 12) * DIST_TIMELINE_EVENTS) + 'px';

// set the year-dots on the timeline
for (year = cvMinDate.getFullYear(); year <= cvMaxDate.getFullYear()+1 ; ++year) {
    var li = document.createElement('li');
    var div = document.createElement('div');
    li.classList.add('timeline_dot');
    li.style.height = (12 * DIST_TIMELINE_EVENTS) + 'px';
    li.appendChild(div);
    div.innerText = year.toString();
    cvTimelineDotList.appendChild(li);
};
cvTimelineDotList.lastChild.style.height = '30px';

// set the height of the cv items
cvItemDivs.forEach(function (elem) {
    let start = new Date (elem.querySelector('.from').dateTime);
    let end = new Date (elem.querySelector('.to').dateTime);
    let numMonth = getNumOfMonths(start,end);
    elem.style.height = (numMonth * DIST_TIMELINE_EVENTS - PADDING_TOP) + 'px';
    if (numMonth < 10) {
        elem.style.padding = '0px 15px';
    }
});

// set cv item divs at the right height position
cvItemDivs.forEach(function (elem) {
    let startDiv = new Date(elem.querySelector('.from').dateTime);
    let timelineStart = new Date (cvMinDate.getFullYear() + '-01');
    elem.style.top = 
        ((getNumOfMonths(timelineStart, startDiv) - 1) * DIST_TIMELINE_EVENTS) 
        + 'px';

});

/* ----- Utils ----- */

// returns the minimal date of the elements, each having a datetime
// attribute
function minDate (froms) {
    let fromDates = attrToDates(froms);
    let min = new Date(Math.min.apply(null, fromDates));
    return min;
};

// returns the maximal date of the elements, each having a datetime
// attribute
function maxDate (tos) {
    let toDates = attrToDates(tos);
    let max = new Date(Math.max.apply(null, toDates));
    return max;
};

// returns a list of dates for the given list of elements each
// having a dateTime attribute
function attrToDates(elemList) {
    let dates = [];
    for (const elem of elemList){
        dates.push(new Date(elem.dateTime));
    }
    return dates;
};

// function returning the number of month between two dates. 
// Each months is calculated completely, e.g., 
// getNumOfMonths(new Date(2022-11-15),new Date(2023-01-23)=3
function getNumOfMonths(from, to) {
    let fullYears = to.getFullYear() - from.getFullYear() - 1;
    let months = fullYears * 12 + to.getMonth() + (12 - from.getMonth() + 1);
    return months;
};