<?php

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}


/* --------------
MEDIA BLOCK
-------------- */

function guty_blocks_carousel_editor_assets() {
	wp_enqueue_script(
		'guty-blocks/carousel-editor-script',
		plugins_url( 'carousel.build.js', __FILE__ ),
		array( 'wp-blocks', 'wp-element', 'wp-editor' )
  );
  wp_enqueue_style(
	  'guty-blocks/carousel-editor-style',
	  plugins_url( 'carousel.editor.css', __FILE__ ),
	  array( 'wp-edit-blocks' )
  );
}
add_action( 'enqueue_block_editor_assets', 'guty_blocks_carousel_editor_assets' );

function guty_blocks_carousel_assets() {
	wp_enqueue_style(
		'guty-blocks/carousel-style',
		plugins_url( 'carousel.view.css', __FILE__ ),
	    array( 'wp-edit-blocks' )
	);

	wp_enqueue_script(
		'guty-blocks/carousel-view-script',
		plugins_url( 'carousel.view.js', __FILE__ ),
		array( 'wp-blocks', 'wp-element' )
  );
}
add_action( 'enqueue_block_assets', 'guty_blocks_carousel_assets' );

