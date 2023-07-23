// https://www.freecodecamp.org/news/singleton-design-pattern-with-javascript/
import EventEmitter from "events";

export interface Animatable {
  animate(): void;
}

let instance: Application;

type CustomEvents = "now-playing" | "dim-background";

export class Application extends EventEmitter {
  public animations?: Animatable;

  constructor(animations: Animatable) {
    super();
    this.animations = animations;

    if (instance) {
      instance = this;
    }
  }

  getInstance() {
    return this;
  }

  registerEvent() {
    this.on("now-playing", () => {
      console.log("Now playing");
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
