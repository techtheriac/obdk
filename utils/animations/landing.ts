import { gsap } from "gsap";
import { Flip } from "gsap/Flip";

gsap.registerPlugin(Flip);

export interface LandingAnimatable {
  techtheriac: HTMLElement;
  bio: HTMLElement;
  nowSlider: HTMLElement;
  flipContainer: HTMLElement;
}
export class LandingAnimation {
  landingAnimatables: LandingAnimatable;
  timeline: GSAPTimeline;
  techthericState: Flip.FlipState;

  constructor(landingAnimatables: LandingAnimatable) {
    this.landingAnimatables = landingAnimatables;

    this.techthericState = Flip.getState(this.landingAnimatables.techtheriac);

    this.timeline = gsap
      .timeline({})
      .call(this.toggleVisibility, [this.landingAnimatables.techtheriac])
      .to(".loader", {
        "--size-background": "1rem",
        duration: 1,
        ease: "power2.in",
      })
      .from(this.landingAnimatables.techtheriac.querySelectorAll("path"), {
        duration: 0.3,
        stagger: 0.1,
        autoAlpha: () => 0,
        // xPercent: () => -20,
        // ease: "power4.out",
        ease: "expo.inOut",
      })
      .call(this.flipTectheriac, [
        this.landingAnimatables.flipContainer,
        this.landingAnimatables.techtheriac.querySelectorAll("path"),
      ])
      .to(
        ".loader",
        {
          height: 0,
          duration: 1,
          opacity: 0,
        },
        "<",
      )
      .call(this.toggleVisibility, [this.landingAnimatables.nowSlider])
      .from(
        this.landingAnimatables.nowSlider.querySelectorAll(".now"),
        {
          duration: 0.5,
          stagger: 0.2,
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

      //   {
      //     autoAlpha: () => 0,
      //     duration: 0.5,
      //     xPercent: -20
      //   },
      //   "<",
      // )
      .pause();
  }

  public animateLanding(): void {
    this.timeline.play();
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
