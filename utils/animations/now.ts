import { gsap } from "gsap";
export default class Now {
  private NowItems: NodeListOf<Element>;

  constructor(nowItems: NodeListOf<Element>) {
    this.NowItems = nowItems;
    this.addEventListeners();
  }

  onMouseEnter(e) {
    gsap.to(e.target, {
      "--aug-tl": "10px",
      duration: 0.4,
      ease: "sine.out",
    });
  }

  onMouseLeave(e) {
    gsap.to(e.target, {
      "--aug-tl": "0px",
      duration: 0.2,
      ease: "sine.in",
    });
  }

  addEventListeners() {
    this.NowItems.forEach((now) => {
      now.addEventListener("mouseenter", this.onMouseEnter.bind(this));
      now.addEventListener("mouseleave", this.onMouseLeave.bind(this));
    });
  }
}
