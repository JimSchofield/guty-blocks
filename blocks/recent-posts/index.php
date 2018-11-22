<?php

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}


/* --------------
MEDIA BLOCK
-------------- */

function guty_blocks_recent_posts_editor_assets() {
	wp_enqueue_script(
		'guty-blocks/recent-posts-editor-script',
		plugins_url( 'recent-posts.build.js', __FILE__ ),
		array( 'wp-blocks', 'wp-element', 'wp-editor'  )
  );
  wp_enqueue_style(
	  'guty-blocks/recent-posts-editor-style',
	  plugins_url( 'recent-posts.editor.css', __FILE__ ),
	  array( 'wp-edit-blocks' )
  );
}
add_action( 'enqueue_block_editor_assets', 'guty_blocks_recent_posts_editor_assets' );

function guty_blocks_recent_posts_assets() {
	wp_enqueue_style(
		'guty-blocks/recent-posts-style',
		plugins_url( 'recent-posts.view.css', __FILE__ ),
	    array( 'wp-blocks' )
	);
}
add_action( 'enqueue_block_assets', 'guty_blocks_recent_posts_assets' );

