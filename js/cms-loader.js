/**
 * Vi-Cool Tapas Bar - CMS Content Loader v2
 *
 * Lee archivos JSON de content/ y los inyecta en el HTML.
 * Soporta: Hero imagenes, Carta galeria, Eventos galeria, Galeria general.
 */

(function () {
    'use strict';

    var CONFIG = {
        contentBase: '/content',
        defaultLang: 'es'
    };

    var currentLang = localStorage.getItem('vicool-lang') || CONFIG.defaultLang;

    /* ========================================
       UTILIDADES
       ======================================== */

    function fetchJSON(url) {
        return fetch(url + '?t=' + Date.now())
            .then(function (response) {
                if (!response.ok) throw new Error('No encontrado: ' + url);
                return response.json();
            });
    }

    function escapeHTML(str) {
        if (!str) return '';
        var div = document.createElement('div');
        div.appendChild(document.createTextNode(str));
        return div.innerHTML;
    }

    function formatPrice(price) {
        if (price == null || price === '') return '';
        return Number(price).toFixed(2).replace('.', ',') + ' EUR';
    }

    function formatDate(dateString, lang) {
        if (!dateString) return '';
        var d = new Date(dateString);
        if (isNaN(d.getTime())) return dateString;
        return d.toLocaleDateString(lang === 'en' ? 'en-GB' : 'es-ES', {
            day: 'numeric', month: 'long', year: 'numeric',
            hour: '2-digit', minute: '2-digit'
        });
    }

    function categoriaLabel(cat, lang) {
        var labels = {
            es: { 'tapas-raciones': 'Tapas Raciones', 'menu-dia': 'Menu del Dia', postres: 'Postres', vinos: 'Vinos', bebidas: 'Bebidas' },
            en: { 'tapas-raciones': 'Tapas Raciones', 'menu-dia': 'Daily Menu', postres: 'Desserts', vinos: 'Wines', bebidas: 'Drinks' }
        };
        return (labels[lang] && labels[lang][cat]) || cat;
    }

    function alergenoLabel(a, lang) {
        var labels = {
            es: { gluten: 'Gluten', lactosa: 'Lactosa', huevo: 'Huevo', 'frutos-secos': 'Frutos Secos', marisco: 'Marisco', pescado: 'Pescado', soja: 'Soja' },
            en: { gluten: 'Gluten', lactosa: 'Lactose', huevo: 'Egg', 'frutos-secos': 'Nuts', marisco: 'Shellfish', pescado: 'Fish', soja: 'Soy' }
        };
        return (labels[lang] && labels[lang][a]) || a;
    }

    /* ========================================
       CARGA: INICIO
       ======================================== */

    function loadInicio() {
        var file = CONFIG.contentBase + '/inicio.json';

        return fetchJSON(file)
            .then(function (allData) {
                var data = allData[currentLang] || allData['es'] || {};
                if (!data || Object.keys(data).length === 0) return;

                setAttr('.hero__image', 'src', data.hero_imagen);
                setText('.hero__title', data.hero_titulo);
                setText('.hero__subtitle', data.hero_subtitulo);
                var cta = document.querySelector('.hero__cta span');
                if (cta && data.hero_cta) cta.textContent = data.hero_cta;
                setText('.filosofia__title', data.filosofia_titulo);
                setText('.filosofia__text', data.filosofia_texto);

                setText('[data-contact="direccion"]', data.direccion ? data.direccion.replace(/\n/g, '<br>') : '', true);
                setText('[data-contact="telefono"]', data.telefono);
                setText('[data-contact="horario"]', data.horario);
                var emailEl = document.querySelector('[data-contact="email"]');
                if (emailEl && data.email) { emailEl.textContent = data.email; emailEl.href = 'mailto:' + data.email; }
                var telLink = document.querySelector('a[href^="tel:"]');
                if (telLink && data.telefono_link) telLink.href = 'tel:' + data.telefono_link;
            })
            .catch(function (e) { console.warn('Inicio no cargado:', e.message); });
    }

    function setText(selector, value, isHTML) {
        var el = document.querySelector(selector);
        if (!el || !value) return;
        if (isHTML) el.innerHTML = value; else el.textContent = value;
    }

    function setAttr(selector, attr, value) {
        var el = document.querySelector(selector);
        if (!el || !value) return;
        el.setAttribute(attr, value);
    }

    /* ========================================
       CARGA: HERO IMAGENES
       ======================================== */

    function loadHeroImagenes() {
        var file = CONFIG.contentBase + '/hero/_index.json';

        return fetchJSON(file)
            .then(function (imagenes) {
                if (!imagenes || imagenes.length === 0) return;
                imagenes.sort(function (a, b) { return (a.orden || 0) - (b.orden || 0); });

                var heroImg = document.querySelector('.hero__image');
                if (heroImg && imagenes[0].imagen) {
                    heroImg.src = imagenes[0].imagen;
                }
            })
            .catch(function () { });
    }

    /* ========================================
       CARGA: GALERIA CARTA
       ======================================== */

    function loadGaleriaCarta() {
        var file = CONFIG.contentBase + '/galeria_carta/_index.json';
        var container = document.getElementById('galeria-carta-container');

        return fetchJSON(file)
            .then(function (imagenes) {
                if (!container) return;
                imagenes.sort(function (a, b) { return (a.orden || 0) - (b.orden || 0); });

                var html = '';
                imagenes.forEach(function (img) {
                    html += '<div class="galeria__item reveal">';
                    html += '<img src="' + escapeHTML(img.imagen) + '" alt="' + escapeHTML(img.title || '') + '" loading="lazy">';
                    if (img.title) html += '<span class="galeria__caption">' + escapeHTML(img.title) + '</span>';
                    html += '</div>';
                });
                container.innerHTML = html;
            })
            .catch(function (e) { console.warn('Galeria carta no cargada:', e.message); });
    }

    /* ========================================
       CARGA: GALERIA EVENTOS
       ======================================== */

    function loadGaleriaEventos() {
        var file = CONFIG.contentBase + '/galeria_eventos/_index.json';
        var container = document.getElementById('galeria-eventos-container');

        return fetchJSON(file)
            .then(function (imagenes) {
                if (!container) return;
                imagenes.sort(function (a, b) { return (a.orden || 0) - (b.orden || 0); });

                var html = '';
                imagenes.forEach(function (img) {
                    html += '<div class="galeria__item reveal">';
                    html += '<img src="' + escapeHTML(img.imagen) + '" alt="' + escapeHTML(img.title || '') + '" loading="lazy">';
                    if (img.title) html += '<span class="galeria__caption">' + escapeHTML(img.title) + '</span>';
                    html += '</div>';
                });
                container.innerHTML = html;
            })
            .catch(function (e) { console.warn('Galeria eventos no cargada:', e.message); });
    }

    /* ========================================
       CARGA: CARTA
       ======================================== */

    function loadCarta() {
        var file = CONFIG.contentBase + '/carta/_index.json';

        return fetchJSON(file)
            .then(function (platos) { renderCarta(platos); })
            .catch(function () { return loadCartaFromFiles(); });
    }

    function loadCartaFromFiles() {
        var base = CONFIG.contentBase + '/carta/';
        var files = ['croquetas', 'patatas-bravas', 'secreto-iberico', 'tarta-de-quesos', 'rioja-reserva'];
        var ext = currentLang === 'en' ? '.en.json' : '.json';

        return Promise.all(files.map(function (f) {
            return fetchJSON(base + f + ext).catch(function () { return null; });
        })).then(function (results) {
            renderCarta(results.filter(function (p) { return p !== null; }));
        });
    }

    function renderCarta(platos) {
        var container = document.getElementById('carta-container');
        if (!container) return;

        platos = platos.filter(function (p) { return p && !p.agotado; });

        var grouped = {};
        platos.forEach(function (p) {
            var cat = p.categoria || 'otros';
            if (!grouped[cat]) grouped[cat] = [];
            grouped[cat].push(p);
        });

        var order = ['tapas-raciones', 'menu-dia', 'postres', 'vinos', 'bebidas', 'otros'];
        var html = '';

        order.forEach(function (cat) {
            if (!grouped[cat] || !grouped[cat].length) return;
            html += '<div class="carta-categoria reveal">';
            html += '<h3 class="carta-categoria__titulo">' + escapeHTML(categoriaLabel(cat, currentLang)) + '</h3>';
            html += '<div class="carta-categoria__grid">';
            grouped[cat].forEach(function (plato) {
                html += '<article class="menu-card' + (plato.destacado ? ' menu-card--destacado' : '') + '">';
                if (plato.destacado) html += '<span class="menu-card__badge">' + (currentLang === 'en' ? 'Featured' : 'Destacado') + '</span>';
                html += '<div class="menu-card__header">';
                html += '<h4 class="menu-card__title">' + escapeHTML(plato.title) + '</h4>';
                html += '<span class="menu-card__price">' + formatPrice(plato.precio) + '</span>';
                html += '</div>';
                if (plato.descripcion) html += '<p class="menu-card__desc">' + escapeHTML(plato.descripcion) + '</p>';
                if (plato.foto) html += '<div class="menu-card__image"><img src="' + escapeHTML(plato.foto) + '" alt="' + escapeHTML(plato.title) + '" loading="lazy"></div>';
                if (Array.isArray(plato.alergenos) && plato.alergenos.length > 0) {
                    html += '<div class="menu-card__alergenos"><span class="menu-card__alergenos-label">' + (currentLang === 'en' ? 'Allergens:' : 'Alergenos:') + '</span>';
                    plato.alergenos.forEach(function (al) {
                        html += '<span class="menu-card__alergeno">' + escapeHTML(alergenoLabel(al, currentLang)) + '</span>';
                    });
                    html += '</div>';
                }
                html += '</article>';
            });
            html += '</div></div>';
        });

        container.innerHTML = html;
    }

    /* ========================================
       CARGA: EVENTOS
       ======================================== */

    function loadEventos() {
        var file = CONFIG.contentBase + '/eventos/_index.json';

        return fetchJSON(file)
            .then(function (eventos) { renderEventos(eventos); })
            .catch(function () { return loadEventosFromFiles(); });
    }

    function loadEventosFromFiles() {
        var base = CONFIG.contentBase + '/eventos/';
        var files = ['cata-vinos-octubre', 'nochevieja-2026'];
        var ext = currentLang === 'en' ? '.en.json' : '.json';

        return Promise.all(files.map(function (f) {
            return fetchJSON(base + f + ext).catch(function () { return null; });
        })).then(function (results) {
            renderEventos(results.filter(function (e) { return e !== null; }));
        });
    }

    function renderEventos(eventos) {
        var container = document.getElementById('eventos-container');
        if (!container) return;

        var hoy = new Date();
        hoy.setHours(0, 0, 0, 0);

        eventos = eventos.filter(function (e) {
            if (!e.fecha) return false;
            return new Date(e.fecha) >= hoy;
        });

        eventos.sort(function (a, b) { return new Date(a.fecha) - new Date(b.fecha); });

        if (!eventos.length) {
            container.innerHTML = '<p class="eventos__empty">' + (currentLang === 'en' ? 'No upcoming events' : 'No hay eventos proximos') + '</p>';
            return;
        }

        var html = '';
        eventos.forEach(function (ev) {
            html += '<article class="evento-card reveal">';
            if (ev.imagen) html += '<div class="evento-card__image"><img src="' + escapeHTML(ev.imagen) + '" alt="' + escapeHTML(ev.title) + '" loading="lazy"></div>';
            html += '<div class="evento-card__body">';
            if (ev.fecha) html += '<time class="evento-card__fecha" datetime="' + escapeHTML(ev.fecha) + '">' + formatDate(ev.fecha, currentLang) + '</time>';
            html += '<h3 class="evento-card__title">' + escapeHTML(ev.title) + '</h3>';
            if (ev.descripcion) html += '<p class="evento-card__desc">' + escapeHTML(ev.descripcion) + '</p>';
            if (ev.ubicacion) html += '<p class="evento-card__ubicacion">' + escapeHTML(ev.ubicacion) + '</p>';
            if (ev.enlace_reserva) html += '<a href="' + escapeHTML(ev.enlace_reserva) + '" class="btn btn--primary btn--sm evento-card__cta">' + (currentLang === 'en' ? 'Book now' : 'Reservar plaza') + '</a>';
            html += '</div></article>';
        });
        container.innerHTML = html;
    }

    /* ========================================
       CARGA: GALERIA GENERAL
       ======================================== */

    function loadGaleria() {
        var file = CONFIG.contentBase + '/galeria/_index.json';

        return fetchJSON(file)
            .then(function (fotos) { renderGaleria(fotos); })
            .catch(function () { return loadGaleriaFromFiles(); });
    }

    function loadGaleriaFromFiles() {
        var base = CONFIG.contentBase + '/galeria/';
        var files = ['interior-local', 'barra', 'tapas-variadas'];
        var ext = currentLang === 'en' ? '.en.json' : '.json';

        return Promise.all(files.map(function (f) {
            return fetchJSON(base + f + ext).catch(function () { return null; });
        })).then(function (results) {
            renderGaleria(results.filter(function (f) { return f !== null; }));
        });
    }

    function renderGaleria(fotos) {
        var container = document.getElementById('galeria-container');
        if (!container) return;

        if (!fotos || !fotos.length) { container.innerHTML = ''; return; }

        var html = '';
        fotos.forEach(function (foto, i) {
            var sizeClass = i === 0 ? ' galeria__item--lg' : (i === 2 || i === 5 ? ' galeria__item--wide' : '');
            html += '<div class="galeria__item' + sizeClass + ' reveal">';
            html += '<img src="' + escapeHTML(foto.imagen) + '" alt="' + escapeHTML(foto.title || '') + '" loading="lazy" class="galeria__img">';
            html += '</div>';
        });
        container.innerHTML = html;
    }

    /* ========================================
       IDIOMA
       ======================================== */

    function setLang(lang) {
        currentLang = lang;
        localStorage.setItem('vicool-lang', lang);
        document.documentElement.lang = lang;
        init();
    }

    function toggleLang() {
        setLang(currentLang === 'es' ? 'en' : 'es');
    }

    /* ========================================
       INIT
       ======================================== */

    function init() {
        loadInicio();
        loadHeroImagenes();
        loadCarta();
        loadEventos();
        loadGaleria();
        loadGaleriaCarta();
        loadGaleriaEventos();
    }

    document.addEventListener('DOMContentLoaded', init);

    window.ViCoolCMS = {
        init: init,
        setLang: setLang,
        toggleLang: toggleLang,
        getLang: function () { return currentLang; }
    };
})();
