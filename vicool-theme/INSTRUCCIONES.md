# Vi-Cool Tapas Bar - Tema WordPress

## Instalación

1. Comprime la carpeta `vicool-theme` en un archivo ZIP
2. En WordPress: **Apariencia > Temas > Añadir nuevo > Subir tema**
3. Activa el tema

## Plugins Requeridos

Instala y activa **Advanced Custom Fields PRO** (o la versión gratuita).

La versión gratuita funciona pero no soporta el Repeater Field. Con PRO tienes todos los campos.

## Configuración Inicial

### 1. Páginas
- Crea una página "Inicio" y asígnale la plantilla "Front Page"
- Crea una página "Carta" y asígnale la plantilla "Carta"
- Crea una página "Reservas" y asígnale la plantilla "Reservas"
- En **Ajustes > Lectura**: establece "Inicio" como página frontal

### 2. Menú de Navegación
- Ve a **Apariencia > Menús**
- Crea un menú con: Carta, Galería (#galeria), Eventos (#eventos), Contacto (#contacto)
- Asígnalo a la ubicación "Menú Principal"

### 3. Ajustes del Tema (ACF Options Page)
En el panel lateral aparecerá **"Ajustes Vi-Cool"** donde puedes editar:
- **Hero Section**: imagen de fondo, título, subtítulo, texto del botón
- **Filosofía**: título y texto completo
- **Contacto**: dirección, teléfono, horario, email

### 4. Gestión de Carta (CPT: Platos)
En el panel: **Carta Vi-Cool**
- **Categorías de Plato**: crea las categorías (Tapas Raciones, Menú del Día, Vinos, Postres...)
- **Añadir nuevo plato**: completa nombre, precio, descripción corta, alérgenos, destacado, agotado

### 5. Gestión de Eventos (CPT: Eventos)
En el panel: **Eventos Vi-Cool**
- Crea eventos con fecha, hora, imagen, enlace de reserva
- Solo se muestran eventos con fecha >= hoy (los caducados se ocultan automáticamente)

### 6. Gestión de Galería (CPT: Galería)
En el panel: **Galería Vi-Cool**
- Añade fotos (solo imagen + título)
- Ordena arrastrando (usa el orden de página)
- Las fotos se muestran en un grid masonry automático

### 7. Logo
Ve a **Apariencia > Personalizar > Identidad del sitio** para subir el logo personalizado

## Estructura de Archivos

```
vicool-theme/
├── style.css              (Cabecera del tema)
├── functions.php          (CPTs, campos ACF, helpers)
├── header.php             (Header sticky con nav)
├── footer.php             (Footer + barra móvil)
├── front-page.php         (Página de inicio)
├── index.php              (Fallback)
├── page-carta.php         (Página carta completa)
├── page-reservas.php      (Página reservas)
├── assets/
│   ├── css/styles.css     (Todos los estilos)
│   └── js/scripts.js      (Interactividad)
└── template-parts/
    ├── section-menu.php   (Carta dinámica)
    ├── section-eventos.php (Eventos dinámicos)
    ├── section-galeria.php (Galería dinámica)
    ├── section-reservas.php (Formulario reservas)
    └── section-contacto.php (Info contacto + mapa)
```

## Características Técnicas

- **Mobile-first** con menú hamburguesa
- **Animaciones**: scroll reveal, hover transitions, hero zoom
- **Accesibilidad**: focus states, skip link, reduced motion
- **Responsive**: 375px, 768px, 1024px, 1440px
- **Sin jQuery**: JavaScript vanilla para máximo rendimiento
- **SEO-friendly**: HTML semántico, etiquetas meta
- **Seguridad**: nonces en formularios, escape de outputs
