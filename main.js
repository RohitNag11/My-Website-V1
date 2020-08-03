$(document).ready(function () {
    //Preloader
    // preloaderFadeOutTime = 500;
    // function hidePreloader() {
    //     var preloader = $('.spinner-wrapper');
    //     preloader.fadeOut(preloaderFadeOutTime);
    // }
    // hidePreloader();

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

    $('#up').on('click', function () {
        $('html, body').animate({
            scrollTop: 0
        }, 2000);
    });

    AOS.init({
        easing: 'ease',
        duration: 1800,
        once: true,
    });

    var mySwiper = new Swiper('.swiper-container', {
        // Optional parameters
        direction: 'horizontal',
        loop: true,

        // If we need pagination
        pagination: {
            el: '.swiper-pagination',
        },

        // Navigation arrows
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        mousewheel: true,
        keyboard: true,
    });

});

document.addEventListener('touchstart', onTouchStart, { passive: true });

function loaderSpinner() {
    $(window).load(function () {
        var loader = $('.loader');
        var wHeight = $(window).height();
        var wWidth = $(window).width();
        var i = 0;
        /*Center loader on half screen */
        loader.css({
            top: wHeight / 2 - 2.5,
            left: wWidth / 2 - 200
        })

        do {
            loader.animate({
                width: i
            }, 10)
            i += 3;
        } while (i <= 400)
        if (i === 402) {
            loader.animate({
                left: 0,
                width: '100%'
            })
            loader.animate({
                top: '0',
                height: '100vh'
            })
        }

        /* This line hide loader and show content */
        setTimeout(function () {
            $('.content').fadeIn("slow");
            (loader).fadeOut("fast");
            /*Set time in milisec */
        }, 3500);
    });

}

loaderSpinner();

