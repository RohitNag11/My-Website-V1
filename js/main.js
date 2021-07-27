$(document).ready(function () {


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

    /*var text = document.getElementById('elevated-text');
    var shadow = "";
    for (var i = 0; i < 60; i++) {
        shadow += (shadow ? ',' : '') + -i * 2.9
            + 'px ' + -i * 1 + 'px 0 rgba(30, 30, 30, 0.01)';
    }
    text.style.textShadow = shadow;
    text.style.zIndex = -2;*/

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


    var TxtRotate = function (el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 100) || 3000;
        this.txt = '';
        this.tick();
        this.isDeleting = false;
    };

    TxtRotate.prototype.tick = function () {
        var i = this.loopNum % this.toRotate.length;
        var fullTxt = this.toRotate[i];

        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

        var that = this;
        var delta = 150 - Math.random() * 100;

        if (this.isDeleting) { delta /= 2; }

        if (!this.isDeleting && this.txt === fullTxt) {
            delta = this.period;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.loopNum++;
            delta = 1000;
        }

        setTimeout(function () {
            that.tick();
        }, delta);
    };


    var elements = document.getElementsByClassName('txt-rotate');
    for (var i = 0; i < elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-rotate');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new TxtRotate(elements[i], JSON.parse(toRotate), period);
        }
    }



    // INJECT CSS
    var css = document.createElement("style");
    css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #00ffb3 }";
    document.body.appendChild(css);

    var mySwiper = new Swiper('.swiper-container', {
        // Optional parameters
        direction: 'horizontal',
        loop: true,

        // If we need pagination
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },

        // Navigation arrows
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        mousewheel: true,
        keyboard: true,

        // autoplay
        autoplay: {
            delay: 5000,
        },
    });

    var swiper = new Swiper(".mySwiper", {
        effect: "coverflow",
        loop: true,
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: "3",
        coverflowEffect: {
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },

        // Navigation arrows
        navigation: {
            nextEl: '.swiper-button-next2',
            prevEl: '.swiper-button-prev2',
        },
        mousewheel: true,
        keyboard: true,

        // autoplay
        autoplay: {
            delay: 2000,
        },
    });

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



