$(document).ready(function () {

  // Change Chatbot Colors Dynamiclly================
  // if(localStorage.chatbotTheme) {
  //   $("link[href^='css/themes/theme']").attr('href', localStorage.getItem('chatbotTheme'));

  //   $($("[data-theme='" + localStorage.getItem('chatbotTheme') + "']")[0]).siblings().removeClass('active');
  //   $($("[data-theme='" + localStorage.getItem('chatbotTheme') + "']")[0]).addClass('active');
  // }

  // $(".chatbox-nav__link-text .color-schema").on("click", function () {
  //   $(this).siblings().removeClass('active');
  //   $(this).addClass('active');

  //   localStorage.setItem('chatbotTheme', $(this).attr('data-theme'));

  //   $("link[href^='css/themes/theme.']").attr('href', localStorage.getItem('chatbotTheme'));
    
  // });

  // Show Color Schema
  // $("#colorSchemaContainer").on("click", function () {
  //   $(this).addClass('show');
  // });

  // Hide Color Schema
  // $("#chatboxDropdownToggle").on("click", function () {
  //   if($("#chatboxDropdown").hasClass('dropdown--toggle')) {
  //     $("#colorSchemaContainer").removeClass('show');
  //   }
  // });

  // Init Simple Scroll Plugin ==============
  new SimpleBar($("#chatbotScroll")[0]);

  // Change Language Function
  function changeLang() {

    // Check About The Current Language
    if($("#chatboxContainer").attr('lang') === "en") {
  
      $("#chatboxContainer").attr('lang', "ar");
      $("head").append('<link rel="stylesheet" href="css/chatbot_rtl.css">');
      $("#chatboxDropdown").toggleClass('dropdown--toggle');
      
    } else {
      
      $("#chatboxContainer").attr('lang', "en");
      $('link[href^="css/chatbot_rtl"]').remove();
      $("#chatboxDropdown").toggleClass('dropdown--toggle');

    }
  
    var dataLanguage = '';
    $("[data-lang]").each(function () {
      dataLanguage = $(this).text();
      $(this).text($(this).attr('data-lang'));
      $(this).attr('data-lang', dataLanguage);
    });
  
    var dataPlaceholder = '';
    $("[data-placeholder]").each(function () {
      dataPlaceholder = $(this).attr('placeholder');
      $(this).attr('placeholder', $(this).attr('data-placeholder'));
      $(this).attr('data-placeholder', dataPlaceholder);
    });
  }


  // Handle Change Language 
  $("#changeLanguage").on("click", function () {

    $("#chatboxContainer").removeClass('chatbox__open');
    // Loading Content Slide Down
    loadingContent();

    setTimeout(function () {
      // Fire Change Language Function
      changeLang();
    }, 1200);
    
  });

  // Toggle Chatbox Dropdown Menu ================
  $("#chatboxDropdownToggle").on("click", function () {
    $("#chatboxDropdown").toggleClass('dropdown--toggle');
  });

  // Define Elements ===============
  var messageContainer = $("#chatboxMessages"); // Messeging Container

  var textInput = $("#msgFromUser"); // Textarea Input Typing


  // Open Report Image ===========================
  $("#reportChat").on("click", function () {
    $("#reportContainer").addClass('open-report');
    $("#chatboxDropdown").removeClass('dropdown--toggle');
    $("#reportContainer").parent('.popup-container').addClass('show');
  });

  // Handle Report Submit==============================
  $("#submitReportChat").on("submit", function (e) {
    e.preventDefault();
    var reporstMsg = $("#reportMessage").val().trim();
    var reportType = $("input[name=reportType]:checked").val();
    // Check Values 
    if(reporstMsg && reportType) {
      // Handle Values Goes Here
      $("#reportStatus").html('<span class="text-white bg-success p-2">Your report has been sent.</span>');

      setTimeout(function () {$("#reportStatus").html('')}, 4000);
    } else {
      // If Empty Inputs Will Throw an Error
      $("#reportStatus").html('<span class="text-white bg-danger p-2">Something went wrong!</span>');

      setTimeout(function () {$("#reportStatus").html('')}, 4000);
    }});

  // Close Report Container
  $("#cancelReport").on("click", function () {
    $("#reportContainer").removeClass('open-report');
    $("#reportContainer").parent('.popup-container').removeClass('show');
  });

  // Handle Rgister Form Function ======================
  function registerUser(reply) {
    var message =  '<div class="chatbox__message wrap chatbox__message--appending chatbox__message--user">' +
            '<div class="chatbox__user"><span class="chatbox__datetime">30 Seconds</span>' +
            '</div><div class="chatbox__text">' +  reply  +  '</div></div><div class="clear-fix"></div>';

    messageContainer.append(message);

    scrollToBottom();

    removeTags();


    $(this).siblings('.chatbox__options--btn').fadeOut();
    // $(this).fadeOut();
    
    setTimeout(function () {
      $(".chatbox__message").removeClass('chatbox__message--appending');
      document.getElementById('msgSentAudio').play();
    }, 400);

    setTimeout(function () {
      $("#registerContainer").addClass('open-register');
      $("#registerContainer").parent('.popup-container').addClass('show');
    }, 1200);
  }

  // Handle Rgister Form Function
  $(document).on("click", ".register__option", function () {
    registerUser($(this).find('.btn-text').text());
  });

  // Close Register Form Container
  $("#cancelRegister").on("click", function () {
    $("#registerContainer").removeClass('open-register');
    $("#registerContainer").parent('.popup-container').removeClass('show');
  });

  // Loading The Content View
  function loadingContent() {
    setTimeout(function () {
      $("#chatboxLoading").slideToggle();
    }, 1500);
  }
  
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
      document.getElementById('msgAnswerAudio').play();
    }, 2500);
  }

  
  // Handle Reload Button================
  $(document).on("click", "#reloadChat", function () {
    
    // Reload Function Code Goes Here!

  });

  // Adding Options == You Can Add More
  var options = [
    {content : 'hello', image: 'beautiful-flower-48.png'},
    {content : 'we', image: false},
    {content : '45', image: 'guarantee-64.png'}
  ];

  /*
  Notes To Use Options Buttons:
  0- If You Don't Need to Insert Any Options, Just Return Options Array as an Empty Value
  1- Every Option Button has an Object of Content && Image Keys
  2- To None Image Preview, Shoud Make the Value as False
  3- To Insert Image, Shoud Make the value of the Image Name and Its Format
    and Contain the image in The right Path (current path is assets/images)
  */

  // Add Answer Function ======================
  function addAnswer(answerText, options) {

    var optionsButtons = '';
    // Looping Through Options Object
    options.forEach(function (option) {
      if(!option.image) {
        currentImg = ''
      } else {
        currentImg = '<img src="/assets/images/' + 
        option.image  + '" width="30" alt="image"></img>';
      }

      optionsButtons += '<button class="btn mx-1 chatbox__options--btn"><span class="btn-text">' + 
      option.content + '</span>' + currentImg + '</button>';
    });

    // Define Answer
    var answerContent = '<div class="chatbox__message chatbox__message--appending1 chatbox__message--bot">' +
        '<div class="chatbox__user"><span class="chatbox__user--media"><img src="/assets/images/mujib_logo.svg" width="40" alt="Mujib"></span> ' + 
        '<span class="chatbox__datetime typing-target">30 Seconds</span><span class="chatbox__typing mx-2">' +
        ' <span></span> <span class="now2"></span> <span class="now3"></span> </span> </div>' +
        '<div class="chatbox__text typing-target">'  +  answerText  +  '</div><div class="chatbox__options typing-target">' +
        optionsButtons  +  '</div></div><div class="clear-fix"></div>';
      
    // Append Into Messages Container
    messageContainer.append(answerContent);

    setTimeout(function () {
      $(".chatbox__message").removeClass('chatbox__message--appending1');
      typingMessage();
    }, 1500);

  }

  // Handle Click Options Buttons
  $(document).on("click", ".chatbox__options--btn", function () {
    
    addQuestion($(this).find('.btn-text').text());
    // Hide Buttons When Choosing One
    $(this).siblings('.chatbox__options--btn').fadeOut();
    $(this).fadeOut();
    
    setTimeout(function () {
      $(".chatbox__message").removeClass('chatbox__message--appending');
      document.getElementById('msgSentAudio').play();
    }, 400);
  });

  // Add Question Function ====================
  function addQuestion(reply) {
    var message =  '<div class="chatbox__message wrap chatbox__message--appending chatbox__message--user">' +
              '<div class="chatbox__user"><span class="chatbox__datetime">30 Seconds</span>' +
              '</div><div class="chatbox__text">' +  reply  +  '</div></div><div class="clear-fix"></div>';

    messageContainer.append(message);

    scrollToBottom();

    removeTags();

    // Call add Answer Function
    addAnswer('Welcome to Chatbot!', options);

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

      removeTags();
    }
  });


  // Handle Matched Tags When Typing==================================

  /* Just Pass all The Tags That You Want to Display into The TAGS Array */ 

  var tags = ["help", "أريد المساعدة", 
  "المنتج ممتاز","المنتج متأخر","المساعدة", 
  "اريد المساعدة", "أريد الايصال","اريد الايصال", 
  "كيف اتصل بكم؟","كيف يمكننى الحصول على الخدمة؟", 
  "chat", "hello", "حياك الله", "chatbot", "الطلبات", 
  "السلام عليكم", "كيف حالك؟", 
  "كيف استلم الايصال؟", "هلا وغلا", 
  "كيف اسجل بياناتى؟", "كيف استخدم المنتج؟",
  "كيف يمكننى الحصول على الخدمة؟ كيف يمكننى الحصول على الخدمة؟ كيف يمكننى الحصول على الخدمة؟", 
  "chat", "hello", "حياك الله", "chatbot", "الطلبات", 
  "السلام عليكم", "كيف حالك؟", 
  "كيف استلم الايصال؟", "هلا وغلا", 
  "كيف اسجل بياناتى؟", "كيف استخدم المنتج؟"];

  var outPut = $(".chatbot__output");
  var len = 1;

  textInput.on("keyup", function (e) {

    var search = textInput.val().toLowerCase();
    var matched = '';

    len = search.length;

    outPut.html('');
// Check if the letters Intered Are More Than 2 Letters
    if(search.length > 2) {
      tags.forEach(function (tag) {

        matched = tag.slice(0, len);
        var checkMatch = matched.includes(search);
       // Check if The Input is Empty
        if(search.length === 0) {
          checkMatch = false;
        }
        // Print Tags if True
        if(checkMatch) {
          document.querySelector('.chatbot__output').innerHTML += 
          '<span class="chatbox-tag">' + tag + '</span>';
        }
      });
    }
   // When Delete Letters Handle
    if(e.keyCode === 8 || e.keyCode === 46) {
      if(len === 0) {
        len = 1;
        outPut.html('');
      }}
  });

  // Handle Tags
  $(document).on("click", ".chatbox-tag", function () {

    addQuestion($(this).text());

    setTimeout(function () {
      $(".chatbox__message").removeClass('chatbox__message--appending');
      document.getElementById('msgSentAudio').play();
    }, 400);

    removeTags();

    textInput.val('').blur();
  });

  // Remove Tags Function
  function removeTags() {
    $(".chatbot__output .chatbox-tag").remove();
  }

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
          document.getElementById('msgSentAudio').play();
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

  // Handle New Line====================================
  $(".add-new-line").on("click", function () {

    $(this).toggleClass('new-line-available');

    textInput.focus();

    if($(this).hasClass('new-line-available')) {
      newLine = true;
    } else {
      newLine = false;
    }
  });

  // Load Default Chat After Append the First Message================
  defaultChat = messageContainer.html();


  // Rating Function ===============================
  function rating() {
    var rate = $("#chatboxRating").html();

    var answerContent = '<div class="chatbox__message chatbox__message--appending1 chatbox__message--bot rate-message">' +
    '<div class="chatbox__user"><span class="chatbox__user--media"><img src="/assets/images/mujib_logo.svg" width="40" alt="Mujib"></span> ' + 
    '<span class="chatbox__datetime typing-target">30 Seconds</span><span class="chatbox__typing mx-2">' +
    ' <span></span> <span class="now2"></span> <span class="now3"></span> </span> </div>' +
    '<div class="chatbox__text typing-target mt-3">'  +  rate  + '</div></div><div class="clear-fix"></div>';
  
    // Append Into Messages Container
    messageContainer.append(answerContent);

    setTimeout(function () {
      $(".chatbox__message").removeClass('chatbox__message--appending1');
      typingMessage();
    }, 1500);

    $("#chatboxRating").html('')
  } /* */

  // rating()

});
