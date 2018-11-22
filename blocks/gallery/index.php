<?php

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}


/* --------------
Block layout
-------------- */

function guty_blocks_gallery_editor_assets() {
	wp_enqueue_script(
		'guty-blocks/gallery-editor-script',
		plugins_url( 'gallery.build.js', __FILE__ ),
		array( 'wp-blocks', 'wp-element', 'wp-editor'  )
  );
  wp_enqueue_style(
	  'guty-blocks/gallery-editor-style',
	  plugins_url( 'gallery.editor.css', __FILE__ ),
	  array( 'wp-edit-blocks' )
  );
}
add_action( 'enqueue_block_editor_assets', 'guty_blocks_gallery_editor_assets' );

function guty_blocks_gallery_assets() {
	wp_enqueue_style(
		'guty-blocks/gallery-style',
		plugins_url( 'gallery.view.css', __FILE__ ),
	    array( 'wp-blocks' )
	);

	wp_enqueue_style(
		'guty-blocks/gallery-style-lightbox',
		plugins_url( 'dist/css/lightbox.css', __FILE__ ),
	    array( 'wp-blocks' )
	);

	wp_enqueue_script(
		'guty-blocks/gallery-view-script-lightbox',
		plugins_url( 'dist/js/lightbox-plus-jquery.min.js', __FILE__),
		array( 'wp-blocks' )
	);
}
add_action( 'enqueue_block_assets', 'guty_blocks_gallery_assets' );

