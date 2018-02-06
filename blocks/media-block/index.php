<?php

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}


/* --------------
MEDIA BLOCK
-------------- */

function guty_blocks_media_block_editor_assets() {
	wp_enqueue_script(
		'guty-blocks/media-block-editor-script',
		plugins_url( 'media-block.build.js', __FILE__ ),
		array( 'wp-blocks', 'wp-element' )
  );
  wp_enqueue_style(
	  'guty-blocks/media-block-editor-style',
	  plugins_url( 'media-block.editor.css', __FILE__ ),
	  array( 'wp-edit-blocks' )
  );
}
add_action( 'enqueue_block_editor_assets', 'guty_blocks_media_block_editor_assets' );

function guty_blocks_media_block_assets() {
	wp_enqueue_style(
		'guty-blocks/media-block-style',
		plugins_url( 'media-block.view.css', __FILE__ ),
	    array( 'wp-blocks' )
	);
}
add_action( 'enqueue_block_assets', 'guty_blocks_media_block_assets' );

