$(function () {
    $('#file-upload-btn').change(function () {
        console.log('trigger')
        $('form#fileForm').trigger('submit');
    })
    // $('form#fileForm').submit(function(e){
    //     // e.preventDefault()
    // })
})