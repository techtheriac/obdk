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
      .from(".loader", {
        "--size-background": "10rem",
        duration: 1,
        ease: "power2.in",
      })
      .from(this.landingAnimatables.techtheriac.querySelectorAll("path"), {
        duration: 0.2,
        stagger: 0.09,
        autoAlpha: () => 0,
        x: () => -20,
        ease: "Power4.out",
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
        },
        "<",
      )
      .call(this.toggleVisibility, [this.landingAnimatables.bio])
      .from(this.landingAnimatables.bio, {
        opacity: 0,
      })
      .call(this.toggleVisibility, [this.landingAnimatables.nowSlider])
      .from(this.landingAnimatables.nowSlider, {
        autoAlpha: () => 0,
      })
      .from(this.landingAnimatables.nowSlider.querySelectorAll(".now"), {
        duration: 0.2,
        stagger: 0.1,
        yPercent: -90,
        ease: "power3.in",
      })
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
      stagger: 0.09,
      duration: 0.5,
    });
  }

  private toggleVisibility(element: HTMLElement): void {
    element.classList.remove("hidden");
  }
}
