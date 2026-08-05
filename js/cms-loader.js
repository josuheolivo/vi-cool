/**
 * Vi-Cool Tapas Bar - CMS Content Loader
 *
 * Lee los archivos JSON de content/ y los inyecta dinámicamente
 * en el HTML público, reemplazando el contenido estático.
 *
 * @version 1.0.0
 */

(function () {
    'use strict';

    /* ========================================
       CONFIGURACIÓN
       ======================================== */
    var CONFIG = {
        contentBase: '/content',
        defaultLang: 'es',
        fallbackLang: 'es',
        dateFormat: {
            es: { day: 'numeric', month: 'long', year: 'numeric' },
            en: { day: 'numeric', month: 'long', year: 'numeric' }
        }
    };

    /* ========================================
       ESTADO
       ======================================== */
    var currentLang = localStorage.getItem( 'vicool-lang' ) || CONFIG.defaultLang;
    var cache = {};

    /* ========================================
       UTILIDADES
       ======================================== */
    function fetchJSON( url ) {
        if ( cache[ url ] ) {
            return Promise.resolve( cache[ url ] );
        }

        return fetch( url )
            .then( function ( response ) {
                if ( ! response.ok ) {
                    throw new Error( 'Error cargando: ' + url );
                }
                return response.json();
            } )
            .then( function ( data ) {
                cache[ url ] = data;
                return data;
            } );
    }

    function formatPrice( price ) {
        if ( price === null || price === undefined ) return '';
        return Number( price ).toFixed( 2 ).replace( '.', ',' ) + ' €';
    }

    function formatDate( dateString, lang ) {
        if ( ! dateString ) return '';
        var date = new Date( dateString );
        if ( isNaN( date.getTime() ) ) return dateString;
        return date.toLocaleDateString( lang === 'en' ? 'en-GB' : 'es-ES', CONFIG.dateFormat[ lang ] || CONFIG.dateFormat.es );
    }

    function escapeHTML( str ) {
        if ( ! str ) return '';
        var div = document.createElement( 'div' );
        div.appendChild( document.createTextNode( str ) );
        return div.innerHTML;
    }

    function getLangLabel( alergeno, lang ) {
        var labels = {
            es: {
                gluten: 'Gluten',
                lactosa: 'Lactosa',
                huevo: 'Huevo',
                'frutos-secos': 'Frutos Secos',
                marisco: 'Marisco',
                pescado: 'Pescado',
                soja: 'Soja'
            },
            en: {
                gluten: 'Gluten',
                lactose: 'Lactose',
                egg: 'Egg',
                'nuts': 'Nuts',
                shellfish: 'Shellfish',
                fish: 'Fish',
                soy: 'Soy'
            }
        };
        return ( labels[ lang ] && labels[ lang ][ alergeno ] ) || alergeno;
    }

    function getCategoriaLabel( cat, lang ) {
        var labels = {
            es: {
                'tapas-raciones': 'Tapas Raciones',
                'menu-dia': 'Menú del Día',
                postres: 'Postres',
                vinos: 'Vinos',
                bebidas: 'Bebidas'
            },
            en: {
                'tapas-raciones': 'Tapas Raciones',
                'menu-dia': 'Daily Menu',
                postres: 'Desserts',
                vinos: 'Wines',
                bebidas: 'Drinks'
            }
        };
        return ( labels[ lang ] && labels[ lang ][ cat ] ) || cat;
    }

    /* ========================================
       CARGA: INICIO (Hero + Filosofía + Contacto)
       ======================================== */
    function loadInicio() {
        var langFile = currentLang === 'en' ? CONFIG.contentBase + '/inicio.en.json' : CONFIG.contentBase + '/inicio.json';

        return fetchJSON( langFile )
            .then( function ( data ) {
                renderHero( data );
                renderFilosofia( data );
                renderContacto( data );
                return data;
            } )
            .catch( function ( err ) {
                console.warn( 'No se pudo cargar inicio.json, usando fallback:', err );
            } );
    }

    function renderHero( data ) {
        var heroImg = document.querySelector( '.hero__image' );
        var heroTitle = document.querySelector( '.hero__title' );
        var heroSubtitle = document.querySelector( '.hero__subtitle' );
        var heroCta = document.querySelector( '.hero__cta' );

        if ( data.hero_imagen && heroImg ) {
            heroImg.src = data.hero_imagen;
        }
        if ( data.hero_titulo && heroTitle ) {
            heroTitle.textContent = data.hero_titulo;
        }
        if ( data.hero_subtitulo && heroSubtitle ) {
            heroSubtitle.textContent = data.hero_subtitulo;
        }
        if ( data.hero_cta && heroCta ) {
            var ctaText = heroCta.querySelector( 'span' ) || heroCta;
            ctaText.textContent = data.hero_cta;
        }
    }

    function renderFilosofia( data ) {
        var filTitle = document.querySelector( '.filosofia__title' );
        var filText = document.querySelector( '.filosofia__text' );

        if ( data.filosofia_titulo && filTitle ) {
            filTitle.textContent = data.filosofia_titulo;
        }
        if ( data.filosofia_texto && filText ) {
            filText.textContent = data.filosofia_texto;
        }
    }

    function renderContacto( data ) {
        var direccion = document.querySelector( '[data-contact="direccion"]' );
        var telefono = document.querySelector( '[data-contact="telefono"]' );
        var horario = document.querySelector( '[data-contact="horario"]' );
        var email = document.querySelector( '[data-contact="email"]' );

        if ( data.direccion && direccion ) {
            direccion.innerHTML = data.direccion.replace( /\n/g, '<br>' );
        }
        if ( data.telefono && telefono ) {
            telefono.textContent = data.telefono;
        }
        if ( data.telefono_link ) {
            var telLink = document.querySelector( '[data-contact="telefono-link"]' );
            if ( telLink ) {
                telLink.href = 'tel:' + data.telefono_link;
            }
        }
        if ( data.horario && horario ) {
            horario.textContent = data.horario;
        }
        if ( data.email && email ) {
            email.textContent = data.email;
            email.href = 'mailto:' + data.email;
        }
    }

    /* ========================================
       CARGA: CARTA (Platos agrupados por categoría)
       ======================================== */
    function loadCarta() {
        var langSuffix = currentLang === 'en' ? '.en.json' : '.json';
        var indexUrl = CONFIG.contentBase + '/carta/_index' + langSuffix;

        return fetchJSON( indexUrl )
            .then( function ( platos ) {
                renderCarta( platos );
                return platos;
            } )
            .catch( function () {
                return loadCartaFromFiles();
            } );
    }

    function loadCartaFromFiles() {
        var langSuffix = currentLang === 'en' ? '.en.json' : '.json';
        var knownFiles = [
            'croquetas' + langSuffix,
            'patatas-bravas' + langSuffix,
            'secreto-iberico' + langSuffix,
            'tarta-de-quesos' + langSuffix,
            'rioja-reserva' + langSuffix
        ];

        var promises = knownFiles.map( function ( file ) {
            return fetchJSON( CONFIG.contentBase + '/carta/' + file ).catch( function () { return null; } );
        } );

        return Promise.all( promises ).then( function ( results ) {
            var platos = results.filter( function ( p ) { return p !== null; } );
            renderCarta( platos );
            return platos;
        } );
    }

    function renderCarta( platos ) {
        var container = document.getElementById( 'carta-container' );
        if ( ! container ) return;

        platos = platos.filter( function ( p ) {
            return p && ! p.agotado;
        } );

        var grouped = {};
        platos.forEach( function ( plato ) {
            var cat = plato.categoria || 'otros';
            if ( ! grouped[ cat ] ) {
                grouped[ cat ] = [];
            }
            grouped[ cat ].push( plato );
        } );

        var html = '';
        var catOrder = [ 'tapas-raciones', 'menu-dia', 'postres', 'vinos', 'bebidas', 'otros' ];

        catOrder.forEach( function ( cat ) {
            if ( ! grouped[ cat ] || grouped[ cat ].length === 0 ) return;

            html += '<div class="carta-categoria reveal">';
            html += '<h3 class="carta-categoria__titulo">' + escapeHTML( getCategoriaLabel( cat, currentLang ) ) + '</h3>';
            html += '<div class="carta-categoria__grid">';

            grouped[ cat ].forEach( function ( plato ) {
                html += renderPlatoCard( plato );
            } );

            html += '</div></div>';
        } );

        container.innerHTML = html;
        observeReveals( container.querySelectorAll( '.reveal' ) );
    }

    function renderPlatoCard( plato ) {
        var html = '<article class="menu-card' + ( plato.destacado ? ' menu-card--destacado' : '' ) + '">';

        if ( plato.destacado ) {
            html += '<span class="menu-card__badge">' + ( currentLang === 'en' ? 'Featured' : 'Destacado' ) + '</span>';
        }

        html += '<div class="menu-card__header">';
        html += '<h4 class="menu-card__title">' + escapeHTML( plato.title ) + '</h4>';
        if ( plato.precio !== undefined && plato.precio !== null ) {
            html += '<span class="menu-card__price">' + formatPrice( plato.precio ) + '</span>';
        }
        html += '</div>';

        if ( plato.descripcion ) {
            html += '<p class="menu-card__desc">' + escapeHTML( plato.descripcion ) + '</p>';
        }

        if ( plato.foto ) {
            html += '<div class="menu-card__image"><img src="' + escapeHTML( plato.foto ) + '" alt="' + escapeHTML( plato.title ) + '" loading="lazy"></div>';
        }

        if ( plato.alergenos && plato.alergenos.length > 0 ) {
            html += '<div class="menu-card__alergenos">';
            html += '<span class="menu-card__alergenos-label">' + ( currentLang === 'en' ? 'Allergens:' : 'Alérgenos:' ) + '</span>';
            plato.alergenos.forEach( function ( al ) {
                html += '<span class="menu-card__alergeno">' + escapeHTML( getLangLabel( al, currentLang ) ) + '</span>';
            } );
            html += '</div>';
        }

        html += '</article>';
        return html;
    }

    /* ========================================
       CARGA: EVENTOS (solo vigentes)
       ======================================== */
    function loadEventos() {
        var langSuffix = currentLang === 'en' ? '.en.json' : '.json';
        var indexUrl = CONFIG.contentBase + '/eventos/_index' + langSuffix;

        return fetchJSON( indexUrl )
            .then( function ( eventos ) {
                renderEventos( eventos );
                return eventos;
            } )
            .catch( function () {
                return loadEventosFromFiles();
            } );
    }

    function loadEventosFromFiles() {
        var langSuffix = currentLang === 'en' ? '.en.json' : '.json';
        var knownFiles = [
            'cata-vinos-octubre' + langSuffix,
            'nochevieja-2026' + langSuffix
        ];

        var promises = knownFiles.map( function ( file ) {
            return fetchJSON( CONFIG.contentBase + '/eventos/' + file ).catch( function () { return null; } );
        } );

        return Promise.all( promises ).then( function ( results ) {
            var eventos = results.filter( function ( e ) { return e !== null; } );
            renderEventos( eventos );
            return eventos;
        } );
    }

    function renderEventos( eventos ) {
        var container = document.getElementById( 'eventos-container' );
        if ( ! container ) return;

        var hoy = new Date();
        hoy.setHours( 0, 0, 0, 0 );

        eventos = eventos.filter( function ( e ) {
            if ( ! e.fecha ) return false;
            var fechaEvento = new Date( e.fecha );
            return fechaEvento >= hoy;
        } );

        eventos.sort( function ( a, b ) {
            return new Date( a.fecha ) - new Date( b.fecha );
        } );

        if ( eventos.length === 0 ) {
            container.innerHTML = '<p class="eventos__empty">' + ( currentLang === 'en' ? 'No upcoming events' : 'No hay eventos próximos' ) + '</p>';
            return;
        }

        var html = '';
        eventos.forEach( function ( evento ) {
            html += renderEventoCard( evento );
        } );

        container.innerHTML = html;
        observeReveals( container.querySelectorAll( '.reveal' ) );
    }

    function renderEventoCard( evento ) {
        var html = '<article class="evento-card reveal">';

        if ( evento.imagen ) {
            html += '<div class="evento-card__image"><img src="' + escapeHTML( evento.imagen ) + '" alt="' + escapeHTML( evento.title ) + '" loading="lazy"></div>';
        }

        html += '<div class="evento-card__body">';

        if ( evento.fecha ) {
            html += '<time class="evento-card__fecha" datetime="' + escapeHTML( evento.fecha ) + '">' + formatDate( evento.fecha, currentLang ) + '</time>';
        }

        html += '<h3 class="evento-card__title">' + escapeHTML( evento.title ) + '</h3>';

        if ( evento.descripcion ) {
            html += '<p class="evento-card__desc">' + escapeHTML( evento.descripcion ) + '</p>';
        }

        if ( evento.ubicacion ) {
            html += '<p class="evento-card__ubicacion">' + escapeHTML( evento.ubicacion ) + '</p>';
        }

        if ( evento.enlace_reserva ) {
            html += '<a href="' + escapeHTML( evento.enlace_reserva ) + '" class="btn btn--primary btn--sm evento-card__cta">' + ( currentLang === 'en' ? 'Book now' : 'Reservar plaza' ) + '</a>';
        }

        html += '</div></article>';
        return html;
    }

    /* ========================================
       CARGA: GALERÍA
       ======================================== */
    function loadGaleria() {
        var langSuffix = currentLang === 'en' ? '.en.json' : '.json';
        var indexUrl = CONFIG.contentBase + '/galeria/_index' + langSuffix;

        return fetchJSON( indexUrl )
            .then( function ( fotos ) {
                renderGaleria( fotos );
                return fotos;
            } )
            .catch( function () {
                return loadGaleriaFromFiles();
            } );
    }

    function loadGaleriaFromFiles() {
        var langSuffix = currentLang === 'en' ? '.en.json' : '.json';
        var knownFiles = [
            'interior-local' + langSuffix,
            'barra' + langSuffix,
            'tapas-variadas' + langSuffix
        ];

        var promises = knownFiles.map( function ( file ) {
            return fetchJSON( CONFIG.contentBase + '/galeria/' + file ).catch( function () { return null; } );
        } );

        return Promise.all( promises ).then( function ( results ) {
            var fotos = results.filter( function ( f ) { return f !== null; } );
            renderGaleria( fotos );
            return fotos;
        } );
    }

    function renderGaleria( fotos ) {
        var container = document.getElementById( 'galeria-container' );
        if ( ! container ) return;

        if ( fotos.length === 0 ) {
            container.innerHTML = '';
            return;
        }

        var html = '';
        fotos.forEach( function ( foto, i ) {
            var sizeClass = i === 0 ? ' galeria__item--lg' : ( i === 2 || i === 5 ? ' galeria__item--wide' : '' );
            html += '<div class="galeria__item' + sizeClass + ' reveal">';
            html += '<img src="' + escapeHTML( foto.imagen ) + '" alt="' + escapeHTML( foto.title ) + '" loading="lazy" class="galeria__img">';
            html += '</div>';
        } );

        container.innerHTML = html;
        observeReveals( container.querySelectorAll( '.reveal' ) );
    }

    /* ========================================
       SCROLL REVEAL
       ======================================== */
    function observeReveals( elements ) {
        if ( ! ( 'IntersectionObserver' in window ) ) {
            for ( var i = 0; i < elements.length; i++ ) {
                elements[ i ].classList.add( 'is-visible' );
            }
            return;
        }

        var observer = new IntersectionObserver( function ( entries ) {
            entries.forEach( function ( entry, index ) {
                if ( entry.isIntersecting() ) {
                    (function ( el ) {
                        setTimeout( function () {
                            el.classList.add( 'is-visible' );
                        }, index * 80 );
                    })( entry.target );
                    observer.unobserve( entry.target );
                }
            } );
        }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' } );

        for ( var i = 0; i < elements.length; i++ ) {
            observer.observe( elements[ i ] );
        }
    }

    /* ========================================
       CAMBIO DE IDIOMA
       ======================================== */
    function setLang( lang ) {
        currentLang = lang;
        localStorage.setItem( 'vicool-lang', lang );
        document.documentElement.lang = lang;
        init();
    }

    function toggleLang() {
        var newLang = currentLang === 'es' ? 'en' : 'es';
        setLang( newLang );
    }

    /* ========================================
       INICIALIZACIÓN
       ======================================== */
    function init() {
        loadInicio();
        loadCarta();
        loadEventos();
        loadGaleria();
    }

    document.addEventListener( 'DOMContentLoaded', init );

    /* ========================================
       API PÚBLICA
       ======================================== */
    window.ViCoolCMS = {
        init: init,
        setLang: setLang,
        toggleLang: toggleLang,
        getLang: function () { return currentLang; },
        loadInicio: loadInicio,
        loadCarta: loadCarta,
        loadEventos: loadEventos,
        loadGaleria: loadGaleria
    };
})();
