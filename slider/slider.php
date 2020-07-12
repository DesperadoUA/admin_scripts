<?php
/** дополнительные поля для слайдера */
add_action( 'add_meta_boxes', 'service_add_custom_box_slider' );

function service_add_custom_box_slider() {
	$screens = array( 'post' );
	add_meta_box( 'service_section_slider_id',
		         'Картинки для слайдера',
		      'service_meta_box_slider_callback',
		              $screens );
}

function service_meta_box_slider_callback( $post ) {
	$data = get_post_meta( $post->ID, '_mm_slider', true );
	if(!empty($data)) $data = json_decode($data);
	echo "<div class='service_slider' >
                <div class='service_slider_container' >";
	if(!empty($data)) {
		foreach ($data as $item) {
			echo "<div class='slider_item_wrapper'>
                    <div class='slider_item_delete'>X</div>
                    <img class='slider_item_img' 
                     src='{$item->url}' />
                     <button type='submit' 
                             class='upload_image_button_slider slider_button'>
                       Загрузить</button>
                     <input name='slide' type='hidden' class='slider_item' value='{$item->id}'>
                  </div>";
		}
	}
    echo "</div>
                <hr>
				<div class='slider_button slider_add' data-id='{$post->ID}'>
				   Добавить слайд
				</div>
		 </div>";
}