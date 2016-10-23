localStorage.clear()
var currentBucket = localStorage.getItem('currentBucket');
var currentFile;
let bucketId = window.location.pathname.split('/')
bucketId = bucketId[bucketId.length - 1]
$(function () {
    $('.file-upload-btn').change(uploadFile);
    $('body').on('click', '.bucketItem', goToBucket)
    getFiles()
})
function uploadFile() {
    console.log('trigger uploadFile')
    $('form.fileForm').trigger('submit')
    setTimeout(function () {
        location.href = '/s3/bucket/'+bucketId;
    }, 20)
    // $('form.fileForm').submit(function (e) {
    //     e.preventDefault()
    //     var formData = new FormData();
    //     formData.append('file', currentFile.files[0]);
    //     console.log('formData :', formData)
    //     $.ajax({
    //         url: '/s3/file',
    //         type: 'POST',
    //         data: formData,
    //         success: function (data) {
    //             alert(data)
    //         },
    //         processData: false
    //     });
    // })
}
function createABucket() {
    var bucketName = prompt("input your prefer folder name: ", "folder name");
    $.post('/s3/bucket/' + bucketName, function (data) {
        currentBucket = data
        console.log('currentBucket: ', currentBucket)
        localStorage.setItem('currentBucket', JSON.stringify(currentBucket))
        // getFiles()
        setTimeout(function () {
            // location.href = '.';
        }, 20)
    })
}
function goToBucket() {
    console.log('dd')
    let bucketId = $(this).attr('data-index');
    $.get('/s3/bucket/' + bucketId, function (data) {
        console.log('data: ', data)
    })
}
function getFiles() {
    // $('.bucketItem').delete()
    console.log('bucketId: ', bucketId)
    $.get('/s3/file/bucket/' + bucketId, function (files) {
        console.log('files from server: ', files)
        // let $newFileItem;
        // let filesData = files.map(function (file) {
        //     $newFileItem = $('.fileItem.template').clone().attr('data-index', `${file._id}`);
        //     $newFileItem.removeClass('template');
        //     $newFileItem.find('.imageURL').attr('url', file.url);
        //     return $newFileItem;
        // })
        // console.log('filesData: ', filesData)
        // $('.fileList').append(filesData)
    })
}
function getBucketFiles(bucketId) {
    $.get('/s3/bucket/' + bucketId, function (data) {
        console.log('data: ', data)
        return data
    })
}

function deleteFolder() {
    console.log('delete')
    // $.delete('/s3/bucket'+bucketId, function(data){
    //     console.log('successfully delete')
    // })
    $.ajax({
        url: '/s3/bucket/' + bucketId,
        type: 'delete',
        success: function (response) {
            console.log('successfully delete')
            history.back()
        }
    });
}