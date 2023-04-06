window.addEventListener('DOMContentLoaded', function () {

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