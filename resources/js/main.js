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

	submitFormWithoutRedirecting();

});

function submitFormWithoutRedirecting() {

	const contactForm = document.getElementById('contact-form');

	contactForm.addEventListener('submit', async (event) => {
		event.preventDefault(); // prevent the default form submission behavior

		const formData = new FormData(contactForm);
		const url = contactForm.getAttribute('action');

		try {
			const response = await fetch(url, {
				method: 'POST',
				body: formData
			});

			if (response.ok) {
				//alert('Form submitted successfully!');
				success();
				contactForm.reset();
			} else {
				throw new Error('Form submission failed');
				contactForm.reset();
			}
		} catch (error) {
			console.error(error);
			//alert('An error occurred while submitting the form. Please try again later.');
			error();
		}
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