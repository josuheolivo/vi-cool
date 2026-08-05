<?php
/**
 * Section: Reservas con Formulario
 *
 * @package ViCool
 */

$telefono = vicool_get_option( 'telefono' );
$tel_link = vicool_get_option( 'telefono_link' );
?>

<section class="reservas" id="reservas">
    <div class="container">
        <div class="reservas__wrapper">
            <div class="reservas__info">
                <span class="section-tag section-tag--light"><?php esc_html_e( 'Reservas', 'vicool' ); ?></span>
                <h2 class="section-title section-title--light"><?php esc_html_e( 'Reserva tu Mesa', 'vicool' ); ?></h2>
                <p class="reservas__desc">
                    <?php esc_html_e( 'Asegura tu plaza y déjanos prepararte una experiencia inolvidable. Recomendamos reservar con al menos 24h de antelación.', 'vicool' ); ?>
                </p>
                <?php if ( $tel_link && $telefono ) : ?>
                    <a href="tel:<?php echo esc_attr( $tel_link ); ?>" class="btn btn--white reservas__phone">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <span><?php echo esc_html( $telefono ); ?></span>
                    </a>
                <?php endif; ?>
            </div>

            <form class="reservas__form" id="reservasForm" novalidate>
                <?php wp_nonce_field( 'vicool_reserva', 'vicool_reserva_nonce' ); ?>
                <div class="form-group">
                    <label for="resNombre" class="form-label"><?php esc_html_e( 'Nombre', 'vicool' ); ?></label>
                    <input type="text" id="resNombre" name="nombre" class="form-input" placeholder="<?php esc_attr_e( 'Tu nombre', 'vicool' ); ?>" required>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="resFecha" class="form-label"><?php esc_html_e( 'Fecha', 'vicool' ); ?></label>
                        <input type="date" id="resFecha" name="fecha" class="form-input" required>
                    </div>
                    <div class="form-group">
                        <label for="resHora" class="form-label"><?php esc_html_e( 'Hora', 'vicool' ); ?></label>
                        <select id="resHora" name="hora" class="form-input" required>
                            <option value=""><?php esc_html_e( 'Seleccionar', 'vicool' ); ?></option>
                            <option value="13:00">13:00</option>
                            <option value="14:00">14:00</option>
                            <option value="15:00">15:00</option>
                            <option value="20:00">20:00</option>
                            <option value="21:00">21:00</option>
                            <option value="22:00">22:00</option>
                        </select>
                    </div>
                </div>
                <div class="form-group">
                    <label for="resComensales" class="form-label"><?php esc_html_e( 'Comensales', 'vicool' ); ?></label>
                    <select id="resComensales" name="comensales" class="form-input" required>
                        <option value=""><?php esc_html_e( 'Seleccionar', 'vicool' ); ?></option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7+">7+</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="resEmail" class="form-label"><?php esc_html_e( 'Email', 'vicool' ); ?></label>
                    <input type="email" id="resEmail" name="email" class="form-input" placeholder="<?php esc_attr_e( 'tu@email.com', 'vicool' ); ?>" required>
                </div>
                <div class="form-group">
                    <label for="resTelefono" class="form-label"><?php esc_html_e( 'Teléfono', 'vicool' ); ?></label>
                    <input type="tel" id="resTelefono" name="telefono" class="form-input" placeholder="<?php esc_attr_e( '914 000 000', 'vicool' ); ?>">
                </div>
                <button type="submit" class="btn btn--primary btn--full">
                    <?php esc_html_e( 'Confirmar Reserva', 'vicool' ); ?>
                </button>
            </form>
        </div>
    </div>
</section>
