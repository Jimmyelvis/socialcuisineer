	// Main entry point for webpack hot module replacement
// This file imports all the modules that should be hot-reloadable

// Import your main JavaScript modules here
import './pages/HomePage.js';
import './pages/ProfilePage.js';
import './pages/PostDetailPage.js';
import './pages/Login.js';
import './pages/FriendsReqPage.js';
import './pages/SettingsPage.js';
import './pages/EditPost.js';
import './modules/AddFriend.js';
import './modules/DeletePost.js';
import './modules/MenuBtns.js';
import './modules/Parallax.js';
import './modules/RemoveFriend.js';
import './ajaxcalls.js';

// Enable Hot Module Replacement
if (module.hot) {
  module.hot.accept();
}