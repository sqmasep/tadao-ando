import barba from "@barba/core";
import gsap from "gsap";

export default class Barba {
  constructor() {
    this.init();
  }

  init() {
    barba.init({
      transitions: [
        {
          name: "opacity-transition",
          once(data) {
            const tl = gsap.timeline({});

            tl.fromTo(
              ".curtain",
              { scaleY: 1 },
              { scaleY: 0, transformOrigin: "bottom", stagger: 0.1 }
            );

            tl.from(
              data.next.container,
              {
                y: 30,
                opacity: 0,
              },
              "<+0.2"
            );
          },
          leave(data) {
            const done = this.async();
            const tl = gsap.timeline({
              defaults: {
                ease: "power3.inOut",
              },
              onComplete() {
                done();
              },
            });

            // scale the curtains up
            tl.fromTo(".curtain", { scaleY: 0 }, { scaleY: 1 });

            tl.to(data.current.container, { x: 100 }, "<");
          },
          enter(data) {
            const tl = gsap.timeline({
              defaults: {
                ease: "power3.inOut",
              },
            });

            tl.fromTo(".curtain", { scaleY: 1 }, { scaleY: 0 }, "-=0.1");
          },
        },
      ],
    });

    // barba.init({
    // 	transitions: [
    // 		{
    // 			name: 'opacity-transition',
    // 			leave({ current }) {
    // 				return gsap.to(current.container, {
    // 					opacity: 0,
    // 					duration: 2,
    // 				})
    // 			},
    // 			once({ next }) {
    // 				console.log('First page load!')
    // 				return gsap.from(next.container, {
    // 					opacity: 0,
    // 					duration: 2,
    // 				})
    // 			},
    // 			enter({ next, current }) {
    // 				if (!current) {
    // 					console.log('First load!')
    // 				} else {
    // 					console.log('Not first load')
    // 				}

    // 				return gsap.from(next.container, {
    // 					opacity: 0,
    // 					duration: 2,
    // 				})
    // 			},
    // 		},
    // 	],
    // })
  }
}
