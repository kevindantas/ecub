function clickMenu (e) {
	for (var i = menuItems.length - 1; i >= 0; i--)
		menuItems[i].classList.remove('active');

	this.classList.add('active');
}
var menuItems = document.querySelectorAll('.navbar li');
for (var i = menuItems.length - 1; i >= 0; i--) {
	menuItems[i].addEventListener('click', clickMenu)
}



var sections = [
	document.querySelector('#app'),
	document.querySelector('#baterias'),
	document.querySelector('#geradores'),
	document.querySelector('#motores'),
	document.querySelector('#design'),
];

function handleScroll(e) {
	for (var i = sections.length - 1; i >= 0; i--) {
		sections[i]
		if(calcPos(window.scrollY, sections[i])){
			changeMenu(sections[i].getAttribute('id'));
			return;
		}
	}
}


function changeMenu(id) {
	console.log(id)
}


function calcPos(scrollPos, element) {
	return scrollPos > (element.offsetTop*0.8) && scrollPos < element.offsetTop+element.offsetHeight
}

window.addEventListener('scroll', handleScroll)