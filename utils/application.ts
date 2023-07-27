// https://www.freecodecamp.org/news/singleton-design-pattern-with-javascript/
import EventEmitter from "events";
import spectral from "spectral.js";

export interface Animatable {
  animate(): void;
}

export let application: Application;

type CustomEvents = "now-playing" | "dim-background";

export class Application extends EventEmitter {
  public animations?: Animatable;

  private colors?: string[];

  constructor({ colors }) {
    super();

    if (application) {
      application = this;
    }

    this.colors = colors.map((color) =>
      spectral.mix(color, "rgb(215, 153, 0)", 0.5)
    );

    this.registerEvent();
  }

  getInstance() {
    return this;
  }

  registerEvent() {
    this.on("now-playing", () => {});

    this.on("update-theme", () => {
      if (this.colors) {
        document.documentElement.style.setProperty(
          "--background-dark",
          this.colors[Math.floor(Math.random() * this.colors.length)]
        );

        document.documentElement.style.setProperty(
          "--musings-bg",
          this.colors[Math.floor(Math.random() * this.colors.length)]
        );

        document.documentElement.style.setProperty(
          "--essays-bg",
          this.colors[Math.floor(Math.random() * this.colors.length)]
        );

        document.documentElement.style.setProperty(
          "--contact-bg",
          this.colors[Math.floor(Math.random() * this.colors.length)]
        );
      }
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
