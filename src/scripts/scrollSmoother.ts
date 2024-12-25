import Lenis from "lenis";

export default class ScrollSmoother {
  constructor() {
    this.init();
  }

  init() {
    const lenis = new Lenis({
      autoRaf: true,
    });
  }
}
