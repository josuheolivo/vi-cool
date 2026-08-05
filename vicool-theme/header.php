<?php
/**
 * Header Template
 *
 * @package ViCool
 */
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<header class="header" id="header">
    <nav class="nav">
        <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="nav__logo" aria-label="<?php bloginfo( 'name' ); ?> - <?php esc_attr_e( 'Inicio', 'vicool' ); ?>">
            <span class="nav__logo-text">VI COOL</span>
            <span class="nav__logo-sub">Tapas Bar</span>
        </a>

        <ul class="nav__menu" id="navMenu" role="menubar">
            <li role="none"><a href="<?php echo esc_url( home_url( '/carta/' ) ); ?>" class="nav__link" role="menuitem"><?php esc_html_e( 'Carta', 'vicool' ); ?></a></li>
            <li role="none"><a href="<?php echo esc_url( home_url( '/#galeria' ) ); ?>" class="nav__link" role="menuitem"><?php esc_html_e( 'Galería', 'vicool' ); ?></a></li>
            <li role="none"><a href="<?php echo esc_url( home_url( '/#eventos' ) ); ?>" class="nav__link" role="menuitem"><?php esc_html_e( 'Eventos', 'vicool' ); ?></a></li>
            <li role="none"><a href="<?php echo esc_url( home_url( '/#contacto' ) ); ?>" class="nav__link" role="menuitem"><?php esc_html_e( 'Contacto', 'vicool' ); ?></a></li>
        </ul>

        <div class="nav__actions">
            <a href="<?php echo esc_url( home_url( '/reservas/' ) ); ?>" class="btn btn--primary btn--sm nav__cta">
                <?php esc_html_e( 'Reserva tu mesa', 'vicool' ); ?>
            </a>

            <button class="nav__hamburger" id="hamburger" aria-label="<?php esc_attr_e( 'Abrir menú', 'vicool' ); ?>" aria-expanded="false">
                <span class="nav__hamburger-line"></span>
                <span class="nav__hamburger-line"></span>
                <span class="nav__hamburger-line"></span>
            </button>
        </div>
    </nav>
</header>
