<?php
/**
 * Template Page: Reservas
 *
 * @package ViCool
 */

get_header();
?>

<main id="primary" class="site-main page-reservas">

    <section class="page-header">
        <div class="container">
            <h1 class="page-header__title"><?php the_title(); ?></h1>
        </div>
    </section>

    <?php get_template_part( 'template-parts/section', 'reservas' ); ?>
    <?php get_template_part( 'template-parts/section', 'contacto' ); ?>

</main>

<?php get_footer(); ?>
