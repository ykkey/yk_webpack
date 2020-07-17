
var imagesLoadListener = (function() {
    var imageCollector = function(expectedCount, completeFn) {
        var receivedCount = 0;
        return function() {
            receivedCount++;
            if(receivedCount === expectedCount) {
                completeFn();
            }
        };
    };
    var imagesLoadListener = function(element, callback) {
        var images = element.querySelectorAll('img');
        if(images === null) {
            callback();
            return;
        }
        //画像の数だけloadListenerが呼ばれたらcallbackが呼ばれる;
        var loadListener = imageCollector(images.length, callback);
        Array.prototype.forEach.call(images, function(img) {
            if(img.complete) {
                loadListener();
            }else {
                img.onload = loadListener;
            }
        });
    };
    return imagesLoadListener;
})();