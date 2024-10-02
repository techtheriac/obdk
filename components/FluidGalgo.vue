<template>
  <component :is="as" :style="styles" v-bind="$attrs">
    <slot></slot>
  </component>
</template>

<script lang="ts">
import { createStyleObject } from "@capsizecss/core";
type CapSizeStyle = ReturnType<typeof createStyleObject>;

// https://fontdrop.info/ - for font metrics
export default defineComponent({
  name: "FluidGalgo",
  props: {
    as: {
      type: String as PropType<keyof HTMLElementTagNameMap>,
      default: "div",
    },
  },

  setup(props, { attrs, slots }) {
    let styles: Ref<CapSizeStyle | undefined> = ref();
    let baseStyleConfig = ref({
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

      const idealUpperLimit = 70;
      const idealLowerLimit = 40;
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

      baseStyleConfig.value.capHeight = idealCapSize;
    }

    onBeforeMount(() => {
      setIdealSizing();
      styles.value = createStyleObject(baseStyleConfig.value);
      window.addEventListener("resize", setIdealSizing);
    });

    watch(
      () => baseStyleConfig.value.capHeight,
      () => {
        styles.value = createStyleObject(baseStyleConfig.value);
      },
    );

    return {
      as: props.as,
      attrs,
      slots,
      styles,
    };
  },
});
</script>

<style scoped></style>
