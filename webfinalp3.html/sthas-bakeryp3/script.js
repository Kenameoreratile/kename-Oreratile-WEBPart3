/**
 * Stha's Bakery – Part 3 JavaScript
 * Interactive elements: tabs, accordion, lightbox gallery,
 * dynamic filter/search, form validation, AJAX-style submit
 */

document.addEventListener('DOMContentLoaded', function () {

    // ========== TABS (Home page) ==========
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(function (btn) {
        btn.addEventListener('click', function () {
            const target = this.getAttribute('data-tab');
            tabButtons.forEach(function (b) { b.classList.remove('active'); });
            tabContents.forEach(function (c) { c.classList.remove('active'); });
            this.classList.add('active');
            const panel = document.getElementById(target);
            if (panel) panel.classList.add('active');
        });
    });

    // ========== ACCORDION (About & Services) ==========
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(function (header) {
        header.addEventListener('click', function () {
            const item = this.parentElement;
            const body = item.querySelector('.accordion-body');
            const isOpen = item.classList.contains('open');
            const parent = item.closest('.accordion');

            if (parent) {
                parent.querySelectorAll('.accordion-item').forEach(function (i) {
                    i.classList.remove('open');
                    const b = i.querySelector('.accordion-body');
                    if (b) b.style.maxHeight = null;
                });
            }

            if (!isOpen) {
                item.classList.add('open');
                if (body) body.style.maxHeight = body.scrollHeight + 'px';
            }
        });
    });

    // ========== DYNAMIC FILTER + SEARCH (Products page) ==========
    const filterButtons = document.querySelectorAll('.filter-btn');
    const filterableProducts = document.querySelectorAll('.filterable .product');
    const searchInput = document.getElementById('productSearch');
    const noResults = document.getElementById('noResults');
    let currentFilter = 'all';

    function applyFilterAndSearch() {
        const query = searchInput ? searchInput.value.trim().toLowerCase() : '';
        let visibleCount = 0;

        filterableProducts.forEach(function (product) {
            const category = product.getAttribute('data-category');
            const name = (product.getAttribute('data-name') || '').toLowerCase();
            const text = product.textContent.toLowerCase();
            const matchesFilter = currentFilter === 'all' || category === currentFilter;
            const matchesSearch = !query || name.indexOf(query) !== -1 || text.indexOf(query) !== -1;

            if (matchesFilter && matchesSearch) {
                product.style.display = '';
                product.classList.add('fade-in');
                visibleCount++;
            } else {
                product.style.display = 'none';
                product.classList.remove('fade-in');
            }
        });

        if (noResults) {
            noResults.hidden = visibleCount > 0;
        }
    }

    filterButtons.forEach(function (btn) {
        btn.addEventListener('click', function () {
            currentFilter = this.getAttribute('data-filter');
            filterButtons.forEach(function (b) { b.classList.remove('active'); });
            this.classList.add('active');
            applyFilterAndSearch();
        });
    });

    if (searchInput) {
        searchInput.addEventListener('input', applyFilterAndSearch);
    }

    // ========== LIGHTBOX GALLERY (Products page) ==========
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const galleryImages = document.querySelectorAll('.gallery-img');
    let currentIndex = 0;
    const galleryList = Array.from(galleryImages);

    function openLightbox(index) {
        if (!lightbox || !galleryList.length) return;
        currentIndex = index;
        const img = galleryList[currentIndex];
        lightboxImg.src = img.getAttribute('data-full') || img.src;
        lightboxImg.alt = img.alt;
        lightboxImg.title = img.title || '';
        if (lightboxCaption) {
            lightboxCaption.textContent = img.title || img.alt || '';
        }
        lightbox.hidden = false;
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        if (!lightbox) return;
        lightbox.hidden = true;
        document.body.style.overflow = '';
    }

    function showNext() {
        currentIndex = (currentIndex + 1) % galleryList.length;
        openLightbox(currentIndex);
    }

    function showPrev() {
        currentIndex = (currentIndex - 1 + galleryList.length) % galleryList.length;
        openLightbox(currentIndex);
    }

    galleryImages.forEach(function (img, index) {
        img.style.cursor = 'pointer';
        img.addEventListener('click', function () {
            openLightbox(index);
        });
    });

    if (lightbox) {
        const closeBtn = lightbox.querySelector('.lightbox-close');
        const nextBtn = lightbox.querySelector('.lightbox-next');
        const prevBtn = lightbox.querySelector('.lightbox-prev');

        if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
        if (nextBtn) nextBtn.addEventListener('click', showNext);
        if (prevBtn) prevBtn.addEventListener('click', showPrev);

        lightbox.addEventListener('click', function (e) {
            if (e.target === lightbox) closeLightbox();
        });

        document.addEventListener('keydown', function (e) {
            if (lightbox.hidden) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') showNext();
            if (e.key === 'ArrowLeft') showPrev();
        });
    }

    // ========== FORM VALIDATION (Contact page) ==========
    const form = document.getElementById('enquiryForm');

    if (form) {
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const phoneInput = document.getElementById('phone');
        const productSelect = document.getElementById('product');
        const quantityInput = document.getElementById('quantity');
        const dateInput = document.getElementById('date');
        const messageInput = document.getElementById('message');
        const successMsg = document.getElementById('formSuccess');
        const statusMsg = document.getElementById('formStatus');

        function showError(inputId, message) {
            const errorEl = document.getElementById(inputId + 'Error');
            const input = document.getElementById(inputId);
            if (errorEl) errorEl.textContent = message;
            if (input) {
                input.classList.add('invalid');
                input.classList.remove('valid');
            }
        }

        function clearError(inputId) {
            const errorEl = document.getElementById(inputId + 'Error');
            const input = document.getElementById(inputId);
            if (errorEl) errorEl.textContent = '';
            if (input) {
                input.classList.remove('invalid');
                input.classList.add('valid');
            }
        }

        function validateName() {
            const value = nameInput.value.trim();
            if (value.length < 2) {
                showError('name', 'Please enter your full name (at least 2 characters).');
                return false;
            }
            clearError('name');
            return true;
        }

        function validateEmail() {
            const value = emailInput.value.trim();
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!value) {
                showError('email', 'Email address is required.');
                return false;
            }
            if (!emailPattern.test(value)) {
                showError('email', 'Please enter a valid email address.');
                return false;
            }
            clearError('email');
            return true;
        }

        function validatePhone() {
            const value = phoneInput.value.trim();
            if (value === '') {
                clearError('phone');
                phoneInput.classList.remove('valid', 'invalid');
                return true;
            }
            const phonePattern = /^[0-9\s\-\+]{10,15}$/;
            if (!phonePattern.test(value)) {
                showError('phone', 'Please enter a valid phone number (10–15 digits).');
                return false;
            }
            clearError('phone');
            return true;
        }

        function validateProduct() {
            if (!productSelect.value) {
                showError('product', 'Please select a product.');
                return false;
            }
            clearError('product');
            return true;
        }

        function validateQuantity() {
            const value = quantityInput.value;
            if (value === '') {
                clearError('quantity');
                quantityInput.classList.remove('valid', 'invalid');
                return true;
            }
            const num = parseInt(value, 10);
            if (isNaN(num) || num < 1 || num > 1000) {
                showError('quantity', 'Quantity must be between 1 and 1000.');
                return false;
            }
            clearError('quantity');
            return true;
        }

        function validateDate() {
            const value = dateInput.value;
            if (value === '') {
                clearError('date');
                dateInput.classList.remove('valid', 'invalid');
                return true;
            }
            const selected = new Date(value);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            if (selected < today) {
                showError('date', 'Please choose today or a future date.');
                return false;
            }
            clearError('date');
            return true;
        }

        function validateMessage() {
            const value = messageInput.value.trim();
            if (value.length < 10) {
                showError('message', 'Please write a message of at least 10 characters.');
                return false;
            }
            if (value.length > 500) {
                showError('message', 'Message must be 500 characters or less.');
                return false;
            }
            clearError('message');
            return true;
        }

        nameInput.addEventListener('blur', validateName);
        emailInput.addEventListener('blur', validateEmail);
        phoneInput.addEventListener('blur', validatePhone);
        productSelect.addEventListener('change', validateProduct);
        quantityInput.addEventListener('blur', validateQuantity);
        dateInput.addEventListener('change', validateDate);
        messageInput.addEventListener('blur', validateMessage);

        form.addEventListener('submit', function (e) {
            e.preventDefault();

            const isValid =
                validateName() &&
                validateEmail() &&
                validatePhone() &&
                validateProduct() &&
                validateQuantity() &&
                validateDate() &&
                validateMessage();

            if (!isValid) {
                if (statusMsg) {
                    statusMsg.textContent = 'Please fix the errors above before submitting.';
                    statusMsg.className = 'form-status error';
                }
                return;
            }

            if (statusMsg) {
                statusMsg.textContent = 'Sending your enquiry...';
                statusMsg.className = 'form-status sending';
            }

            const formData = {
                name: nameInput.value.trim(),
                email: emailInput.value.trim(),
                phone: phoneInput.value.trim(),
                product: productSelect.value,
                quantity: quantityInput.value,
                date: dateInput.value,
                message: messageInput.value.trim()
            };

            // Simulated AJAX submission
            setTimeout(function () {
                console.log('Enquiry submitted:', formData);

                form.reset();
                document.querySelectorAll('.valid, .invalid').forEach(function (el) {
                    el.classList.remove('valid', 'invalid');
                });
                document.querySelectorAll('.error-message').forEach(function (el) {
                    el.textContent = '';
                });

                if (successMsg) successMsg.hidden = false;
                if (statusMsg) {
                    statusMsg.textContent = '';
                    statusMsg.className = 'form-status';
                }

                setTimeout(function () {
                    if (successMsg) successMsg.hidden = true;
                }, 6000);
            }, 800);
        });
    }

});
