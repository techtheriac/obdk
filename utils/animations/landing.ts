import { gsap } from "gsap";
import { Flip } from "gsap/Flip";

gsap.registerPlugin(Flip);

export interface LandingAnimatable {
  techtheriac: HTMLElement;
  bio: HTMLElement;
  nowSlider: HTMLElement;
  flipContainer: HTMLElement;
  navigation: HTMLElement;
  header: HTMLElement;
}

export class LandingAnimation {
  landingAnimatables: LandingAnimatable;
  timeline: GSAPTimeline;

  constructor(landingAnimatables: LandingAnimatable) {
    this.landingAnimatables = landingAnimatables;

    let animateHeight =
      window.innerWidth > 600
        ? "40px"
        : `${landingAnimatables.techtheriac.getBoundingClientRect().height}px`;

    console.log("Animate height", animateHeight);

    this.timeline = gsap
      .timeline({ duration: 1.2, paused: true })
      .call(this.toggleVisibility, [this.landingAnimatables.bio])
      .call(this.unblink, [this.landingAnimatables.techtheriac])
      .to(this.landingAnimatables.techtheriac, {
        duration: 0.8,
        // height: "40px",
        height: animateHeight,
        ease: "sine.inOut",
      })
      .call(this.togglePageLoaded, [this.landingAnimatables.header])
      .call(this.setNavigationWidth, [this.landingAnimatables.navigation])
      .from(this.landingAnimatables.navigation, {
        opacity: 0,
        ease: "power3.in",
      })
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
      );
  }

  public animateLanding(): void {
    this.timeline.play();
  }

  public setNavigationWidth(navigation: HTMLElement): void {
    let { width } = navigation.getBoundingClientRect();
    console.log("SETTING NAV WIDTH", width);
    document.documentElement.style.setProperty("--nav-width", `${width}px`);
  }
  private initTimeLine(): GSAPTimeline {
    let init = gsap
      .timeline()
      .call(this.toggleVisibility, [this.landingAnimatables.bio])
      .call(this.unblink, [this.landingAnimatables.techtheriac]);
    return init;
  }

  private animateTechtheriacHeight(): GSAPTimeline {
    let heading = gsap
      .timeline()
      .to(this.landingAnimatables.techtheriac, {
        duration: 0.8,
        height: "40px",
        ease: "sine.inOut",
      })
      .call(this.togglePageLoaded, [this.landingAnimatables.header])
      .from(this.landingAnimatables.navigation, {
        opacity: 0,
        ease: "power3.in",
      });
    return heading;
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

  private togglePageLoaded(element: HTMLLIElement): void {
    element.classList.remove("page-loading");
  }

  private unblink(element: HTMLElement): void {
    element.classList.remove("blinking");
  }
}
