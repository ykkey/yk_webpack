import "../sass/style.scss";

console.log("test");
import imageLoad from './modules/imageLoad';
import scrollFadeIn from './modules/scrollfadein.js';
const PATH_IMG = "/lp/yariscross/assets/img/";
var pre = window.devicePixelRatio >= 2 ? ((window.innerWidth || document.documentElement.clientWidth || 0) < 835 ? "_sp" : "@2x") : "";
new imageLoad({
    targetImageUrl : [
        PATH_IMG + `mv/bg_fv.jpg`,
        PATH_IMG + `mv/img_car.png`,
        PATH_IMG + `mv/txt_title${pre}.png`,
        PATH_IMG + `mv/txt_debut.png`,
        PATH_IMG + `mv/bg_scroll.png`,
        PATH_IMG + `mv/bg_fixed.png`,
    ],
    callback: function() {
        setTimeout(() => {
            document.getElementsByClassName("p-lpyaris__mv")[0].classList.add("is-lpyaris_fadeIn");
        },300);
    }
});

window.addEventListener('load', function () {
    new scrollFadeIn();
});