CMS.registerPreviewTemplate('inicio', function(entry) {
    var data = entry.getData();
    var titulo = data.hero_titulo || 'Sin título';
    var subtitulo = data.hero_subtitulo || '';
    var cta = data.hero_cta || 'Reserva tu mesa';
    var filoTitulo = data.filosofia_titulo || '';
    var telefono = data.telefono || '';

    return '<div style="font-family:Karla,system-ui,sans-serif;max-width:520px;margin:0 auto;padding:1.5rem;">' +
        '<div style="background:linear-gradient(135deg,#8B1A1A 0%,#6B1010 100%);border-radius:12px;padding:2rem;margin-bottom:1rem;text-align:center;">' +
            '<div style="font-family:Playfair Display SC,Georgia,serif;font-size:1.5rem;font-weight:700;color:#fff;letter-spacing:0.08em;margin-bottom:0.75rem;">VI COOL</div>' +
            '<h2 style="font-family:Playfair Display,Georgia,serif;font-size:1.125rem;font-weight:400;color:#fff;margin:0 0 0.5rem;">' + titulo + '</h2>' +
            (subtitulo ? '<p style="font-size:0.875rem;color:rgba(255,255,255,0.8);margin:0 0 1rem;">' + subtitulo + '</p>' : '') +
            '<span style="display:inline-block;background:#fff;color:#8B1A1A;font-size:0.8125rem;font-weight:600;padding:0.5rem 1rem;border-radius:8px;">' + cta + '</span>' +
        '</div>' +
        (filoTitulo ? '<div style="background:#f8f7f4;border-radius:12px;padding:1.5rem;margin-bottom:1rem;">' +
            '<span style="font-size:0.6875rem;font-weight:600;text-transform:uppercase;letter-spacing:0.12em;color:#8B1A1A;">Nuestra Filosofía</span>' +
            '<h3 style="font-family:Playfair Display,Georgia,serif;font-size:1rem;font-weight:500;color:#1f1f1f;margin:0.25rem 0 0;">' + filoTitulo + '</h3>' +
        '</div>' : '') +
        '<div style="background:#fff;border:1px solid #e5e5e5;border-radius:12px;padding:1.5rem;">' +
            '<span style="font-size:0.6875rem;font-weight:600;text-transform:uppercase;letter-spacing:0.12em;color:#8B1A1A;">Contacto</span>' +
            (telefono ? '<p style="font-size:0.875rem;color:#5C5C5C;margin:0.5rem 0 0;line-height:1.5;">📞 ' + telefono + '</p>' : '') +
        '</div>' +
    '</div>';
});
