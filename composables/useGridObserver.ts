export interface GridConfigurationOptions {
  gridNode: HTMLElement;
  toggleClassName: string;
}

export default function ({
  gridNode,
  toggleClassName,
}: GridConfigurationOptions): ResizeObserver | undefined {
  let resizeObserver: ResizeObserver;

  if ("ResizeObserver" in window) {
    // get the min value from data-min="[min]"
    const min = gridNode.dataset.min;
    // create a proxy element to measure and convert the `min` value to px
    const test = document.createElement("div");

    if (min) {
      test.style.width = min;
    }

    gridNode.appendChild(test);
    const minToPixels = test.offsetWidth;
    gridNode.removeChild(test);

    resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        // get the element's current dimensios
        const currentDimensions = entry.contentRect;
        // 'true' if the container is wider than the minimum
        const isWide = currentDimensions.width > minToPixels;
        // toggle the class conditionally
        gridNode.classList.toggle(toggleClassName, isWide);
      }
    });

    resizeObserver.observe(gridNode);

    return resizeObserver;
  }
}
