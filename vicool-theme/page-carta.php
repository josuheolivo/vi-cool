<?php
/**
 * Template Page: Carta Completa
 *
 * @package ViCool
 */

get_header();
?>

<main id="primary" class="site-main page-carta">

    <section class="page-header">
        <div class="container">
            <h1 class="page-header__title"><?php the_title(); ?></h1>
            <p class="page-header__desc"><?php esc_html_e( 'Descubre nuestra selección de tapas-raciones elaboradas con producto de temporada', 'vicool' ); ?></p>
        </div>
    </section>

    <?php get_template_part( 'template-parts/section', 'menu' ); ?>

</main>

<?php get_footer(); ?>
