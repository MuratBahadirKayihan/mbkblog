// Mobil menü işlevselliği
document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.querySelector('.cursor-fx');
    let cursorInterval;

    // Fare hareketi
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // Periyodik animasyon
    function startCursorAnimation() {
        cursorInterval = setInterval(() => {
            cursor.style.animation = 'none';
            cursor.offsetHeight; // Reflow
            cursor.style.animation = 'cursorFx 2s ease-in-out';
        }, 30000); // Her 30 saniyede bir
    }

    startCursorAnimation();

    // Mobil menü
    const menuButton = document.getElementById('menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuButton && mobileMenu) {
        menuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }
});

// Sayfa yüklendiğinde animasyon
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
}); 