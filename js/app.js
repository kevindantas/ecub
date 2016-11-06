function clickMenu (e) {
	for (var i = menuItems.length - 1; i >= 0; i--)
		menuItems[i].classList.remove('active');

	this.classList.add('active');
}

var menu = document.querySelector('.navbar .menu');
var menuAnimate  = document.querySelector('.navbar .menu-animate');
var menuItems = document.querySelectorAll('.navbar .menu li');
var sections = [
	document.querySelector('#app'),
	document.querySelector('#baterias'),
	document.querySelector('#geradores'),
	document.querySelector('#motores'),
	document.querySelector('#design'),
];


for (var i = menuItems.length - 1; i >= 0; i--) {
	menuItems[i].addEventListener('click', clickMenu)
}



console.log(menu.offsetLeft)
menuAnimate.style.width = menuItems[0].offsetWidth+'px';
menuAnimate.style.transform = 'translateX('+menu.offsetLeft+'px)';

function handleScroll(e) {
	
	
	for (var i = sections.length - 1; i >= 0; i--) 
		menuItems[(menuItems.length-1) - i].classList.remove('active');		
	
	for (var i = sections.length - 1; i >= 0; i--) {
		if(calcPos(window.scrollY, sections[i])){
			changeMenu(i);
			return;
		}
	}
	
	if(i != sections.length)
		menuAnimate.style.opacity = 0;
	
	
}


function changeMenu(index) {
	
	var itemLeft = menuItems[(menuItems.length-1) - index].offsetLeft;
	var menuLeft = menu.offsetLeft;
	menuItems[(menuItems.length-1) - index].classList.add('active');
	menuAnimate.style.width = menuItems[(menuItems.length-1) - index].offsetWidth+'px';
	menuAnimate.style.transform = 'translateX('+(menuLeft + itemLeft)+'px)';
	menuAnimate.style.opacity = 1;

	
	menuItems[(menuItems.length-1) - i]
}


function calcPos(scrollPos, element) {
	return scrollPos > (element.offsetTop-200) && scrollPos < element.offsetTop-200+element.offsetHeight
}

window.addEventListener('scroll', handleScroll)