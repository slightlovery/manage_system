/**
 * Created by user on 2017/9/22.
 */
$(function() {
   $('.left .list-group-item').on('mouseover', function () {
       var _this = $(this);
       var list = $('.list-group');
       list.find('.list-group-item.active').removeClass('active');
       _this.addClass('active');
   }).on('mouseout', function () {
       var _this = $(this);
       _this.find('.list-group-item.active').removeClass('active');
   });

});

function getOriData(id){
    $.ajax({
        url: '/admin/banners/get',
        type: 'POST',
        data: {id : id},
        timeout: 3000,
        success: function(data){
            console.log('Success',data);
            $('#change_ID').val(data.ID);
            $('#change_title').val(data.title);
            $('#change_des').val(data.description);
            $('#change_href').val(data.href);
        },
        error: function(err){
            console.log('Error',err);
        }
    })
}