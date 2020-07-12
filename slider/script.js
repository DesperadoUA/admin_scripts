document.addEventListener("DOMContentLoaded", ready)
function ready() {
	const sliderAdd = document.querySelector('.slider_add')
	const sliderContainer = document.querySelector('.service_slider_container')
	const buttonEditor = document.querySelector('.editor-post-publish-button')

	if(sliderAdd) {
		sliderAdd.addEventListener('click', add_item_slide)
		sliderContainer.addEventListener('click', click_handler_slider)

		function click_handler_slider(event) {
			if(event.target.classList.contains('slider_item_delete')) {
				event.target.parentElement.remove()
			}

			if(event.target.classList.contains('upload_image_button_slider')) {

				const send_attachment_bkp = wp.media.editor.send.attachment
				const button = event.target
				const img = event.target.previousElementSibling
				const id_img = event.target.nextElementSibling

				wp.media.editor.send.attachment = function (props, attachment) {
					img.src = attachment.url
					id_img.value = attachment.id
					wp.media.editor.send.attachment = send_attachment_bkp
				}
				wp.media.editor.open(button)
				return false
			}
		}
		function add_item_slide() {

			const PATH_DEFAULT_IMG = '/wp-content/themes/f-zone_2020/admin_scripts/slider/img/no-image.jpg'
			const newItem = document.createElement("div")
			newItem.classList.add('slider_item_wrapper')

			const newInput = document.createElement("input")
			newInput.name = "slide"
			newInput.type = "hidden"
			newInput.classList.add('slider_item')

			const newUpload = document.createElement('button')
			newUpload.type = 'submit'
			newUpload.classList.add('upload_image_button_slider')
			newUpload.classList.add('slider_button')
			newUpload.textContent = 'Загрузить'

			const newItemDelete = document.createElement("div")
			newItemDelete.classList.add('slider_item_delete')
			newItemDelete.textContent = 'X'

			const newImg = document.createElement("img")
			newImg.classList.add('slider_item_img')
			newImg.src = PATH_DEFAULT_IMG

			newItem.appendChild(newItemDelete)
			newItem.appendChild(newImg)
			newItem.appendChild(newUpload)
			newItem.appendChild(newInput)

			sliderContainer.appendChild(newItem)

		}

		buttonEditor.addEventListener('click', save_slider_data)

		function save_slider_data(){
			const postId = sliderAdd.getAttribute('data-id')
			const sliderData = []
			const sliderItem = document.querySelectorAll('.slider_item_wrapper')

			if(sliderItem) {
				sliderItem.forEach(item => {
					sliderData.push({
						'id': item.querySelector('.slider_item').value,
						'url': item.querySelector('.slider_item_img').src
					})
				})
			}

			jQuery.ajax({
				type:'POST',
				url: ajaxurl,
				data: {
					postId: postId,
					slider_data: JSON.stringify(sliderData),
					action: 'mm_slider_save'
				},
				success: function(data){
					console.log('Response: '+data)
				},
				error: function(){
					alert('Ошибка!!!');
				}
			})

		}
	}
}