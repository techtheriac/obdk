<template>
  <form ref="tagSelectForm">
    <fieldset v-on:change="handleTag" class="tag-list">
      <div class="tag-toggle" v-for="tag in tags">
        <input type="checkbox" name="article-filter" :value="tag" :id="tag" />
        <label :for="tag">{{ tag }}</label>
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
        font-family: Grosteque;
        border: 1px solid var(--border-color);
        text-transform: uppercase;
        font-size: var(--step-5);
      }

      > input {
        display: none;
        appearance: none;
        background: none;
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
