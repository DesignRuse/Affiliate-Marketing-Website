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
		for (let i = 0; i < products.length; i++) {
			const product = products[i];
			const productDiv = document.createElement('div');
			productDiv.classList.add('product');
			productDiv.id = product.productId;

			const productImg = document.createElement('div');
			productImg.classList.add('product-image');
			const image = document.createElement('img');
			image.src = product.productImage;
			image.alt = product.productName;
			productImg.appendChild(image);
			productDiv.appendChild(productImg);

			const productInfo = document.createElement('div');
			productInfo.classList.add('product-info');

			const productCategory = document.createElement('p');
			productCategory.classList.add('product-category');
			productCategory.textContent = product.productCategory;
			productInfo.appendChild(productCategory);

			const productName = document.createElement('h2');
			productName.classList.add('product-name');
			productName.textContent = product.productName;
			productInfo.appendChild(productName);

			const productHighlights = document.createElement('p');
			productHighlights.classList.add('product-highlights');
			productHighlights.textContent = product.productHighlights;
			productInfo.appendChild(productHighlights);

			const h4 = document.createElement("h4");
			h4.textContent = "About This Item";
			const span = document.createElement("span");
			span.innerHTML = " 👇";
			h4.appendChild(span);
			productInfo.appendChild(h4);

			const productDescriptions = product.productDescriptions;
			for (let x = 0; x < productDescriptions.length; x++) {
				const productDescription = document.createElement('p');
				productDescription.classList.add('product-description');
				productDescription.textContent = productDescriptions[x];
				productInfo.appendChild(productDescription);
			}

			const productFeatures = product.productFeatures;
			for (let j = 0; j < productFeatures.length; j++) {
				const productFeature = document.createElement('p');
				productFeature.classList.add('product-feature');
				const span = document.createElement('span');
				span.innerHTML = '✔ ';
				const text = document.createTextNode(productFeatures[j]);
				productFeature.appendChild(span);
				productFeature.appendChild(text);
				productInfo.appendChild(productFeature);
			}

			const additionalInfos = product.additionalInfos;
			for (let y = 0; y < additionalInfos.length; y++) {
				const additionalInfo = document.createElement('p');
				additionalInfo.classList.add('additional-info');
				additionalInfo.textContent = additionalInfos[y];
				productInfo.appendChild(additionalInfo);
			}

			// Create a div element with class "rating"
			const ratingDiv = document.createElement('div');
			ratingDiv.classList.add('rating', 'margin-bottom-small');
			// Create an array of star icons classes
			const starIcons = product.productRating;
			// Loop through the star icons classes and create an i element for each one
			for (let k = 0; k < starIcons.length; k++) {
				const starIcon = document.createElement('i');
				var starIconClasses = starIcons[k].split(/\s+/);
				for (l = 0; l < starIconClasses.length; l++) {
					starIcon.classList.add(starIconClasses[l]);
				}
				ratingDiv.appendChild(starIcon);
			}
			// Append the rating div to the body (or any other desired element)
			productInfo.appendChild(ratingDiv);

			const buyLink = document.createElement('a');
			buyLink.href = product.buyLink;
			buyLink.target = '_blank';
			buyLink.textContent = 'Get It on Amazon';
			buyLink.classList.add('btn', 'btn-rose', 'btn-custom');
			productInfo.appendChild(buyLink);

			productDiv.appendChild(productInfo);
			colmHundred.appendChild(productDiv);
		}
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