import home from "./components/home/home";
import discover from "./components/discover/discover";
import artist from "./components/artist/artist";
import favorites from "./components/favorites/favorites";
import about from "./components/about/about";

export const routes = [
    { path: '', component: home },
    { path: '/discover', component: discover },
    { path: '/artist', component: artist },
    { path: '/favorites', component: favorites },
    { path: '/about', component: about }
];
