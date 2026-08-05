CMS.registerPreviewTemplate('carta', function(entry) {
    var data = entry.getData();
    var categoria = data.categoria || 'tapas-raciones';
    var precio = data.precio || 0;
    var descripcion = data.descripcion || '';
    var alergenos = data.alergenos || [];
    var destacado = data.destacado || false;
    var agotado = data.agotado || false;

    var catLabels = {
        'tapas-raciones': 'Tapas Raciones',
        'menu-dia': 'Menú del Día',
        'postres': 'Postres',
        'vinos': 'Vinos',
        'bebidas': 'Bebidas'
    };

    var alergenoLabels = {
        'gluten': 'Gluten',
        'lactosa': 'Lactosa',
        'huevo': 'Huevo',
        'frutos-secos': 'Frutos Secos',
        'marisco': 'Marisco',
        'pescado': 'Pescado',
        'soja': 'Soja'
    };

    var catLabel = catLabels[categoria] || categoria;
    var precioStr = Number(precio).toFixed(2).replace('.', ',') + ' €';

    var alergenoTags = '';
    if (Array.isArray(alergenos) && alergenos.length > 0) {
        alergenoTags = '<div style="padding:0.75rem 1.5rem;display:flex;flex-wrap:wrap;gap:4px;align-items:center;">' +
            '<span style="font-size:0.75rem;font-weight:600;color:#5C5C5C;margin-right:4px;">Alérgenos:</span>' +
            alergenos.map(function(a) {
                var label = alergenoLabels[a] || a;
                return '<span style="font-size:0.6875rem;font-weight:500;padding:2px 8px;background:#FEF2F2;color:#8B1A1A;border-radius:999px;border:1px solid #FECACA;">' + label + '</span>';
            }).join('') +
            '</div>';
    }

    var badge = '';
    if (agotado) {
        badge = '<div style="padding:1rem 1.5rem 0;"><span style="display:inline-block;background:#fee2e2;color:#dc2626;font-size:0.6875rem;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;padding:4px 10px;border-radius:999px;">Agotado</span></div>';
    } else if (destacado) {
        badge = '<div style="padding:1rem 1.5rem 0;"><span style="display:inline-block;background:#fef3c7;color:#92400e;font-size:0.6875rem;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;padding:4px 10px;border-radius:999px;">Destacado</span></div>';
    }

    var paddingTop = badge ? '0.5rem' : '1.5rem';

    return '<div style="font-family:Karla,system-ui,sans-serif;max-width:480px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.12);border:1px solid #e5e5e5;">' +
        badge +
        '<div style="display:flex;justify-content:space-between;align-items:baseline;padding:' + paddingTop + ' 1.5rem 1rem;border-bottom:1px solid #f0f0f0;">' +
            '<h3 style="font-family:Playfair Display,Georgia,serif;font-size:1.25rem;font-weight:500;color:#1f1f1f;margin:0;">' + (data.title || 'Sin nombre') + '</h3>' +
            '<span style="font-size:1rem;font-weight:700;color:#8B1A1A;white-space:nowrap;">' + precioStr + '</span>' +
        '</div>' +
        (descripcion ? '<p style="padding:1rem 1.5rem;font-size:0.9375rem;color:#5C5C5C;line-height:1.6;margin:0;">' + descripcion + '</p>' : '') +
        alergenoTags +
        '<div style="padding:0.75rem 1.5rem;background:#f8f7f4;font-size:0.75rem;font-weight:600;color:#5C5C5C;text-transform:uppercase;letter-spacing:0.06em;">' + catLabel + '</div>' +
    '</div>';
});
