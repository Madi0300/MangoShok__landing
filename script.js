/* ================= Шапка при скролле ================= */
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

/* ================= Мобильное меню ================= */
const mobileBtn = document.getElementById('mobileBtn');
const navLinks = document.querySelector('.nav-links');

mobileBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    if (navLinks.classList.contains('active')) {
        mobileBtn.innerHTML = '✕';
        mobileBtn.style.color = 'var(--white)';
    } else {
        mobileBtn.innerHTML = '☰';
        mobileBtn.style.color = window.scrollY > 50 ? 'var(--white)' : 'var(--choco-dark)';
    }
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileBtn.innerHTML = '☰';
        mobileBtn.style.color = window.scrollY > 50 ? 'var(--white)' : 'var(--choco-dark)';
    });
});

/* ================= Анимация появления при скролле ================= */
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-up').forEach(element => {
    observer.observe(element);
});

/* ================= Калькулятор заказа ================= */
const calcForm = document.getElementById('calcForm');
if (calcForm) {
    const mangoType = document.getElementById('mangoType');
    const chocoType = document.getElementById('chocoType');
    const weightInput = document.getElementById('weight');
    const weightLabel = document.getElementById('weightLabel');
    const totalPriceEl = document.getElementById('totalPrice');

    const basePricePer100g = 550;

    function calculatePrice() {
        const mangoMultiplier = parseFloat(mangoType.value);
        const chocolateAddon = parseFloat(chocoType.value);
        const weight = parseInt(weightInput.value);

        weightLabel.textContent = weight + ' г';

        let total = ((basePricePer100g * mangoMultiplier) + chocolateAddon) * (weight / 100);

        totalPriceEl.textContent = Math.round(total).toLocaleString('ru-RU');
    }

    mangoType.addEventListener('change', calculatePrice);
    chocoType.addEventListener('change', calculatePrice);
    weightInput.addEventListener('input', calculatePrice);

    calculatePrice();
}

/* ================= Демо-модалка ================= */
const demoModal = document.getElementById('demoModal');
const demoModalClose = document.getElementById('demoModalClose');

function openDemoModal(e) {
    e.preventDefault();
    demoModal.classList.add('active');
}

function closeDemoModal() {
    demoModal.classList.remove('active');
}

demoModalClose.addEventListener('click', closeDemoModal);

demoModal.addEventListener('click', (e) => {
    if (e.target === demoModal) closeDemoModal();
});

document.querySelectorAll('.product-card .btn-primary').forEach(btn => {
    btn.addEventListener('click', openDemoModal);
});

const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', openDemoModal);
}
