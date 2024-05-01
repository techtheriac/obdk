import { gsap } from "gsap";
import { Flip } from "gsap/Flip";

gsap.registerPlugin(Flip);

export interface LandingAnimatable {
  techtheriac: HTMLElement;
  bio: HTMLElement;
  nowSlider: HTMLElement;
  flipContainer: HTMLElement;
  preloader: HTMLElement;
}
export class LandingAnimation {
  landingAnimatables: LandingAnimatable;
  timeline: GSAPTimeline;

  constructor(landingAnimatables: LandingAnimatable) {
    this.landingAnimatables = landingAnimatables;

    this.timeline = gsap
      .timeline({ duration: 3 })
      .call(this.toggleVisibility, [this.landingAnimatables.bio])
      .call(this.unblink, [this.landingAnimatables.techtheriac])
      .from(this.landingAnimatables.bio, {
        opacity: 0,
        ease: "power3.in",
      })
      .call(this.toggleVisibility, [this.landingAnimatables.nowSlider])
      .from(
        this.landingAnimatables.nowSlider.querySelectorAll(".now"),
        {
          duration: 0.4,
          stagger: 0.1,
          opacity: 0,
          xPercent: -20,
          ease: "power3.in",
        },
        "<",
      )
      .pause();
  }

  public animateLanding(): void {
    this.timeline.play();
  }

  private destroyElement(preloader: HTMLElement) {
    preloader.parentNode?.removeChild(preloader);
  }

  private flipTectheriac(homeContainer, techtheriac) {
    const initial = Flip.getState(techtheriac);

    gsap.utils.toArray(techtheriac).forEach((x) => {
      homeContainer.appendChild(x);
    });

    Flip.from(initial, {
      absolute: true,
      nested: true,
      stagger: 0.1,
      duration: 0.6,
      ease: "sine.inOut",
    });
  }

  private toggleVisibility(element: HTMLElement): void {
    element.classList.remove("hidden");
  }

  private unblink(element: HTMLElement): void {
    element.classList.remove("blinking");
  }
}
