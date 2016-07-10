
import { createUrl } from 'jade-press/modules/create-url'

Object.assign(exports, window.h5, {
	createUrl
})

function checkNavBar() {
  //collapse button
  if(!$('.navbar-toggler').is(':visible')) $('#menus').addClass('in')
  else $('#menus').removeClass('in')
}

export function afterReady() {
	window.prettyPrint()
	checkNavBar()
}

export function afterCreated() {
	$(window).on('resize', checkNavBar)
}
