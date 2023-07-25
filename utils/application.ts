// https://www.freecodecamp.org/news/singleton-design-pattern-with-javascript/
import EventEmitter from "events";

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

    this.colors = colors;

    this.registerEvent();
  }

  getInstance() {
    return this;
  }

  registerEvent() {
    this.on("now-playing", () => {
      console.log("Now playing");
    });

    this.on("update-theme", () => {
      if (this.colors)
        document.documentElement.style.setProperty(
          "--background-dark",
          this.colors[Math.floor(Math.random() * this.colors.length)]
        );
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
