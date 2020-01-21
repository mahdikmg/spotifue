import home from "./components/home/home";
import discover from "./components/discover/discover";
import artist from "./components/artist/artist";
import favorites from "./components/favorites/favorites";
import about from "./components/about/about";
import result from "./components/discover/result";
import seed from "./components/discover/seed";
import artistProfile from "./components/artist/artistProfile";
import searchArtist from "./components/artist/searchArtist";

export const routes = [
    { path: '', component: home },
    { path: '/discover', component: discover, children: [
        { path: '', component: seed },
        { path: 'result', component: result }
    ] },
    { path: '/artist', component: artist, children: [
        { path: '', component: searchArtist },
        { path: ':id', component: artistProfile }
    ] },
    { path: '/favorites', component: favorites },
    { path: '/about', component: about }
];
