// This js file is for the index html page.
// This allows for a basic js photo carousel

// base class variables
let itemClassName = "photo_carousel";
let items = document.getElementsByClassName(itemClassName),
    totalItems = items.length,
    slide = 0,
    moving = true;

// initialise carousel
function setInitialClasses() {
    items[totalItems - 1].classList.add("prev");
    items[0].classList.add("active");
    items[1].classList.add("next");
}

function moveCarouselTo(slide) {
    if (!moving) {

        let newPrevious = slide - 1,
            newNext = slide + 1,
            oldPrevious = slide - 2,
            oldNext = slide + 2;

        // check if there are more than three items in the carousel
        if ((totalItems - 1) > 3) {

            if (newPrevious <= 0) {
                oldPrevious = (totalItems - 1);
            } else if (newNext >= (totalItems - 1)) {
                oldNext = 0;
            }

            // test if the current slide is at the end or at the beginning
            if (slide === 0) {
                newPrevious = (totalItems - 1);
                oldPrevious = (totalItems - 2);
                oldNext = (slide + 1);
            } else if (slide === (totalItems - 1)) {
                newPrevious = (slide - 1);
                newNext = 0;
                oldNext = 1;
            }

            // reset to the default classes based on the current slide 
            items[oldPrevious].className = itemClassName;
            items[oldNext].className = itemClassName;

            // new classes
            items[newPrevious].className = itemClassName + " prev";
            items[slide].className = itemClassName + " active";
            items[newNext].className = itemClassName + " next";
        }
    }
}

// previous arrow
function movePrev() {

    if (!moving) {

        if (slide === 0) {
            slide = (totalItems - 1);
        } else {
            slide--;
        }

        moveCarouselTo(slide);
    }
}

// next arrow
function moveNext() {

    if (!moving) {
		
        if (slide === (totalItems - 1)) {
            slide = 0;
        } else {
            slide++;
        }
		
        moveCarouselTo(slide);
    }
}

function setEventListeners() {
    let prev = document.getElementsByClassName('prev_button')[0],
        next = document.getElementsByClassName('next_button')[0];

    prev.addEventListener('click', movePrev);
    next.addEventListener('click', moveNext);
}

function initCarousel() {
    setInitialClasses();
    setEventListeners();

    moving = false;
}

initCarousel();