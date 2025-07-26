// var ww = document.body.clientWidth;

var ww = $(window).width();

$(document).ready(function() {
	adjustMenu();
})

$(window).bind('resize orientationchange', function() {
	ww = document.body.clientWidth;
	adjustMenu();
});


var adjustMenu = function() {
	if (ww < 990) {
    document.getElementsByClassName('regwidth')[0].style.display = 'none';
    document.getElementsByClassName('mobilewidth')[0].style.display = 'block';
	}else if (ww > 990){
    document.getElementsByClassName('regwidth')[0].style.display = 'flex';
    document.getElementsByClassName('mobilewidth')[0].style.display = 'none';
  }

}
