let index = 0;  
const slides = document.querySelectorAll('.slide');  
const totalSlides = slides.length;  
const visibleSlides = 3; // Number of images visible  

function showSlides() {  
    // Iterate through slides and set display  
    slides.forEach((slide, i) => {  
        slide.style.display = (i >= index && i < index + visibleSlides) ? 'block' : 'none';  
    });  

    index += visibleSlides; // Increment the index by the number of visible slides  
    if (index >= totalSlides) {  
        index = 0; // Reset when all images are displayed  
    }  

    setTimeout(showSlides, 3000); // Change every 3 seconds  
}  

// Start the slideshow  
showSlides();  