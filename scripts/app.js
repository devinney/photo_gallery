/* STICKY SEARCH */
//when user scrolls screen search bar stays at top of page
$(window).scroll(function () {
  var windowTop = $(window).scrollTop();
  var stickyDivTop = $('#stickyDiv').offset().top;
  if (windowTop > stickyDivTop) {
      $('#search').addClass('stickySearch');
			$('#stickyDiv').addClass('stickyDiv');
  } else {
      $('#search').removeClass('stickySearch');
			$('#stickyDiv').removeClass('stickyDiv');
  }
});

/* FILTER IMAGES BASED ON USER INPUT IN SEARCH FIELD */
//as user types into searchbox images are filtered based in user input
$('#search').keyup(function() {
	var userInput = $(this).val().toUpperCase();
	$('.imageGallery img').each(function() {
		var imageAttr = $(this).attr('alt').toUpperCase();
		if (imageAttr.indexOf(userInput) === 0) {
			$(this).show();
		} else {
			$(this).hide();
		}
	});
});


/* LIGHTBOX */
// create elements
var $overlay = $('<div id="overlay"></div>');	//create overlay
var $imgDiv = $('<div id="imgDiv"></div>');	//create div for buttons
var $image = $('<img>');	//create image
var $caption = $('<p></p>');	//create caption
var $close = $('<button id="closeButton" class="button-nav">x</div>');	//close button
var $prevButton = $('<button id="prevButton" class="button-nav" accesskey="left">&lsaquo;</div>');	//prev button
var $nextButton = $('<button id="nextButton" class="button-nav" accesskey="right">&rsaquo;</div>');	//next button

//append elements
$imgDiv.append($close);
$imgDiv.append($nextButton);
$imgDiv.append($prevButton);
$imgDiv.append($image);
$overlay.append($imgDiv);
$overlay.append($caption);
$('body').append($overlay);

var linkParent;//parent li element
var nextLink;//current <a>

//a function that gets the child <a> of current linkParent
function $getChild (linkParent) {
	nextLink = linkParent.children('a');
}

//a function that sets the new img src and caption text
function $newImage(nextLink) {
	newLocation = nextLink.attr('href');//get new href
	$image.attr('src', newLocation);//set image src
	$image.fadeIn(600);//fade new image in
	newCaption = nextLink.children('img').attr('data-caption');//get new caption
	$caption.text(newCaption);//set new caption
}

//when img link clicked show overlay and update img src and caption text
$('.imageGallery a').click(function(event) {
	event.preventDefault();//prevent browser from opening new window
	linkParent = $(this).parent('li');//get parent element
	imageLocation = $(this).attr('href');//get imageLocation
	$image.attr('src', imageLocation);//set image src
	captionText = $(this).children('img').attr('data-caption');//get caption text
	$caption.text(captionText);//update caption
	$overlay.show();//show overlay
});

//close overlay when 'x' button clicked
$close.click(function() {
	$overlay.hide();
});

//when user clicks next button
$nextButton.click(function() {
	$image.hide();//hide img element to show when new img src updated
	linkParent = linkParent.next(); //next li element is selected
	$getChild(linkParent);					//set currentImg to next <a>
	if (nextLink.length > 0) {		//check if currentImg is greater than 0
		$newImage(nextLink);				//if so update image src and caption text
	} else {												//if not
		linkParent = $('.imageGallery li').first();//parent element is set to first li in gallery
		$getChild(linkParent);				//set currentImg to next <a>
		$newImage(nextLink);				//update image src and caption text
	}
});

//when user clicks prev button
$prevButton.click(function() {
	$image.hide();//hide img element to show when new img src updated
	linkParent = linkParent.prev();	//prev li element is selected
	$getChild(linkParent);					//set currentImg to next <a>
	if (nextLink.length > 0) {		//check if currentImg is greater than 0
		$newImage(nextLink);				//if so update image src and caption text
	} else {												//if not
		linkParent = $('.imageGallery li').last();//parent element is set to last li in gallery
		$getChild(linkParent);				//set currentImg to prev <a>
		$newImage(nextLink);				//update image src and caption text
	}
});

//keyboard navigation
$('body').keydown(function(e) {	//left and right arrow keyboard navigation for image gallery
	if ( e.which === 39 ) {	//if keydown is right key
		$nextButton.trigger("click");	//activate next click
	} else if ( e.which === 37 ) { //else if keydown is left key
		$prevButton.trigger("click");	//activate prev click
	} else if ( e.which === 27 ){ //esc key to close overlay
		$overlay.hide();
	}
});


/*YOUTUBE OVERLAY*/
var $youTubeOverlay = $('<div id="youTubeOverlay"></div>');//create overlay
var $youTubeDiv = $('<div id="youTubeDiv"></div>');//create div to make $youtube responsive
var $youTube = $('<div class="youTubeWrapper"><iframe width="560" height="315" src="https://www.youtube.com/embed/TO-KH8Eu-Xw" frameborder="0" allowfullscreen class="youTubeVideo"></iframe><div>');//embed youtube video

//append elements and overlay
$youTubeDiv.append($youTube);
$youTubeOverlay.append($youTubeDiv);
$('body').append($youTubeOverlay);

//when click thumbnail show overlay
$('.youTube a').click(function(event){
	event.preventDefault();
	$youTubeOverlay.show();
});
//when click overlay hide overlay
$youTubeOverlay.click(function() {
	$youTubeOverlay.hide();
});
 
 
 
 
 
 
 
 
 
 
 
 
 