(function() {
  var h, a, f;
  a = document.getElementsByTagName('link');
  for (h = 0; h < a.length; h++) {
    f = a[h];
    if (f.rel.toLowerCase().match(/stylesheet/) && f.href) {
      var g = f.href.replace(/(&|\?)rnd=\d+/, '');
      f.href = g + (g.match(/\?/) ? '&' : '?');
      f.href += 'rnd=' + (new Date().valueOf());
    }
  } // for
})()

window.onload = function(){
    
    addSmallImageClass();
    imageSaturationAnimation();
    slideUpAnimation();
    fadeUpAnimation();
    fadeRightAnimation();
    dividerAnimation();
    lazyLoadImages();
    rotatingWordsAnimation();
    navBarChange();
}

// PAGE LAYOUT FUNCTIONS ------------------------------------------------

function addSmallImageClass() {

    // Set counter
    let counter = 0;

    // Find all divs with the class "gallery_row"
    let gallery_row_divs = document.getElementsByClassName("gallery_row");

    // find divs containing exactly two img elements
    for (let i = 0; i < gallery_row_divs.length; i++) {

        // Get all img elements
        let imgs = gallery_row_divs[i].children;
        
        if(imgs.length === 2) {
            
            // Apply class to one img
            imgs[counter % 2].classList.add('small_image');

            // Increase counter
            counter++;
        }
    }
}

// OPTIMIZATION FUNCTIONS -----------------------------------------------

function lazyLoadImages() {
       
    // list of imgs to be animated
    let lazyLoadList = document.getElementsByClassName("lazy_unloaded");

    function lazyLoadCheck() {
        for (let i = 0; i < lazyLoadList.length; i++) {

            if (distanceFromViewport(lazyLoadList[i]) < 300) {
                lazyLoadList[i].src = lazyLoadList[i].dataset.src;
                lazyLoadList[i].classList.add("lazy_loaded");
                lazyLoadList[i].classList.remove("lazy_unloaded");
            }
        }

        // remove event listener if list is empty
        if (lazyLoadList.length === 0) {
            window.removeEventListener("scroll", lazyLoadCheck);
        }
    }

    // Initial visibility check
    lazyLoadCheck();

    // Listen for scroll events to update visibility
    window.addEventListener('scroll', lazyLoadCheck);
}

// ANIMATIONS -----------------------------------------------------------

// helper function to check if element is in viewport
function percentFromTopInView(el) {
    
    // Get the top and bottom positions of the element relative to the viewport
    let rect = el.getBoundingClientRect();

    // Calculate the percentage of the element from the top in the viewport
    let percentInView = 0;

    if (rect.height !== 0) {
        percentInView = (-rect.top + window.innerHeight) / rect.height;
    }

    return percentInView;
}

// helper function to check distance from viewport
function distanceFromViewport(el) {

    // Get the top and bottom positions of the element relative to the viewport
    let rect = el.getBoundingClientRect();

    // Calculate the percentage of the element from the top in the viewport
    return -(-rect.top + window.innerHeight);
}

function imageSaturationAnimation() {

    // PARAMETERS

        // in view threshold to start animation
        const startThreshold = 0;

        // in view threshold to end animation
        const endThreshold = 0.35;

        // starting saturation
        const startSat = 0;

        // end saturation
        const endSat = 1;

    // list of imgs to be animated
    let animatedElements = document.getElementsByClassName("animated-saturation");

    // animation function
    function playSaturationAnimation() {
        for (let i = 0; i < animatedElements.length; i++) {

            // get percent of element in viewport
            let percentInView = percentFromTopInView(animatedElements[i]);

            // get percent of element in view relative to the animation end threshold
            let progress = percentInView / endThreshold;

            if (percentInView < startThreshold) {
                animatedElements[i].setAttribute(
                    "style", "filter: saturate(" + startSat + ");"
                );
            } else if (percentInView > startThreshold && percentInView < endThreshold) {
                animatedElements[i].setAttribute(
                    "style", "filter: saturate(" + ( startSat + ((endSat - startSat) * progress)) + ");"
                );
            } else if (percentInView >= endThreshold) {
                animatedElements[i].setAttribute(
                    "style", "filter: saturate(" + endSat + ");"
                );
            }
        }
    }

    // Initial visibility check
    playSaturationAnimation();

    // Listen for scroll events to update visibility
    document.addEventListener('scroll', playSaturationAnimation);
}

function slideUpAnimation() {

    // PARAMETERS

        // in view threshold to start animation
        const startThreshold = 0;

        // in view threshold to end animation
        const endThreshold = 0.35;

        // starting translateY
        const startTransY = 24;

        // end translateY
        const endTransY = 0;

    // list of imgs to be animated
    let animatedElements = document.getElementsByClassName("animated-slide_up");

    // animation function
    function playSlideUpAnimation() {
        for (let i = 0; i < animatedElements.length; i++) {

            // get percent of element in viewport
            let percentInView = percentFromTopInView(animatedElements[i]);

            // get percent of element in view relative to the animation end threshold
            let progress = percentInView / endThreshold;

            if (percentInView < startThreshold) {
                animatedElements[i].setAttribute(
                    "style", "transform: translateY(" + startTransY + "px);"
                );
            } else if (percentInView > startThreshold && percentInView < endThreshold) {
                animatedElements[i].setAttribute(
                    "style", "transform: translateY(" + ( startTransY + ((endTransY - startTransY) * progress)) + "px);"
                );
            } else if (percentInView >= endThreshold) {
                animatedElements[i].setAttribute(
                    "style", "transform: translateY(" + endTransY + "px);"
                );
            }
        }
    }

    // Initial visibility check
    playSlideUpAnimation();

    // Listen for scroll events to update visibility
    document.addEventListener('scroll', playSlideUpAnimation);
}

function fadeUpAnimation() {

    // PARAMETERS

        // in view threshold to start animation
        const startThreshold = 0.1;

    // list of imgs to be animated
    let animatedElements = document.getElementsByClassName("animated-fade_up");

    // animation function
    function playFadeUpAnimation() {
        for (let i = 0; i < animatedElements.length; i++) {

            // get percent of element in viewport
            let percentInView = percentFromTopInView(animatedElements[i]);

            if (percentInView > startThreshold) {
                animatedElements[i].classList.add("animated-fade_up-complete");
                animatedElements[i].classList.remove("animated-fade_up");
            }
        }

        // remove event listener if list is empty
        if (animatedElements.length === 0) {
            window.removeEventListener("scroll", playFadeUpAnimation);
        }
    }

    // Initial visibility check
    playFadeUpAnimation();

    // Listen for scroll events to update visibility
    document.addEventListener('scroll', playFadeUpAnimation);
}

function fadeRightAnimation() {

    // PARAMETERS

        // in view threshold to start animation
        const startThreshold = 0.1;

    // list of imgs to be animated
    let animatedElements = document.getElementsByClassName("animated-fade_right");

    // animation function
    function playFadeRightAnimation() {
        for (let i = 0; i < animatedElements.length; i++) {

            // get percent of element in viewport
            let percentInView = percentFromTopInView(animatedElements[i]);

            if (percentInView > startThreshold) {
                animatedElements[i].classList.add("animated-fade_right-complete");
                animatedElements[i].classList.remove("animated-fade_right");
            }
        }

        // remove event listener if list is empty
        if (animatedElements.length === 0) {
            window.removeEventListener("scroll", playFadeRightAnimation);
        }
    }

    // Initial visibility check
    playFadeRightAnimation();

    // Listen for scroll events to update visibility
    document.addEventListener('scroll', playFadeRightAnimation);

}

function dividerAnimation() {
    // PARAMETERS

        // in view threshold to start animation
        const startWidth = 0;

        const endWidth = 100
    
     // list of imgs to be animated
    let animatedElements = document.getElementsByClassName("card_divider");

    function playDividerAnimation() {
        for (let i = 0; i < animatedElements.length; i++) {

            if (distanceFromViewport(animatedElements[i]) < -100) {
                animatedElements[i].classList.add("animated-divider-complete");
                animatedElements[i].classList.remove("animated-divider");
            }
        }

        // remove event listener if list is empty
        if (animatedElements.length === 0) {
            window.removeEventListener("scroll", playDividerAnimation);
        }
    }

    // Initial visibility check
    playDividerAnimation();

    // Listen for scroll events to update visibility
    window.addEventListener('scroll', playDividerAnimation);
}
  
function rotatingWordsAnimation() {
  
    // PARAMETERS
  
        // in view threshold to start animation
         const startThreshold = 0.5;
  
    // get containers
    let containers = document.getElementsByClassName("rotating_words_container");
  
    function playRotatingWordsAnimation() {
          
        for (let i = 0; i < containers.length; i++) {
              
            // get all children of the container
             let animatedElements = containers[i].children;
  
            // get percent of element in viewport
            let percentInView = percentFromTopInView(containers[i]);
  
            if (percentInView > startThreshold) {
                for (let j = 0; j < animatedElements.length; j++) {
                    animatedElements[j].classList.add("animated-rotating_words-complete");
                    animatedElements[j].classList.remove("animated-rotating_words");
                }
            }
        }
  
        if (containers.length === 0) {
            window.removeEventListener("scroll", playRotatingWordsAnimation);
        }
    }
  
    // Initial visibility check
    playRotatingWordsAnimation();

    // Listen for scroll events to update visibility
    window.addEventListener("scroll", playRotatingWordsAnimation);
}

function navBarChange() {

    // PARAMETERS

        // distance threshold to start swap
        const distanceThreshold = 0.8; // % of viewport

    // get nav bar
    let navBar = document.getElementById("nav");

    // animation function
    function changeNavStyle() {
        
        // Calculate the distance scrolled relative to the top of the page
        const distanceScrolled = document.documentElement.scrollTop;

        // Get the viewport height
        const viewportHeight = window.innerHeight * distanceThreshold;

        // Check if the fixed element has scrolled 1 viewport height down the page
        if (distanceScrolled >= viewportHeight && navBar.classList.contains("nav_style_1")) {
            navBar.classList.add("nav_style_2");
            navBar.classList.remove("nav_style_1");
        } else if (distanceScrolled < viewportHeight && navBar.classList.contains("nav_style_2")) {
            navBar.classList.add("nav_style_1");
            navBar.classList.remove("nav_style_2");
        }
    }

    // Initial visibility check
    changeNavStyle();

    // Listen for scroll events to update visibility
    document.addEventListener('scroll', changeNavStyle);
}