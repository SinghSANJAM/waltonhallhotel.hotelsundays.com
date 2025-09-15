document.addEventListener('DOMContentLoaded', () => {
    // Contact Form Handling
    const form = document.getElementById('contactForm');
    const modal = document.getElementById('formModal');
    const closeModal = document.querySelector('.modal-close');

    if (!form || !modal) {
        console.error("Contact form or modal missing:", { form, modal });
        return;
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent default for validation

        // Validate form fields
        const name = form.querySelector("#name").value.trim();
        const email = form.querySelector("#email").value.trim();
        const mobile = form.querySelector("#mobile").value.trim();
        const mobilePattern = /^\+?[0-9]{10,15}$/;

        if (!name || !email || !mobile) {
            alert("Please fill in all required fields.");
            return;
        }

        if (!mobile.match(mobilePattern)) {
            alert("Please enter a valid phone number (10-15 digits, optional '+' prefix).");
            return;
        }

        // Show modal
        modal.classList.add('active');
        modal.setAttribute("aria-hidden", "false");

        // Submit form via FormSubmit
        fetch(form.action, {
            method: "POST",
            body: new FormData(form),
            headers: {
                Accept: "application/json"
            }
        })
            .then(response => {
                if (!response.ok) throw new Error("Form submission failed");
                form.reset();
                setTimeout(() => {
                    modal.style.opacity = "0";
                    setTimeout(() => {
                        modal.classList.remove('active');
                        modal.setAttribute("aria-hidden", "true");
                    }, 300);
                }, 3000);
            })
            .catch(error => {
                console.error("Form submission error:", error);
                alert("There was an error submitting your enquiry. Please try again later.");
                modal.classList.remove('active');
                modal.setAttribute("aria-hidden", "true");
            });
    });

    closeModal.addEventListener('click', () => {
        modal.classList.remove('active');
        modal.setAttribute("aria-hidden", "true");
    });

    // Close modal on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            modal.setAttribute("aria-hidden", "true");
        }
    });

    // Collapsible Panels
    const collapsibleToggles = document.querySelectorAll('.collapsible-toggle');
    collapsibleToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const content = toggle.nextElementSibling;
            const isActive = toggle.classList.contains('active');

            // Close all panels
            collapsibleToggles.forEach(t => {
                t.classList.remove('active');
                t.setAttribute('aria-expanded', 'false');
                t.nextElementSibling.classList.remove('active');
            });

            // Open current panel
            if (!isActive) {
                toggle.classList.add('active');
                toggle.setAttribute('aria-expanded', 'true');
                content.classList.add('active');
            }
        });
    });

    // Newsletter Form Validation
    const validateForm = (form) => {
        const email = form.querySelector("input[name='email']").value.trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email) {
            alert("Please enter an email address.");
            return false;
        }

        if (!email.match(emailPattern)) {
            alert("Please enter a valid email address.");
            return false;
        }

        return true;
    };

    // Initialize newsletter forms
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    newsletterForms.forEach(form => {
        form.addEventListener('submit', (e) => {
            if (!validateForm(form)) {
                e.preventDefault();
            }
        });
    });

    // Initialize existing scripts
    if (typeof initMagazineCarousels === 'function') {
        initMagazineCarousels();
    }
});