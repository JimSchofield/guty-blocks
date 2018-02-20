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
require_once('blocks/media-block/index.php');

/* --------------
IMAGE HERO
-------------- */
require_once('blocks/image-hero/index.php');

/* --------------
RECENT POSTS
-------------- */
require_once('blocks/recent-posts/index.php');

/* --------------
RECENT POSTS
-------------- */
require_once('blocks/hello-world/index.php');