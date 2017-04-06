$(function () {
    var $figure = $('.square');

    // size slider event
    $('#size-slider').on("slide", function (event, ui) {
        $figure.css({
            width: ui.value,
            height: ui.value
        });
    });

    // angle slider event
    $('#angle-slider').on("slide", function (event, ui) {
        $figure.css({
            transform: 'rotate(' + ui.value + 'deg)'
        });
    });

    // color picker initialization and event
    $('#color-picker').colorpicker({
        parts: ['map', 'bar'],
        color: '#2278da',
        select: function (event, colorPicker) {
            $figure.css({
                backgroundColor: '#' + colorPicker.formatted
            });
        }
    });

    // move events
    var $figureWrapper = $('.square-wrapper');
    var mousePressed = false;
    var position = {top: 0, left: 0};

    $figureWrapper.on('mousedown', function (event) {
        if (!$(event.target).is('.square')) {
            return;
        }

        position.top = event.pageY;
        position.left = event.pageX;
        mousePressed = true;
    });

    $('.container').on('mouseup', function () {
        mousePressed = false;
        position.top = 0;
        position.left = 0;
    }).on('mousemove', function (event) {
        if (!mousePressed) {
            return;
        }

        var figurePosition = $figureWrapper.position();

        var x = event.pageX - position.left + figurePosition.left;
        var y = event.pageY - position.top + figurePosition.top;

        $figureWrapper.css({
            top: y,
            left: x
        });

        position.left = event.pageX;
        position.top = event.pageY;
    });
});
