document.addEventListener('DOMContentLoaded', () => {

    // 1. Mobile Menu Toggler
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('nav');
    
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        // Change icon layout dynamically on press
        const icon = menuToggle.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
    });

    // Close mobile nav when clicking a menu link
    document.querySelectorAll('nav ul li a').forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                menuToggle.querySelector('i').className = 'fa-solid fa-bars';
            }
        });
    });

    // 2. Portfolio Gallery Dynamic Categorization Filter
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => item.style.opacity = '1', 50);
                } else {
                    item.style.opacity = '0';
                    setTimeout(() => item.style.display = 'none', 300);
                }
            });
        });
    });

    // 3. Document Lightbox System
    const modal = document.getElementById('docModal');
    const modalImg = document.getElementById('modalImg');
    const closeBtn = document.querySelector('.close-modal');
    const viewButtons = document.querySelectorAll('.view-doc');

    viewButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const docSrc = btn.getAttribute('data-doc');
            modal.style.display = 'flex';
            modalImg.src = docSrc;
        });
    });

    closeBtn.addEventListener('click', () => modal.style.display = 'none');
    modal.addEventListener('click', (e) => {
        if(e.target === modal) modal.style.display = 'none';
    });

    // 4. Scroll-triggered Skill Progress Fill Animation
    const skillsSection = document.getElementById('skills');
    const progressBars = document.querySelectorAll('.progress');

    const animateSkills = () => {
        const sectionPos = skillsSection.getBoundingClientRect().top;
        const screenPos = window.innerHeight / 1.15;

        if (sectionPos < screenPos) {
            progressBars.forEach(bar => {
                const targetedWidth = bar.getAttribute('data-width');
                bar.style.width = targetedWidth;
            });
            window.removeEventListener('scroll', animateSkills);
        }
    };

    window.addEventListener('scroll', animateSkills);
    animateSkills(); // check once on page ready
});