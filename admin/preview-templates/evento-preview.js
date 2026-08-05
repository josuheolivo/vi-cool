CMS.registerPreviewTemplate('eventos', function(entry) {
    var data = entry.getData();
    var fecha = data.fecha || '';
    var descripcion = data.descripcion || '';
    var ubicacion = data.ubicacion || '';

    var fechaStr = '';
    if (fecha) {
        var d = new Date(fecha);
        if (!isNaN(d.getTime())) {
            fechaStr = d.toLocaleDateString('es-ES', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
            fechaStr = fechaStr.charAt(0).toUpperCase() + fechaStr.slice(1);
        }
    }

    var descCorta = descripcion.length > 150 ? descripcion.substring(0, 150) + '...' : descripcion;

    return '<div style="font-family:Karla,system-ui,sans-serif;max-width:480px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.12);border:1px solid #e5e5e5;">' +
        (fechaStr ? '<div style="padding:1rem 1.5rem;background:#FDF2F2;font-size:0.8125rem;font-weight:600;color:#8B1A1A;text-transform:uppercase;letter-spacing:0.06em;">📅 ' + fechaStr + '</div>' : '') +
        '<div style="padding:1.5rem;">' +
            '<h3 style="font-family:Playfair Display,Georgia,serif;font-size:1.25rem;font-weight:500;color:#1f1f1f;margin:0 0 0.5rem;">' + (data.title || 'Sin título') + '</h3>' +
            (descCorta ? '<p style="font-size:0.9375rem;color:#5C5C5C;line-height:1.6;margin:0 0 0.75rem;">' + descCorta + '</p>' : '') +
            (ubicacion ? '<p style="display:flex;align-items:center;gap:4px;font-size:0.875rem;color:#5C5C5C;margin:0;">📍 ' + ubicacion + '</p>' : '') +
        '</div>' +
    '</div>';
});
