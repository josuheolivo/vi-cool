CMS.registerPreviewTemplate('galeria', function(entry) {
    var data = entry.getData();

    return '<div style="font-family:Karla,system-ui,sans-serif;max-width:480px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.12);border:1px solid #e5e5e5;">' +
        '<div style="padding:1rem 1.5rem;background:#f8f7f4;font-size:0.8125rem;font-weight:600;color:#8B1A1A;text-transform:uppercase;letter-spacing:0.06em;">Galeria</div>' +
        '<div style="padding:1.5rem;">' +
            '<h3 style="font-family:Playfair Display,Georgia,serif;font-size:1.125rem;font-weight:500;color:#1f1f1f;margin:0 0 0.5rem;">' + (data.title || 'Sin titulo') + '</h3>' +
            '<div style="background:#f0f0f0;border-radius:8px;padding:2rem;text-align:center;color:#888;font-size:0.875rem;">📷 Imagen: ' + (data.imagen || 'No definida') + '</div>' +
        '</div>' +
    '</div>';
});

CMS.registerPreviewTemplate('galeria_carta', function(entry) {
    var data = entry.getData();

    return '<div style="font-family:Karla,system-ui,sans-serif;max-width:480px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.12);border:1px solid #e5e5e5;">' +
        '<div style="padding:1rem 1.5rem;background:#FDF2F2;font-size:0.8125rem;font-weight:600;color:#8B1A1A;text-transform:uppercase;letter-spacing:0.06em;">Foto Carta</div>' +
        '<div style="padding:1.5rem;">' +
            '<h3 style="font-family:Playfair Display,Georgia,serif;font-size:1.125rem;font-weight:500;color:#1f1f1f;margin:0 0 0.5rem;">' + (data.title || 'Sin titulo') + '</h3>' +
            '<div style="background:#f0f0f0;border-radius:8px;padding:2rem;text-align:center;color:#888;font-size:0.875rem;">📷 ' + (data.imagen || 'No definida') + '</div>' +
        '</div>' +
    '</div>';
});

CMS.registerPreviewTemplate('galeria_eventos', function(entry) {
    var data = entry.getData();

    return '<div style="font-family:Karla,system-ui,sans-serif;max-width:480px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.12);border:1px solid #e5e5e5;">' +
        '<div style="padding:1rem 1.5rem;background:#FEF3C7;font-size:0.8125rem;font-weight:600;color:#92400E;text-transform:uppercase;letter-spacing:0.06em;">Foto Evento</div>' +
        '<div style="padding:1.5rem;">' +
            '<h3 style="font-family:Playfair Display,Georgia,serif;font-size:1.125rem;font-weight:500;color:#1f1f1f;margin:0 0 0.5rem;">' + (data.title || 'Sin titulo') + '</h3>' +
            '<div style="background:#f0f0f0;border-radius:8px;padding:2rem;text-align:center;color:#888;font-size:0.875rem;">📷 ' + (data.imagen || 'No definida') + '</div>' +
        '</div>' +
    '</div>';
});

CMS.registerPreviewTemplate('hero_imagenes', function(entry) {
    var data = entry.getData();

    return '<div style="font-family:Karla,system-ui,sans-serif;max-width:480px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.12);border:1px solid #e5e5e5;">' +
        '<div style="padding:1rem 1.5rem;background:linear-gradient(135deg,#8B1A1A,#6B1010);font-size:0.8125rem;font-weight:600;color:#fff;text-transform:uppercase;letter-spacing:0.06em;">Imagen Hero (Portada)</div>' +
        '<div style="padding:1.5rem;">' +
            '<h3 style="font-family:Playfair Display,Georgia,serif;font-size:1.125rem;font-weight:500;color:#1f1f1f;margin:0 0 0.5rem;">' + (data.title || 'Sin titulo') + '</h3>' +
            '<div style="background:#f0f0f0;border-radius:8px;padding:2rem;text-align:center;color:#888;font-size:0.875rem;">🖼️ ' + (data.imagen || 'No definida') + '</div>' +
            '<p style="margin:0.75rem 0 0;font-size:0.75rem;color:#888;">Orden: ' + (data.orden || 0) + '</p>' +
        '</div>' +
    '</div>';
});
