<?php

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}


/* --------------
Block layout
-------------- */

function guty_blocks_block_layout_editor_assets() {
	wp_enqueue_script(
		'guty-blocks/block-layout-editor-script',
		plugins_url( 'block-layout.build.js', __FILE__ ),
		array( 'wp-blocks', 'wp-element' )
  );
  wp_enqueue_style(
	  'guty-blocks/block-layout-editor-style',
	  plugins_url( 'block-layout.editor.css', __FILE__ ),
	  array( 'wp-edit-blocks' )
  );
}
add_action( 'enqueue_block_editor_assets', 'guty_blocks_block_layout_editor_assets' );

function guty_blocks_block_layout_assets() {
	wp_enqueue_style(
		'guty-blocks/block-layout-style',
		plugins_url( 'block-layout.view.css', __FILE__ ),
	    array( 'wp-blocks' )
	);
}
add_action( 'enqueue_block_assets', 'guty_blocks_block_layout_assets' );

