<?php

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Enqueue the block's assets for the editor.
 *
 * wp-blocks:  The registerBlockType() function to register blocks.
 * wp-element: create element wrapper for React
 */
function guty_blocks_media_editor_assets() {
	wp_enqueue_script(
		'guty-blocks/media-editor-script', // Unique handle.
		plugins_url( 'blocks/media-block.build.js', __FILE__ ), // block.js: We register the block here.
		array( 'wp-blocks', 'wp-element' ), // Dependencies, defined above.
  );
}
add_action( 'enqueue_block_editor_assets', 'guty_blocks_media-editor_assets' );
