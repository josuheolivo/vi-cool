/**
 * Vi-Cool Tapas Bar - Main Scripts
 */
(function () {
    'use strict';

    /* ========================================
       DOM REFERENCES
       ======================================== */
    var header = document.getElementById('header');
    var hamburger = document.getElementById('hamburger');
    var navMenu = document.getElementById('navMenu');
    var revealElements = document.querySelectorAll('.reveal');
    var menuTabs = document.querySelectorAll('.menus__tab');
    var menuPanels = document.querySelectorAll('.menus__panel');
    var reservasForm = document.getElementById('reservasForm');

    /* ========================================
       INITIALIZATION
       ======================================== */
    function init() {
        initScrollHeader();
        initMobileMenu();
        initScrollReveal();
        initMenuTabs();
        initForm();
        initSmoothScroll();
    }

    /* ========================================
       STICKY HEADER ON SCROLL
       ======================================== */
    function initScrollHeader() {
        var ticking = false;

        function updateHeader() {
            var scrollY = window.scrollY;
            if (scrollY > 60) {
                header.classList.add('is-scrolled');
            } else {
                header.classList.remove('is-scrolled');
            }
            ticking = false;
        }

        window.addEventListener('scroll', function () {
            if (!ticking) {
                requestAnimationFrame(updateHeader);
                ticking = true;
            }
        }, { passive: true });

        updateHeader();
    }

    /* ========================================
       MOBILE MENU
       ======================================== */
    function initMobileMenu() {
        if (!hamburger || !navMenu) return;

        hamburger.addEventListener('click', toggleMenu);

        var links = navMenu.querySelectorAll('.nav__link');
        for (var i = 0; i < links.length; i++) {
            links[i].addEventListener('click', function () {
                closeMenu();
            });
        }

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && navMenu.classList.contains('is-open')) {
                closeMenu();
                hamburger.focus();
            }
        });
    }

    function toggleMenu() {
        var isOpen = navMenu.classList.contains('is-open');
        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    }

    function openMenu() {
        navMenu.classList.add('is-open');
        hamburger.classList.add('is-active');
        hamburger.setAttribute('aria-expanded', 'true');
        hamburger.setAttribute('aria-label', 'Cerrar menú');
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        navMenu.classList.remove('is-open');
        hamburger.classList.remove('is-active');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.setAttribute('aria-label', 'Abrir menú');
        document.body.style.overflow = '';
    }

    /* ========================================
       SCROLL REVEAL
       ======================================== */
    function initScrollReveal() {
        if (!('IntersectionObserver' in window)) {
            for (var i = 0; i < revealElements.length; i++) {
                revealElements[i].classList.add('is-visible');
            }
            return;
        }

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry, index) {
                if (entry.isIntersecting) {
                    (function (el) {
                        setTimeout(function () {
                            el.classList.add('is-visible');
                        }, index * 80);
                    })(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -40px 0px'
        });

        for (var i = 0; i < revealElements.length; i++) {
            observer.observe(revealElements[i]);
        }
    }

    /* ========================================
       MENU TABS
       ======================================== */
    function initMenuTabs() {
        if (!menuTabs.length) return;

        for (var i = 0; i < menuTabs.length; i++) {
            (function (tab) {
                tab.addEventListener('click', function () {
                    var targetTab = tab.getAttribute('data-tab');

                    for (var j = 0; j < menuTabs.length; j++) {
                        menuTabs[j].classList.remove('is-active');
                        menuTabs[j].setAttribute('aria-selected', 'false');
                    }
                    for (var k = 0; k < menuPanels.length; k++) {
                        menuPanels[k].classList.remove('is-active');
                    }

                    tab.classList.add('is-active');
                    tab.setAttribute('aria-selected', 'true');

                    var targetPanel = document.getElementById('panel-' + targetTab);
                    if (targetPanel) {
                        targetPanel.classList.add('is-active');
                    }
                });
            })(menuTabs[i]);
        }
    }

    /* ========================================
       RESERVAS FORM
       ======================================== */
    function initForm() {
        if (!reservasForm) return;

        var fechaInput = document.getElementById('resFecha');
        if (fechaInput) {
            var today = new Date();
            var tomorrow = new Date(today);
            tomorrow.setDate(tomorrow.getDate() + 1);
            fechaInput.min = tomorrow.toISOString().split('T')[0];
        }

        reservasForm.addEventListener('submit', function (e) {
            e.preventDefault();

            var formData = {
                nombre: document.getElementById('resNombre').value.trim(),
                fecha: document.getElementById('resFecha').value,
                hora: document.getElementById('resHora').value,
                comensales: document.getElementById('resComensales').value,
                email: document.getElementById('resEmail').value.trim(),
                telefono: document.getElementById('resTelefono') ? document.getElementById('resTelefono').value.trim() : '',
            };

            if (!formData.nombre || !formData.fecha || !formData.hora || !formData.comensales || !formData.email) {
                showFormMessage(vicool_ajax ? vicool_ajax.i18n_required || 'Por favor, completa todos los campos.' : 'Por favor, completa todos los campos.', 'error');
                return;
            }

            if (!isValidEmail(formData.email)) {
                showFormMessage(vicool_ajax ? vicool_ajax.i18n_email || 'Por favor, introduce un email válido.' : 'Por favor, introduce un email válido.', 'error');
                return;
            }

            var btn = reservasForm.querySelector('button[type="submit"]');
            var originalText = btn.textContent;
            btn.textContent = 'Enviando...';
            btn.disabled = true;

            setTimeout(function () {
                btn.textContent = '¡Reserva enviada!';
                btn.style.backgroundColor = '#16a34a';
                btn.style.borderColor = '#16a34a';

                showFormMessage(
                    'Gracias ' + formData.nombre + '. Tu reserva ha sido recibida. Te contactaremos para confirmar.',
                    'success'
                );

                reservasForm.reset();

                setTimeout(function () {
                    btn.textContent = originalText;
                    btn.style.backgroundColor = '';
                    btn.style.borderColor = '';
                    btn.disabled = false;
                }, 3000);
            }, 1200);
        });
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function showFormMessage(text, type) {
        var existing = reservasForm.querySelector('.form-message');
        if (existing) existing.remove();

        var msg = document.createElement('div');
        msg.className = 'form-message form-message--' + type;
        msg.textContent = text;
        msg.style.cssText = 'margin-top: 1rem; padding: 0.75rem 1rem; border-radius: 8px; font-size: 0.875rem; font-weight: 500; ' +
            (type === 'success'
                ? 'background: #f0fdf4; color: #166534; border: 1px solid #bbf7d0;'
                : 'background: #fef2f2; color: #991b1b; border: 1px solid #fecaca;');

        reservasForm.appendChild(msg);

        setTimeout(function () {
            msg.style.opacity = '0';
            msg.style.transition = 'opacity 300ms ease';
            setTimeout(function () { msg.remove(); }, 300);
        }, 5000);
    }

    /* ========================================
       SMOOTH SCROLL
       ======================================== */
    function initSmoothScroll() {
        var anchors = document.querySelectorAll('a[href^="#"]');
        for (var i = 0; i < anchors.length; i++) {
            (function (anchor) {
                anchor.addEventListener('click', function (e) {
                    var targetId = anchor.getAttribute('href');
                    if (targetId === '#' || targetId === '') return;

                    var target = document.querySelector(targetId);
                    if (target) {
                        e.preventDefault();
                        var headerHeight = header ? header.offsetHeight : 0;
                        var targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 16;

                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                });
            })(anchors[i]);
        }
    }

    /* ========================================
       RUN
       ======================================== */
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
