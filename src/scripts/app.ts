import Barba from "./transition";
import ScrollSmoother from "./scrollSmoother";
import MouseFollower from "./mouseFollower";
import SplitType from "split-type";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { wrapLines } from "./utils";

class App {
  constructor() {
    this.init();
  }

  init() {
    gsap.registerPlugin(ScrollTrigger);

    new Barba();
    new ScrollSmoother();
    new MouseFollower();
    console.log("YOOOOOOOOO");

    this.heroReveal();
    this.homeIntroReveal();
    this.homePicture();
    this.quoteReveal();
    this.homeProjects();
    this.footer();

    this.slider();
  }

  heroReveal() {
    const split = new SplitType(".home-hero h1", { types: "lines" });
    const lines = wrapLines(split.lines);

    const tl = gsap.timeline({
      defaults: {
        duration: 0.85,
        ease: "power3.out",
      },
    });

    tl.to(lines, {
      yPercent: 100,
      stagger: 0.02,
      scrollTrigger: {
        trigger: ".home-hero",
        start: "top top",
        end: "bottom 20%",
        scrub: true,
      },
    });

    tl.fromTo(lines, { yPercent: 150 }, { yPercent: 0, stagger: 0.15 });

    const mediasConfig = [
      { target: ".media.--left", y: 100, scale: 1.2 },
      { target: ".media.--center .media__inner", y: -50 },
      { target: ".media.--right", y: 200 },
    ];

    mediasConfig.forEach(({ target, ...media }) => {
      tl.to(target, {
        ...media,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".home-hero",
          start: "top top",
          end: "bottom top",
          scrub: 0.5,
        },
      });
    });
  }

  homeIntroReveal() {
    const container = document.querySelector(".home-intro")!;

    const tl = gsap.timeline({});

    tl.fromTo(
      container,
      { y: 100, rotateX: -10, rotateY: 10 },
      {
        y: 0,
        rotateX: 0,
        rotateY: 0,
        scrollTrigger: {
          trigger: container,
          start: "top 80%",
          end: "bottom top",
          scrub: true,
        },
      }
    );

    tl.from(container?.querySelectorAll(".image"), {
      width: 0,
      stagger: 0.1,
      scrollTrigger: {
        trigger: container,
        start: "top 80%",
        end: "bottom top",
        scrub: true,
      },
    });

    tl.to(container?.querySelectorAll(".image img"), {
      scale: 1.2,
      stagger: 0.2,
      scrollTrigger: {
        trigger: container,
        start: "top 80%",
        end: "bottom top",
        scrub: true,
      },
    });
  }

  homePicture() {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".home-picture",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    const originalBackgroundColor = getComputedStyle(
      document.body
    ).backgroundColor;

    function animateBackground(color) {
      gsap.to(document.body, {
        backgroundColor: color,
        duration: 0.5,
        ease: "power3.inOut",
      });
    }

    ScrollTrigger.create({
      trigger: ".home-picture",
      start: "top top",
      end: "center-=200 top",
      onEnter: () => animateBackground("#2323ff"),
      onLeave: () => animateBackground(originalBackgroundColor),
      onEnterBack: () => animateBackground("#2323ff"),
      onLeaveBack: () => animateBackground(originalBackgroundColor),
    });

    tl.to(
      ".home-picture .media__inner",
      {
        scale: 1.1,
        // pin doesnt work .
      },
      "<"
    );

    tl.to(".home-picture .media__inner", {});
  }

  quoteReveal() {
    const keywords = document.querySelectorAll(".home-quote strong");
    const quote = document.querySelector(".home-quote p");

    gsap.set(keywords, { display: "inline-block" });

    const originalTextColor = quote && getComputedStyle(quote).color;
    const originalKeywordColor =
      keywords[0] && getComputedStyle(keywords[0]).color;

    gsap.fromTo(
      keywords,
      {
        // opacity: 0,
        color: originalTextColor,
      },
      {
        // opacity: 1,
        color: originalKeywordColor,
        stagger: 0.1,
        duration: 0.1,
        scrollTrigger: {
          trigger: ".home-quote",
          start: "top 80%",
          end: "bottom-=10% center",
          scrub: true,
          markers: true,
        },
      }
    );
  }

  homeProjects() {
    const container = document.querySelector(".home-projects")!;
    const columns = container?.querySelectorAll("ul") ?? [];
    const [firstCol, secondCol, thirdCol] = columns;

    const tl = gsap.timeline();

    tl.fromTo(
      columns,
      { opacity: 0.2, scale: 0.96 },
      {
        scrollTrigger: {
          trigger: container,
          start: "top+=100 80%",
          end: "top+=200 center",
          scrub: true,
        },
        stagger: 0.05,
        scale: 1,
        opacity: 1,
      }
    );

    const colsConfig = [
      { target: firstCol, from: { y: 0 }, to: { y: -200 } },
      { target: secondCol, from: { y: 100 }, to: { y: 200 } },
      { target: thirdCol, from: { y: 100 }, to: { y: -100 } },
    ];

    colsConfig.forEach(({ target, from, to }) => {
      tl.fromTo(target, from, {
        ...to,
        scrollTrigger: {
          trigger: container,
          scrub: 0.2,
          start: "top 80%",
          end: "bottom top",
        },
      });
    });

    const imgs = container?.querySelectorAll("img");

    imgs?.forEach(img => {
      // create a div wrapper with the same size as the image
      const wrapper = document.createElement("div");
      wrapper.style.width = img.naturalWidth + "px";
      wrapper.style.height = img.naturalHeight + "px";
      // add a class to the wrapper
      wrapper.classList.add("image-wrapper");
      // insert the image in the wrapper, and delete it from the dom, then add the wrapper to the dom
      // img.parentNode!.insertBefore(wrapper, img);
      // wrapper.appendChild(img);
    });
    // tl.fromTo()
  }

  footer() {
    const footer = document.querySelector(".footer")!;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: footer,
        start: "top 30%",
        end: "bottom top",
      },
    });

    tl.fromTo(
      footer.querySelectorAll(".footer__contact, .footer__content"),
      { y: 100 },
      {
        y: 0,
        stagger: 0.2,
        scrollTrigger: {
          trigger: footer,
          start: "top 30%",
          end: "bottom bottom",
          scrub: true,
        },
      }
    );
  }

  slider() {
    const slider = document.querySelector(".projects-slider")!;
    const prefix = slider?.querySelector(".prefix")!;
    const names = slider?.querySelector(".names")!;
    const years = slider?.querySelector(".years")!;
    const imageWrappers = slider?.querySelectorAll(".projects-slider__slide")!;
    const images = slider?.querySelectorAll(".projects-slider__slide img")!;

    const SLIDES_COUNT = images.length;
    const ELEMENTS_TO_MOVE = [prefix, names, years];

    const DELAY_BETWEEN_SLIDES = 1;
    const DELAY_BETWEEN_TRANSLATES = 0.1;

    // slide infinitely
    const wholeTimeline = gsap.timeline({
      repeat: -1,
    });

    // wholeTimeline.set(imageWrappers, {
    //   clipPath: "inset(0 0 0 0)",
    // });

    function slide(index: number) {
      const oneSlideTimeline = gsap.timeline();

      oneSlideTimeline.fromTo(
        // animate next slide image
        images[index + 1],
        { scale: 1.6, top: 40 },
        {
          scale: 1,
          top: 0,
          duration: 1,
          ease: "power3.out",
        },
        0
      );

      oneSlideTimeline.to(
        imageWrappers[index],
        {
          clipPath: "inset(0 0 100% 0)",
          duration: 1,
          ease: "power3.out",
        },
        0
      );

      function moveUp(element: Element) {
        oneSlideTimeline.to(
          element,
          {
            y: (-element.clientHeight * (index + 1)) / SLIDES_COUNT,
            duration: DELAY_BETWEEN_TRANSLATES * 3,
          },
          // `<+=${DELAY_BETWEEN_TRANSLATES}`
          0
        );
      }

      ELEMENTS_TO_MOVE.forEach(element => moveUp(element));

      return oneSlideTimeline;
    }

    Array.from({ length: SLIDES_COUNT - 1 }).forEach((_, index) => {
      wholeTimeline.set(
        imageWrappers[index],
        { zIndex: SLIDES_COUNT - index },
        "<"
      );
      wholeTimeline.add(slide(index), `+=${DELAY_BETWEEN_SLIDES}`);
    });
  }
}

new App();
