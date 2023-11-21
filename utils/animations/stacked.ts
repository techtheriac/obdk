import gsap from "gsap";
export default class StackedAnimation {
  stackContainer: HTMLElement;
  timeline: GSAPTimeline;

  constructor(stackContainer: HTMLElement) {
    this.stackContainer = stackContainer;
    this.timeline = gsap
      .timeline({})
      .call(this.toggleVisibility, [this.stackContainer])
      .from(this.stackContainer, { autoAlpha: 0, duration: 0.2 })
      .from(this.stackContainer.querySelectorAll(".stacked_item"), {
        duration: 0.5,
        stagger: 0.2,
        autoAlpha: 0,
        xPercent: 50,
      })
      .pause();
  }

  public play(): void {
    this.timeline.play();
  }

  public reverse(): void {
    this.timeline.reverse();
  }

  private toggleVisibility(element: HTMLElement): void {
    element.classList.remove("hidden");
  }
}
