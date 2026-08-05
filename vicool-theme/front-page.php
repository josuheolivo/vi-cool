<?php
/**
 * Front Page Template
 *
 * @package ViCool
 */

get_header();

$hero_imagen  = vicool_get_option( 'hero_imagen' );
$hero_titulo  = vicool_get_option( 'hero_titulo', 'Tapas-Raciones de Temporada' );
$hero_subtit  = vicool_get_option( 'hero_subtitulo' );
$hero_cta     = vicool_get_option( 'hero_cta_texto', 'Reserva tu mesa' );
$filosofia_t  = vicool_get_option( 'filosofia_titulo', 'Respetando el producto de temporada' );
$filosofia_tx = vicool_get_option( 'filosofia_texto' );
?>

<main id="primary" class="site-main">

    <!-- ============ HERO SECTION ============ -->
    <section class="hero" id="inicio">
        <div class="hero__media">
            <?php if ( $hero_imagen ) : ?>
                <img src="<?php echo esc_url( $hero_imagen ); ?>" alt="<?php echo esc_attr( $hero_titulo ); ?>" class="hero__image" loading="eager">
            <?php else : ?>
                <img src="<?php echo esc_url( VICOOL_URI . '/assets/images/hero-default.jpg' ); ?>" alt="<?php echo esc_attr( $hero_titulo ); ?>" class="hero__image" loading="eager">
            <?php endif; ?>
            <div class="hero__overlay"></div>
        </div>
        <div class="hero__content">
            <?php if ( has_custom_logo() ) : ?>
                <?php the_custom_logo(); ?>
            <?php else : ?>
                <div class="hero__logo-text">
                    <span class="hero__logo-main">VI COOL</span>
                    <span class="hero__logo-sub">Tapas Bar</span>
                </div>
            <?php endif; ?>
            <h1 class="hero__title"><?php echo esc_html( $hero_titulo ); ?></h1>
            <?php if ( $hero_subtit ) : ?>
                <p class="hero__subtitle"><?php echo esc_html( $hero_subtit ); ?></p>
            <?php endif; ?>
            <a href="<?php echo esc_url( home_url( '/reservas/' ) ); ?>" class="btn btn--primary btn--lg hero__cta">
                <?php echo esc_html( $hero_cta ); ?>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </a>
        </div>
        <div class="hero__scroll" aria-hidden="true">
            <span class="hero__scroll-line"></span>
        </div>
    </section>

    <!-- ============ FILOSOFÍA SECTION ============ -->
    <section class="filosofia" id="filosofia">
        <div class="container">
            <div class="filosofia__content">
                <span class="section-tag"><?php esc_html_e( 'Nuestra Filosofía', 'vicool' ); ?></span>
                <h2 class="section-title filosofia__title"><?php echo esc_html( $filosofia_t ); ?></h2>
                <div class="filosofia__text">
                    <?php echo wp_kses_post( $filosofia_tx ); ?>
                </div>
            </div>
        </div>
    </section>

    <!-- ============ MENÚ / CARTA SECTION ============ -->
    <?php get_template_part( 'template-parts/section', 'menu' ); ?>

    <!-- ============ EVENTOS SECTION ============ -->
    <?php get_template_part( 'template-parts/section', 'eventos' ); ?>

    <!-- ============ GALERÍA SECTION ============ -->
    <?php get_template_part( 'template-parts/section', 'galeria' ); ?>

    <!-- ============ RESERVAS SECTION ============ -->
    <?php get_template_part( 'template-parts/section', 'reservas' ); ?>

    <!-- ============ CONTACTO SECTION ============ -->
    <?php get_template_part( 'template-parts/section', 'contacto' ); ?>

</main>

<?php get_footer(); ?>
