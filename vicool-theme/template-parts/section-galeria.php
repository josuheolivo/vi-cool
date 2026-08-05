<?php
/**
 * Section: Galería Dinámica
 *
 * @package ViCool
 */

$galeria_query = new WP_Query( array(
    'post_type'      => 'galeria_vicool',
    'posts_per_page' => 12,
    'orderby'        => 'menu_order',
    'order'          => 'ASC',
) );

if ( ! $galeria_query->have_posts() ) {
    return;
}

$fotos = array();
while ( $galeria_query->have_posts() ) {
    $galeria_query->the_post();
    $img_src = wp_get_attachment_image_src( get_post_thumbnail_id(), 'vicool-gallery' );
    $img_full = wp_get_attachment_image_src( get_post_thumbnail_id(), 'full' );
    if ( $img_src ) {
        $fotos[] = array(
            'src'   => $img_src[0],
            'full'  => $img_full ? $img_full[0] : $img_src[0],
            'alt'   => get_the_title() ? get_the_title() : get_post_meta( get_post_thumbnail_id(), '_wp_attachment_image_alt', true ),
        );
    }
}
wp_reset_postdata();

if ( empty( $fotos ) ) {
    return;
}
?>

<section class="galeria" id="galeria">
    <div class="container">
        <div class="section-header">
            <span class="section-tag"><?php esc_html_e( 'El Local', 'vicool' ); ?></span>
            <h2 class="section-title"><?php esc_html_e( 'Galería', 'vicool' ); ?></h2>
            <p class="section-subtitle"><?php esc_html_e( 'Un espacio único en el barrio de Las Huertas', 'vicool' ); ?></p>
        </div>

        <div class="galeria__grid" id="galeriaGrid">
            <?php foreach ( $fotos as $i => $foto ) : ?>
                <div class="galeria__item<?php echo $i === 0 ? ' galeria__item--lg' : ''; echo ( $i === 2 || $i === 5 ) ? ' galeria__item--wide' : ''; ?> reveal">
                    <img src="<?php echo esc_url( $foto['src'] ); ?>"
                         data-full="<?php echo esc_url( $foto['full'] ); ?>"
                         alt="<?php echo esc_attr( $foto['alt'] ); ?>"
                         loading="lazy"
                         class="galeria__img">
                </div>
            <?php endforeach; ?>
        </div>
    </div>
</section>
