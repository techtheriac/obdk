import { LandingAnimation, type LandingAnimatable } from "./animations/landing";
import FontFaceObserver from "fontfaceobserver";
import imagesLoaded from "imagesloaded";

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
  }

  getInstance() {
    return this;
  }

  public init(): void {
    console.log("INITING APPLICATION");
    const observeGalgo = new Promise<void>((resolve) => {
      new FontFaceObserver("Galgo").load().then(() => {
        resolve();
      });
    });

    const observeDiatype = new Promise<void>((resolve) => {
      new FontFaceObserver("Diatype").load().then(() => {
        resolve();
      });
    });

    const observeImages = new Promise<void>((resolve) => {
      imagesLoaded(
        document.querySelectorAll("img"),
        { background: true },
        resolve,
      );
    });

    const typefacePromises = [observeDiatype, observeGalgo, observeImages];

    Promise.all(typefacePromises).then(() => {
      this.onResize();
      this.addEventListeners();
      this.landingAnimation.animateLanding();
    });
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
    this.landingAnimation.setNavigationDimension(
      this.landingAnimatable.navigation,
    );
    this.landingAnimation.setHeaderDimension(this.landingAnimatable.header);
  }

  private addEventListeners() {
    window.addEventListener("resize", this.onResize.bind(this));
  }
}
