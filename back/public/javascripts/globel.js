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
    $("#custom_src").fileinput();

});

function getOriBannersData(id){
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

function getOriCustomData(id){
    $.ajax({
        url: '/admin/custom/get',
        type: 'POST',
        data: {id : id},
        timeout: 3000,
        success: function(data){
            console.log('Success',data);
            $('#custom_ID').val(data.ID);
            $('#custom_title').val(data.title);
            $('#custom_des').val(data.description);
        },
        error: function(err){
            console.log('Error',err);
        }
    })
}

function getOriIntroData(id){
    $.ajax({
        url: '/admin/intro/get',
        type: 'POST',
        data: {id : id},
        timeout: 3000,
        success: function(data){
            console.log('Success',data);
            $('#intro_ID').val(data.ID);
            $('#intro_title').val(data.title);
            $('#intro_des').val(data.description);
            $('#intro_href').val(data.href);
        },
        error: function(err){
            console.log('Error',err);
        }
    })
}