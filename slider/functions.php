<?php
include 'slider.php';
add_action( 'admin_enqueue_scripts', 'mm_slider_admin_scripts' );
add_action( 'wp_ajax_mm_slider_save', 'mm_slider_save' );

function mm_slider_admin_scripts() {
		$url = get_template_directory_uri().'/admin_scripts/slider/';
		wp_enqueue_script(
			'mm_slider_admin_scripts',
			$url.'script.js',
			array('jquery'),
			null,
			true);

		wp_enqueue_style(
			'mm_slider_admin_style',
			$url.'style.css',
			null,
			true);

}
function mm_slider_save() {
	$post_id = $_POST['postId'];
	$data = $_POST['slider_data'];
	update_post_meta( $post_id, '_mm_slider', $data );
	wp_die();
}