const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');
const navLinks = document.querySelectorAll('.site-nav a[href^="#"]');
const sections = document.querySelectorAll('main section[id]');

if (menuToggle && siteNav) {
    menuToggle.addEventListener('click', () => {
        const isOpen = siteNav.classList.toggle('is-open');
        menuToggle.setAttribute('aria-expanded', String(isOpen));
    });
}

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (siteNav) siteNav.classList.remove('is-open');
        if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
    });
});

const sectionObserver = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            const id = entry.target.getAttribute('id');
            const targetLink = document.querySelector(`.site-nav a[href="#${id}"]`);
            
            if (!targetLink) return;
            
            if (entry.isIntersecting) {
                navLinks.forEach(link => link.classList.remove('is-active'));
                targetLink.classList.add('is-active');
            }
        });
    },
    { rootMargin: '-30% 0px -50% 0px', threshold: 0 }
);

sections.forEach(section => sectionObserver.observe(section));