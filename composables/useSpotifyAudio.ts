export default function (source: any, trigger: any) {
  const context = new AudioContext();

  trigger.addEventListener("click", () => setUpAudio(context, source, trigger));

  return {
    context,
  };
}

function setUpAudio(context: AudioContext, sourceUrl: string, trigger: any) {
  window
    .fetch(sourceUrl)
    .then((response) => response.arrayBuffer())
    .then((arrayBuffer) => context.decodeAudioData(arrayBuffer))
    .then((audioBuffer) => {
      console.log("audioBuffer", audioBuffer);
      trigger.disabled = false;

      const source = context.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(context.destination);
      source.start();
    })
    .finally(() => console.log("DONE PLAYING"));
}
