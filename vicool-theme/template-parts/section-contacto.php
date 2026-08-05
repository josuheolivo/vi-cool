<?php
/**
 * Section: Contacto
 *
 * @package ViCool
 */

$direccion = vicool_get_option( 'direccion' );
$telefono  = vicool_get_option( 'telefono' );
$tel_link  = vicool_get_option( 'telefono_link' );
$horario   = vicool_get_option( 'horario' );
$email     = vicool_get_option( 'email_contacto' );
?>

<section class="contacto" id="contacto">
    <div class="container">
        <div class="contacto__grid">
            <div class="contacto__info">
                <span class="section-tag"><?php esc_html_e( 'Contacto', 'vicool' ); ?></span>
                <h2 class="section-title"><?php esc_html_e( 'Encuéntranos', 'vicool' ); ?></h2>

                <div class="contacto__details">
                    <?php if ( $direccion ) : ?>
                        <div class="contacto__item">
                            <div class="contacto__icon" aria-hidden="true">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                                    <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" fill="currentColor"/>
                                </svg>
                            </div>
                            <div>
                                <p class="contacto__label"><?php esc_html_e( 'Dirección', 'vicool' ); ?></p>
                                <p class="contacto__text"><?php echo nl2br( esc_html( $direccion ) ); ?></p>
                            </div>
                        </div>
                    <?php endif; ?>

                    <?php if ( $tel_link && $telefono ) : ?>
                        <div class="contacto__item">
                            <div class="contacto__icon" aria-hidden="true">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" fill="currentColor"/>
                                </svg>
                            </div>
                            <div>
                                <p class="contacto__label"><?php esc_html_e( 'Teléfono', 'vicool' ); ?></p>
                                <a href="tel:<?php echo esc_attr( $tel_link ); ?>" class="contacto__text contacto__link">
                                    <?php echo esc_html( $telefono ); ?>
                                </a>
                            </div>
                        </div>
                    <?php endif; ?>

                    <?php if ( $horario ) : ?>
                        <div class="contacto__item">
                            <div class="contacto__icon" aria-hidden="true">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" fill="currentColor"/>
                                </svg>
                            </div>
                            <div>
                                <p class="contacto__label"><?php esc_html_e( 'Horario', 'vicool' ); ?></p>
                                <p class="contacto__text"><?php echo esc_html( $horario ); ?></p>
                            </div>
                        </div>
                    <?php endif; ?>

                    <?php if ( $email ) : ?>
                        <div class="contacto__item">
                            <div class="contacto__icon" aria-hidden="true">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" fill="currentColor"/>
                                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" fill="currentColor"/>
                                </svg>
                            </div>
                            <div>
                                <p class="contacto__label"><?php esc_html_e( 'Email', 'vicool' ); ?></p>
                                <a href="mailto:<?php echo esc_attr( $email ); ?>" class="contacto__text contacto__link">
                                    <?php echo esc_html( $email ); ?>
                                </a>
                            </div>
                        </div>
                    <?php endif; ?>
                </div>
            </div>

            <div class="contacto__map">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3037.6!2d-3.6965!3d40.4189!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDI1JzA4LjAiTiAzwrA0MSc0Ny40Ilc!5e0!3m2!1ses!2ses!4v1"
                    width="100%"
                    height="100%"
                    style="border:0; border-radius:12px;"
                    allowfullscreen=""
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"
                    title="<?php esc_attr_e( 'Ubicación Vi-Cool Tapas Bar', 'vicool' ); ?>"
                    class="contacto__map-frame">
                </iframe>
            </div>
        </div>
    </div>
</section>
