onmessage = (e) => {
  const message = e.data;

  const { width, height } = message.dimension;

  const canvas = message.canvas;
  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext("2d");

  let buffer, imageData;

  if (context) {
    imageData = context.createImageData(width, height);
    buffer = new Uint32Array(imageData.data.buffer);
  }

  function renderNoise(context) {
    let len = buffer.length - 1;

    while (len--) {
      buffer[len] = Math.random() < 0.5 ? 0 : -1 >> 0;
    }

    context.putImageData(imageData, 0, 0);
  }

  (function loop() {
    renderNoise(context);
    requestAnimationFrame(loop);
  })();
};
