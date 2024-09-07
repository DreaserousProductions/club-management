function initNavPanel() {
    const nav_logo = document.querySelector(".nav-logo-container .logo img");
    const nav_bg = document.querySelector(".nav-logo-container .logo-bg");
    nav_logo.addEventListener('click', () => {
        nav_logo.classList.toggle("active");
        nav_bg.classList.toggle("active");
        nav_bg.classList.toggle("rotate");
    });
}