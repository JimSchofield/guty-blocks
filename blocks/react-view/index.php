<?php

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}


/* --------------
MEDIA BLOCK
-------------- */

function guty_blocks_react_view_editor_assets() {
	wp_enqueue_script(
		'guty-blocks/react-view-editor-script',
		plugins_url( 'react-view.build.js', __FILE__ ),
		array( 'wp-blocks', 'wp-element', 'wp-editor'  )
  );
  wp_enqueue_style(
	  'guty-blocks/react-view-editor-style',
	  plugins_url( 'react-view.editor.css', __FILE__ ),
	  array( 'wp-edit-blocks' )
  );
}
add_action( 'enqueue_block_editor_assets', 'guty_blocks_react_view_editor_assets' );

function guty_blocks_react_view_assets() {

	if ( is_admin() ) {
		return;
	}

	wp_enqueue_style(
		'guty-blocks/react-view-style',
		plugins_url( 'react-view.view.css', __FILE__ ),
	    array( 'wp-edit-blocks' )
	);
	wp_enqueue_script(
		'guty-blocks/react-view-view-script',
		plugins_url( 'react-view.view.js', __FILE__ ),
		array( 'wp-blocks', 'wp-element', 'react', 'react-dom' )
  );
}
add_action( 'enqueue_block_assets', 'guty_blocks_react_view_assets' );

