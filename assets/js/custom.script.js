$(document).ready(function () {

  // Make The Offer as a Favourit
  //================================================
  $(".kt-widget__top .fav-offer").on('click', function () {
    $(this).toggleClass('active');
  });

  // Open User Side bar in Dashbard Main Page 
  //================================================
  $("#kt_users_aside_toggle_btn").on('click', function () {
    $('#kt_users_aside').toggleClass('kt_users_aside_show_menu');
    
  });

  // Follow 
  //================================================
  var followText = '';
  $(".follow-offer-person").on('click', function () {
    $(this).toggleClass('active');
    followText = $(this).find('.followTitle').attr('data-text');
    $(this).find('.followTitle').attr('data-text', $(this).find('.followTitle').text());
    $(this).find('.followTitle').text(followText);

    $(this).find('.followIcon').toggleClass('flaticon-user-add').toggleClass('flaticon-user-ok');
  });

  // Toggle Filter Aside Container
  //================================================
  $("#filterServices").on('click', function () {
    $("#kt_demo_panel_filter").addClass('kt-demo-panel--on').next('div').addClass('kt-demo-panel-overlay');
  });

  // Close Filter Aside
  $(document).on("click", "#kt_demo_panel_close_filter, .kt-demo-panel-overlay", function () {
    $("#kt_demo_panel_filter").removeClass('kt-demo-panel--on').next('div').removeClass('kt-demo-panel-overlay');
  });

  // Toggle Filter Offers
  //================================================
  $(".offers__filter li").on('click', function () {
    $(this).siblings().removeClass('active');
    $(this).addClass('active');
    $(".offers__filter .dropdown-toggle").text($(this).text());
  });

  // Toggle Rating Service
  //================================================
  $("#ratingContainer input").on('click', function () {
    $('#rateOutput').text($(this).val());
  });

  // Scroll to Add to Cart Button
  //================================================
  
  $("#buyBTN").on('click', function () {
    var pos = $("#addServiceToCart").offset().top - 150;
    $('html, body').animate({scrollTop: pos}, 1000);
  });

  // Add Value to The Total Cost When Check
  //================================================
  $('.option__purchase').on('click', function () {
      
    if($(this)[0].checked) {
      
      var optionPrice1 = parseFloat($(this).val());

      var currentValue1 = parseFloat($('#totalCost').text());

      var count1 = $('#currentCount').text();
      

      $('#totalCost').text(currentValue1 + (optionPrice1 * count1));

    } else if (!$(this)[0].checked) {
      var optionPrice2 = parseFloat($(this).val());

      var currentValue2 = parseFloat($('#totalCost').text());

      var count2 = $('#currentCount').text();

      $('#totalCost').text(currentValue2 - (optionPrice2 * count2));
    }
  });

  // Calculate Count of Amount * Price
  //================================================
  $('#countOfAmount a').on('click', function () {
    calcServiceAmout($(this).text());
  });

  function calcServiceAmout(value) {
    // Checkd Options
    var totalChecked = 0;
    $('.option__purchase').each(function () {
      if($(this)[0].checked) {
        totalChecked = totalChecked + Math.floor($(this).val());
      }});
    
    var newCount = Math.floor(value);
    var servicePrice = parseFloat($('#servicePriceContainer').attr('data-price'));
    var chackedOptions = totalChecked * newCount;
    
    $('#currentCount').text(newCount);
    $('#totalCost').text(chackedOptions + (newCount * servicePrice));
  }

  // Add to Cart 
  //================================================
  $('#addServiceToCart').on('submit', function (e) {
    e.preventDefault();
    
    $('#cartNotificationCount').text(parseFloat($('#cartNotificationCount').text()) + 1);

    $('#buyBTN').attr('disabled', 'disabled').css('cursor', 'not-allowed').text('Purchased');

    $('#addToCartSubmitBtn').attr('disabled', 'disabled').css('cursor', 'not-allowed').text('In Cart!');

    toastr.success("Added to Cart successfuly.");
    
  });

  // Show Paynow Details Buttons 
  //================================================
  $('#payNowCart').on('click', function () {
    $('#paymentOptions').slideDown();
    $(this).fadeOut();
  });

  // Add New Option For the New Service
  //================================================
  var optionNumber = 0;
  $('#addOptionForServiceBtn').on('click', function () {
    
    var optionDeadline = $('#optionDeadLine').val().trim();

    var optionPrice = parseFloat($('#optionPrice').val().trim());

    var optionTitle = $('#optionTitle').val().trim();

    var optionsContainer = $('#optionsContainer');

    // Check about all Values
    if(optionDeadline && optionPrice && optionTitle) {

      var option = '<div class="option__body option__body' + optionNumber + ' row"><div class="col-md-6">' +
        '<div class="form-group mb-3"><input type="text" class="form-control" value="' + optionTitle + '" disabled><span class="form-text text-muted mx-1">Title.</span></div><div class="form-group mb-3"><input type="text" value="' + optionPrice + 
        '" disabled class="form-control"><span class="form-text text-muted mx-1">Price.</span></div>' +
        '</div><div class="col-md-6"><div class="form-group mb-3"><input type="text" value="' + optionDeadline + '" disabled class="form-control"><span class="form-text text-muted mx-1">Deadline.</span></div>' +
        '<div class="form-group my-0 py-0"><label class="option__body--delete m-1 p-2 cursor" data-option=".option__body' + optionNumber +'"><i class="flaticon-delete text-danger"></i> Delete</label> </div>';

      // Append to Options Container
      optionsContainer.append(option);

      // Reset
      $('#optionDeadLine').val('');
      $('#optionPrice').val('');
      $('#optionTitle').val('');

      // Encrease Counter
      optionNumber ++;
    }
  });

  // Delete Option
  $(document).on('click', '.option__body--delete', function () {
    $($(this).attr('data-option')).remove();
  });

  // Post new post Loading
  //================================================
  var loadingProgress = $('.post__loading .post__progress');
  var loadingWidth = 100 + '%';

  $('#postFormContainer').on('submit', function (event) {

    event.preventDefault();

    // var postHeding = $('#postHeding').val().trim();
    var postBody = $('#postBody').val().trim();

    var fileId = $('#kt_uppy_5 .kt-uppy__list .kt-uppy__list-item').attr('data-id');
    var fileStorage = 'tus-' + fileId + '-https://master.tus.io/files/';
    var fileSrc = localStorage.getItem(fileStorage);

    // console.log(fileSrc);
    var postContent = `<div class="kt-portlet kt-widget kt-widget--general-3 post__card"><div class="kt-portlet__body kt-portlet__body--fit">
      <div class="kt-widget__top py-3"><div class="kt-media kt-media--lg kt-media--circle">
      <img src="assets/media/users/100_13.jpg" alt="image"></div><div class="kt-widget__wrapper">
      <div class="kt-widget__label"><a href="#" class="kt-widget__title">Luke Davids</a>
      <span class="kt-widget__desc">React Developer</span>
      <small class="kt-widget__desc" style="font-size: smaller;">2 minutes ago</small></div></div>
      <div class="dropdown dropdown-inline"><button type="button" class="btn btn-hover-brand btn-elevate-hover btn-icon btn-sm btn-icon-md btn-circle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      <i class="flaticon-more-1"></i></button><div class="dropdown-menu dropdown-menu-right" x-placement="bottom-end" style="position: absolute; transform: translate3d(-149px, 33px, 0px); top: 0px; left: 0px; will-change: transform;">
      <a class="dropdown-item" href="#"><i class="la la-edit"></i> Edit</a><a class="dropdown-item" href="#"><i class="la la-trash"></i> Remove</a>
      <a class="dropdown-item" href="show.html"><i class="la la-info-circle"></i> Details</a></div></div></div>`
      +
      `<div class="kt-widget__top py-2"><div class="d-flex align-items-center">
      <img src="${fileSrc}" data-toggle="modal" data-target="#showPostImg" style="width: 100%; max-height: 250px;object-fit: cover;" alt="jewar"></div>`
      +
      `<p class="post__text--content mt-3" data-text="">${postBody}</p></div>
      <div class="kt-widget__bottom d-flex align-items-center py-2"><div class="kt-widget__summary">
      <div class="kt-widget__item post__reactions-container"><button class="kt-widget__hint btn post__reaction reaction1 cursor d-inline-block d mb-2 mb-sm-0" 
      data-react="like" data-liked="false" data-count="25"><i class="far fa-thumbs-up like fa-lg"></i> Like <span class="count"></span>
      </button><button class="kt-widget__hint btn post__reaction reaction2 cursor d-inline-block mb-2 mb-sm-0" 
      data-react="dislike" data-disliked="false" data-count="22"><i class="far fa-thumbs-down dislike fa-lg dislike_post"></i> Dislike <span class="count"></span>
      </button></div></div><span class="kt-widget__hint post__comments mx-1 cursor d-inline-block mb-2 mb-sm-0">
      <i class="flaticon-speech-bubble fa-lg"></i>Comment <span class="comments__count"></span></span></div>
      <div class="post__comments--container"><form action="#"><ul class="list-unstyled p-0 m-0"><li class="post__user--comment d-flex justify-content-between px-4 mx-1 my-2 py-2">
      <input type="text" class="form-control mx-2" placeholder="Your comment..."><div class="form-group flex-1 mb-2">
      <button class="btn btn-brand" type="submit">Send</button></div></li></ul></form></div></div></div>`;

      if(postBody) {

        loadingProgress.animate({width: loadingWidth}, 1500, function () {
          $('#postsContainer').prepend(postContent);
  
          $('#postHeding').val('');
          $('#postBody').val('');
          $('#kt_uppy_5 .kt-uppy__list').html('');
          $('#kt_uppy_5 .uppy-StatusBar').removeClass('is-complete').addClass('is-waiting');
          $('#kt_uppy_5 .uppy-StatusBar-progress').css('width', 0);
          

          setTimeout(function () {loadingProgress.css('width', 0)}, 200);
        });

        
      }
    

  });


  // Handle Reaction Post
  //================================================
  $(document).on('click', '.post__reaction', function () {
    $(this).toggleClass('reacted');
  });

  // More && Less For Post Text
  //================================================
  $('.post__text--content').each(function () {

    $(this).attr('data-text', $(this).text() + '<span class="less__content font-weight-bold mx-2 text-primary cursor">Less</span>');

    var limitedText = $(this).attr('data-text').slice(0, 220);
    // console.log(limitedText);
    
    var content = limitedText + '<span class="more__content mx-2 text-primary cursor">...More</span>';

    $(this).html(content);
    
    $(this).attr('data-subtext', content);

    $(document).on('click', '.post__text--content .more__content', function () {
      $(this).parent().html($(this).parent().attr('data-text'));
    });

    $(document).on('click', '.post__text--content .less__content', function () {
      $(this).parent().html($(this).parent().attr('data-subtext'));
    });
  });

  // Show Comments
  //================================================
  $(document).on('click', '.post__comments', function () {
    $(this).toggleClass('text-primary');
    $(this).parent().next('.post__comments--container').slideToggle();
  });
  

  // Show Popup Post's Image
  //================================================
  $(document).on('click', '[data-target="#showPostImg"]', function() {
    $('#showPostImg').find('img').attr('src', $(this).attr('src'));
  });

  // Handle Profile Tabs
  //==========================================
  $('#customTabsNav li').on('click', function () {

    $('#customTabsNav li').removeClass('active');

    $(this).addClass('active');

    $('#customTabsProfile .tab-pane').removeClass('show active');

    $($(this).find('a').attr('data-toggle')).addClass('show active');

  });

  // Toggle Between Login and Register
  //====================================
  $('.login-control').on('click', function () {

    $('.login-control-container').removeClass('show active');

    $($(this).attr('data-toggle')).addClass('show active');

  });






  

  toastr.options = {
    "closeButton": false,
    "debug": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-bottom-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  };
  
  

});