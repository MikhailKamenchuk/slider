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
const prevBtnElem = document.querySelector('.prev');
const nextBtnElem = document.querySelector('.next');
prevBtnElem.addEventListener('click', minusSlide);
nextBtnElem.addEventListener('click', plusSlide);

const sliderContainerElem = document.querySelector('.model');
const dots = document.getElementsByClassName("model-dots__item");


function createModelItem(name, color) {
    const modelItem = document.createElement('div');
    modelItem.classList.add('model__item');

    const modelImage = document.createElement('img');
    modelImage.src = `images/P_${name}_${color}.png`;
    modelImage.alt = `${name}_${color}`
    modelItem.append(modelImage);

    return modelItem
}


function createModelDot(model) {
    const modelDotElem = document.createElement('span');
    modelDotElem.classList.add('model-dots__item');
    modelDotElem.style.backgroundImage = `url(images/P_${model.name}_${model.colors[0]}_off.png)`
    return modelDotElem
}

const slides = assets.map(asset => {
    return asset.colors.map(color => createModelItem(asset.name, color))
})

let slideIndex = 1;
let currentModel = 0;

function showDifferentModel(n) {
    // debugger
    if (n > slides.length - 1) {
        currentModel = 0
    }

    if (n < 0) {
        currentModel = slides.length - 1
    }
    slideIndex = 1;
    sliderContainerElem.innerHTML = '';
    showSlides(slideIndex, slides[currentModel] );
    sliderContainerElem.append(...slides[currentModel]);


}



function currentSlide(n) {
    showSlides(slideIndex = n, slides[currentModel]);
}

function showSlides(n, model) {
    // debugger
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

// function plusSlide() {
//     showSlides(slideIndex += 1);
// }

// function minusSlide() {
//     showSlides(slideIndex -= 1);
// }