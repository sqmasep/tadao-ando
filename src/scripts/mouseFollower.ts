import BaseMouseFollower from "mouse-follower";
import gsap from "gsap";

export default class MouseFollower {
  constructor() {
    this.init();
  }

  init() {
    BaseMouseFollower.registerGSAP(gsap);

    const cursor = new BaseMouseFollower();
  }
}
