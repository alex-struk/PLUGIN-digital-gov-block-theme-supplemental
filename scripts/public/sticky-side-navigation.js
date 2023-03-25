/**
 * Sticky menu DOM manipulation.
 * 
 * Note: as this runs on all pages be sure to null check all elements before use.
 * 
 * @return {void}
 */
const domReady = () => {
	/*
	 * SafarIE bug requires 0ms timeout.
	 */
	setTimeout(function () {
		/**
		 * Side-scrolling navigation behaviour using intersetion observers.
		 */
		const inPageNav = document.querySelector('.in-page-nav');

		if (inPageNav) {
			const inPageNavLinks = Array.from(inPageNav.querySelectorAll('a'));
			let clickedOnNav = false;
			if (inPageNavLinks) {
				const targets = inPageNavLinks.map(link => {
					const target = document.querySelector(link.getAttribute('href'));
					return target;
				});

				if (targets) {
					const observer = new IntersectionObserver((entries) => {
						let firstVisibleTarget = null;
						entries.forEach(entry => {
							if (entry.isIntersecting && !firstVisibleTarget) {
								// If this is the first visible target, set the firstVisibleTarget variable
								firstVisibleTarget = entry.target;
							}
						});
						// Find the link associated with the first visible target
						if (firstVisibleTarget) {
							const link = inPageNavLinks.find(link => link.getAttribute('href') === `#${firstVisibleTarget.id}`);
							if (link && !clickedOnNav) {
								// Remove the active class from all list items
								inPageNavLinks.forEach(link => link.parentNode.classList.remove('active'));
								// Set the active class on the link's parent list item
								link.parentNode.classList.add('active');
							}
						}
					}, {
						rootMargin: "20% 0% -40% 0%" // set rootMargin
					});

					targets.forEach(target => {
						observer.observe(target);
					});

					// Add click event listener to inPageNavLinks
					inPageNavLinks.forEach(link => {
						link.addEventListener('click', (e) => {
							e.preventDefault();
							// Remove the active class from all list items
							inPageNavLinks.forEach(link => link.parentNode.classList.remove('active'));
							// Set the active class on the clicked link's parent list item
							link.parentNode.classList.add('active');
							clickedOnNav = true;
							const target = document.querySelector(link.getAttribute('href'));
							target.scrollIntoView({
								behavior: 'smooth',
								scrollMarginTop: 30
							});
							// set focus on first card of target section
							setTimeout(() => {
								target.setAttribute('tabindex', '0');
								target.focus();
								target.removeAttribute('tabindex');
							}, 500)
							// Resume observer after scrolling to target
							setTimeout(() => {
								clickedOnNav = false;
							}, 1000);
						});
					});

				}

				inPageNavLinks.forEach(link => link.parentNode.classList.remove('active'));
				inPageNavLinks[0].parentNode.classList.add('active');
			}
		}
	}, 0);
};

if ('complete' === document.readyState) {
	domReady();
} else {
	document.addEventListener('DOMContentLoaded', domReady);
}