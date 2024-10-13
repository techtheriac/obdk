import { gsap } from "gsap";
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

    this.timeline = gsap
      .timeline({ duration: 1.2, paused: true })
      .call(this.toggleVisibility, [this.landingAnimatables.bio])
      .call(this.unblink, [this.landingAnimatables.techtheriac])
      .to(this.landingAnimatables.techtheriac, {
        duration: 0.8,
        height: animateHeight,
        ease: "sine.inOut",
      })
      .call(this.togglePageLoaded, [this.landingAnimatables.header])
      .call(this.setNavigationDimension, [this.landingAnimatables.navigation])
      .call(this.setHeaderDimension, [this.landingAnimatables.header])
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

  public setNavigationDimension(navigation: HTMLElement): void {
    let { width } = navigation.getBoundingClientRect();
    document.documentElement.style.setProperty("--nav-width", `${width}px`);
  }

  public setHeaderDimension(header: HTMLElement): void {
    let { height } = header.getBoundingClientRect();
    document.documentElement.style.setProperty(
      "--header-height",
      `${height}px`,
    );
  }

  private initTimeLine(): GSAPTimeline {
    let init = gsap
      .timeline()
      .call(this.toggleVisibility, [this.landingAnimatables.bio])
      .call(this.unblink, [this.landingAnimatables.techtheriac]);
    return init;
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
