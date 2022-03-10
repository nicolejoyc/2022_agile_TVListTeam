// This js file is for the index html page.
// This allows for a basic js photo carousel

// base class variables
// get and count photos
let photoClassName = "photo-carousel";
let photos = document.getElementsByClassName(photoClassName),
    totalPhotos = photos.length,
    slide = 0;

// initialise carousel
function setInitialClasses() {
    photos[totalPhotos - 1].classList.add("previous");
    photos[0].classList.add("active");
    photos[1].classList.add("next");
}

function moveCarouselTo(slide) {
    let newPrevious = slide - 1,
        newNext = slide + 1,
        oldPrevious = slide - 2,
        oldNext = slide + 2;

    // check if there are more than three photos in the carousel
    if ((totalPhotos - 1) > 3) {

        if (newPrevious <= 0) {
            oldPrevious = (totalPhotos - 1);
        } else if (newNext >= (totalPhotos - 1)) {
            oldNext = 0;
        }

        // test if the current slide is at the end or at the beginning
        if (slide === 0) {
            newPrevious = (totalPhotos - 1);
            oldPrevious = (totalPhotos - 2);
            oldNext = (slide + 1);
        } else if (slide === (totalPhotos - 1)) {
            newPrevious = (slide - 1);
            newNext = 0;
            oldNext = 1;
        }

        photos[oldPrevious].className = photoClassName;
        photos[oldNext].className = photoClassName;

        photos[newPrevious].className = photoClassName + " previous";
        photos[slide].className = photoClassName + " active";
        photos[newNext].className = photoClassName + " next";
    }
    
}

// previous arrow
function movePrevious() {
    if (slide === 0) {
        slide = (totalPhotos - 1);
    } else {
        slide--;
    }
    moveCarouselTo(slide);
}

// next arrow
function moveNext() {
    if (slide === (totalPhotos - 1)) {
        slide = 0;
    } else {
        slide++;
    }	
    moveCarouselTo(slide);
}

function setEventListeners() {
    let previous = document.getElementsByClassName('prev-button')[0],
        next = document.getElementsByClassName('next-button')[0];

    previous.addEventListener('click', movePrevious);
    next.addEventListener('click', moveNext);
}

function initCarousel() {
    setInitialClasses();
    setEventListeners();
}

// moved line to tvList so it is only loaded if user is signed in
//initCarousel();