export default class scrollFadeIn {
    constructor(opts = {}) {
        this.PositionLists = [];
        this.CLASS_ANI = "is-lpyaris_fadeIn";
        this.getWindowSize();
        this.init();
        this.handle();
    }

    init() {
        // setting
        const elements = document.getElementsByClassName("js-lpyarisFadeIn");
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        for (var i = 0; i < elements.length; i++) {
            let element = elements[i];
            let rect = element.getBoundingClientRect();
            this.PositionLists[i] = {
                index: i,
                top: rect.top + scrollTop,
                elm: element,
                flg_fadein: true,
                flg_first: true,
                interval: false
            }
        }
    }
    handle() {
        // scroll
        const _self = this;
        let timer = 0;
        window.addEventListener('scroll', (e) => {
            _self.scrollEvent();
        });
        _self.scrollEvent();
        window.addEventListener('resize', (e) => {
            if (timer > 0) {
                clearTimeout(timer);
            }
            timer = setTimeout(function () {
                _self.resize();
            }, 200);
        })
    }

    getWindowSize() {
        this.windowHeight = (window.innerHeight || document.documentElement.clientHeight || 0);
    }
    resize() {
        // サイズの計算し直し
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        for (var i = 0; i < this.PositionLists.length; i++) {
            let rect = this.PositionLists[i].elm.getBoundingClientRect();
            this.PositionLists[i].top = rect.top + scrollTop;
        }
    }

    scrollEvent() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollFlgTop = scrollTop + (this.windowHeight / 4 * 3);
        for (var i = 0; i < this.PositionLists.length; i++) {
            let value = this.PositionLists[i];
            if (value.flg_first && scrollFlgTop > value.top) {
                value.flg_first = false;
                this.startAni(value.index);
            }
        }
    }
    startAni(index, flg_fadein = 1) {
        let value = this.PositionLists[index];
        if (value.elm.classList.contains(this.CLASS_ANI)) {
            return false;
        } else {
            value.elm.classList.add(this.CLASS_ANI);
        }

    }
}