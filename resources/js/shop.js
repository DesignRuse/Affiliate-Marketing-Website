window.addEventListener('DOMContentLoaded', function () {
	const allProductsSection = document.querySelector('#all-products-section');
	const musicSystems = document.querySelector('#music-systems');
	const soundBoxes = document.querySelector('#sound-boxes');
	const headPhones = document.querySelector('#headphones');
	let selectedTab = '';

	switch (location.search) {
		case '?selectedTab=MusicSystems':
			selectedTab = 'Music Systems';
			musicSystems.classList.add('active-tab');
			soundBoxes.classList.remove('active-tab');
			headPhones.classList.remove('active-tab');
			break;
		case '?selectedTab=SoundBoxes':
			selectedTab = 'Sound Boxes';
			musicSystems.classList.remove('active-tab');
			soundBoxes.classList.add('active-tab');
			headPhones.classList.remove('active-tab');
			break;
		case '?selectedTab=Headphones':
			selectedTab = 'Headphones';
			musicSystems.classList.remove('active-tab');
			soundBoxes.classList.remove('active-tab');
			headPhones.classList.add('active-tab');
			break;
		default:
			selectedTab = 'Music Systems';
			musicSystems.classList.add('active-tab');
			soundBoxes.classList.remove('active-tab');
			headPhones.classList.remove('active-tab');
			alterURL(selectedTab);
			break;
	}
	populateShop(selectedTab);

	musicSystems.addEventListener('click', function () {
		const prevActiveTab = document.querySelector('.active-tab');
		if (prevActiveTab) {
			prevActiveTab.classList.remove('active-tab');
		}
		musicSystems.classList.add('active-tab');
		selectedTab = 'Music Systems';
		populateShop(selectedTab);
		alterURL(selectedTab);
	});

	soundBoxes.addEventListener('click', function () {
		const prevActiveTab = document.querySelector('.active-tab');
		if (prevActiveTab) {
			prevActiveTab.classList.remove('active-tab');
		}
		soundBoxes.classList.add('active-tab');
		selectedTab = 'Sound Boxes';
		populateShop(selectedTab);
		alterURL(selectedTab);
	});

	headPhones.addEventListener('click', function () {
		const prevActiveTab = document.querySelector('.active-tab');
		if (prevActiveTab) {
			prevActiveTab.classList.remove('active-tab');
		}
		headPhones.classList.add('active-tab');
		selectedTab = 'Headphones';
		populateShop(selectedTab);
		alterURL(selectedTab);
	});

	allProductsSection.addEventListener('change', function () {
		const hash = location.hash;
		if (hash !== '') {
			const id = hash.substring(1);
			const el = document.getElementById(id);
			if (el) {
				el.scrollIntoView({
					behavior: 'smooth',
					block: 'end',
					inline: 'nearest'
				});
			}
		}
	});

	function populateShop(selectedTab) {
		const jsonFiles = {
			'Music Systems': music_systems,
			'Sound Boxes': sound_boxes,
			'Headphones': head_phones
		};
		const jsonFile = jsonFiles[selectedTab];
		displayJSONdataInHTML(jsonFile);
	}

	function displayJSONdataInHTML(jsonFile) {
		const colmHundred = allProductsSection.querySelector('.colm-100');
		const products = jsonFile.products;
		const fragment = document.createDocumentFragment();
		const starIconClassesRegex = /\s+/;

		const productTemplate = (product) => {
			const productFeatures = product.productFeatures
				.map(feature => `<p class="product-feature"><span>✔</span> ${feature}</p>`)
				.join('');

			const starIcons = product.productRating
				.map(iconClass => `<i class="${iconClass.trim()}"></i>`)
				.join('');

			return `
			<div class="product" id="${product.productId}">
			<div class="product-image">
				<img src="${product.productImage}" alt="${product.productName}">
			</div>
			<div class="product-info">
				<p class="product-category">${product.productCategory}</p>
				<h2 class="product-name">${product.productName}</h2>
				<p class="product-highlights">${product.productHighlights}</p>
				<h4>About This Item <span>👇</span></h4>
				<p class="product-description">${product.productDescription}</p>
				${productFeatures}
				<p class="additional-info">${product.additionalInfo}</p>
				<div class="rating margin-bottom-small">${starIcons}</div>
				<a href="${product.buyLink}" target="_blank" class="btn btn-rose btn-custom">Get It on Amazon</a>
			</div>
		</div>		
		  `;
		};

		for (let i = 0; i < products.length; i++) {
			const product = products[i];
			const productHtml = productTemplate(product);
			const productDiv = document.createRange().createContextualFragment(productHtml);
			fragment.appendChild(productDiv);
		}

		colmHundred.appendChild(fragment);
	}

	function alterURL(selectedTab) {
		let l = location.href;
		l = l.replace(/\?.*$/g, '');
		location.href = l + '?selectedTab=' + selectedTab.split(' ').join('');
	}

	function scrollToHashElement() {
		const jumpID = location.hash.replace('#', '');
		if (jumpID) {
			requestAnimationFrame(() => {
				document.querySelector(`#${jumpID}`)?.scrollIntoView({
					behavior: 'smooth'
				});
			});
		}
	}

	if(location.hash) {
		scrollToHashElement();
	}

});