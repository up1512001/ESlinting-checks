// image-script.js is used to handle the image upload and removal functionality for the movie library plugin.
jQuery(document).ready(function ($) {
    $('#open-carousel-poster-modal').on('click', function (e) {
        e.preventDefault();
   
        var posterGallery = wp.media({
            title: 'Select Landscape Poster',
            multiple: false,
            library: {
                type: 'image'
            },
        });
   
        posterGallery.on('select', function () {
            var attachment = posterGallery.state().get('selection').first().toJSON();
   
            // Update the hidden field with the selected attachment ID
            var inputField = '<input type="hidden" name="rt-movie-meta-carousel-poster" value="' + attachment.id + '">';
            $('#rt-movie-meta-carousel-poster').append(inputField);
   
            // Update the selected poster container
            $('#selected-poster-container').html(
                '<div class="image-container">' +
    '<img src="' + attachment.url + '" alt="Selected Poster" height="90px" width="90px"><br />' +
    '<input type="button" name="rt-movie-meta-carousel-poster-remove" class="remove-poster-button" value="Remove" data-attachment-id="' + attachment.id + '" /><br>' +
    '</div>'
            );
        });
   
        posterGallery.open();
    });
   
    // Handle poster removal
    $('#rt-movie-carousel-poster').on('click', '.remove-poster-button', function () {
        var attachmentId = $(this).data('attachment-id');
   
        // Create an input field to add to the post action header
        var inputField = '<input type="hidden" name="rt-movie-meta-carousel-poster-remove" value="' + attachmentId + '">';
   
        // Append the input field to the post action header
        $('#rt-movie-carousel-poster').append(inputField);
   
        // Clear the selected poster container
        $('#selected-poster-container').html('');
   
        // Clear the hidden field value
        $('#rt-movie-meta-carousel-poster').val('');
    });
});
   