$(document).ready(function () {

  // Init Simple Scroll Plugin ==============
  new SimpleBar($("#chatbotScroll")[0]);

  // Define Elements ===============
  var messageContainer = $("#chatboxMessages"); // Messeging Container

  var textInput = $("#msgFromUser"); // Textarea Input Typing

  // Scroll to The Bottom Function
  var boxHeight = 400;
  function scrollToBottom() {
    boxHeight += messageContainer.height() * 2;

    $(".chatbot-scroll, .simplebar-content-wrapper").animate({
      scrollTop: boxHeight
    }, 1700);
  }

  // Loading Message Function
  function typingMessage() {
    $(".chatbox__typing").css("display", "inline-block");
    setTimeout(function () {
      $(".chatbox__typing").remove();
      $(".typing-target").removeClass('typing-target');
      scrollToBottom();
      // document.getElementById('msgAnswerAudio').play();
    }, 2500);
  }

  // Adding Options == You Can Add More
  var options = [
    {content : 'hello', image: 'beautiful-flower-48.png'},
    {content : 'we', image: false},
    {content : '45', image: 'guarantee-64.png'}
  ];

  // Add Answer Function ======================
  function addAnswer(answerText) {

    // Define Answer
    var answerContent = '<div class="chatbox__message chatbox__message--appending1 chatbox__message--bot">' +
        '<div class="chatbox__user"><span class="chatbox__user--media"><img src="/assets/media/users/100_1.jpg" width="40" alt="jewar"></span> ' + 
        '<span class="chatbox__datetime typing-target">30 Seconds</span><span class="chatbox__typing mx-2">' +
        ' <span></span> <span class="now2"></span> <span class="now3"></span> </span> </div>' +
        '<div class="chatbox__text typing-target">'  +  answerText  +  '</div></div><div class="clear-fix"></div>';
      
    // Append Into Messages Container
    messageContainer.append(answerContent);

    setTimeout(function () {
      $(".chatbox__message").removeClass('chatbox__message--appending1');
      typingMessage();
    }, 1500);

  }

  // Add Question Function ====================
  function addQuestion(reply) {
    var message =  '<div class="chatbox__message wrap chatbox__message--appending chatbox__message--user">' +
              '<div class="chatbox__user"><span class="chatbox__datetime">30 Seconds</span>' +
              '</div><div class="chatbox__text">' +  reply  +  '</div></div><div class="clear-fix"></div>';

    messageContainer.append(message);

    scrollToBottom();

    // Call add Answer Function
    addAnswer('Hi!', options);

    textInput.val('').blur();
  }

  // Fire the Function
  $("#submitReplyBtn").on("click", function () {
    var reply = textInput.val().trim().replace(/\n/g, "<br>");
    if(reply) {
      addQuestion(reply);
      textInput.val('');
      
      setTimeout(function () {
        $(".chatbox__message").removeClass('chatbox__message--appending');
        document.getElementById('msgSentAudio').play();
      }, 400);

    }
  });


  // Toggle Between Enter Key as a New line And as a Submit Button =============
  var newLine = false;
  var reply = '';

  textInput.on("keydown", function (event) {

    reply = textInput.val().trim().replace(/\n/g, "<br>");

    if(event.which === 13 && !newLine) {

      event.preventDefault();

      if(reply) { //chck

        addQuestion(reply);

        textInput.val('').blur();
        
        setTimeout(function () {
          $(".chatbox__message").removeClass('chatbox__message--appending');
        }, 400);
        // Reset
        reply = '';
      } 
    }

  });

  // Open Upload Image ===================================
  $("#uploadImgBtn").on("click", function () {
    $("#uploadImgContainer").addClass('open-upload');
    $("#uploadImgContainer").parent('.popup-container').addClass('show');
  });

  // Fire Preview Image Function
  $("#chatUploadInput").on("change", function (e) {
    readImages(e.target);
  });

  // Preview Image to Upload Function=====================
  var uploadedImage = '';
  var fileUploadingType = '';
  function readImages(input) {
    
    // File Type
    var filesType = ["image/png", "image/jpg", "image/svg", "image/svg+xml", "image/gif", "image/jpeg"];

      if(!filesType.includes(input.files[0].type)) {
        fileUploadingType = '';
        console.log("Not Supported File Type!");
        $(".chatbox__uploading-error").html('<span class="d-inline-block text-danger mt-5">Not Supported File Type!</span>');
      } else {
        fileUploadingType = input.files[0].type;
        $(".chatbox__uploading-error").html('');
      }
    
    if (input.files && input.files[0] && fileUploadingType) {

      var reader = new FileReader();

      // On File Load
      reader.onload = function (e) {

        $('#uploadingPreview').attr('src', e.target.result);

        // Assign the Current Uploaded Image
        uploadedImage = e.target.result;

        // Change Uploading Image Name
        $('#imagUploadingTitle').html(input.files[0].name);
      };

      // Read The File
      reader.readAsDataURL(input.files[0]);
    }
  }

  // Reply by Image Uploaded Function
  function replyByImage(image) {

    // Check for the Uploaded Image 
    if(image && fileUploadingType) {
      var reply = `<div class="text-center">
                    <img src="${image}" class="img-fluid chatbox__image--uploaded" alt="image">
                  </div>`;

      // Call addQuestion Function to Append the Uploaded Image
      addQuestion(reply);

      // Scroll to the Last Message
      scrollToBottom();

      // Animate the Message
      setTimeout(function () {

        $(".chatbox__message").removeClass('chatbox__message--appending');

        document.getElementById('msgSentAudio').play();

        // Rest Upload Image
        cancelUploadedImg();
      }, 500);
      
    }
  }

  // Cancel Upload Image Function
  function cancelUploadedImg() {
    // Close Upload Box
    $("#uploadImgContainer").removeClass('open-upload');

    $("#uploadImgContainer").parent('.popup-container').removeClass('show');

    // Reset the Default Preview Image
    $('#uploadingPreview').attr('src', $('#uploadingPreview').attr('data-default'));

    // Reset Image Title
    $('#imagUploadingTitle').html($('#imagUploadingTitle').attr('data-text'));

    // Reset Uploaded Image
    $("#chatUploadInput").val('');
  }

  // Fire Replay By Image Function
  $("#replyByImgBtn").on("click", function () {
    replyByImage(uploadedImage);
    cancelUploadedImg();
  });

  // Cancel Upload Image
  $("#cancelUploadImg").on("click", function () {
    cancelUploadedImg();
  });

  // Uploaded Image Show Full screen in Chatbox====================
  $(document).on("click", ".chatbox__image--uploaded", function () {
    $("#uploadImgShow").addClass("show-uploaded-img");
    $("#uploadImgShow").parent('.popup-container').addClass("show");
    $("#previewImage").attr("src", $(this).attr('src'));
  });

  // Close Show Image Container
  $("#cancelImgShow").on("click", function () {
    $("#uploadImgShow").removeClass("show-uploaded-img");
    $("#uploadImgShow").parent('.popup-container').removeClass("show");
  });

});
