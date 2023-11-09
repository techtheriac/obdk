import { gsap } from "gsap";

export interface LandingAnimatable {
  techtheriac: HTMLElement;
  bio: HTMLElement;
  burger: HTMLElement;
  playing: HTMLLIElement;
}

export class LandingAnimation {
  landingAnimatables: LandingAnimatable;
  timeline: GSAPTimeline;
  constructor(landingAnimatables: LandingAnimatable) {
    this.landingAnimatables = landingAnimatables;

    this.timeline = gsap
      .timeline({})
      .call(this.toggleVisibility, [this.landingAnimatables.techtheriac])
      .from(this.landingAnimatables.techtheriac.querySelectorAll("path"), {
        duration: 0.2,
        stagger: 0.09,
        autoAlpha: () => 0,
        y: () => 50,
        ease: "Power4.out",
      })
      .call(this.toggleVisibility, [this.landingAnimatables.bio])
      .from(this.landingAnimatables.bio, {
        opacity: 0,
      })
      .call(this.toggleVisibility, [this.landingAnimatables.burger])
      .from(this.landingAnimatables.burger, {
        opacity: 0,
      })
      .pause();

    console.log(this.timeline);
  }

  public animateLanding(): void {
    this.timeline.play();
  }

  private toggleVisibility(element: HTMLElement): void {
    element.classList.remove("hidden");
  }
}
