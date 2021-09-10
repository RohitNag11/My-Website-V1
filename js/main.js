$(document).ready(function () {
    $('.gallery-section').magnificPopup({
        delegate: 'a', // child items selector, by clicking on it popup will open
        type: 'image',
        // other options
        // Delay in milliseconds before popup is removed
        //removalDelay: 300,

        // Class that is added to popup wrapper and background
        // make it unique to apply your CSS animations just to this exact popup
        mainClass: 'mfp-fade',
        gallery: {
            enabled: true,

            preload: [1, 3],
        }
    });

    $('.menu-toggler').on('click', function () {
        $(this).toggleClass('open');
        $('.top-nav').toggleClass('open');
    });

    $('.top-nav .nav-link').on('click', function () {
        $('.menu-toggler').removeClass('open');
        $('.top-nav').removeClass('open');
    });

    $('nav a[href*="#"]').on('click', function () {
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top - 100
        }, 2000);
    });

    //Smooth Scroll:
    $('a[href*="#"]').on('click', function () {
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top - 100
        }, 2000);
    });

    $('#up').on('click', function () {
        $('html, body').animate({
            scrollTop: 0
        }, 2000);
    });


    //Animate on scroll:
    AOS.init({
        easing: 'ease',
        duration: 1800,
        once: true,
    });

    //Progress bar:
    function progressBarScroll() {
        let winScroll = document.body.scrollTop || document.documentElement.scrollTop,
            height = document.documentElement.scrollHeight - document.documentElement.clientHeight,
            scrolled = (winScroll / height) * 100;
        document.getElementById("progressBar").style.width = scrolled + "%";
    }
    window.onscroll = function () {
        progressBarScroll();
    };

    // INJECT CSS
    var css = document.createElement("style");
    css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #00ffb3 }";
    document.body.appendChild(css);

    VanillaTilt.init(document.querySelectorAll(".tilt"), {
        reverse: true,  // reverse the tilt direction
        max: 5,     // max tilt rotation (degrees)
        startX: 0,      // the starting tilt on the X axis, in degrees.
        startY: 0,      // the starting tilt on the Y axis, in degrees.
        perspective: 3000,   // Transform perspective, the lower the more extreme the tilt gets.
        scale: 1.5,      // 2 = 200%, 1.5 = 150%, etc..
        speed: 1000,    // Speed of the enter/exit transition
        transition: true,   // Set a transition on enter/exit.
        axis: null,   // What axis should be disabled. Can be "x" or "y" or null.
        reset: true,    // If the tilt effect has to be reset on exit.
        easing: "cubic-bezier(.03,.98,.52,.99)",    // Easing on enter/exit.
        glare: true,   // if it should have a "glare" effect
        "max-glare": 0.6,      // the maximum "glare" opacity (1 = 100%, 0.5 = 50%)
        "glare-prerender": false,  // false = VanillaTilt creates the glare elements for you, otherwise
        // you need to add .js-tilt-glare>.js-tilt-glare-inner by yourself
        "mouse-event-element": null,    // css-selector or link to HTML-element what will be listen mouse events
        // you need to add .js-tilt-glare>.js-tilt-glare-inner by yourself
        gyroscope: true,    // Boolean to enable/disable device orientation detection,
        gyroscopeMinAngleX: -45,     // This is the bottom limit of the device angle on X axis, meaning that a device rotated at this angle would tilt the element as if the mouse was on the left border of the element;
        gyroscopeMaxAngleX: 45,      // This is the top limit of the device angle on X axis, meaning that a device rotated at this angle would tilt the element as if the mouse was on the right border of the element;
        gyroscopeMinAngleY: -45,     // This is the bottom limit of the device angle on Y axis, meaning that a device rotated at this angle would tilt the element as if the mouse was on the top border of the element;
        gyroscopeMaxAngleY: 45,      // This is the top limit of the device angle on Y axis, meaning that a device rotated at this angle would tilt the element as if the mouse was on the bottom border of the element;
    });


    const accordionItemHeader = document.querySelectorAll(".accordion-item-header");
    accordionItemHeader.forEach(accordionItemHeader => {
        accordionItemHeader.addEventListener("click", event => {
            accordionItemHeader.classList.toggle("active");
            const accordionItemBody = accordionItemHeader.nextElementSibling;
            if (accordionItemHeader.classList.contains("active")) {
                accordionItemBody.style.maxHeight = accordionItemBody.scrollHeight + "px";
            }
            else {
                accordionItemBody.style.maxHeight = 0;
            }
        })
    })
});



