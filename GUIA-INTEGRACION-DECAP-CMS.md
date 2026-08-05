# Guía de Integración: Vi-Cool + Decap CMS en Netlify

## Arquitectura

```
Tu sitio (HTML/CSS/JS estático)
       │
       ├── admin/          ← Panel Decap CMS
       │   ├── index.html  ← Carga CMS + Identity
       │   └── config.yml  ← Configuración de colecciones
       │
       ├── content/        ← Contenido editable (JSON)
       │   ├── inicio.json ← Hero, Filosofía, Contacto
       │   ├── carta/      ← Platos (un JSON por plato)
       │   ├── eventos/    ← Eventos futuros
       │   └── galeria/    ← Fotos del local
       │
       ├── img/uploads/    ← Imágenes subidas por CMS
       └── js/
           └── cms-loader.js ← Carga dinámica del contenido
```

---

## PASO 1: Crear el Repositorio en GitHub

1. Ve a [github.com](https://github.com) e inicia sesión
2. Clic en **New repository**
3. Nombre: `vi-cool-tap_bar`
4. Visibilidad: **Privado** (recomendado para controlar acceso)
5. **NO** marques "Add a README" (ya tienes archivos locales)
6. Clic en **Create repository**

### Subir los archivos desde tu PC

```bash
cd "C:\Users\Usuario\Documents\vi cool web"
git init
git add .
git commit -m "Commit inicial: sitio Vi-Cool + Decap CMS"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/vi-cool-tapasbar.git
git push -u origin main
```

---

## PASO 2: Crear sitio en Netlify

1. Ve a [app.netlify.com](https://app.netlify.com) e inicia sesión
2. Clic en **Add new site > Import an existing project**
3. Selecciona **GitHub** y autoriza Netlify
4. Selecciona el repositorio `vi-cool-tapasbar`
5. Configuración de build:
   - **Build command:** (dejar vacío, es estático)
   - **Publish directory:** `/` (raíz del repo)
6. Clic en **Deploy site**

---

## PASO 3: Activar Netlify Identity

1. En el dashboard de Netlify, ve a **Site settings > Identity**
2. Clic en **Enable Identity**
3. En **Registration** selecciona **Invite only** (solo admin por invitación)
4. **NO** habilites "Open registration" (seguridad)

### Crear el usuario administrador

1. En **Identity > Invite users**
2. Introduce el email del cliente (ej: admin@vicooltapasbar.es)
3. Clic en **Send** — recibirá un email para crear su contraseña

---

## PASO 4: Activar Git Gateway

Git Gateway permite que Decap CMS guarde contenido directamente en tu repositorio GitHub sin necesidad de CI/CD.

1. Ve a **Site settings > Identity > Services**
2. En **Git Gateway** clic en **Enable Git Gateway**
3. Esto conecta Decap CMS con GitHub automáticamente

---

## PASO 5: Configurar Dominio (opcional)

1. Ve a **Site settings > Domain management**
2. Clic en **Add custom domain**
3. Introduce `www.vicooltapasbar.es`
4. Configura los DNS según las instrucciones de Netlify:
   - Tipo: **CNAME**
   - Nombre: `www`
   - Valor: `vi-cool-tapasbar.netlify.app`
5. Activa **HTTPS** (gratuito con Let's Encrypt)

---

## PASO 6: Usar el Panel de Administración

### Acceder al panel

1. Ve a `https://vi-cool-tapasbar.netlify.app/admin/`
2. Si no has iniciado sesión, aparecerá el widget de Netlify Identity
3. Clic en **Log in** e introduce email + contraseña
4. Una vez dentro verás el panel de Decap CMS

### Editar la página de inicio

1. En el menú lateral: **Página de Inicio**
2. Edita los campos:
   - Imagen de portada
   - Título y subtítulo del Hero
   - Texto de Filosofía
   - Datos de contacto
3. Clic en **Publicar** → los cambios se guardan en GitHub automáticamente

### Añadir un plato a la carta

1. En el menú lateral: **Carta del Restaurante**
2. Clic en **Añadir plato** (botón superior)
3. Completa los campos:
   - **Título:** "Tortilla Española"
   - **Precio:** 7.00
   - **Descripción:** "Tortilla de patata con cebolla caramelizada..."
   - **Categoría:** "Tapas Raciones"
   - **Alérgenos:** selecciona los que apliquen
   - **Foto:** sube imagen desde tu PC
   - **Destacado:** activar si quieres resaltarlo
4. Clic en **Publicar**

### Añadir un evento

1. En el menú lateral: **Eventos**
2. Clic en **Añadir evento**
3. Completa: título, fecha, ubicación, descripción, imagen, enlace
4. Clic en **Publicar**
5. Los eventos con fecha pasada **no se muestran** automáticamente

### Gestionar la galería

1. En el menú lateral: **Galería de Fotos**
2. Clic en **Añadir foto**
3. Sube imagen + título + categoría
4. Las fotos se muestran en orden de subida en el grid

---

## PASO 7: Ver los cambios en producción

1. Cada vez que el admin hace clic en **Publicar**, Decap CMS:
   - Crea un commit en GitHub con los cambios
   - Netlify detecta el push y reconstruye el sitio
2. Los cambios son visibles en 30-60 segundos
3. El cliente ve la web actualizada automáticamente

---

## Desarrollo Local con Decap CMS

Para probar el CMS localmente:

```bash
npx decap-server
```

Esto abre el CMS en `localhost:8080/admin/` con acceso a los archivos locales de `content/`.

---

## Estructura de los archivos JSON

### content/inicio.json
```json
{
  "hero_imagen": "/img/uploads/hero.jpg",
  "hero_titulo": "Tapas-Raciones de Temporada",
  "hero_subtitulo": "Una experiencia culinaria inolvidable...",
  "hero_cta": "Reserva tu mesa",
  "filosofia_titulo": "Respetando el producto de temporada",
  "filosofia_texto": "Texto completo de la filosofía...",
  "direccion": "VI COOL TAPAS BAR, C/ Huertas, 12, 28012 Madrid",
  "telefono": "914 294 913",
  "telefono_link": "+34914294913",
  "horario": "Lun - Dom: 13:00 - 16:00 / 20:00 - 23:30",
  "email": "info@vicooltapasbar.es"
}
```

### content/carta/nombre-plato.json
```json
{
  "title": "Croquetas de Jamón",
  "precio": 8.00,
  "descripcion": "Croquetas caseras de jamón ibérico...",
  "categoria": "tapas-raciones",
  "alergenos": ["gluten", "lactosa", "huevo"],
  "foto": "/img/uploads/croquetas.jpg",
  "destacado": true,
  "agotado": false
}
```

### content/eventos/nombre-evento.json
```json
{
  "title": "Cata de Vinos",
  "fecha": "2026-10-15T20:00:00",
  "ubicacion": "Vi-Cool Tapas Bar",
  "descripcion": "Cata guiada por nuestro sumeller...",
  "imagen": "/img/uploads/cata.jpg",
  "enlace_reserva": "https://..."
}
```

---

## Resumen de Permisos

| Rol | Acceso |
|-----|--------|
| Admin (tu cliente) | `/admin/` → Panel Decap CMS completo |
| Usuarios invitados | Solo pueden ver la web pública |
| Netlify Identity | Autenticación + Git Gateway |

---

## Troubleshooting

**El CMS no carga:**
- Verifica que `admin/index.html` tiene el script correcto de Decap CMS
- Revisa la consola del navegador (F12) para errores

**Los cambios no se guardan:**
- Verifica que Git Gateway está activado en Netlify
- Confirma que Netlify Identity tiene permisos de GitHub

**Las imágenes no aparecen:**
- Asegúrate de que `img/uploads/` existe en el repo
- Las imágenes se suben a `/img/uploads/` vía el CMS

**Los platos no se agrupan:**
- Crea la taxonomía `categoria_plato` en Decap CMS
- Asígnale una categoría a cada plato al crearlo
