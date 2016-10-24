localStorage.clear()
var currentBucket = localStorage.getItem('currentBucket');
var currentFile;

$(function () {
    $('.file-upload-btn').change(uploadFile);
    $('body').on('click', '.bucketItem', goToBucket)
    getBuckets()
})
function uploadFile(){
    console.log('trigger uploadFile')
    $('form.fileForm').trigger('submit')
    setTimeout(function(){
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
    var bucketName = prompt("input your prefer bucket name: ","bucket name");
    $.post('/s3/bucket/'+bucketName, function(data){
        currentBucket = data
        console.log('currentBucket: ', currentBucket)
        console.log('currentBucket')
        localStorage.setItem('currentBucket', JSON.stringify(currentBucket))
        // getBuckets()
        setTimeout(function () {
            console.log('refresh!!!')
            location.reload();
        }, 20)
    })
}
function goToBucket(){
    console.log('dd')
    let bucketId = $(this).attr('data-index');
    let ownerId = $(this).attr('data-ownerId');
    location.href='/s3/bucket/'+bucketId+'@'+ownerId
    // $.get('/s3/bucket/'+bucketId, function(data){
    //     console.log('data: ', data)
    // })
}
function getBuckets(){
    // $('.bucketItem').delete()
    $.get('/s3/bucket/all', function(buckets){
        console.log('buckets: ', buckets)
        let owerId = buckets.Owner.ID;
        console.log('owerId: ', owerId)
        buckets = buckets.Buckets;
        console.log('buckets: ', buckets)
        let $newBucketItem;
        let bucketsData = buckets.map(function(bucket) {
            $newBucketItem = $('.bucketItem.template').clone().attr('data-index', `${bucket.Name}`)
            $newBucketItem.attr('data-ownerId', `${owerId}`);
            $newBucketItem.removeClass('template');
            $newBucketItem.find('.panel-body .bucketname').text(bucket.Name);
            // $newBucketItem.find('.panel-body .filenum').text(bucket.files.length+' files');
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