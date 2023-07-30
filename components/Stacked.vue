<template>
  <section class="stacked">
    <div
      v-for="(section, index) in sections"
      :class="section"
      :data-stack-order="index"
    >
      <div>
        <h2 class="stacked-header">{{ section }}</h2>
      </div>
      <div>
        <p v-show="false">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reiciendis,
          possimus? Iusto dolorum voluptas optio repellat facilis beatae eveniet
          dicta eligendi voluptate, at libero mollitia iste perferendis
          similique esse, voluptates quia?
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
let sections = ref(["musings", "essays", "contact"]);

onMounted(() => {
  const stackedHeader = document.querySelector(".stacked-header");

  if (stackedHeader) {
    const { height } = stackedHeader.getBoundingClientRect();

    document.documentElement.style.setProperty(
      "--stacked-header-size",
      `${height / 2}px`
    );

    window.addEventListener("resize", () => {
      const { height } = stackedHeader.getBoundingClientRect();
      document.documentElement.style.setProperty(
        "--stacked-header-size",
        `${height / 2}px`
      );
    });
  }

  const stackedItems = document.querySelectorAll("[data-stack-order]");

  if (!stackedItems) return;

  stackedItems[0].addEventListener("click", () => {
    stackedItems[0].setAttribute("data-stack-order", "0");
    stackedItems[1].setAttribute("data-stack-order", "1");
    stackedItems[2].setAttribute("data-stack-order", "2");
  });
  stackedItems[1].addEventListener("click", () => {
    stackedItems[1].setAttribute("data-stack-order", "0");
    stackedItems[0].setAttribute("data-stack-order", "1");
    stackedItems[2].setAttribute("data-stack-order", "2");
  });
  stackedItems[2].addEventListener("click", () => {
    stackedItems[2].setAttribute("data-stack-order", "0");
    stackedItems[0].setAttribute("data-stack-order", "1");
    stackedItems[1].setAttribute("data-stack-order", "2");
  });
});
</script>

<style lang="scss" scoped>
.stacked {
  height: 100vh;
  max-height: 100vh;
  width: 100%;
  position: relative;
  overflow: hidden;
}

.stacked > div {
  position: absolute;
  width: 100%;
}

[data-stack-order="2"] {
  z-index: 1;
  background-color: var(--musings-bg);
}

[data-stack-order="1"] {
  top: var(--stacked-header-size);
  background-color: var(--essays-bg);
  z-index: 2;
}

[data-stack-order="0"] {
  top: calc(2 * var(--stacked-header-size));
  background-color: var(--contact-bg);
  z-index: 3;
}

.stacked > div {
  display: flex;
  flex-direction: column;
  height: 100%;

  h2 {
    color: #000;
    font-size: var(--idealStackedHeading);
    text-transform: uppercase;
  }
}
</style>
