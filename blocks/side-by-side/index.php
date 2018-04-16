<?php

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}


/* --------------
MEDIA BLOCK
-------------- */

function guty_blocks_side_by_side_editor_assets() {
	wp_enqueue_script(
		'guty-blocks/side-by-side-editor-script',
		plugins_url( 'side-by-side.build.js', __FILE__ ),
		array( 'wp-blocks', 'wp-element' )
  );
  wp_enqueue_style(
	  'guty-blocks/side-by-side-editor-style',
	  plugins_url( 'side-by-side.editor.css', __FILE__ ),
	  array( 'wp-edit-blocks' )
  );
}
add_action( 'enqueue_block_editor_assets', 'guty_blocks_side_by_side_editor_assets' );

function guty_blocks_side_by_side_assets() {
	wp_enqueue_style(
		'guty-blocks/side-by-side-style',
		plugins_url( 'side-by-side.view.css', __FILE__ ),
	    array( 'wp-blocks' )
	);
}
add_action( 'enqueue_block_assets', 'guty_blocks_side_by_side_assets' );

