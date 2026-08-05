<?php
/**
 * Footer Template
 *
 * @package ViCool
 */

$direccion   = vicool_get_option( 'direccion' );
$telefono    = vicool_get_option( 'telefono' );
$tel_link    = vicool_get_option( 'telefono_link' );
$horario     = vicool_get_option( 'horario' );
$email       = vicool_get_option( 'email_contacto' );
?>

<footer class="footer">
    <div class="container">
        <div class="footer__content">
            <div class="footer__brand">
                <span class="footer__logo">VI COOL</span>
                <span class="footer__logo-sub">Tapas Bar</span>
            </div>
            <div class="footer__links">
                <a href="<?php echo esc_url( home_url( '/carta/' ) ); ?>" class="footer__link"><?php esc_html_e( 'Carta', 'vicool' ); ?></a>
                <a href="<?php echo esc_url( home_url( '/#galeria' ) ); ?>" class="footer__link"><?php esc_html_e( 'Galería', 'vicool' ); ?></a>
                <a href="<?php echo esc_url( home_url( '/#eventos' ) ); ?>" class="footer__link"><?php esc_html_e( 'Eventos', 'vicool' ); ?></a>
                <a href="<?php echo esc_url( home_url( '/#contacto' ) ); ?>" class="footer__link"><?php esc_html_e( 'Contacto', 'vicool' ); ?></a>
            </div>
        </div>
        <div class="footer__info">
            <?php if ( $direccion ) : ?>
                <p class="footer__info-item">
                    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" fill="currentColor"/></svg>
                    <?php echo esc_html( $direccion ); ?>
                </p>
            <?php endif; ?>
            <?php if ( $telefono && $tel_link ) : ?>
                <p class="footer__info-item">
                    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" fill="currentColor"/></svg>
                    <a href="tel:<?php echo esc_attr( $tel_link ); ?>"><?php echo esc_html( $telefono ); ?></a>
                </p>
            <?php endif; ?>
            <?php if ( $horario ) : ?>
                <p class="footer__info-item">
                    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" fill="currentColor"/></svg>
                    <?php echo esc_html( $horario ); ?>
                </p>
            <?php endif; ?>
        </div>
        <div class="footer__bottom">
            <p>&copy; <?php echo date( 'Y' ); ?> Vi-Cool Tapas Bar. <?php esc_html_e( 'Todos los derechos reservados.', 'vicool' ); ?></p>
        </div>
    </div>
</footer>

<!-- Mobile Actions Bar -->
<div class="mobile-actions" id="mobileActions">
    <?php if ( $tel_link ) : ?>
        <a href="tel:<?php echo esc_attr( $tel_link ); ?>" class="mobile-actions__btn mobile-actions__btn--call" aria-label="<?php esc_attr_e( 'Llamar ahora', 'vicool' ); ?>">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                <path d="M2.75 3.667a1.833 1.833 0 011.833-1.834h2.75a1.833 1.833 0 011.74 1.26l.667 3.334a1.833 1.833 0 01-.962 2.01L7.41 9.104a9.17 9.17 0 004.49 4.49l.667-1.367a1.833 1.833 0 012.01-.962l3.333.667a1.833 1.833 0 011.26 1.74v2.75A1.833 1.833 0 0117.333 18.25h-1.833C8.477 18.25 2.75 12.523 2.75 5.5V3.667z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span><?php esc_html_e( 'Llamar', 'vicool' ); ?></span>
        </a>
    <?php endif; ?>
    <a href="<?php echo esc_url( home_url( '/reservas/' ) ); ?>" class="mobile-actions__btn mobile-actions__btn--reserve" aria-label="<?php esc_attr_e( 'Reservar mesa', 'vicool' ); ?>">
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
            <rect x="2.75" y="4.583" width="16.5" height="14.667" rx="2.75" stroke="currentColor" stroke-width="1.5"/>
            <path d="M2.75 8.25h16.5M7.333 2.75v3.667M14.667 2.75v3.667" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
        <span><?php esc_html_e( 'Reservar', 'vicool' ); ?></span>
    </a>
</div>

<?php wp_footer(); ?>
</body>
</html>
