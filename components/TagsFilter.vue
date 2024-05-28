<template>
  <form ref="tagSelectForm">
    <fieldset v-on:change="handleTag" class="tag-list">
      <div class="tag-toggle" v-for="tag in tags">
        <input type="checkbox" name="article-filter" :value="tag" :id="tag" />
        <label :style="galgoStyles" :for="tag">{{ tag }}</label>
      </div>
    </fieldset>
  </form>
</template>

<script setup lang="ts">
import { createStyleObject } from "@capsizecss/core";
type CapSizeOption = Parameters<typeof createStyleObject>[0];
type CapSizeStyle = ReturnType<typeof createStyleObject>;

const props = defineProps<{
  tags: Set<string>;
}>();

let tagSelectForm: Ref<HTMLFormElement | undefined> = ref();

let galgoBase = ref({
  capHeight: 0,
  lineGap: 24,
  fontMetrics: {
    familyName: "Galgo Light",
    fullName: "Galgo Medium",
    postscriptName: "Galgo-Medium",
    capHeight: 613,
    ascent: 750,
    descent: -250,
    lineGap: 0,
    unitsPerEm: 1000,
    xHeight: 495,
    xWidthAvg: 178,
    subsets: {
      latin: {
        xWidthAvg: 178,
      },
      thai: {
        xWidthAvg: 120,
      },
    },
  },
});

let galgoStyles: Ref<CapSizeStyle | undefined> = ref();

function scale(
  value: number,
  min1: number,
  max1: number,
  min2: number,
  max2: number,
): number {
  return min2 + ((value - min1) * (max2 - min2)) / (max1 - min1);
}

function setIdealSizing(): void {
  if (!window) return;

  const idealUpperLimit = 100;
  const idealLowerLimit = 43;
  const winMinSize = 350;
  const winMaxSize = 1445;
  let winAbsWidth = window.innerWidth;

  let idealCapSize = Math.ceil(
    scale(
      winAbsWidth,
      winMinSize,
      winMaxSize,
      idealLowerLimit,
      idealUpperLimit,
    ),
  );

  galgoBase.value.capHeight = idealCapSize;
}

function handleTag(e): void {
  if (!tagSelectForm) return;

  let selected = new FormData(tagSelectForm.value).getAll("article-filter");
  let elements = document.querySelectorAll("[data-tags]");

  if (selected.length >= 1) {
    elements.forEach((element) => {
      let attrs = element.getAttribute("data-tags")?.split(",");
      if (thereExistCommonItems(attrs, selected)) {
        element.setAttribute("data-tag-show", "true");
      } else {
        element.setAttribute("data-tag-show", "false");
      }
    });
  } else {
    elements.forEach((element) => {
      element.setAttribute("data-tag-show", "true");
    });
  }
}

function thereExistCommonItems(arr1, arr2) {
  return arr1.some((item) => arr2.includes(item));
}

onBeforeMount(() => {
  setIdealSizing();
  galgoStyles.value = createStyleObject(galgoBase.value);
  window.addEventListener("resize", setIdealSizing);
});

watch(
  () => galgoBase.value.capHeight,
  () => {
    galgoStyles.value = createStyleObject(galgoBase.value);
  },
);
</script>

<style scoped lang="scss">
form {
  position: sticky;
  padding-block: var(--space-xs);
  top: var(--space-xs);
  z-index: 3;
  overflow-y: hidden;
  scroll-behavior: smooth;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  -ms-scroll-snap-type: x mandatory;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }

  .tag-list {
    padding: 0;
    border: none;
    display: flex;
    flex-wrap: nowrap;
    align-items: flex-start;
    white-space: nowrap;
    gap: var(--space-xs);

    > .tag-toggle {
      display: grid;

      > * {
        grid-area: 1/1;
      }

      > label {
        padding: 0.2em 0.1em;
        border: 1px solid var(--border-color);
        cursor: pointer;
        font-family: Galgo;
        text-transform: uppercase;
        font-size: 4vw;

        &::before {
          content: "";
          margin-bottom: -0.0968em;
          display: table;
        }

        &:after {
          content: "";
          margin-top: -0.2097em;
          display: table;
        }
      }

      > input {
        appearance: none;
        background: none;
        border: none;
        inline-size: 100%;
        block-size: 100%;
        outline: none;

        &:checked ~ label {
          background-color: var(--accent-blue);
          color: var(--foreground-100);
        }

        &:not(:checked):is(:focus-within, :hover) ~ label {
          color: var(--foreground-100);
        }
      }
    }
  }
}
</style>
