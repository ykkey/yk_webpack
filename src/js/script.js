import "../sass/style.scss";

import additionCalculator from './modules/addition-calculator';
// 画像の読み込み
import imagesLoadListener from './modules/imagesLoadListener';
import scrollFadeIn from './modules/scrollfadein.js';


window.addEventListener('load', function () {
    console.log("fini load");
    new scrollFadeIn();
});