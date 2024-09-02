// Kum efekti için fonksiyon
function createParticle() {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    const size = Math.random() * 5 + 1; 
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    const x = Math.random() * window.innerWidth;
    const y = -20; // Başlangıçta ekranın dışında 
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;

    document.body.appendChild(particle);

    // Rastgele animasyon süresi ve yönü
    const duration = Math.random() * 10 + 5; 

    // Animasyon için style ekleme
    particle.style.animation = `moveParticle ${duration}s linear infinite`;

    setTimeout(() => {
        particle.remove(); 
    }, duration * 1000);
}

// Her 100ms'de yeni bir kum tanesi oluştur
setInterval(createParticle, 100);
