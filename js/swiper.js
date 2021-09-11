var mySwiper = new Swiper('.defaultSwiper', {
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

var swiper = new Swiper(".coverflowSwiper", {
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

var swiper_two = new Swiper(".mySwiper", {
    direction: 'horizontal',
    loop: true,
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    spaceBetween: 20,
    mousewheel: true,
    keyboard: true,

    // autoplay
    autoplay: {
        delay: 2000,
    },
    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});