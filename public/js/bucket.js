localStorage.clear()
var currentBucket = localStorage.getItem('currentBucket');
var currentFile;
let urlData = window.location.pathname.split('/')
urlData = urlData[urlData.length - 1].split('@')
console.log("urlData: ", urlData)
let bucketId = urlData[0];
let ownerId = urlData[1];
$(function () {
    $('.file-upload-btn').change(uploadFile);
    $('body').on('click', '.bucketItem', goToBucket)
    getFiles()
})
function uploadFile() {
    console.log('trigger uploadFile')
    $('form.fileForm').trigger('submit')
    setTimeout(function () {
        location.href = '/s3/bucket/' + bucketId + '@' + ownerId;
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
            location.reload();
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
    $.get('/s3/file/bucket/' + bucketId, function (files) {
        console.log('files from server: ', files.Contents)
        let $newFileItem;
        let filesData = files.Contents.map(function (file) {
            $newFileItem = $('.fileItem.template').clone().attr('data-index', `${file.Key}`);
            $newFileItem.removeClass('template');
            $newFileItem.find('.filename').text(file.Key)
            // $newFileItem.find('.imageURL').attr('url', file.url);
            return $newFileItem;
        })
        console.log('filesData: ', filesData)
        $('.fileList').append(filesData)
    })
}
function getBucketFiles(bucketId) {
    $.get('/s3/bucket/' + bucketId, function (data) {
        console.log('data: ', data)
        return data
    })
}

function deleteFolder() {
    $.ajax({
        url: '/s3/bucket/' + bucketId + '@' + ownerId,
        type: 'delete',
        success: function (response) {
            console.log('successfully delete')
            history.back()
        }
    });
}
