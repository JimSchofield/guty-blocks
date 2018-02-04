<?php

/**
 * Plugin Name: Guty Blocks
 * Description: A "simple" boilerplate for creating gutenblocks
 * Version: 1.0.0
 * Author: Jim Schofield
 *
 * @package guty-blocks
 */


// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}


/* --------------
MEDIA BLOCK
-------------- */

function guty_blocks_media_editor_assets() {
	wp_enqueue_script(
		'guty-blocks/media-editor-script', // Unique handle.
		plugins_url( 'blocks/media-block.build.js', __FILE__ ), // block.js: We register the block here.
		array( 'wp-blocks', 'wp-element' ) // Dependencies, defined above.
  );
}
add_action( 'enqueue_block_editor_assets', 'guty_blocks_media_editor_assets' );
