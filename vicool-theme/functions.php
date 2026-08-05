<?php
/**
 * Vi-Cool Tapas Bar Theme Functions
 *
 * @package ViCool
 * @since 1.0.0
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

define( 'VICOOL_VERSION', '1.0.0' );
define( 'VICOOL_DIR', get_template_directory() );
define( 'VICOOL_URI', get_template_directory_uri() );

/* ========================================
   THEME SETUP
   ======================================== */
function vicool_setup() {
    add_theme_support( 'title-tag' );
    add_theme_support( 'post-thumbnails' );
    add_theme_support( 'custom-logo', array(
        'height'      => 80,
        'width'       => 180,
        'flex-height' => true,
        'flex-width'  => true,
    ));

    register_nav_menus( array(
        'primary' => __( 'Menú Principal', 'vicool' ),
        'footer'  => __( 'Menú Footer', 'vicool' ),
    ));

    add_image_size( 'vicool-hero', 1920, 1080, true );
    add_image_size( 'vicool-menu', 600, 400, true );
    add_image_size( 'vicool-event', 800, 500, true );
    add_image_size( 'vicool-gallery', 600, 600, true );
}
add_action( 'after_setup_theme', 'vicool_setup' );

/* ========================================
   ENQUEUE ASSETS
   ======================================== */
function vicool_enqueue_assets() {
    wp_enqueue_style( 'vicool-google-fonts', 'https://fonts.googleapis.com/css2?family=Karla:wght@300;400;500;600;700&family=Playfair+Display+SC:wght@400;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400&display=swap', array(), null );
    wp_enqueue_style( 'vicool-styles', VICOOL_URI . '/assets/css/styles.css', array( 'vicool-google-fonts' ), VICOOL_VERSION );
    wp_enqueue_script( 'vicool-scripts', VICOOL_URI . '/assets/js/scripts.js', array(), VICOOL_VERSION, true );

    wp_localize_script( 'vicool-scripts', 'vicoolAjax', array(
        'ajaxurl' => admin_url( 'admin-ajax.php' ),
        'nonce'   => wp_create_nonce( 'vicool_nonce' ),
    ));
}
add_action( 'wp_enqueue_scripts', 'vicool_enqueue_assets' );

/* ========================================
   CUSTOM POST TYPE: PLATOS
   ======================================== */
function vicool_register_cpt_platos() {
    $labels = array(
        'name'                  => __( 'Platos', 'vicool' ),
        'singular_name'         => __( 'Plato', 'vicool' ),
        'menu_name'             => __( 'Carta Vi-Cool', 'vicool' ),
        'add_new'               => __( 'Añadir nuevo plato', 'vicool' ),
        'add_new_item'          => __( 'Añadir nuevo plato', 'vicool' ),
        'edit_item'             => __( 'Editar plato', 'vicool' ),
        'new_item'              => __( 'Nuevo plato', 'vicool' ),
        'view_item'             => __( 'Ver plato', 'vicool' ),
        'search_items'          => __( 'Buscar platos', 'vicool' ),
        'not_found'             => __( 'No se encontraron platos', 'vicool' ),
        'not_found_in_trash'    => __( 'No hay platos en la papelera', 'vicool' ),
    );

    register_post_type( 'platos_vicool', array(
        'labels'             => $labels,
        'public'             => true,
        'publicly_queryable' => true,
        'show_ui'            => true,
        'show_in_menu'       => true,
        'menu_icon'          => 'dashicons-food',
        'capability_type'    => 'post',
        'has_archive'        => false,
        'hierarchical'       => false,
        'supports'           => array( 'title', 'editor', 'thumbnail', 'custom-fields', 'page-attributes' ),
        'show_in_rest'       => true,
        'rewrite'            => array( 'slug' => 'plato' ),
    ));

    register_taxonomy( 'categoria_plato', 'platos_vicool', array(
        'labels' => array(
            'name'          => __( 'Categorías de Plato', 'vicool' ),
            'singular_name' => __( 'Categoría', 'vicool' ),
            'add_new_item'  => __( 'Añadir categoría', 'vicool' ),
        ),
        'hierarchical'      => true,
        'show_ui'           => true,
        'show_admin_column' => true,
        'show_in_rest'      => true,
        'rewrite'           => array( 'slug' => 'categoria-plato' ),
    ));
}
add_action( 'init', 'vicool_register_cpt_platos' );

/* ========================================
   CUSTOM POST TYPE: EVENTOS
   ======================================== */
function vicool_register_cpt_eventos() {
    $labels = array(
        'name'                  => __( 'Eventos', 'vicool' ),
        'singular_name'         => __( 'Evento', 'vicool' ),
        'menu_name'             => __( 'Eventos Vi-Cool', 'vicool' ),
        'add_new'               => __( 'Añadir nuevo evento', 'vicool' ),
        'add_new_item'          => __( 'Añadir nuevo evento', 'vicool' ),
        'edit_item'             => __( 'Editar evento', 'vicool' ),
        'new_item'              => __( 'Nuevo evento', 'vicool' ),
        'view_item'             => __( 'Ver evento', 'vicool' ),
        'search_items'          => __( 'Buscar eventos', 'vicool' ),
        'not_found'             => __( 'No se encontraron eventos', 'vicool' ),
        'not_found_in_trash'    => __( 'No hay eventos en la papelera', 'vicool' ),
    );

    register_post_type( 'eventos_vicool', array(
        'labels'             => $labels,
        'public'             => true,
        'publicly_queryable' => true,
        'show_ui'            => true,
        'show_in_menu'       => true,
        'menu_icon'          => 'dashicons-calendar-alt',
        'capability_type'    => 'post',
        'has_archive'        => false,
        'hierarchical'       => false,
        'supports'           => array( 'title', 'editor', 'thumbnail', 'custom-fields' ),
        'show_in_rest'       => true,
        'rewrite'            => array( 'slug' => 'evento' ),
    ));
}
add_action( 'init', 'vicool_register_cpt_eventos' );

/* ========================================
   CUSTOM POST TYPE: GALERÍA
   ======================================== */
function vicool_register_cpt_galeria() {
    $labels = array(
        'name'                  => __( 'Galería', 'vicool' ),
        'singular_name'         => __( 'Foto de Galería', 'vicool' ),
        'menu_name'             => __( 'Galería Vi-Cool', 'vicool' ),
        'add_new'               => __( 'Añadir foto', 'vicool' ),
        'add_new_item'          => __( 'Añadir nueva foto', 'vicool' ),
        'edit_item'             => __( 'Editar foto', 'vicool' ),
        'new_item'              => __( 'Nueva foto', 'vicool' ),
        'view_item'             => __( 'Ver foto', 'vicool' ),
        'search_items'          => __( 'Buscar fotos', 'vicool' ),
        'not_found'             => __( 'No se encontraron fotos', 'vicool' ),
    );

    register_post_type( 'galeria_vicool', array(
        'labels'             => $labels,
        'public'             => true,
        'publicly_queryable' => true,
        'show_ui'            => true,
        'show_in_menu'       => true,
        'menu_icon'          => 'dashicons-format-gallery',
        'capability_type'    => 'post',
        'has_archive'        => false,
        'hierarchical'       => false,
        'supports'           => array( 'title', 'thumbnail', 'page-attributes' ),
        'show_in_rest'       => true,
        'rewrite'            => array( 'slug' => 'galeria' ),
    ));
}
add_action( 'init', 'vicool_register_cpt_galeria' );

/* ========================================
   CAMPOS PERSONALIZADOS CON ACF
   ======================================== */
function vicool_register_acf_fields() {
    if ( ! function_exists( 'acf_add_local_field_group' ) ) {
        return;
    }

    acf_add_local_field_group( array(
        'key'      => 'group_plato_detalles',
        'title'    => __( 'Detalles del Plato', 'vicool' ),
        'fields'   => array(
            array(
                'key'           => 'field_plato_precio',
                'label'         => __( 'Precio', 'vicool' ),
                'name'          => 'precio',
                'type'          => 'number',
                'required'      => 1,
                'step'          => 0.01,
                'min'           => 0,
                'prepend'       => '€',
            ),
            array(
                'key'           => 'field_plato_descripcion_corta',
                'label'         => __( 'Descripción Corta', 'vicool' ),
                'name'          => 'descripcion_corta',
                'type'          => 'textarea',
                'rows'          => 3,
            ),
            array(
                'key'           => 'field_plato_alergenos',
                'label'         => __( 'Alérgenos', 'vicool' ),
                'name'          => 'alergenos',
                'type'          => 'checkbox',
                'choices'       => array(
                    'gluten'   => 'Gluten',
                    'lactosa'  => 'Lactosa',
                    'huevo'    => 'Huevo',
                    'frutos'   => 'Frutos Secos',
                    'marisco'  => 'Marisco',
                    'pescado'  => 'Pescado',
                    'soja'     => 'Soja',
                ),
                'layout'        => 'horizontal',
            ),
            array(
                'key'           => 'field_plato_destacado',
                'label'         => __( 'Plato Destacado', 'vicool' ),
                'name'          => 'destacado',
                'type'          => 'true_false',
                'ui'            => 1,
                'default_value' => 0,
            ),
            array(
                'key'           => 'field_plato_agotado',
                'label'         => __( 'Agotado (ocultar)', 'vicool' ),
                'name'          => 'agotado',
                'type'          => 'true_false',
                'ui'            => 1,
                'default_value' => 0,
            ),
        ),
        'location' => array(
            array(
                array(
                    'param'    => 'post_type',
                    'operator' => '==',
                    'value'    => 'platos_vicool',
                ),
            ),
        ),
    ));

    acf_add_local_field_group( array(
        'key'      => 'group_evento_detalles',
        'title'    => __( 'Detalles del Evento', 'vicool' ),
        'fields'   => array(
            array(
                'key'           => 'field_evento_fecha',
                'label'         => __( 'Fecha del Evento', 'vicool' ),
                'name'          => 'fecha_evento',
                'type'          => 'date_picker',
                'required'      => 1,
                'display_format'=> 'd/m/Y',
                'return_format' => 'Y-m-d',
            ),
            array(
                'key'           => 'field_evento_hora',
                'label'         => __( 'Hora', 'vicool' ),
                'name'          => 'hora_evento',
                'type'          => 'time_picker',
                'display_format'=> 'H:i',
                'return_format' => 'H:i',
            ),
            array(
                'key'           => 'field_evento_ubicacion',
                'label'         => __( 'Ubicación', 'vicool' ),
                'name'          => 'ubicacion',
                'type'          => 'text',
                'default_value' => 'Vi-Cool Tapas Bar, C/ Huertas 12',
            ),
            array(
                'key'           => 'field_evento_enlace',
                'label'         => __( 'Enlace de Reserva', 'vicool' ),
                'name'          => 'enlace_reserva',
                'type'          => 'url',
            ),
            array(
                'key'           => 'field_evento_aforo',
                'label'         => __( 'Aforo', 'vicool' ),
                'name'          => 'aforo',
                'type'          => 'number',
                'min'           => 1,
            ),
        ),
        'location' => array(
            array(
                array(
                    'param'    => 'post_type',
                    'operator' => '==',
                    'value'    => 'eventos_vicool',
                ),
            ),
        ),
    ));

    acf_add_local_field_group( array(
        'key'      => 'group_opciones_web',
        'title'    => __( 'Opciones de la Web Vi-Cool', 'vicool' ),
        'fields'   => array(
            array(
                'key'       => 'field_tab_hero',
                'label'     => __( 'Hero Section', 'vicool' ),
                'name'      => '',
                'type'      => 'tab',
            ),
            array(
                'key'           => 'field_hero_imagen',
                'label'         => __( 'Imagen de Fondo Hero', 'vicool' ),
                'name'          => 'hero_imagen',
                'type'          => 'image',
                'return_format' => 'url',
                'preview_size'  => 'medium',
                'min_width'     => 1920,
                'min_height'    => 800,
            ),
            array(
                'key'           => 'field_hero_titulo',
                'label'         => __( 'Título del Hero', 'vicool' ),
                'name'          => 'hero_titulo',
                'type'          => 'text',
                'default_value' => 'Tapas-Raciones de Temporada',
            ),
            array(
                'key'           => 'field_hero_subtitulo',
                'label'         => __( 'Subtítulo del Hero', 'vicool' ),
                'name'          => 'hero_subtitulo',
                'type'          => 'textarea',
                'rows'          => 2,
                'default_value' => 'Una experiencia culinaria inolvidable en el corazón de Madrid',
            ),
            array(
                'key'           => 'field_hero_cta_texto',
                'label'         => __( 'Texto del Botón CTA', 'vicool' ),
                'name'          => 'hero_cta_texto',
                'type'          => 'text',
                'default_value' => 'Reserva tu mesa',
            ),
            array(
                'key'       => 'field_tab_filosofia',
                'label'     => __( 'Filosofía', 'vicool' ),
                'name'      => '',
                'type'      => 'tab',
            ),
            array(
                'key'           => 'field_filosofia_titulo',
                'label'         => __( 'Título Filosofía', 'vicool' ),
                'name'          => 'filosofia_titulo',
                'type'          => 'text',
                'default_value' => 'Respetando el producto de temporada',
            ),
            array(
                'key'           => 'field_filosofia_texto',
                'label'         => __( 'Texto Filosofía', 'vicool' ),
                'name'          => 'filosofia_texto',
                'type'          => 'wysiwyg',
                'default_value' => 'Respetando el producto de temporada y trabajando con la máxima calidad, ofrecemos nuestras "tapas-raciones" para disfrutar de una experiencia culinaria inolvidable. Hemos renovado nuestro concepto original ampliando nuestra carta para que puedan disfrutar desde el menú del día a un menú elaborado con una selección de nuestros platos más consolidados.',
            ),
            array(
                'key'       => 'field_tab_contacto',
                'label'     => __( 'Contacto', 'vicool' ),
                'name'      => '',
                'type'      => 'tab',
            ),
            array(
                'key'           => 'field_direccion',
                'label'         => __( 'Dirección', 'vicool' ),
                'name'          => 'direccion',
                'type'          => 'text',
                'default_value' => 'VI COOL TAPAS BAR, C/ Huertas, 12, 28012 Madrid',
            ),
            array(
                'key'           => 'field_telefono',
                'label'         => __( 'Teléfono', 'vicool' ),
                'name'          => 'telefono',
                'type'          => 'text',
                'default_value' => '914 294 913',
            ),
            array(
                'key'           => 'field_telefono_link',
                'label'         => __( 'Teléfono (solo números para link)', 'vicool' ),
                'name'          => 'telefono_link',
                'type'          => 'text',
                'default_value' => '+34914294913',
            ),
            array(
                'key'           => 'field_horario',
                'label'         => __( 'Horario', 'vicool' ),
                'name'          => 'horario',
                'type'          => 'text',
                'default_value' => 'Lun - Dom: 13:00 - 16:00 / 20:00 - 23:30',
            ),
            array(
                'key'           => 'field_email',
                'label'         => __( 'Email', 'vicool' ),
                'name'          => 'email_contacto',
                'type'          => 'email',
                'default_value' => 'info@vicooltapasbar.es',
            ),
        ),
        'location' => array(
            array(
                array(
                    'param'    => 'options_page',
                    'operator' => '==',
                    'value'    => 'vicool-settings',
                ),
            ),
        ),
    ));
}
add_action( 'acf/init', 'vicool_register_acf_fields' );

/* ========================================
   OPTIONS PAGE
   ======================================== */
function vicool_register_options_page() {
    if ( function_exists( 'acf_add_options_page' ) ) {
        acf_add_options_page( array(
            'page_title' => __( 'Ajustes Vi-Cool', 'vicool' ),
            'menu_title' => __( 'Ajustes Vi-Cool', 'vicool' ),
            'menu_slug'  => 'vicool-settings',
            'capability' => 'manage_options',
            'icon_url'   => 'dashicons-admin-generic',
            'redirect'   => false,
        ));
    }
}
add_action( 'acf/init', 'vicool_register_options_page' );

/* ========================================
   HELPER FUNCTIONS
   ======================================== */
function vicool_get_option( $key, $default = '' ) {
    if ( function_exists( 'get_field' ) ) {
        $value = get_field( $key, 'option' );
        return $value !== null && $value !== '' ? $value : $default;
    }
    return get_option( 'vicool_' . $key, $default );
}

function vicool_get_alergenos_labels() {
    return array(
        'gluten'  => __( 'Gluten', 'vicool' ),
        'lactosa' => __( 'Lactosa', 'vicool' ),
        'huevo'   => __( 'Huevo', 'vicool' ),
        'frutos'  => __( 'Frutos Secos', 'vicool' ),
        'marisco' => __( 'Marisco', 'vicool' ),
        'pescado' => __( 'Pescado', 'vicool' ),
        'soja'    => __( 'Soja', 'vicool' ),
    );
}

function vicool_format_price( $price ) {
    if ( empty( $price ) ) {
        return '';
    }
    return number_format( (float) $price, 2, ',', '.' ) . ' €';
}

/* ========================================
   MENU ORDER: PLATOS
   ======================================== */
function vicool_platos_menu_order( $query ) {
    if ( ! is_admin() || ! $query->is_main_query() ) {
        return;
    }
    if ( $query->get( 'post_type' ) === 'platos_vicool' ) {
        $query->set( 'orderby', 'menu_order' );
        $query->set( 'order', 'ASC' );
    }
}
add_action( 'pre_get_posts', 'vicool_platos_menu_order' );

/* ========================================
   FLUSH REWRITE RULES ON ACTIVATION
   ======================================== */
function vicool_activation() {
    vicool_register_cpt_platos();
    vicool_register_cpt_eventos();
    vicool_register_cpt_galeria();
    flush_rewrite_rules();
}
add_action( 'after_switch_theme', 'vicool_activation' );
