/* ===================================== */
/* WEBSITE CERITA RAKYAT TIMUN MAS */
/* JavaScript - script.js */
/* ===================================== */

// ===== 1. HAMBURGER MENU TOGGLE =====
// Fungsi untuk menampilkan/menyembunyikan menu pada mobile
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    // Toggle class 'active' pada hamburger untuk animasi
    hamburger.classList.toggle('active');
    // Toggle class 'active' pada nav-links untuk menampilkan menu
    navLinks.classList.toggle('active');
});

// Menutup menu saat link diklik (untuk mobile)
const navItems = document.querySelectorAll('.nav-links a');
navItems.forEach(item => {
    item.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// ===== 2. SCROLL TO TOP BUTTON =====
// Fungsi untuk menampilkan tombol scroll-to-top saat user scroll ke bawah
const scrollTopBtn = document.getElementById('scrollTop');

// Event listener untuk window scroll
window.onscroll = function() {
    // Jika scroll lebih dari 300px, tampilkan tombol
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }

    // Tambahkan class 'scrolled' pada header untuk efek transparan
    const header = document.getElementById('header');
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
};

// Event listener untuk tombol scroll-to-top
scrollTopBtn.addEventListener('click', () => {
    // Smooth scroll ke atas
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===== 3. FADE-IN ANIMATION DENGAN INTERSECTION OBSERVER =====
// Fungsi untuk menambahkan animasi fade-in saat element terlihat di viewport

// Membuat Intersection Observer
const observerOptions = {
    threshold: 0.1, // Element terlihat minimal 10%
    rootMargin: '0px 0px -100px 0px' // Trigger sebelum element benar-benar terlihat
};

// Callback function saat element terlihat
const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
        // Jika element terlihat (intersecting)
        if (entry.isIntersecting) {
            // Tambahkan class 'visible' untuk memicu animasi
            entry.target.classList.add('visible');
            // Stop observing element ini (animasi hanya sekali)
            observer.unobserve(entry.target);
        }
    });
};

// Membuat instance Intersection Observer
const observer = new IntersectionObserver(observerCallback, observerOptions);

// Observe semua section kecuali hero
const sections = document.querySelectorAll('section:not(.hero)');
sections.forEach(section => {
    observer.observe(section);
});

// ===== 4. AUDIO CONTROL (PLAY/PAUSE) =====

// Elemen tombol audio
const audioControl = document.getElementById('audioControl');
const backgroundMusic = new Audio('audio/backsound.mp3');
backgroundMusic.loop = true;
backgroundMusic.volume = 1.0;

let isPlaying = false;

// Autoplay setelah klik pertama di halaman
document.body.addEventListener('click', () => {
    if (!isPlaying) {
        backgroundMusic.play()
            .then(() => {
                isPlaying = true;
                audioControl.classList.add('playing');
                audioControl.title = 'Pause Music';
            })
            .catch(err => console.log('Audio error:', err));
    }
}, { once: true });

// Tombol kontrol musik
audioControl.addEventListener('click', (e) => {
    e.stopPropagation(); // cegah event dari body

    if (isPlaying) {
        backgroundMusic.pause();
        audioControl.classList.remove('playing');
        audioControl.title = 'Play Music';
        isPlaying = false;
    } else {
        backgroundMusic.play()
            .then(() => {
                audioControl.classList.add('playing');
                audioControl.title = 'Pause Music';
                isPlaying = true;
            })
            .catch(err => console.log('Audio error:', err));
    }
});
// ===== 5. SMOOTH SCROLLING UNTUK NAVIGATION LINKS =====
// Sudah dihandle oleh CSS scroll-behavior: smooth
// Tapi bisa ditambahkan custom behavior jika diperlukan

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            // Offset untuk header fixed
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== 6. ANIMASI TAMBAHAN UNTUK CHARACTER CARDS =====
// Menambahkan efek parallax ringan pada character cards saat di-hover

const characterCards = document.querySelectorAll('.character-card');

characterCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        // Mendapatkan posisi mouse relatif terhadap card
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left; // X position dalam card
        const y = e.clientY - rect.top;  // Y position dalam card
        
        // Menghitung rotasi berdasarkan posisi mouse
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20; // Rotasi pada sumbu X
        const rotateY = (centerX - x) / 20; // Rotasi pada sumbu Y
        
        // Apply transform
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    // Reset transform saat mouse leave
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ===== 7. GALLERY ITEM CLICK HANDLER =====
// Menambahkan interaksi pada gallery items

const galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        // Animasi pulse saat diklik
        item.style.animation = 'pulse 0.5s ease';
        
        // Reset animation setelah selesai
        setTimeout(() => {
            item.style.animation = '';
        }, 500);
    });
});

// ===== 8. TIMELINE ANIMATION =====
// Menambahkan animasi sequential pada timeline items

const timelineItems = document.querySelectorAll('.timeline-item');

// Observer untuk timeline items
const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Delay berdasarkan index untuk efek sequential
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 150); // Delay 150ms per item
            
            timelineObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.2
});

// Apply initial style dan observe
timelineItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = 'all 0.6s ease';
    timelineObserver.observe(item);
});

// ===== 9. MORAL CARDS ANIMATION =====
// Animasi untuk moral cards dengan stagger effect

const moralCards = document.querySelectorAll('.moral-card');

const moralObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Stagger animation
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'scale(1)';
            }, index * 100);
            
            moralObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.3
});

// Initial state
moralCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'scale(0.8)';
    card.style.transition = 'all 0.5s ease';
    moralObserver.observe(card);
});

// ===== 10. HEADER TRANSPARENCY ON SCROLL =====
// Sudah dihandle di window.onscroll di atas

// ===== 11. PREVENT SCROLL RESTORATION =====
// Memastikan halaman selalu dimulai dari atas saat di-load/refresh

if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

window.addEventListener('beforeunload', () => {
    window.scrollTo(0, 0);
});

// ===== 12. LOADING ANIMATION =====
// Hero content langsung terlihat tanpa delay

window.addEventListener('load', () => {
    // Pastikan hero content terlihat
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '1';
        heroContent.style.visibility = 'visible';
    }
});

// ===== 13. KEYBOARD NAVIGATION =====
// Menambahkan shortcut keyboard untuk navigasi

document.addEventListener('keydown', (e) => {
    // ESC untuk menutup mobile menu
    if (e.key === 'Escape') {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    }
    
    // Home key untuk scroll to top
    if (e.key === 'Home') {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    
    // End key untuk scroll to bottom
    if (e.key === 'End') {
        e.preventDefault();
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth'
        });
    }
});

// ===== 14. ACTIVE NAVIGATION HIGHLIGHT =====
// Highlight menu navigation berdasarkan section yang sedang dilihat

const navLinksArray = document.querySelectorAll('.nav-links a');
const sectionsArray = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    let current = '';
    
    sectionsArray.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinksArray.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ===== 15. CONSOLE LOG INFORMASI =====
// Menampilkan informasi di console untuk debugging

console.log('%c🌸 Website Cerita Rakyat Putri Gading Cempaka 🌸', 'color: #9B59B6; font-size: 20px; font-weight: bold;');
console.log('%cDibuat oleh Siswa SMK RPL', 'color: #8B4513; font-size: 14px;');
console.log('%cFitur-fitur:', 'color: #D4AF37; font-size: 16px; font-weight: bold;');
console.log('✅ Responsive Design');
console.log('✅ Smooth Animations');
console.log('✅ Hamburger Menu');
console.log('✅ Scroll-to-Top Button');
console.log('✅ IntersectionObserver Animations');
console.log('✅ Audio Control');
console.log('✅ Keyboard Navigation');
console.log('✅ Active Navigation Highlight');

// ===== 16. PERFORMANCE OPTIMIZATION =====
// Debounce function untuk optimize scroll events

function debounce(func, wait = 10, immediate = true) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Apply debounce ke scroll events jika diperlukan
// window.addEventListener('scroll', debounce(yourScrollFunction));

// ===== 17. EASTER EGG =====
// Menambahkan easter egg untuk user yang penasaran

let clickCount = 0;
const logo = document.querySelector('.logo');

logo.addEventListener('click', () => {
    clickCount++;
    
    if (clickCount === 5) {
        // Tampilkan pesan rahasia
        alert('🎉 Selamat! Kamu menemukan Easter Egg!\n\n"Cinta sejati tidak mengenal batas waktu dan ruang. Kesetiaan adalah kekuatan yang melampaui kematian."\n\n- Putri Gading Cempaka');
        clickCount = 0;
        
        // Tambahkan efek visual
        logo.style.animation = 'float 0.5s ease infinite';
        setTimeout(() => {
            logo.style.animation = '';
        }, 2000);
    }
});

// ===== 18. ACCESSIBILITY IMPROVEMENTS =====
// Menambahkan ARIA labels secara dinamis

// Tambahkan aria-label untuk buttons
scrollTopBtn.setAttribute('aria-label', 'Scroll to top');
audioControl.setAttribute('aria-label', 'Toggle background music');
hamburger.setAttribute('aria-label', 'Toggle navigation menu');
hamburger.setAttribute('aria-expanded', 'false');

// Update aria-expanded saat hamburger diklik
hamburger.addEventListener('click', () => {
    const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', !isExpanded);
});

// ===== 19. LAZY LOADING SIMULATION =====
// Simulasi lazy loading untuk performa lebih baik

const lazyElements = document.querySelectorAll('.character-card, .gallery-item, .moral-card');

const lazyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Tambahkan class 'loaded'
            entry.target.classList.add('loaded');
            lazyObserver.unobserve(entry.target);
        }
    });
}, {
    rootMargin: '50px'
});

lazyElements.forEach(element => {
    lazyObserver.observe(element);
});

// ===== 20. FORM VALIDATION (JIKA ADA FORM) =====
// Placeholder untuk form validation jika nanti ditambahkan form kontak

// ===== END OF SCRIPT =====
console.log('%c✅ Script loaded successfully!', 'color: #228B22; font-size: 14px; font-weight: bold;');