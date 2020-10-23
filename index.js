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

const modelContainerElem = document.querySelector('.model');
const dotsContainerElem = document.querySelector(".model-dots");
const modelPriceContainerElem = document.querySelector(".price__quantity");
const modelNameContainerElem = document.querySelector(".model__name");

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

    modelItem.addEventListener('touchstart', handleTouchStart, false);
    modelItem.addEventListener('touchmove', handleTouchMove, false);

    return modelItem
}

let xDown = null;
let yDown = null;

function handleTouchStart(evt) {
    xDown = evt.touches[0].clientX;
    yDown = evt.touches[0].clientY;
};

function handleTouchMove(evt) {
    if (!xDown || !yDown) {
        return;
    }
    let xUp = evt.touches[0].clientX;
    let yUp = evt.touches[0].clientY;
    let xDiff = xDown - xUp;
    let yDiff = yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
        xDiff > 0 ? plusSlide() : minusSlide();
    }

    xDown = null;
    yDown = null;
};

const dots = assets.map(asset => {
    return asset.colors.map(color => createModelDot(asset.name, color))
})

const slides = assets.map(asset => {
    return asset.colors.map(color => createModelItem(asset.name, color))
})

let currentSubmodel = 1;
let currentModel = 0;

function createModelPrice(price) {
    const separatePrice = price.split(',')
    return `${separatePrice[0]}<sup class="price__coins">${separatePrice[1]}</sup>&nbsp $`
}

function showDifferentModel(n) {
    if (n > slides.length - 1) {
        currentModel = 0
    }

    if (n < 0) {
        currentModel = slides.length - 1
    }

    currentSubmodel = 1;

    modelContainerElem.innerHTML = '';
    dotsContainerElem.innerHTML = '';
    modelNameContainerElem.innerHTML = `fitbit ${assets[currentModel].name}`;
    modelPriceContainerElem.innerHTML = createModelPrice(assets[currentModel].price);

    showSubmodels(currentSubmodel, slides[currentModel], dots[currentModel]);

    modelContainerElem.append(...slides[currentModel]);
    dotsContainerElem.append(...dots[currentModel]);
}

function setCurrentSubmodel(n) {
    showSubmodels(currentSubmodel = n, slides[currentModel], dots[currentModel]);
}

function showSubmodels(n, model, dots) {
    if (n > model.length) {
        currentSubmodel = 1
    }

    if (n < 1) {
        currentSubmodel = slides.length
    }

    [...model].forEach(slide => slide.style.display = "none");
    [...dots].forEach((dot, index) => {
        dot.addEventListener('click', () => setCurrentSubmodel(index + 1))
        dot.className = dot.className.replace(" active", "")
    });
    model[currentSubmodel - 1].style.display = "block";
    dots[currentSubmodel - 1].className += " active";
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

const previewElem = document.querySelector('.preview');
const sliderElem = document.querySelector('.slider');
const mainPage = document.querySelector('.page');
const loadingPage = document.querySelector('.loading-page');


const loadPage = async () => {
    mainPage.style.display = 'none';
    loadingPage.style.display = 'flex';
    
    await new Promise((resolve) => setTimeout(() => resolve(), 1000))
    
    mainPage.style.display = 'flex';
    loadingPage.style.display = 'none';
    previewElem.style.display = 'flex';
    sliderElem.style.display = 'none';
    
    await new Promise((resolve) => setTimeout(() => resolve(), 3500))
    
    previewElem.style.display = 'none';
    sliderElem.style.display = 'flex';
}

document.addEventListener("DOMContentLoaded", loadPage)
