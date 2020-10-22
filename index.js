const assets = [
    {
        id: 1,
        name: 'Charge3',
        colors: ['Black', "Blue", 'Lilac']
    },
    {
        id: 2,
        name: 'HR',
        colors: ['Black', "White", 'Lilac']
    },
    {
        id: 3,
        name: 'Versa',
        colors: ['Black', "Grey", 'Pink']
    }
]
const prevBtnElem = document.querySelector('.prev');
const nextBtnElem = document.querySelector('.next');
prevBtnElem.addEventListener('click', minusSlide);
nextBtnElem.addEventListener('click', plusSlide);

const slides = document.getElementsByClassName("slider__item");
const dots = document.getElementsByClassName("slider-dots_item");


function createSlider() {

}

let slideIndex = 1;

function plusSlide() {
    showSlides(slideIndex += 1);
}

function minusSlide() {
    showSlides(slideIndex -= 1);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    if (n > slides.length) {
        slideIndex = 1
    }

    if (n < 1) {
        slideIndex = slides.length
    }

    [...slides].forEach(slide => slide.style.display = "none");
    [...dots].forEach((dot, index) => {
        // dot.addEventListener('click', currentSlide)
        dot.className = dot.className.replace(" active", "")

    });

    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}
showSlides(slideIndex);