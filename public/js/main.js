localStorage.clear()
var currentBucket = localStorage.getItem('currentBucket');
var currentFile;

$(function () {
    $('.file-upload-btn').change(uploadFile)
    getBuckets()
})
function uploadFile(){
    console.log('trigger uploadFile')
    $('form.fileForm').trigger('submit')
    setTimeout(function(){
        console.log('go')
        location.href='.';
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
function createABucket(){
    var bucketName = prompt("input your prefer folder name: ","folder name");
    $.post('/s3/bucket/'+bucketName, function(data){
        currentBucket = data
        console.log('currentBucket: ', currentBucket)
        localStorage.setItem('currentBucket', JSON.stringify(currentBucket))
        // getBuckets()
    }) 
}
function getBuckets(){
    // $('.bucketItem').delete()
    $.get('/s3/bucket/all', function(buckets){
        console.log('buckets: ', buckets)
        let $newBucketItem;
        let bucketsData = buckets.map(function(bucket) {
            $newBucketItem = $('.bucketItem.template').clone().attr('data-index', `${bucket._id}`);
            $newBucketItem.removeClass('template');
            $newBucketItem.find('.panel-body .bucketname').text(bucket.name);
            $newBucketItem.find('.panel-body .filenum').text(bucket.files.length+' files');
            return $newBucketItem;
        })
        console.log('bucketsData: ', bucketsData)
        $('.bucketList').append(bucketsData)
    }) 
}
function getBucketFiles(bucketId){
    $.get('/s3/bucket/'+bucketId, function(data){
        console.log('data: ', data)
        return data
    }) 
}