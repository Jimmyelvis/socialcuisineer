const body = document.querySelector('body');
const icon = document.querySelector('.icon');

const mobilemenu = document.querySelector('.mobilemenu');
const mobilelinks = document.querySelector('.mobilelinks');
const mobileClose = document.querySelector('.mobileClose');


/**
 *  Mobile menu links that contain click event listeners
 *  to display the associated sub menu
 */
const requests = document.querySelector('#requests');
const notifications = document.querySelector('#notifications');
const messages = document.querySelector('#messages');
const searchLink = document.querySelector('#searchLink');



const sidenav = document.querySelector('.sidenav');

/**
 *  The sub menus that are displayed when a user clicks
 *  on an associated link
 */
const friendsRequests = document.querySelector('.friendsRequests');
const notificationsMenu = document.querySelector('.notifications');
const messagesMenu = document.querySelector('.messages');
const searchSection = document.querySelector('.searchSection');

const container = document.querySelector('.container');

const backarrow = document.querySelectorAll('.backArrow');

const windowHeight = window.innerHeight;

// Search Mobile
// const searchLink = document.getElementById("searchLink")

/**
 *  A flag to detest whether the main mobile menu is 
 *  displayed
 ** The default state is false
 */
let visibleMainMenu = false;


loadEventListeners();

/**
 * Load all event listeners
 */
function loadEventListeners() {

  mobilemenu.style.height = document.body.clientHeight;


  icon.addEventListener('click', showmobilemenu)
  mobileClose.addEventListener('click', closeMobileMenu)
  requests.addEventListener('click', showRequests)
  notifications.addEventListener('click', showNotifications)
  // messages.addEventListener('click', showMessages)
  searchLink.addEventListener('click', showSearch)

  backarrow.forEach((arrow) => {
    arrow.addEventListener('click', backtoNav)
  })
}


/**
 * * This will watch for when the window height changes
 * When it does this function will run on the .mobilemenu class
 * this will ensure that the background height will always be 100%
 * * This will only run when none of the links in the menu are
 * * selected which is why first check to see if none of
 * * the submenus are selected
 */
const resizeObserver = new ResizeObserver(entries => {


  if (visibleMainMenu ) {
    console.log('Body height changed:', entries[0].target.clientHeight)
    mobilemenu.clientHeight = document.body.clientHeight

    console.log("===============mobilemenu.clientHeight =====================");
    console.log(mobilemenu.clientHeight);
    console.log('====================================');

     console.log(
       "===============document.body.clientHeight ====================="
     );
     console.log(document.body.clientHeight);
     console.log("====================================");
  }
})

/**
 * Start observing a DOM node
 * */ 
resizeObserver.observe(document.body)


/**
 *  @param elem 
 * 
 *  When a mobile link is clicked a there is 
 *  an associated sub menu, this function will be
 *  ran. The associate submenu is passed in as elem
 * 
 */
function fadeoutSideNav(elem) {

   if (!sidenav.classList.contains('fadeRemove')) {
    sidenav.classList.add('fadeRemove');

    mobilemenu.style.height = "100%" // may need to escape this

    window.setTimeout(() => {
      sidenav.style.display = "none"

      if(!elem.classList.contains('.fadeAdd')) {
        elem.style.display="block";
        elem.classList.add('fadeAdd')
        body.style.overflowY="visible";
        container.style.position="fixed";
        mobilemenu.style.overflowY="visible"
        mobilemenu.style.height = elem.clientHeight + 200 + "px";
        mobilemenu.style.minHeight = "100%"
       
      }

       /**
     * Temporarily set the mobilemenu height to auto
     * * This is because the height of the sub menus will 
     * * be higher than the (mobilemenu) height
     */
      // mobilemenu.style.height = 'auto';
      visibleMainMenu = false;




    }, 900);

  }

}

function showRequests() {

  /**
   *  Calls the fadeoutSideNav function
   *  Passes in the appropriate submenu as a parameter
   */
  fadeoutSideNav(friendsRequests)
}

function showNotifications() {

    /**
     *  Calls the fadeoutSideNav function
     *  Passes in the appropriate submenu as a parameter
     */
  fadeoutSideNav(notificationsMenu)
}

function showMessages() {

  /**
   *  Calls the fadeoutSideNav function
   *  Passes in the appropriate submenu as a parameter
   */
  fadeoutSideNav(messagesMenu)

}

function showSearch() {

  if (!sidenav.classList.contains('fadeRemove')) {
    sidenav.classList.add('fadeRemove');

    window.setTimeout(() => {
      sidenav.style.display = "none"

      if(!searchSection.classList.contains('.fadeAdd')) {
        searchSection.style.display="block";
        searchSection.classList.add('fadeAdd')
        body.style.overflowY="visible";
        container.style.position="fixed";

      }

       /**
     * Temporarily set the mobilemenu height to auto
     * * This is because the height of the sub menus will 
     * * be higher than the (mobilemenu) height
     */
      visibleMainMenu = false;




    }, 900);

  }
}

  /**
   *  Closes the mobile menu
   */
function closeMobileMenu() {
  if (mobilemenu.classList.contains('showmobilemenu')) {

    window.setTimeout(() => {
      mobilemenu.style.display=null;
    }, 700)
    
    mobilemenu.classList.remove('showmobilemenu');
    container.style.position="relative";
    backtoNav()
    body.style.overflowY=null;

  }
}

 /**
   *  Closes the mobile menu
   */
function showmobilemenu() {
  if (!mobilemenu.classList.contains('showmobilemenu')) {

    /*
      In case the user has scrolled down further than the
      contents of the mobile menu, scroll automatically
      to the top before showing the menu
    */
    window.scrollTo(0, 0);

    window.setTimeout(() => {
      mobilemenu.classList.add('showmobilemenu');
    }, 300)

    mobilemenu.style.display="flex";
    body.style.overflowY="hidden";
    container.style.position = "fixed";
    visibleMainMenu = true;



  }
}


 /**
   *  Returns the user back to the main mobile nav
   */

function backtoNav () {

   let elements = [
    friendsRequests, notificationsMenu, messagesMenu, searchSection
  ]

  elements.forEach(element => {
    if (element.classList.contains('fadeAdd')) {
      element.classList.remove('fadeAdd')

       window.setTimeout(() => {
        element.style.display=null

         if (sidenav.classList.contains('fadeRemove')) {

           window.setTimeout(() => {
             sidenav.classList.remove('fadeRemove');
           }, 300);

           sidenav.style.display = "flex"

         }
      }, 900);

      body.style.overflowY="hidden";
      container.style.position="relative";
      mobilemenu.style.overflowY=null;
      mobilemenu.style.height ="100%"
    }
    
  });

  // mobilemenu.style.height = document.body.clientHeight;
  visibleMainMenu = true;

}