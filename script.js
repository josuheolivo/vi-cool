(function () {
    'use strict';

    /* ========================================
       I18N TRANSLATIONS
       ======================================== */
    const translations = {
        es: {
            'nav.reservas': 'Reservas',
            'nav.menus': 'Menús',
            'nav.galeria': 'Galería',
            'nav.contacto': 'Contacto',
            'hero.title': 'Tapas-Raciones de Temporada',
            'hero.subtitle': 'Una experiencia culinaria inolvidable en el corazón de Madrid',
            'hero.cta': 'Reserva tu mesa',
            'filosofia.tag': 'Nuestra Filosofía',
            'filosofia.title': 'Respetando el producto de temporada',
            'filosofia.text': 'Respetando el producto de temporada y trabajando con la máxima calidad, ofrecemos nuestras "tapas-raciones" para disfrutar de una experiencia culinaria inolvidable. Hemos renovado nuestro concepto original ampliando nuestra carta para que puedan disfrutar desde el menú del día a un menú elaborado con una selección de nuestros platos más consolidados.',
            'menus.tag': 'Nuestra Carta',
            'menus.title': 'Menús',
            'menus.subtitle': 'Descubre todas las opciones que tenemos para ti',
            'menus.tab.dia': 'Menú del Día',
            'menus.tab.carta': 'Carta Completa',
            'menus.tab.eventos': 'Menú Eventos',
            'menus.contact': 'Consultar',
            'galeria.tag': 'El Local',
            'galeria.title': 'Galería',
            'galeria.subtitle': 'Un espacio único en el barrio de Las Huertas',
            'reservas.tag': 'Reservas',
            'reservas.title': 'Reserva tu Mesa',
            'reservas.desc': 'Asegura tu plaza y déjanos prepararte una experiencia inolvidable. Recomendamos reservar con al menos 24h de antelación.',
            'form.nombre': 'Nombre',
            'form.fecha': 'Fecha',
            'form.hora': 'Hora',
            'form.horaSelect': 'Seleccionar',
            'form.comensales': 'Comensales',
            'form.comensalesSelect': 'Seleccionar',
            'form.email': 'Email',
            'form.enviar': 'Confirmar Reserva',
            'contacto.tag': 'Contacto',
            'contacto.title': 'Encuéntranos',
            'contacto.direccionLabel': 'Dirección',
            'contacto.telefonoLabel': 'Teléfono',
            'contacto.horarioLabel': 'Horario',
            'contacto.horario': 'Lun - Dom: 13:00 - 16:00 / 20:00 - 23:30',
            'footer.rights': 'Todos los derechos reservados.',
            'mobile.call': 'Llamar',
            'mobile.reserve': 'Reservar',
        },
        en: {
            'nav.reservas': 'Reservations',
            'nav.menus': 'Menus',
            'nav.galeria': 'Gallery',
            'nav.contacto': 'Contact',
            'hero.title': 'Seasonal Tapas-Raciones',
            'hero.subtitle': 'An unforgettable culinary experience in the heart of Madrid',
            'hero.cta': 'Book your table',
            'filosofia.tag': 'Our Philosophy',
            'filosofia.title': 'Respecting seasonal produce',
            'filosofia.text': 'Respecting seasonal produce and working with the highest quality, we offer our "tapas-raciones" to enjoy an unforgettable culinary experience. We have renewed our original concept by expanding our menu so you can enjoy from the daily menu to an elaborate menu with a selection of our most established dishes.',
            'menus.tag': 'Our Menu',
            'menus.title': 'Menus',
            'menus.subtitle': 'Discover all the options we have for you',
            'menus.tab.dia': 'Daily Menu',
            'menus.tab.carta': 'Full Menu',
            'menus.tab.eventos': 'Events Menu',
            'menus.contact': 'Inquire',
            'galeria.tag': 'The Venue',
            'galeria.title': 'Gallery',
            'galeria.subtitle': 'A unique space in the Huertas neighborhood',
            'reservas.tag': 'Reservations',
            'reservas.title': 'Book Your Table',
            'reservas.desc': 'Secure your spot and let us prepare an unforgettable experience. We recommend booking at least 24 hours in advance.',
            'form.nombre': 'Name',
            'form.fecha': 'Date',
            'form.hora': 'Time',
            'form.horaSelect': 'Select',
            'form.comensales': 'Guests',
            'form.comensalesSelect': 'Select',
            'form.email': 'Email',
            'form.enviar': 'Confirm Booking',
            'contacto.tag': 'Contact',
            'contacto.title': 'Find Us',
            'contacto.direccionLabel': 'Address',
            'contacto.telefonoLabel': 'Phone',
            'contacto.horarioLabel': 'Hours',
            'contacto.horario': 'Mon - Sun: 13:00 - 16:00 / 20:00 - 23:30',
            'footer.rights': 'All rights reserved.',
            'mobile.call': 'Call',
            'mobile.reserve': 'Book',
        }
    };

    /* ========================================
       DOM REFERENCES
       ======================================== */
    const header = document.getElementById('header');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const revealElements = document.querySelectorAll('.reveal');
    const menuTabs = document.querySelectorAll('.menus__tab');
    const menuPanels = document.querySelectorAll('.menus__panel');
    const reservasForm = document.getElementById('reservasForm');

    /* ========================================
       STATE
       ======================================== */
    let currentLang = localStorage.getItem('vi-cool-lang') || 'es';

    /* ========================================
       INITIALIZATION
       ======================================== */
    function init() {
        initScrollHeader();
        initMobileMenu();
        initScrollReveal();
        initForm();
        initSmoothScroll();
    }

    /* ========================================
       STICKY HEADER ON SCROLL
       ======================================== */
    function initScrollHeader() {
        let ticking = false;

        function updateHeader() {
            const scrollY = window.scrollY;
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
        hamburger.addEventListener('click', toggleMenu);

        navMenu.querySelectorAll('.nav__link').forEach(function (link) {
            link.addEventListener('click', function () {
                closeMenu();
            });
        });

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && navMenu.classList.contains('is-open')) {
                closeMenu();
                hamburger.focus();
            }
        });
    }

    function toggleMenu() {
        const isOpen = navMenu.classList.contains('is-open');
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
            revealElements.forEach(function (el) { el.classList.add('is-visible'); });
            return;
        }

        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry, index) {
                if (entry.isIntersecting) {
                    setTimeout(function () {
                        entry.target.classList.add('is-visible');
                    }, index * 80);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -40px 0px'
        });

        revealElements.forEach(function (el) {
            observer.observe(el);
        });
    }

    /* ========================================
       MENU TABS
       ======================================== */
    function initMenuTabs() {
        menuTabs.forEach(function (tab) {
            tab.addEventListener('click', function () {
                const targetTab = tab.getAttribute('data-tab');

                menuTabs.forEach(function (t) {
                    t.classList.remove('is-active');
                    t.setAttribute('aria-selected', 'false');
                });
                menuPanels.forEach(function (p) {
                    p.classList.remove('is-active');
                });

                tab.classList.add('is-active');
                tab.setAttribute('aria-selected', 'true');

                const targetPanel = document.getElementById('panel-' + targetTab);
                if (targetPanel) {
                    targetPanel.classList.add('is-active');
                }
            });
        });
    }

    /* ========================================
       RESERVAS FORM
       ======================================== */
    function initForm() {
        if (!reservasForm) return;

        const fechaInput = document.getElementById('resFecha');
        if (fechaInput) {
            const today = new Date();
            const tomorrow = new Date(today);
            tomorrow.setDate(tomorrow.getDate() + 1);
            fechaInput.min = tomorrow.toISOString().split('T')[0];
        }

        reservasForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const formData = {
                nombre: document.getElementById('resNombre').value.trim(),
                fecha: document.getElementById('resFecha').value,
                hora: document.getElementById('resHora').value,
                comensales: document.getElementById('resComensales').value,
                email: document.getElementById('resEmail').value.trim(),
            };

            if (!formData.nombre || !formData.fecha || !formData.hora || !formData.comensales || !formData.email) {
                showFormMessage(currentLang === 'es' ? 'Por favor, completa todos los campos.' : 'Please fill in all fields.', 'error');
                return;
            }

            if (!isValidEmail(formData.email)) {
                showFormMessage(currentLang === 'es' ? 'Por favor, introduce un email válido.' : 'Please enter a valid email.', 'error');
                return;
            }

            const btn = reservasForm.querySelector('button[type="submit"]');
            const originalText = btn.textContent;
            btn.textContent = currentLang === 'es' ? 'Enviando...' : 'Sending...';
            btn.disabled = true;

            setTimeout(function () {
                btn.textContent = currentLang === 'es' ? '¡Reserva enviada!' : 'Booking sent!';
                btn.style.backgroundColor = '#16a34a';
                btn.style.borderColor = '#16a34a';

                showFormMessage(
                    currentLang === 'es'
                        ? 'Gracias ' + formData.nombre + '. Tu reserva ha sido recibida. Te contactaremos para confirmar.'
                        : 'Thank you ' + formData.nombre + '. Your booking has been received. We will contact you to confirm.',
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
        const existing = reservasForm.querySelector('.form-message');
        if (existing) existing.remove();

        const msg = document.createElement('div');
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
       SMOOTH SCROLL (Polyfill for older browsers)
       ======================================== */
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
            anchor.addEventListener('click', function (e) {
                const targetId = anchor.getAttribute('href');
                if (targetId === '#') return;

                const target = document.querySelector(targetId);
                if (target) {
                    e.preventDefault();
                    const headerHeight = header.offsetHeight;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 16;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
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
