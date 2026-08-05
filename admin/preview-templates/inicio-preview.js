/**
 * Preview Template para Página de Inicio
 * Muestra un resumen del contenido editable
 */
var InicioPreview = createClass({
    render: function() {
        var entry = this.props.entry;
        var data = entry.getIn(['data']);
        var heroTitle = data.get('hero_titulo') || 'Sin título';
        var heroSubtitle = data.get('hero_subtitulo') || '';
        var filosofiaTitle = data.get('filosofia_titulo') || '';
        var telefono = data.get('telefono') || '';

        return h('div', {
            style: {
                fontFamily: "'Karla', system-ui, sans-serif",
                maxWidth: '520px',
                margin: '0 auto',
                padding: '1.5rem'
            }
        }, [
            // Hero Preview
            h('div', {
                style: {
                    background: 'linear-gradient(135deg, #8B1A1A 0%, #6B1010 100%)',
                    borderRadius: '12px',
                    padding: '2rem',
                    marginBottom: '1rem',
                    textAlign: 'center'
                }
            }, [
                h('div', {
                    style: {
                        fontFamily: "'Playfair Display SC', Georgia, serif",
                        fontSize: '1.5rem',
                        fontWeight: '700',
                        color: '#fff',
                        letterSpacing: '0.08em',
                        marginBottom: '0.75rem'
                    }
                }, 'VI COOL'),
                h('h2', {
                    style: {
                        fontFamily: "'Playfair Display', Georgia, serif",
                        fontSize: '1.125rem',
                        fontWeight: '400',
                        color: '#fff',
                        margin: '0 0 0.5rem'
                    }
                }, heroTitle),
                heroSubtitle ? h('p', {
                    style: {
                        fontSize: '0.875rem',
                        color: 'rgba(255,255,255,0.8)',
                        margin: '0 0 1rem'
                    }
                }, heroSubtitle) : null,
                h('span', {
                    style: {
                        display: 'inline-block',
                        background: '#fff',
                        color: '#8B1A1A',
                        fontSize: '0.8125rem',
                        fontWeight: '600',
                        padding: '0.5rem 1rem',
                        borderRadius: '8px'
                    }
                }, data.get('hero_cta') || 'Reserva tu mesa')
            ]),

            // Filosofía Preview
            filosofiaTitle ? h('div', {
                style: {
                    background: '#f8f7f4',
                    borderRadius: '12px',
                    padding: '1.5rem',
                    marginBottom: '1rem'
                }
            }, [
                h('span', {
                    style: {
                        fontSize: '0.6875rem',
                        fontWeight: '600',
                        textTransform: 'uppercase',
                        letterSpacing: '0.12em',
                        color: '#8B1A1A'
                    }
                }, 'Nuestra Filosofía'),
                h('h3', {
                    style: {
                        fontFamily: "'Playfair Display', Georgia, serif",
                        fontSize: '1rem',
                        fontWeight: '500',
                        color: '#1f1f1f',
                        margin: '0.25rem 0 0'
                    }
                }, filosofiaTitle)
            ]) : null,

            // Contacto Preview
            h('div', {
                style: {
                    background: '#fff',
                    border: '1px solid #e5e5e5',
                    borderRadius: '12px',
                    padding: '1.5rem'
                }
            }, [
                h('span', {
                    style: {
                        fontSize: '0.6875rem',
                        fontWeight: '600',
                        textTransform: 'uppercase',
                        letterSpacing: '0.12em',
                        color: '#8B1A1A'
                    }
                }, 'Contacto'),
                h('p', {
                    style: {
                        fontSize: '0.875rem',
                        color: '#5C5C5C',
                        margin: '0.5rem 0 0',
                        lineHeight: '1.5'
                    }
                }, [
                    telefono ? h('span', {}, '📞 ' + telefono) : null
                ])
            ])
        ]);
    }
});

CMS.registerPreviewTemplate('inicio', InicioPreview);
