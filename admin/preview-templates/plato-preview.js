/**
 * Preview Template para Platos de la Carta
 * Muestra cómo se verá el plato en la web pública
 */
var PlatoPreview = createClass({
    render: function() {
        var entry = this.props.entry;
        var data = entry.getIn(['data']);
        var category = data.get('categoria') || 'tapas-raciones';
        var price = data.get('precio') || 0;
        var description = data.get('descripcion') || '';
        var allergens = data.get('alergenos') || [];
        var featured = data.get('destacado') || false;
        var soldOut = data.get('agotado') || false;

        // Labels de categorías
        var catLabels = {
            'tapas-raciones': '🥘 Tapas Raciones',
            'menu-dia': '📋 Menú del Día',
            'postres': '🍰 Postres',
            'vinos': '🍷 Vinos',
            'bebidas': '🥤 Bebidas'
        };

        // Labels de alérgenos
        var allergenLabels = {
            'gluten': 'Gluten',
            'lactosa': 'Lactosa',
            'huevo': 'Huevo',
            'frutos-secos': 'Frutos Secos',
            'marisco': 'Marisco',
            'pescado': 'Pescado',
            'soja': 'Soja'
        };

        var categoryLabel = catLabels[category] || category;
        var priceFormatted = Number(price).toFixed(2).replace('.', ',') + ' €';
        var allergenText = Array.isArray(allergens)
            ? allergens.map(function(a) { return allergenLabels[a] || a; }).join(', ')
            : '';
        var statusBadge = '';
        if (soldOut) {
            statusBadge = h('span', {
                style: {
                    display: 'inline-block',
                    background: '#fee2e2',
                    color: '#dc2626',
                    fontSize: '0.6875rem',
                    fontWeight: '700',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    padding: '0.25rem 0.625rem',
                    borderRadius: '999px',
                    marginBottom: '0.5rem'
                }
            }, '🚫 Agotado');
        } else if (featured) {
            statusBadge = h('span', {
                style: {
                    display: 'inline-block',
                    background: '#fef3c7',
                    color: '#92400e',
                    fontSize: '0.6875rem',
                    fontWeight: '700',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    padding: '0.25rem 0.625rem',
                    borderRadius: '999px',
                    marginBottom: '0.5rem'
                }
            }, '⭐ Destacado');
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
            // Badge de estado
            statusBadge ? h('div', { style: { padding: '1rem 1.5rem 0' } }, statusBadge) : null,

            // Header
            h('div', {
                style: {
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    padding: statusBadge ? '0.5rem 1.5rem 1rem' : '1.5rem',
                    borderBottom: '1px solid #f0f0f0'
                }
            }, [
                h('h3', {
                    style: {
                        fontFamily: "'Playfair Display', Georgia, serif",
                        fontSize: '1.25rem',
                        fontWeight: '500',
                        color: '#1f1f1f',
                        margin: 0
                    }
                }, data.get('title') || 'Nombre del plato'),
                h('span', {
                    style: {
                        fontSize: '1rem',
                        fontWeight: '700',
                        color: '#8B1A1A',
                        whiteSpace: 'nowrap'
                    }
                }, priceFormatted)
            ]),

            // Descripción
            description ? h('p', {
                style: {
                    padding: '1rem 1.5rem',
                    fontSize: '0.9375rem',
                    color: '#5C5C5C',
                    lineHeight: '1.6',
                    margin: 0
                }
            }, description) : null,

            // Alérgenos
            allergenText ? h('div', {
                style: {
                    padding: '0 1.5rem 1rem',
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.25rem',
                    alignItems: 'center'
                }
            }, [
                h('span', {
                    style: {
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        color: '#5C5C5C',
                        marginRight: '0.25rem'
                    }
                }, 'Alérgenos:'),
                allergenText.split(', ').map(function(al) {
                    return h('span', {
                        style: {
                            fontSize: '0.6875rem',
                            fontWeight: '500',
                            padding: '0.125rem 0.5rem',
                            background: '#FEF2F2',
                            color: '#8B1A1A',
                            borderRadius: '999px',
                            border: '1px solid #FECACA'
                        }
                    }, al);
                })
            ]) : null,

            // Categoría
            h('div', {
                style: {
                    padding: '0.75rem 1.5rem',
                    background: '#f8f7f4',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    color: '#5C5C5C',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em'
                }
            }, categoryLabel)
        ]);
    }
});

// Registrar el preview template
CMS.registerPreviewTemplate('carta', PlatoPreview);
