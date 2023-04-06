window.addEventListener('DOMContentLoaded', function () {

	var menuIcon = document.getElementsByClassName('menu-icon')[0];
	var navigation = document.getElementsByClassName('navigation')[0];
	navigation.style.height = '0';

	menuIcon.addEventListener('click', function () {
		if (navigation.getBoundingClientRect().height == '0') {
			navigation.style.height = 'auto';
			navigation.style.padding = '1.5rem 0'; /* padding: 1.5rem 0; */
			menuIcon.firstElementChild.className = 'fa fa-times-circle';
		} else {
			navigation.style.height = '0';
			navigation.style.padding = '0';
			menuIcon.firstElementChild.className = 'fa fa-bars';
		}
	});

	const smallElement = document.querySelector('.copy-right small');
	smallElement.textContent = `© ${new Date().getFullYear()} All Rights Reserved`;

});
