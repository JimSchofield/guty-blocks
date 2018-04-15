<?php

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}


/* --------------
MEDIA BLOCK
-------------- */

function guty_blocks_prism_code_editor_assets() {
	wp_enqueue_script(
		'guty-blocks/prism-code-editor-script',
		plugins_url( 'prism-code.build.js', __FILE__ ),
		array( 'wp-blocks', 'wp-element' )
  );
  wp_enqueue_style(
	  'guty-blocks/prism-code-editor-style',
	  plugins_url( 'prism-code.editor.css', __FILE__ ),
	  array( 'wp-edit-blocks' )
  );
}
add_action( 'enqueue_block_editor_assets', 'guty_blocks_prism_code_editor_assets' );

function guty_blocks_prism_code_assets() {
	wp_enqueue_style(
		'guty-blocks/prism-code-style',
		plugins_url( 'prism-code.view.css', __FILE__ ),
	    array( 'wp-blocks' )
	);
}
add_action( 'enqueue_block_assets', 'guty_blocks_prism_code_assets' );

