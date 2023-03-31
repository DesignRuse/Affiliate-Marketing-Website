window.addEventListener('DOMContentLoaded', function () {

	var menuIcon = document.getElementsByClassName('menu-icon')[0];
	var navigation = document.getElementsByClassName('navigation')[0];
	navigation.style.height = '0';
	menuIcon.addEventListener('click', function() {
		if(navigation.getBoundingClientRect().height == '0') {
			navigation.style.height = 'auto';
			navigation.style.padding = '1.5rem 0';		/* padding: 1.5rem 0; */
			menuIcon.firstElementChild.className = 'fa fa-times-circle';
		} 
		else {
			navigation.style.height = '0';
			navigation.style.padding = '0';	
			menuIcon.firstElementChild.className = 'fa fa-bars';
		}
	});

	// var mainImg = document.getElementsByClassName('main-img')[0].firstElementChild;
	// var thumbnailImgContainer = document.getElementsByClassName('thumbnail');
	// for (let i = 0; i < thumbnailImgContainer.length; i++) {
	// 	thumbnailImgContainer[i].addEventListener('click', function (ev) {
	// 		mainImg.src = thumbnailImgContainer[i].firstElementChild.src;
	// 	});
	// }
});

