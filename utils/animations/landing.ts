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
      .timeline({ duration: 4 })
      .call(this.toggleVisibility, [this.landingAnimatables.techtheriac])
      .to(".loader", {
        "--size-background": "1rem",
        duration: 1,
        ease: "power2.in",
      })
      .from(this.landingAnimatables.techtheriac.querySelectorAll("path"), {
        duration: 0.4,
        stagger: 0.1,
        autoAlpha: () => 0,
        ease: "expo.inOut",
      })
      .call(this.flipTectheriac, [
        this.landingAnimatables.flipContainer,
        this.landingAnimatables.techtheriac.querySelectorAll("path"),
      ])
      .to(
        this.landingAnimatables.preloader,
        {
          duration: 1,
          opacity: 0,
          height: 0,
          // transformOrigin: "0 0",
        },
        "<",
      )
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
      .call(this.toggleVisibility, [this.landingAnimatables.bio])
      .from(this.landingAnimatables.bio, {
        opacity: 0,
      })
      .call(this.destroyElement, [this.landingAnimatables.preloader])
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
      duration: 0.5,
      ease: "sine.inOut",
    });
  }

  private toggleVisibility(element: HTMLElement): void {
    element.classList.remove("hidden");
  }
}
