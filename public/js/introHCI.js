'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */

var $gifs = $('img');

function initializePage() {
	// add any functionality and listeners you want here
    $(window).scroll(function() {
    if($(window).scrollTop() + $(window).height() == $(document).height()) {
        console.log("bottom");
        for (var i = 5; i >= 0; i--) {
            var $new_gif = $($gifs.get([Math.floor(Math.random()*$gifs.length)])).clone();
            $('.container').append($new_gif);
        };
       }
    });
}

