// Video script for the Movie Library plugin. 
jQuery(document).ready(function ($) {
    $('#open-video-gallery-modal').on('click', function (e) {
        e.preventDefault();
   
        var videoGallery = wp.media({
            title: 'Select Videos',
            multiple: true,
            library: {
                type: 'video',
            },
        });
   
        videoGallery.on('select', function () {
            var attachmentIds = videoGallery.state().get('selection').map(function (attachment) {
                return attachment.id;
            });
   
            $('#selected-videos-list').html('');
            attachmentIds.forEach(function (attachmentId) {
                $('#selected-videos-list').append('<li>' + attachmentId + '</li>');
   
                // Create hidden input fields for selected video attachment IDs.
                var inputField = '<input type="hidden" name="rt-media-meta-video[]" value="' + attachmentId + '">';
                $('#rt-media-video-gallery').append(inputField);
            });
        });
   
        videoGallery.open();
    });
   
    // Add a click event handler for the "Remove" button for videos.
    $('.remove-video-button').on('click', function () {
        var attachmentId = $(this).data('attachment-id');
   
        // Add a hidden input field for the removed video.
        var inputField = '<input type="hidden" name="rt-media-meta-video-remove[]" value="' + attachmentId + '">';
        $('#rt-media-video-gallery').append(inputField);
   
        // Remove the video container.
        $(this).parent('.video-container').remove();
   
        // Store the removed attachment ID in the rt-media-meta-video-remove[] array.
        var removedIds = $('#rt-media-meta-video-remove').val() || '';
        removedIds += attachmentId + ',';
        $('#rt-media-meta-video-remove').val(removedIds);
   
        // Update the rt-media-meta-video array to remove the selected video.
        var videoArray = $('#rt-media-meta-video').val().split(',');
        var index = videoArray.indexOf(attachmentId.toString());
        if (index > -1) {
            videoArray.splice(index, 1);
            $('#rt-media-meta-video').val(videoArray.join(','));
        }
    });
});
   