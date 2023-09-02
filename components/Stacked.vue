<template>
  <section class="stacked">
    <div
      v-for="(section, index) in sections"
      :class="section"
      :data-stack-order="index"
    >
      <StackedItem :section="section" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { Sections } from "~/obdk";

let sections = ref<Sections[]>(["musings", "essays", "contact"]);

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
    stackedItems[1].setAttribute("data-stack-order", "2");
    stackedItems[2].setAttribute("data-stack-order", "1");
  });
  stackedItems[1].addEventListener("click", () => {
    stackedItems[1].setAttribute("data-stack-order", "0");
    stackedItems[0].setAttribute("data-stack-order", "2");
    stackedItems[2].setAttribute("data-stack-order", "1");
  });
  stackedItems[2].addEventListener("click", () => {
    stackedItems[2].setAttribute("data-stack-order", "0");
    stackedItems[0].setAttribute("data-stack-order", "2");
    stackedItems[1].setAttribute("data-stack-order", "1");
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
  padding: 0 var(--space-xs);
}

.stacked > div {
  position: absolute;
  width: 100%;
}

[data-stack-order="2"] {
  z-index: 1;
}

[data-stack-order="1"] {
  top: var(--stacked-header-size);
  z-index: 2;
}

[data-stack-order="0"] {
  top: calc(2 * var(--stacked-header-size));
  z-index: 3;
}

.musings {
  background-color: var(--essays-bg);
}

.essays {
  background-color: var(--contact-bg);
}

.contact {
  background-color: var(--musings-bg);
}

.stacked > div {
  display: flex;
  flex-direction: column;
  height: 100%;
  transition-property: background-color;
  transition-duration: 0.5s;
  transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
}
</style>
