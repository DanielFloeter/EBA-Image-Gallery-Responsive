
/*
    EBA 3x3 Responsive
    description: all-in-one image gallery
    location: javascript.EBA3x3.js
    license: GPL or MIT
    author: Daniel Flöter http://www.kometschuh.de
    version: 0.9.0.1
    date: August 26th, 2012
*/

$(document).on('ready', function () {
    //------------------------------------------------------ - - - - - - - - - ------- \../
    // image attributes
    var aImageAttr = {
        backgroundPosition: ['-164px -274px', '-66px -323px', '-390px -330px', '-480px -296px',
            '-163px -150px', '-360px -257px', '-364px -228px', '-277px -272px', '-231px -369px'],
        top: ['0', '0', '0', '200px', '200px', '200px', '400px', '400px', '400px'],
        left: ['0', '267px', '533px', '0', '267px', '533px', '0', '267px', '533px'],
        toggle: [true, true, true, true, true, true, true, true, true]
    }

    //------------------------------------------------------ - - - - - - - - - ------- \../
    // global variables
    var global = {
        nImagesCount: $(aImageAttr.toggle).toArray().length,
        nHeight: 200
    };

    //------------------------------------------------------ - - - - - - - - - ------- \../
    // init gallery height
    (function () {
        var nWidth = $(window).width();
        if (nWidth < 815) {
            global.nHeight = nWidth * 0.75 / 3;         //  <--- set global.nHeight
            $('.gallery div').css('height', global.nHeight + 'px');

        }
    })()

    //------------------------------------------------------ - - - - - - - - - ------- \../
    // adapt gallery height to image ratio (image width effects the image heights)
    $(window).resize(function () {
        var nWidth = $(window).width();
        if (nWidth < 815) {
            global.nHeight = nWidth * 0.75 / 3;         //  <--- set global.nHeight
            $('.gallery div').css('height', global.nHeight + 'px');                        
        }
    });

    //------------------------------------------------------ - - - - - - - - - ------- \../
    // for all (3x3) images
    for (var i = 0; i <= global.nImagesCount; i++) {
        $('#image' + i).click(function () {
            var j = /[0-9]{1,2}/.exec($(this).attr('id'));
            if (aImageAttr.toggle[j] == true) {
                aImageAttr.toggle[j] = false;

                $(this).stop()
                       .before('<div class="placeholder" style="height:' + global.nHeight + 'px"></div>')
                       .css({ 'z-index': '99', 'position': 'absolute', 'top': aImageAttr.top[j], 'left': aImageAttr.left[j] })
                       .animate({
                           width: '100%',
                           height: '600px',
                           top: '0',
                           left: '0'
                       }, {
                           duration: 1000,
                           easing: 'easeOutCirc',
                           complete: function () { }
                       }).find('img').animate({
                           width: '-=200%',
                           top: '0',
                           left: '0'
                       }, {
                           duration: 1000,
                           easing: 'easeOutCirc',
                           complete: function () { }
                       })
            } else {
                var jImage2 = $(this);
                aImageAttr.toggle[j] = true;
                jImage2.stop()
                    .css({ 'z-index': '49' })
                    .animate({
                        height: global.nHeight + 'px',
                        width: '33%',
                        top: aImageAttr.top[j],
                        left: aImageAttr.left[j]
                    }, {
                        duration: 1000,
                        easing: 'easeOutCirc',
                        complete: function () {
                            jImage2.css({ 'z-index': '1', 'position': 'relative', 'top': '0', 'left': '0' })
                            // .removeAttr('style')
                            .prev().remove();
                        }
                    }).find('img').animate({
                        width: '300%',
                        top: '-80%',
                        left: '-80%'
                    }, {
                        duration: 1000,
                        easing: 'easeOutCirc',
                        complete: function () { $(this).removeAttr('style'); }
                    });
            }
        });
    }
});