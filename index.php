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

// Automatically load all "blocks" -- New blocks are required to have an index.php file in order to be loaded.
foreach ( glob( dirname( __FILE__ ) . '/blocks/*/index.php' ) as $block_logic ) {
    require $block_logic;
}