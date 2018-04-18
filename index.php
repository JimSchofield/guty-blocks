<?php
/**
 * Plugin Name: Guty Blocks
 * Description: A "simple" boilerplate for creating gutenblocks
 * Version: 1.0.0
 * Author: Jim Schofield
 * Text Domain: guty-blocks
 * Domain Path: /languages
 *
 * @package guty-blocks
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * The full path and filename of this bootstrap file with symlinks resolved.
 *
 * @var string GUTYBLOCKS_BOOTSTRAP_FILE
 */
define( 'GUTYBLOCKS_BOOTSTRAP_FILE', __FILE__ );

/**
 * The full path to the parent directory of this bootstrap file with symlinks resolved, with trailing slash.
 *
 * @var string GUTYBLOCKS_DIR
 */
define( 'GUTYBLOCKS_DIR', dirname( GUTYBLOCKS_BOOTSTRAP_FILE ) . '/' );

/**
 * The relative path to this plugin directory, from WP_PLUGIN_DIR, with trailing slash.
 *
 * @var string GUTYBLOCKS_REL_DIR
 */
define( 'GUTYBLOCKS_REL_DIR', basename( GUTYBLOCKS_DIR ) . '/' );

/**
 * The URL of the plugin directory, with trailing slash.
 *
 * Example: https://example.local/wp-content/plugins/hcmc-custom-objects/
 *
 * @const string GUTYBLOCKS_URL
 */
define( 'GUTYBLOCKS_URL', plugins_url( '/', GUTYBLOCKS_BOOTSTRAP_FILE ) );

/**
 * Load i18n library.
 */
require GUTYBLOCKS_DIR . 'lib/i18n.php';

// Automatically load all "blocks" -- New blocks are required to have an index.php file in order to be loaded.
foreach ( glob( dirname( __FILE__ ) . '/blocks/*/index.php' ) as $block_logic ) {
    require $block_logic;
}
