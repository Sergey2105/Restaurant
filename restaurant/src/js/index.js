window.addEventListener("DOMContentLoaded", () => {
	const menuBurger = document.querySelector(".burger");
	menuBurger.addEventListener('click', () => {
		menuBurger.classList.toggle('active');
		document.body.classList.toggle('no-scroll')
		document.querySelector('.header-list').classList.toggle('open')
	});
});
