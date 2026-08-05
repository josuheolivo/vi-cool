/**
 * Preview Template para Eventos
 * Muestra cómo se verá el evento en la web pública
 */
var EventoPreview = createClass({
    render: function() {
        var entry = this.props.entry;
        var data = entry.getIn(['data']);
        var date = data.get('fecha') || '';
        var description = data.get('descripcion') || '';
        var location = data.get('ubicacion') || '';

        // Formatear fecha
        var dateFormatted = '';
        if (date) {
            var d = new Date(date);
            if (!isNaN(d.getTime())) {
                dateFormatted = d.toLocaleDateString('es-ES', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                });
                // Capitalizar primera letra
                dateFormatted = dateFormatted.charAt(0).toUpperCase() + dateFormatted.slice(1);
            }
        }

        return h('div', {
            style: {
                fontFamily: "'Karla', system-ui, sans-serif",
                maxWidth: '480px',
                margin: '0 auto',
                background: '#fff',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
                border: '1px solid #e5e5e5'
            }
        }, [
            // Fecha
            dateFormatted ? h('div', {
                style: {
                    padding: '1rem 1.5rem',
                    background: '#FDF2F2',
                    fontSize: '0.8125rem',
                    fontWeight: '600',
                    color: '#8B1A1A',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em'
                }
            }, '📅 ' + dateFormatted) : null,

            // Contenido
            h('div', { style: { padding: '1.5rem' } }, [
                // Título
                h('h3', {
                    style: {
                        fontFamily: "'Playfair Display', Georgia, serif",
                        fontSize: '1.25rem',
                        fontWeight: '500',
                        color: '#1f1f1f',
                        margin: '0 0 0.5rem'
                    }
                }, data.get('title') || 'Nombre del evento'),

                // Descripción
                description ? h('p', {
                    style: {
                        fontSize: '0.9375rem',
                        color: '#5C5C5C',
                        lineHeight: '1.6',
                        margin: '0 0 0.75rem'
                    }
                }, description.substring(0, 150) + (description.length > 150 ? '...' : '')) : null,

                // Ubicación
                location ? h('p', {
                    style: {
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                        fontSize: '0.875rem',
                        color: '#5C5C5C',
                        margin: 0
                    }
                }, [
                    h('span', {}, '📍'),
                    location
                ]) : null
            ])
        ]);
    }
});

CMS.registerPreviewTemplate('eventos', EventoPreview);
