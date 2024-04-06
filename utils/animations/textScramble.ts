import { type AudioContextState } from "~/obdk";

export default class TextScramble {
  private node?: Element | null;
  public state?: AudioContextState;

  constructor({
    elements,
    state,
  }: {
    elements: Element | null;
    state: AudioContextState;
  }) {
    if (elements) {
      this.node = elements;
    }

    state = state;
  }

  shuffle(input: string) {
    var a = typeof input == "string" ? input.split("") : input,
      n = a.length;

    for (var i = n - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = a[i];
      a[i] = a[j];
      a[j] = tmp;
    }
    return a.join("");
  }

  animate(): void {
    // this.node?.forEach((node) => {
    if (!this.node?.textContent) return;

    const originalText: string = this.node.textContent;

    if (this.state === "running") {
      let iterations: number = 0;
      const interval = setInterval(() => {
        if (!this.node?.textContent) return;
        this.node.textContent = this.shuffle(this.node.textContent);

        if (this.state !== "running") {
          clearInterval(interval);
          this.node.textContent = originalText;
        }
        iterations += 1;
      }, 60);
    }
    // });
  }

  play(): void {
    if (!this.node?.textContent) return;
    const originalText: string = this.node.textContent;

    gsap.from(this.node, {});
  }
}
