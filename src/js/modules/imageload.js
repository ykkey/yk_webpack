// 画像読み込み制御
export default class imageLoad {
  constructor(opts = {}) {
    this.targetElement = opts.targetElement;
    this.targetImageUrl = opts.targetImageUrl;
    var elNum = this.targetElement ? this.targetElement.length : 0;
    var imgNum = this.targetImageUrl ? this.targetImageUrl.length : 0;
    this.ALLNUM = elNum + imgNum;
    this.CNT = 0;
    this.loadUrlImage();
    this.callback = opts.callback;
  }

  loadUrlImage() {
    if (!this.targetImageUrl.length) return false;
    for(var i = 0; i < this.targetImageUrl.length; i++) {
      // var target_img = document.createElement("img")
      this.loadimage(this.targetImageUrl[i]);
    }
  }

  loadimage(target_img) {
    var img = new Image();
    img.addEventListener("load", () => {
      this.counter();
    },false);
    img.addEventListener("error", () => {
      this.counter();
    },false);
    img.src = target_img;
  }

  counter() {
    this.CNT++;
    if (this.CNT >= this.ALLNUM) {
      this.callback();
    }
  }
}