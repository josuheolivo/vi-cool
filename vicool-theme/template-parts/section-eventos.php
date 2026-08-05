<?php
/**
 * Section: Eventos (Dinámica con WP_Query)
 * Solo muestra eventos vigentes (fecha >= hoy)
 *
 * @package ViCool
 */

$hoy = date( 'Y-m-d' );

$eventos_query = new WP_Query( array(
    'post_type'      => 'eventos_vicool',
    'posts_per_page' => 6,
    'meta_key'       => 'fecha_evento',
    'orderby'        => 'meta_value',
    'order'          => 'ASC',
    'meta_query'     => array(
        array(
            'key'     => 'fecha_evento',
            'value'   => $hoy,
            'compare' => '>=',
            'type'    => 'DATE',
        ),
    ),
) );

if ( ! $eventos_query->have_posts() ) {
    return;
}
?>

<section class="eventos" id="eventos">
    <div class="container">
        <div class="section-header">
            <span class="section-tag"><?php esc_html_e( 'Experiencias', 'vicool' ); ?></span>
            <h2 class="section-title"><?php esc_html_e( 'Próximos Eventos', 'vicool' ); ?></h2>
            <p class="section-subtitle"><?php esc_html_e( 'Celebra momentos únicos en Vi-Cool', 'vicool' ); ?></p>
        </div>

        <div class="eventos__grid">
            <?php
            while ( $eventos_query->have_posts() ) :
                $eventos_query->the_post();

                $fecha   = get_field( 'fecha_evento' );
                $hora    = get_field( 'hora_evento' );
                $ubic    = get_field( 'ubicacion' );
                $enlace  = get_field( 'enlace_reserva' );
                $aforo   = get_field( 'aforo' );

                $fecha_formateada = '';
                if ( $fecha ) {
                    $fecha_obj = DateTime::createFromFormat( 'Y-m-d', $fecha );
                    if ( $fecha_obj ) {
                        $fecha_formateada = $fecha_obj->format( 'j \d\e F \d\e Y' );
                    }
                }
            ?>
                <article class="evento-card reveal">
                    <?php if ( has_post_thumbnail() ) : ?>
                        <div class="evento-card__image">
                            <?php the_post_thumbnail( 'vicool-event', array( 'loading' => 'lazy' ) ); ?>
                        </div>
                    <?php endif; ?>

                    <div class="evento-card__body">
                        <?php if ( $fecha_formateada ) : ?>
                            <time class="evento-card__fecha" datetime="<?php echo esc_attr( $fecha ); ?>">
                                <?php echo esc_html( $fecha_formateada ); ?>
                                <?php if ( $hora ) : ?>
                                    <span class="evento-card__hora"> | <?php echo esc_html( $hora ); ?></span>
                                <?php endif; ?>
                            </time>
                        <?php endif; ?>

                        <h3 class="evento-card__title"><?php the_title(); ?></h3>

                        <div class="evento-card__desc">
                            <?php echo wp_kses_post( wp_trim_words( get_the_content(), 20 ) ); ?>
                        </div>

                        <?php if ( $ubic ) : ?>
                            <p class="evento-card__ubicacion">
                                <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                                    <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" fill="currentColor"/>
                                </svg>
                                <?php echo esc_html( $ubic ); ?>
                            </p>
                        <?php endif; ?>

                        <?php if ( $enlace ) : ?>
                            <a href="<?php echo esc_url( $enlace ); ?>" class="btn btn--primary btn--sm evento-card__cta">
                                <?php esc_html_e( 'Reservar plaza', 'vicool' ); ?>
                            </a>
                        <?php endif; ?>
                    </div>
                </article>
            <?php endwhile; wp_reset_postdata(); ?>
        </div>
    </div>
</section>
