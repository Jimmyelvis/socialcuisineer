	import axios from 'axios';

  // Pages
  import Homepage from './modules/HomePage';
  import ProfilePage from './modules/ProfilePage'
  import SettingsPage from './modules/SettingsPage'
  import FriendRequests from './modules/FriendsReqPage';
  import PostDetail from './modules/PostDetail';
  import Login from './modules/Login';


  import AddFriend from './modules/AddFriend';
  import RemoveFriend from './modules/RemoveFriend';
  import MenuBtns from './modules/MenuBtns';

  import Parallax from './modules/Parallax';

  // Pages
  const homepage = new Homepage();
  const profilepage = new ProfilePage();
  const settingspage = new SettingsPage(); 
  const friendsreq = new FriendRequests();
  const postdetail = new PostDetail();
  const login = new Login();


  const addfriend = new AddFriend();
  const removeFriend = new RemoveFriend();
  const menuBtns = new MenuBtns();
  
  const parallax = new Parallax();

 