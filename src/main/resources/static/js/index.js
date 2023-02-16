const swiper = new Swiper(".swiper", {
    loop: true,
    // ページネーションが必要なら追加
    pagination: {
        el: ".swiper-pagination",
        clickable: true
    },
    // ナビボタンが必要なら追加
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
    }
});