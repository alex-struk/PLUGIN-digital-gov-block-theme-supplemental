<?php
/**
* Plugin Name: DIGIMOD
* Description: A plugin to load custom CSS and JS files from the dist/assets directory, as well as any other custom functionality specific to digital.gov.bc.ca
* Version: 1.0.0
* Author: Digimod
* License: GPL-2.0+
* License URI: http://www.gnu.org/licenses/gpl-2.0.txt
*/

// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}

// /**
//  * Load public and admin assets.
//  */
// function custom_assets_loader() {
//     $plugin_dir = plugin_dir_path(__FILE__);
//     $assets_dir = $plugin_dir . 'dist/assets/';

//     $public_css_files = glob($assets_dir . 'public*.css');
//     $public_js_files = glob($assets_dir . 'public*.js');

//     $admin_css_files = glob($assets_dir . 'admin*.css');
//     $admin_js_files = glob($assets_dir . 'admin*.js');

//     // Load public CSS and JS files
//     if (!is_admin()) {
//         foreach ($public_css_files as $file) {
//             $file_url = plugins_url(str_replace($plugin_dir, '', $file), __FILE__);
//             wp_enqueue_style('custom-public-' . basename($file, '.css'), $file_url);
//         }

//         foreach ($public_js_files as $file) {
//             $file_url = plugins_url(str_replace($plugin_dir, '', $file), __FILE__);
//             wp_enqueue_script('custom-public-' . basename($file, '.js'), $file_url, [], false, true);
//         }
//     } else {
//         // Load admin CSS and JS files
//         foreach ($admin_css_files as $file) {
//             $file_url = plugins_url(str_replace($plugin_dir, '', $file), __FILE__);
//             wp_enqueue_style('custom-admin-' . basename($file, '.css'), $file_url);
//         }

//         foreach ($admin_js_files as $file) {
//             $file_url = plugins_url(str_replace($plugin_dir, '', $file), __FILE__);
//             wp_enqueue_script('custom-admin-' . basename($file, '.js'), $file_url, [], false, true);
//         }
//     }
// }
// add_action('wp_enqueue_scripts', 'custom_assets_loader');
// add_action('admin_enqueue_scripts', 'custom_assets_loader');

// Register block to load the Vue.js app
function vuejs_wordpress_block() {
    wp_enqueue_script(
        'vuejs-wordpress-block',
        plugin_dir_url(__FILE__) . 'block.js',
        array( 'wp-blocks', 'wp-element', 'wp-editor' )
    );
}

add_action( 'enqueue_block_editor_assets', 'vuejs_wordpress_block' );

// 
function vuejs_app() {
    wp_enqueue_script(
        'vuejs-app',
        plugin_dir_url(__FILE__) . 'blocks/wcag-vue-app/wcag-app/dist/assets/index-c2666410.js',
        array(),
        '1.0.0',
        true // this will enqueue the script in the footer
    );
}

add_action( 'wp_enqueue_scripts', 'vuejs_app' );