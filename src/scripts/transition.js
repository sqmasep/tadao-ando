import barba from '@barba/core'
import gsap from 'gsap'

export default class Barba {
	constructor() {
		this.init()
	}

	init() {
		barba.init({
			transitions: [
				{
					name: 'opacity-transition',
					leave({ current }) {
						return gsap.to(current.container, {
							opacity: 0,
							duration: 2,
						})
					},
					once({ next }) {
						console.log('First page load!')
						return gsap.from(next.container, {
							opacity: 0,
							duration: 2,
						})
					},
					beforeEnter({ current, next }) {
						gsap.set(current.container, {
							display: 'none',
						})

						gsap.set(next.container, {
							opacity: 0,
						})
					},
					enter({ next }) {
						return gsap.to(next.container, {
							opacity: 1,
							duration: 2,
						})
					},
				},
			],
		})
	}
}
