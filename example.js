const allProductsSection = document.getElementById('all-products-section');
const colmHundred = allProductsSection.getElementsByClassName('colm-100')[0];

fetch('headphones.json')
	.then(response => response.json())
	.then(data => {
		const products = data.products;
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
			span.style.color = "transparent";
			span.style.textShadow = "0 0 0 #ff5361";
			span.innerHTML = " 👉";
			h4.appendChild(span);
			productInfo.appendChild(h4);

			const productDescription = document.createElement('p');
			productDescription.classList.add('product-description');
			productDescription.textContent = product.productDescription;
			productInfo.appendChild(productDescription);

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

			const additionalInfo = document.createElement('p');
			additionalInfo.classList.add('additional-info');
			additionalInfo.textContent = product.additionalInfo;
			productInfo.appendChild(additionalInfo);

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
	})
	.catch(error => console.error(error));