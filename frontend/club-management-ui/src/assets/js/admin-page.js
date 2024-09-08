function initAdminPage() {
    const menu_bar = document.querySelector(".menu-bar");
    const menu_btn = document.querySelector(".menu-btn");

    menu_btn.addEventListener('click', () => {
        menu_bar.classList.toggle("active");
    });
}