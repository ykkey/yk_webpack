import "../sass/style.scss";

import additionCalculator from './modules/addition-calculator';

var item1Price = 400;
var item2Price = 600;
var totalPrice = additionCalculator(item1Price, item2Price);
console.log(totalPrice);