$(document).ready(function() {


    $('.button_holder').on('click', function() {
       document.search_form.submit();
    })


  	//Button for profile post
  	$('#submit_profile_post').click(function(){

      $.ajax({
        type: "POST",
        url: "includes/handlers/ajax_submit_profile_post.php",
        data: $('form.profile_post').serialize(),
        success: function(msg) {
  				$("#post_form").modal('hide');
  				location.reload();
  			},
        error: function() {
  				alert('Failure');
  			}
      });

    });


});

/*
  When you click away from the elements below
  the results will get removed
*/
$(document).click(function(e){

  if(e.target.class != "searchResultsbox" && e.target.id != "searchBox") {

    $('.searchBox').val("");
    $(".searchResultsbox").html("");
    $('.search_results_footer').html("");
    $('.search_results_footer').toggleClass("search_results_footer_empty");
    $('.search_results_footer').toggleClass("search_results_footer");
  }

  if(e.target.className != "dropdown_data_window") {

    $(".dropdown_data_window").html("");
    $(".dropdown_data_window").css({"padding" : "0px", "height" : "0px"});
  }

  if ($('.searchBox').val("")) {
    $(".searchResultsbox").css({"padding" : "0px"});

  }

});

function getUsers(value, user) {
	$.post("includes/handlers/ajax_friend_search.php", {query:value, userLoggedIn:user}, function(data) {
		$(".results").html(data);
	});
}

function getDropdownData(user, type) {

  var pageName;

    if (type == 'notification') {
      pageName = "ajax_load_notifications.php";
      $("span").remove("#unread_notification");
    } else if (type == 'message') {
      pageName = "ajax_load_messages.php";
      $("span").remove("#unread_message");
    } else if (type == 'friendReqs') {
      pageName = "ajax_load_friendReqs.php";
    }

    var ajaxreq = $.ajax({
      url: "includes/handlers/" + pageName,
      type: "POST",
      data: "page=1&userLoggedIn=" + user,
      cache: false,

      success: function(response) {
        
        if (pageName == 'ajax_load_messages.php') {
          $(".messagesDesktop .content .entries .simplebar-content").html(response);
          
        } 
        
        else if(pageName == 'ajax_load_notifications.php') {

          if (".notificationsDesktop .content .entries .simplebar-content") {
            $(".notificationsDesktop .content .entries .simplebar-content").html(response);
         
          }
          
        }

        else if (pageName == 'ajax_load_friendReqs.php') {
          $(".friendsRequestsDesktop .content .entries .simplebar-content").html(response);
        }

        $("#dropdown_data_type").val(type);

      }

    });

}

function getDropdownDataMobile(user, type) {

  var pageName;

    if (type == 'notification') {
      pageName = "ajax_load_notifications.php";
      $("span").remove("#unread_notification");
    } else if (type == 'message') {
      pageName = "ajax_load_messages.php";
      $("span").remove("#unread_message");
    } else if (type == 'friendReqs') {
      pageName = "ajax_load_friendReqs.php";
    }

    var ajaxreq = $.ajax({
      url: "includes/handlers/" + pageName,
      type: "POST",
      data: "page=1&userLoggedIn=" + user,
      cache: false,

      success: function(response) {
        
        if (pageName == 'ajax_load_messages.php') {
          $(".messages .entries ").html(response);
          
        } 
        
        else if(pageName == 'ajax_load_notifications.php') {

          if (".notifications .entries") {
            $(".notifications .entries").html(response);
         
          }
          
        }

        else if (pageName == 'ajax_load_friendReqs.php') {
          $(".friendsRequests .friends").html(response);
        }

        $("#dropdown_data_type").val(type);

      }

    });

}


function getLiveSearchUsers(value, user) {

  /*
      Post ajax call for  when we access the ( includes/handlers/ajax_search.php ) page
      we will use the parameters {query:value, userLoggedIn: user}
      whatever is returned will be used in (data)
      q == the query string we are passing
  */
  $.post("includes/handlers/ajax_search.php", {query:value, userLoggedIn: user}, function(data) {



    if($(".search_results_footer_empty")[0]) {
			$(".search_results_footer_empty").toggleClass("search_results_footer");
			$(".search_results_footer_empty").toggleClass("search_results_footer_empty");
		}

    if(data != "") {

      $('.searchResultsbox').html(data);
       $('.search_results_footer').html(" <a class='heading-3' href='search.php?q=" + value + "'>See All Results</a>");
      $('.searchResultsbox').css({"paddingBottom": "20%"})
      
    }



    if(data == "") {
      $('.search_results_footer').html("");
      $('.search_results_footer').toggleClass("search_results_footer_empty");
      $('.search_results_footer').toggleClass("search_results_footer");
      $('.searchResultsbox').html("");
      $('.searchResultsbox').css({"padding": "0px"})

    }

  });

}


function getLiveSearchUsersMobile(value, user) {

  /*
      Post ajax call  when we access the ( includes/handlers/ajax_search.php ) page
      we will use the parameters {query:value, userLoggedIn: user}
      whatever is returned will be used in (data)
      q == the query string we are passing
  */
  $.post("includes/handlers/ajax_search_mobile.php", {query:value, userLoggedIn: user}, function(data) {

    if($(".search_results_footer_empty")[0]) {
			$(".search_results_footer_empty").toggleClass("search_results_footer");
			$(".search_results_footer_empty").toggleClass("search_results_footer_empty");
		}

    if(data != "") {

     $('.searchResultsbox').html(data);
       $('.search_results_footer').html(" <a class='heading-3' href='search.php?q=" + value + "'>See All Results</a>");
      $('.searchResultsbox').css({"paddingBottom": "20%"})
    }


    if(data == "") {
      $('.search_results_footer').html("");
      $('.search_results_footer').toggleClass("search_results_footer_empty");
      $('.search_results_footer').toggleClass("search_results_footer");
      $('.searchResultsbox').html("");
      $('.searchResultsbox').css({"padding": "0px"})
    }

  });

}



function updateLike(post_id, value) {


  const sendLike = $.post("includes/handlers/ajax_update_likes.php", 
		{
      userLoggedIn:userLoggedIn, 
      post_id:post_id, 
      like_value:value
    }, 
		function(response) {


        $('.likedby').html(response);
  })
  
}

