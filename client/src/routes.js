import home from "./components/home/home";
import library from "./components/library/library";
import discover from "./components/discover/discover";
import artist from "./components/artist/artist";

export const routes = [
    { path: '', component: home },
    { path: '/library', component: library },
    { path: '/discover', component: discover },
    { path: '/artist', component: artist }
];
