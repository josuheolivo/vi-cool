<?php
/**
 * Section: Menú / Carta (Dinámica con WP_Query)
 *
 * @package ViCool
 */

$categorias = get_terms( array(
    'taxonomy'   => 'categoria_plato',
    'hide_empty' => true,
    'orderby'    => 'name',
    'order'      => 'ASC',
) );

if ( empty( $categorias ) || is_wp_error( $categorias ) ) {
    $categorias = array(
        (object) array( 'slug' => 'default', 'name' => __( 'Nuestra Carta', 'vicool' ) ),
    );
}
?>

<section class="menus" id="menus">
    <div class="container">
        <div class="section-header">
            <span class="section-tag"><?php esc_html_e( 'Nuestra Carta', 'vicool' ); ?></span>
            <h2 class="section-title"><?php esc_html_e( 'Carta & Menús', 'vicool' ); ?></h2>
            <p class="section-subtitle"><?php esc_html_e( 'Descubre todas las opciones que tenemos para ti', 'vicool' ); ?></p>
        </div>

        <?php if ( ! empty( $categorias ) && ! is_wp_error( $categorias ) && $categorias[0]->slug !== 'default' ) : ?>
            <div class="menus__tabs" role="tablist">
                <?php foreach ( $categorias as $i => $cat ) : ?>
                    <button class="menus__tab<?php echo $i === 0 ? ' is-active' : ''; ?>"
                            data-tab="<?php echo esc_attr( $cat->slug ); ?>"
                            role="tab"
                            aria-selected="<?php echo $i === 0 ? 'true' : 'false'; ?>">
                        <?php echo esc_html( $cat->name ); ?>
                    </button>
                <?php endforeach; ?>
            </div>
        <?php endif; ?>

        <div class="menus__content">
            <?php
            foreach ( $categorias as $i => $cat ) :

                $platos_query = new WP_Query( array(
                    'post_type'      => 'platos_vicool',
                    'posts_per_page' => -1,
                    'orderby'        => 'menu_order',
                    'order'          => 'ASC',
                    'tax_query'      => $cat->slug !== 'default' ? array(
                        array(
                            'taxonomy' => 'categoria_plato',
                            'field'    => 'slug',
                            'terms'    => $cat->slug,
                        ),
                    ) : '',
                    'meta_query'     => array(
                        array(
                            'key'     => 'agotado',
                            'value'   => '1',
                            'compare' => '!=',
                        ),
                    ),
                ) );

                if ( ! $platos_query->have_posts() ) {
                    continue;
                }
                ?>

                <div class="menus__panel<?php echo $i === 0 ? ' is-active' : ''; ?>"
                     id="panel-<?php echo esc_attr( $cat->slug ); ?>"
                     role="tabpanel">
                    <div class="menus__grid menus__grid--cols">
                        <?php
                        while ( $platos_query->have_posts() ) :
                            $platos_query->the_post();

                            $precio    = get_field( 'precio' );
                            $desc      = get_field( 'descripcion_corta' );
                            $alergenos = get_field( 'alergenos' );
                            $destacado = get_field( 'destacado' );
                        ?>
                            <article class="menu-card reveal<?php echo $destacado ? ' menu-card--destacado' : ''; ?>">
                                <?php if ( $destacado ) : ?>
                                    <span class="menu-card__badge"><?php esc_html_e( 'Destacado', 'vicool' ); ?></span>
                                <?php endif; ?>

                                <div class="menu-card__header">
                                    <h3 class="menu-card__title"><?php the_title(); ?></h3>
                                    <?php if ( $precio ) : ?>
                                        <span class="menu-card__price"><?php echo esc_html( vicool_format_price( $precio ) ); ?></span>
                                    <?php endif; ?>
                                </div>

                                <?php if ( $desc ) : ?>
                                    <p class="menu-card__desc"><?php echo esc_html( $desc ); ?></p>
                                <?php endif; ?>

                                <?php if ( $alergenos ) : ?>
                                    <div class="menu-card__alergenos">
                                        <span class="menu-card__alergenos-label"><?php esc_html_e( 'Alérgenos:', 'vicool' ); ?></span>
                                        <?php
                                        $labels = vicool_get_alergenos_labels();
                                        foreach ( $alergenos as $al ) :
                                            if ( isset( $labels[ $al ] ) ) :
                                        ?>
                                            <span class="menu-card__alergeno"><?php echo esc_html( $labels[ $al ] ); ?></span>
                                        <?php
                                            endif;
                                        endforeach;
                                        ?>
                                    </div>
                                <?php endif; ?>
                            </article>
                        <?php endwhile; wp_reset_postdata(); ?>
                    </div>
                </div>

            <?php endforeach; ?>
        </div>
    </div>
</section>
