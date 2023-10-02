import EventEmitter from "events";
import spectral from "spectral.js";
import { randomFromArray, isLegible } from "~/server/utils";

export interface Animatable {
  animate(): void;
}

export let application: Application;

export class Application extends EventEmitter {
  public animations?: Animatable;

  public colors?: string[];

  private colorProps: string[] = [
    "--background-dark",
    "--musings-bg",
    "--essays-bg",
    "--contact-bg",
  ];

  constructor({ colors }) {
    super();

    if (application) {
      application = this;
    }

    const mixedColors : string[] = colors.map((color : string) =>
      spectral.mix(color, "rgb(215, 153, 0)", 0.2)
     // spectral.mix(color, "rgb(100, 184, 22)", 0.2)
    );

    const filteredColors = mixedColors.filter(x => isLegible(x))

    this.colors = filteredColors;

    this.registerEvent();
  }


  getInstance() {
    return this;
  }

  public setViewportHeight() : void {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    console.log("viewport updated")
  }

  public setBioWrapperHeight() : void {
    let bioWrapper = document.querySelector(".wrapper-bio");
    if(!bioWrapper) return;
    const {height} = bioWrapper.getBoundingClientRect();
    document.documentElement.style.setProperty('--bio-height', `${height}px`);
  }

  registerEvent() {
    this.on("update-viewport", () => {
      this.setViewportHeight();
      this.setBioWrapperHeight();
    });

    this.on("update-theme", () => {
      this.colorProps.forEach((colorProp) => {
        if (this.colors)
          document.documentElement.style.setProperty(
            colorProp,
            randomFromArray(this.colors)
          );
      });
    });
  }
}

export class TextScramble implements Animatable {
  /**
   *
   */
  constructor() {}

  private nodelist?: NodeListOf<Element>;
  animate(): void {
    throw new Error("Method not implemented.");
  }
}
