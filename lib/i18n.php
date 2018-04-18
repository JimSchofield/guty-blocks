<?php
/**
 * Internationlization functions file.
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Load plugin textdomain.
 *
 * @action init
 *
 * @link   https://developer.wordpress.org/reference/hooks/init/
 */
function gutyblocks_load_textdomain() {

	/**
	 * @link https://developer.wordpress.org/reference/functions/load_plugin_textdomain/
	 */
	load_plugin_textdomain(
		'guty-blocks',
		false,
		GUTYBLOCKS_REL_DIR . 'languages'
	);
}

add_action( 'init', 'gutyblocks_load_textdomain' );

/**
 * Enqueue our blank i18n script, and add our localeData as inline script attached before that.
 *
 * @action admin_enqueue_scripts Internationalize our blocks in the editor.
 * @action wp_enqueue_scripts    Test internationlizing any other JS stuff we may be doing on the frontend.
 *
 * @link   https://developer.wordpress.org/reference/hooks/admin_enqueue_scripts/
 */
function gutyblocks_admin_enqueue_i18n() {

	/**
	 * If all the blocks were compiled to 1 JS file, we could use that for wp_add_inline_script.
	 * But since they're separate, we'll just enqueue this dummy empty JS file to hook on.
	 *
	 * @link https://developer.wordpress.org/reference/functions/wp_enqueue_script/
	 */
	wp_enqueue_script(
		'guty-blocks-i18n',
		GUTYBLOCKS_URL . 'js/i18n.js',
		array( 'wp-i18n' ),
		'1.0.0',
		false
	);

	/**
	 * Get our Jed-formatted localization data.
	 */
	$locale_data = gutyblocks_get_jed_locale_data( 'guty-blocks' );

	/**
	 * Add our inline script that contains the JSON encoded, Jed-formatted localization data.
	 *
	 * @link https://developer.wordpress.org/reference/functions/wp_add_inline_script/
	 */
	wp_add_inline_script(
		'guty-blocks-i18n',
		'wp.i18n.setLocaleData( ' . wp_json_encode( $locale_data ) . ', "guty-blocks" );',
		'before'
	);
}

add_action( 'admin_enqueue_scripts', 'gutyblocks_admin_enqueue_i18n' );

add_action( 'wp_enqueue_scripts', 'gutyblocks_admin_enqueue_i18n' );

/**
 * Get Jed-formatted localization data.
 *
 * This is just a wrapper function around gutenberg_get_jed_locale_data,
 * since, presumably, the name of Gutenberg functions will change when Gutenberg is merged with WP Core.
 *
 * @link https://github.com/WordPress/gutenberg/blob/v2.6.0/lib/i18n.php#L21
 * @link https://messageformat.github.io/Jed/
 *
 * @param $domain
 *
 * @return array
 */
function gutyblocks_get_jed_locale_data( $domain ) {
	return gutenberg_get_jed_locale_data( $domain );
}
