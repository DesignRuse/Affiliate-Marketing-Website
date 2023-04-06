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

	submitFormWithoutRedirecting();

});

function submitFormWithoutRedirecting() {

	const contactForm = document.querySelector('#contact-form');

	contactForm.addEventListener('submit', async (event) => {
		event.preventDefault(); // prevent the default form submission behavior

		const formData = new FormData(contactForm);
		const url = contactForm.getAttribute('action');

		fetch(url, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
				},
				body: formData,
			})
			.then((response) => response.json())
			.then((data) => {
				if (data.success) {
					success();
					contactForm.reset();
				} else {
					error();
					contactForm.reset();
				}
			})
			.catch((error) => {
				console.error(error);
				error();
				contactForm.reset();
			});

	});

}


function success() {
	showMessage('success', 'Thanks!<br /> Your message has been sent.');
}

function error() {
	showMessage('error', 'Oops!<br /> There was a problem.');
}

function showMessage(className, message) {
	const memo = document.querySelector('.memo');
	const memoText = document.querySelector('.memo-text');
	const memoModal = document.querySelector('.memo-modal');

	memo.classList.add(className);
	memoText.innerHTML = message;
	memoModal.style.opacity = '1';
	memoModal.style.display = 'block';

	setTimeout(function () {
		memoModal.style.opacity = '0';
		memoModal.style.display = 'none';
		memo.classList.remove(className);
		memoText.innerHTML = '';
	}, 9000);
}