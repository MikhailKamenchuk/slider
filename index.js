const assets = [
    {
        id: 1,
        name: 'Charge3',
        colors: ['Black', "Blue", 'Lilac'],
        price: '149,95'
    },
    {
        id: 2,
        name: 'HR',
        colors: ['Black', "White", 'Lilac'],
        price: '99,95'
    },
    {
        id: 3,
        name: 'Versa',
        colors: ['Black', "Grey", 'Pink'],
        price: '179,95'
    }
]

const sliderContainerElem = document.querySelector('.model');
const dotsContainerElem = document.querySelector(".model-dots");

function createModelDot(name, color) {
    const modelDotElem = document.createElement('span');
    modelDotElem.classList.add('model-dots__item');
    modelDotElem.style.backgroundImage = `url(images/P_${name}_${color}_off.png)`;

    return modelDotElem
}

function createModelItem(name, color) {
    const modelItem = document.createElement('div');
    modelItem.classList.add('model__item');

    const modelImage = document.createElement('img');
    modelImage.src = `images/P_${name}_${color}.png`;
    modelImage.alt = `${name}_${color}`
    modelItem.append(modelImage);

    return modelItem
}

const dots = assets.map(asset => {
    return asset.colors.map(color => createModelDot(asset.name, color))
})

const slides = assets.map(asset => {
    return asset.colors.map(color => createModelItem(asset.name, color))
})

let slideIndex = 1;
let currentModel = 0;

function showDifferentModel(n) {
    if (n > slides.length - 1) {
        currentModel = 0
    }

    if (n < 0) {
        currentModel = slides.length - 1
    }

    slideIndex = 1;

    sliderContainerElem.innerHTML = '';
    dotsContainerElem.innerHTML = '';

    showSlides(slideIndex, slides[currentModel], dots[currentModel] );

    sliderContainerElem.append(...slides[currentModel]);
    dotsContainerElem.append(...dots[currentModel]);
}



function currentSlide(n) {
    showSlides(slideIndex = n, slides[currentModel], dots[currentModel]);
}

function showSlides(n, model, dots) {
    if (n > model.length) {
        slideIndex = 1
    }

    if (n < 1) {
        slideIndex = slides.length
    }

    [...model].forEach(slide => slide.style.display = "none");
    [...dots].forEach((dot, index) => {
        dot.addEventListener('click', () => currentSlide(index + 1))
        dot.className = dot.className.replace(" active", "")
    });
    model[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}

showDifferentModel(currentModel)


function plusSlide() {
    showDifferentModel(currentModel += 1);
}

function minusSlide() {
    showDifferentModel(currentModel -= 1);
}

const prevBtnElem = document.querySelector('.prev');
const nextBtnElem = document.querySelector('.next');
prevBtnElem.addEventListener('click', minusSlide);
nextBtnElem.addEventListener('click', plusSlide);