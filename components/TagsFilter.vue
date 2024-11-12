<template>
  <form ref="tagSelectForm">
    <fieldset v-on:change="handleTag" class="tag-list">
      <div class="tag-toggle" v-for="tag in tags">
        <input type="checkbox" name="article-filter" :value="tag" :id="tag" />
        <FluidGalgo as="label" :for="tag">{{ tag }}</FluidGalgo>
      </div>
    </fieldset>
  </form>
</template>

<script setup lang="ts">
const props = defineProps<{
  tags: Set<string>;
}>();

let tagSelectForm: Ref<HTMLFormElement | undefined> = ref();

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
</script>

<style scoped lang="scss">
form {
  --select-foreground: var(--yellow-20);
  --select-background: var(--forest-10);

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
        cursor: pointer;
        font-family: Galgo;
        font-weight: 300;
        border: 1px solid var(--border-color);
        text-transform: uppercase;
        font-size: 4vw;
        color: var(--color, rgb(164, 173, 182));
        transition:
          color 0.3s var(--easingOut),
          background-color 0.3s var(--easing);

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
        display: none;
        appearance: none;
        background: none;
        inline-size: 100%;
        block-size: 100%;
        outline: none;

        &:checked ~ label {
          background-color: var(--select-background);
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
