import VueRouter from 'vue-router';
import MainActivity from "../pages/MainActivity/MainActivity";
import Friends from '../pages/MainActivity/Friends/ShowFriends';
import AddFriends from '../pages/MainActivity/Friends/AddFriends'
import LogIn from "../pages/Account/LogIn";
import SignIn from "../pages/Account/SignIn";
import Account from "../pages/Account/Account";
import EditProfile from "../pages/EditProfile/EditProfile";
import Setting from "../pages/Setting/Setting";
import About from "../pages/About/About";

export default new VueRouter({
  routes: [
    { path: '/', redirect: {name: 'main'} },
    {
      path: '/main',
      component: MainActivity,
      children: [
        {path: 'friends', name: 'main', component: Friends},
        {path: 'addFriends', name: 'addFriends', component: AddFriends}
      ]
    },
    {
      path: '/account',
      component: Account,
      children: [
        {path: 'login', name: "login", component:LogIn },
        {path: 'signin', name: "signin", component: SignIn},
      ]

    },
    { path: '/editProfile', name: 'edit', component: EditProfile },
    { path: '/setting', name: 'setting', component: Setting },
    { path: '/about', name: 'about', component: About }
  ]
})
