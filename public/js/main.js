var currentFile;
localStorage.clear()
var currentBucket = localStorage.getItem('currentBucket');

$(function () {
    
    $('.file-upload-btn').change(function () {
        console.log('trigger')
        currentFile = this
        $('form.fileForm').trigger('submit');
        setTimeout(function(){
            location.href='.';
        }, 20)
    })
    getBucketsChild()
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
})

function inputBucketName(){
    var bucketName = prompt("input your prefer folder name: ","folder name");
    $.post('/s3/bucket/'+bucketName, function(data){
        currentBucket = data
        console.log('currentBucket: ', currentBucket)
        localStorage.setItem('currentBucket', JSON.stringify(currentBucket))
    }) 
}

function getBucketsChild(){
    if (currentBucket){
        var childFiles = JSON.parse(currentBucket)
        var currentfiles = childFiles.map(function(file){
            $.get('/s3/file/'+file._id, function(file){
                return file
            })
        })
        console.log('currentfiles: ', currentfiles)
    }else{
        console.log('no currentBucket')
        // $.get('/s3/bucket/all', function(data){
        //     console.log('data: ', data)
        // })
    }
}