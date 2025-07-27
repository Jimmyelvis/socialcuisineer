const Recipes = document.querySelector("#Recipes");
const Users = document.querySelector("#Users");
const RecipesMobile = document.querySelector("#RecipesMobile");
const UsersMobile = document.querySelector("#UsersMobile");

var searchOptionSelected;
var allResults;

if (Users.checked) {
  searchOptionSelected = "Users";
} else if (Recipes.checked) {
  searchOptionSelected = "Recipes";
} else if (UsersMobile.checked) {
  searchOptionSelected = "Users";
} else {
  searchOptionSelected = "Recipes";
}



Recipes.addEventListener("click", function (e) {
  searchOptionSelected = e.target.value
});

Users.addEventListener("click", function (e) {
  searchOptionSelected = e.target.value;
});

RecipesMobile.addEventListener("click", function (e) {
  searchOptionSelected = e.target.value;
});

UsersMobile.addEventListener("click", function (e) {
  searchOptionSelected = e.target.value;
});

document.getElementById('submit_profile_post')?.addEventListener('click', async function(e) {
  e.preventDefault();
  const form = document.querySelector('form.profile_post');
  const formData = new FormData(form);

  try {
    const response = await fetch('includes/handlers/ajax_submit_profile_post.php', {
      method: 'POST',
      body: formData
    });
    
    const data = await response.json();
    
    if (data.status === 'success') {
      document.getElementById('post_form').style.display = 'none';
      location.reload();
    } else {
      alert(data.message || 'Error submitting post');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Error submitting post');
  }
});

$(document).ready(function() {

  $('.button_holder').on('click', function() {
    document.search_form.submit();
  })

});

/*
  When you click away from the elements below
  the results will get removed
*/
// $(document).click(function(e){

//   if(e.target.class != "searchResultsbox" && e.target.id != "searchBox") {

//     $('.searchBox').val("");
//     $(".searchResultsbox").html("");
//     $('.search_results_footer').html("");
//     $('.search_results_footer').toggleClass("search_results_footer_empty");
//     $('.search_results_footer').toggleClass("search_results_footer");
//   }

//   if(e.target.className != "dropdown_data_window") {

//     $(".dropdown_data_window").html("");
//     $(".dropdown_data_window").css({"padding" : "0px", "height" : "0px"});
//   }

//   if ($('.searchBox').val("")) {
//     $(".searchResultsbox").css({"padding" : "0px"});

//   }

// });

async function updateLike(post_id, value) {
  try {
    const response = await fetch('includes/handlers/ajax_like.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        post_id: post_id,
        value: value
      })
    });

    const data = await response.json();
    
    if (data.status === 'success') {
      // Update like button and count
      const likeButton = document.querySelector(`[data-post-id="${post_id}"] .likeButton`);
      const likeCount = document.querySelector(`[data-post-id="${post_id}"] .likeCount`);
      
      if (likeButton) {
        likeButton.classList.toggle('liked', value === 1);
      }
      
      if (likeCount && data.data.likes_for_post) {
        likeCount.textContent = data.data.likes_for_post;
      }
    } else {
      alert(data.message || 'Error updating like');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Error updating like');
  }
}

async function getUsers(value, user) {
  try {
    const response = await fetch('includes/handlers/ajax_friend_search.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: value,
        userLoggedIn: user
      })
    });

    const data = await response.json();
    
    if (data.status === 'success') {
      document.querySelector('.results').innerHTML = data.data.html;
    } else {
      console.error(data.message);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

async function getDropdownData(user, type) {
  try {
    const response = await fetch('includes/handlers/ajax_load_notifications.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user: user,
        type: type
      })
    });

    const data = await response.json();
    
    if (data.status === 'success') {
      const dropdownElement = document.querySelector('.dropdown_data_window');
      if (dropdownElement) {
        dropdownElement.innerHTML = data.data.html;
        dropdownElement.style.padding = '0px';
        dropdownElement.style.height = '280px';
      }
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

async function getLiveSearchUsers(value, user) {

  /*
      Post ajax call for when we access the search handlers
      we will use the parameters {query:value, userLoggedIn: user}
      The handlers now return JSON data instead of HTML
  */

  if (searchOptionSelected == "Users") {
    var option = "includes/handlers/ajax_search.php";
    allResults = "searchallusers";
  } else {
    var option = "includes/handlers/ajax_search_recipes.php";
    allResults = "searchallposts";
  }

  try {
    const response = await fetch(option, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: value,
        userLoggedIn: user
      })
    });

    const data = await response.json();
    
    // Get DOM elements once instead of querying multiple times
    const searchResultsBox = document.querySelector('.searchResultsbox');
    const searchResultsFooter = document.querySelector('.search_results_footer');
    
    
    if (data.status === 'success') {




      if (searchResultsBox) {
        searchResultsBox.innerHTML = '';
        searchResultsBox.style.padding = '0px';
      }


      let htmlContent = '';
      let totalResults = '';
      
      if (data.data.type === 'users') {
        // Generate HTML for users
         htmlContent = data.data.users;

        if (htmlContent && htmlContent.length > 0) {
          
          htmlContent.forEach(user => {

            /*html*/
            const html = `
              <a href='${user.url}' class='users-entry'>
                <div class='avatar'>
                  <img src='${user.profile_pic}'>
                </div>

                <div class='userInfo'>
                  <h3 class='heading-3 name'>
                    ${user.first_name} ${user.last_name}
                  </h3>
                  <h4 class='heading-4 username'>
                    ${user.username}
                  </h4>

                  <span class='common'>
                    ${user.mutual_friends}
                  </span>
                </div>

                <div class='block'></div>
              </a>
            `;

            searchResultsBox.innerHTML += html; 
            searchResultsBox.style.paddingBottom = '20%';
          })  
        }

        totalResults = data.data.users.length;
        
      } 
      
      else if (data.data.type === 'recipes') {
       
        let htmlContent = data.data.recipes;

        if(htmlContent && htmlContent.length > 0) {
          
          htmlContent.forEach(recipe => {

            /*html*/
            const html = `
              <a href='${recipe.url}' class='posts-entry'>
                <div class='post-pic'>
                  <img src='${recipe.image}'>
                </div>

                <div class='post-info'>
                  <h3 class='heading-3 headline'>
                    ${recipe.heading}
                  </h3>

                  <div class='userInfo'>
                    <div class='avatar'>
                      <img src='${recipe.author.profile_pic}'>
                    </div>

                    <div class='author'>
                      <h3 class='heading-3 name'>
                        By: ${recipe.author.first_name} ${recipe.author.last_name}
                      </h3>

                      <h3 class='heading-4 username'>
                        @${recipe.author.username}
                      </h3>
                    </div>
                  </div>
                

                
                </div>

                <div class='block'></div>
              </a>
            `;
            
            searchResultsBox.innerHTML += html; 
            searchResultsBox.style.paddingBottom = '20%';
          })
        }

        totalResults = data.data.recipes.length;  

      }

      if (totalResults > 0) {
        searchResultsFooter.innerHTML = `${totalResults} results`;
      }
      

    }
  } catch (error) {
    console.error('Error:', error);
  }
}



// async function getLiveSearchUsersMobile(value, user) {

//   /*
//       Post ajax call  when we access the ( includes/handlers/ajax_search.php ) page
//       we will use the parameters {query:value, userLoggedIn: user}
//       whatever is returned will be used in (data)
//       q == the query string we are passing
//   */


//      if (searchOptionSelected == "Users") {
//        var option = "includes/handlers/ajax_search_mobile.php";
//        allResults = "searchallusers";
//      } else {
//        var option = "includes/handlers/ajax_search_recipes_mobile.php";
//        allResults = "searchallposts";
//      }


//   try {
//     const response = await fetch(option, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         query: value,
//         userLoggedIn: user
//       })
//     });

//     const data = await response.json();
    
//     if (data.status === 'success') {
//       if($(".search_results_footer_empty")[0]) {
//         $(".search_results_footer_empty").toggleClass("search_results_footer");
//         $(".search_results_footer_empty").toggleClass("search_results_footer_empty");
//       }

//       $('.searchResultsbox').html(data.data.html);
//       $('.search_results_footer').html(" <a class='heading-3' href='" + allResults + ".php?q=" + value + "'>See All Results</a>");
//       $('.searchResultsbox').css({"paddingBottom": "20%"})
//     } else {
//       $('.search_results_footer').html("");
//       $('.search_results_footer').toggleClass("search_results_footer_empty");
//       $('.search_results_footer').toggleClass("search_results_footer");
//       $('.searchResultsbox').html("");
//       $('.searchResultsbox').css({"padding": "0px"})
//     }
//   } catch (error) {
//     console.error('Error:', error);
//   }
// }
