document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Tab Switching Logic ---
    const tabBtns = document.querySelectorAll('.tab-btn');
    const destinationGroup = document.getElementById('destination-group');
    const pickupDateInput = document.getElementById('pickupDate');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const tabType = btn.getAttribute('data-tab');
            if (tabType === 'local') {
                destinationGroup.style.display = 'none';
            } else {
                destinationGroup.style.display = 'block';
            }
        });
    });

    // --- 2. Set Min Date ---
    const today = new Date().toISOString().split('T')[0];
    pickupDateInput.setAttribute('min', today);

    // --- 3. Navbar Sticky Effect ---
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = "0 5px 20px rgba(0,0,0,0.1)";
        } else {
            navbar.style.boxShadow = "0 2px 10px rgba(0,0,0,0.05)";
        }
    });

    // --- 4. NEW: FAQ Accordion Logic ---
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            // Close other open FAQs
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            // Toggle current
            item.classList.toggle('active');
        });
    });

    // --- 5. NEW: Scroll Reveal Animation ---
    const revealElements = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 150;

        revealElements.forEach((reveal) => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    // Trigger once on load
    revealOnScroll();

    // --- 6. NEW: Mobile Menu Toggle Logic ---
    const mobileBtn = document.querySelector('.mobile-toggle');
    const navbarElement = document.getElementById('navbar');

    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            // Toggle the 'active' class on the navbar itself
            navbarElement.classList.toggle('active');
            
            // Optional: Toggle icon between 'bars' and 'x' (close)
            const icon = mobileBtn.querySelector('i');
            if (navbarElement.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });
    }

    // --- 7. NEW: Footer Modal Logic ---
    const aboutLink = document.getElementById('about-link');
    const contactLink = document.getElementById('contact-link');
    const aboutModal = document.getElementById('about-modal');
    const contactModal = document.getElementById('contact-modal');
    const closeButtons = document.querySelectorAll('.close-modal');

    function openModal(modal) {
        if (modal) {
            modal.classList.add('show');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        }
    }

    function closeModal() {
        document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('show'));
        document.body.style.overflow = 'auto'; // Restore scrolling
    }

    if (aboutLink) aboutLink.addEventListener('click', (e) => { e.preventDefault(); openModal(aboutModal); });
    if (contactLink) contactLink.addEventListener('click', (e) => { e.preventDefault(); openModal(contactModal); });

    // Close on 'X' click
    closeButtons.forEach(btn => btn.addEventListener('click', closeModal));

    // Close when clicking outside the box
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-overlay')) {
            closeModal();
        }
    });
});
