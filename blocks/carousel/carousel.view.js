/*
A simple carousel script that cycles through the carousel images
*/

function Carousel(container) {
    //reference to carousel container
    this.container = container;

    // reference to carousel slides
    this.slides = null;

    // reference top setInterval
    this.slideTimer = null;

    // Pull off data attribute to set carousel timing
    // Defaults to 5 if something goes wrong
    this.carouselTime = this.container.getAttribute('data-carousel-time') * 1000 || 5000;
    

    // engage!
    this.init();
}

var proto = Carousel.prototype;

proto.init = function () {
    this.createChildren()
        .enable()
        .run();
}

proto.createChildren = function() {
    this.slides = this.container.querySelectorAll(':scope img');
    // this.slides[0].classList.add('active');
    return this;
}

proto.enable = function() {
    this.nextSlide = this.nextSlide.bind(this);
    return this;
}

proto.run = function() {

    this.slideTimer = setInterval(
        this.nextSlide,
        this.carouselTime
    );
}

proto.nextSlide = function() {
    var activeSlide = this.container.querySelector(':scope .active');

    activeSlide.classList.remove('active');

    if (activeSlide.nextSibling) {
        activeSlide.nextSibling.classList.add('active');
    } else {
        this.slides[0].classList.add('active');
    }
}


// Instantiate for every carousel on page
document.addEventListener("DOMContentLoaded", function (event) {
    var carousels = document.querySelectorAll('.wp-block-guty-blocks-carousel');
    for (var i = 0; i < carousels.length; i++) {
        console.log("%c Carousel present on page and running...", "color: cadetblue;");
        new Carousel(carousels[i]);
    }
});