<template>
  <div class="essay-segment">
    <div class="meta">
      <h2 :data-accent="name">{{ name }}</h2>
      <p>
        {{ summary }}
      </p>
    </div>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { Segment } from "~/obdk";

const props = defineProps<{
  name: Segment;
  summary: string;
}>();

function getAccentFromSegment(name: Segment) {}
</script>

<style scoped lang="scss">
.essay-segment {
  width: 100%;
  .meta {
    border-bottom: 1px solid var(--border-color);
    padding-bottom: var(--space-s);
    > * + * {
      margin-block-start: var(--space-s);
    }

    h2 {
      position: relative;
      font-weight: 600;
      font-size: var(--idealHeadingOne);

      &[data-accent="Essays"] {
        --accent-color: var(--accent-yellow);
      }
      &[data-accent="Notes"] {
        --accent-color: var(--accent-orange);
      }

      &::before {
        content: "";
        width: 1.3ch;
        height: 1em;
        position: absolute;
        top: 0;
        background-color: var(--accent-color);
        z-index: -1;
      }
    }
    p {
      font-size: var(--idealBaseFontSize);
      max-width: 70ch;
    }
  }
}
</style>
