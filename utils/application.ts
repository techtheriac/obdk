import { LandingAnimation, type LandingAnimatable } from "./animations/landing";

export let application: Application;

export class Application {
  private landingAnimation: LandingAnimation;
  private landingAnimatable: LandingAnimatable;

  constructor(landingAnimatable: LandingAnimatable) {
    if (application) {
      application = this;
    }
    this.landingAnimatable = landingAnimatable;
    this.landingAnimation = new LandingAnimation(this.landingAnimatable);

    this.init();
  }

  getInstance() {
    return this;
  }

  public init(): void {
    this.onResize();
    this.addEventListeners();
    this.landingAnimation.animateLanding();
  }

  public setBackgroundBaseSize(): void {
    document.documentElement.style.setProperty(
      "--size-background-base",
      `${window.innerWidth / 10}`,
    );
  }

  public setViewportHeight(): void {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }

  public setBioWrapperHeight(): void {
    let bioWrapper = document.querySelector(".wrapper-bio");
    if (!bioWrapper) return;
    const { height } = bioWrapper.getBoundingClientRect();
    document.documentElement.style.setProperty("--bio-height", `${height}px`);
  }

  private onResize(): void {
    this.setViewportHeight();
    this.setBioWrapperHeight();
    this.landingAnimation.setNavigationWidth(this.landingAnimatable.navigation);
  }

  private addEventListeners() {
    window.addEventListener("resize", this.onResize.bind(this));
  }
}
