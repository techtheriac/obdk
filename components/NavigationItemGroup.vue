<template>
  <div id="navigationItemContainer" class="layout" data-min="250px">
    <NavigationItem
      v-for="navigation in homeMap"
      :navigation-option="navigation"
    />
  </div>
</template>

<script setup lang="ts">
import { NavigationItemOption } from "~/obdk";

const homeMap: NavigationItemOption[] = [
  {
    name: "musings",
    type: "Folder",
    path: "/www/musings",
  },
  {
    name: "artx",
    type: "Folder",
    path: "/www/artx",
  },
  {
    name: "poetry",
    type: "Folder",
    path: "/www/poetry",
  },
  {
    name: "drafts",
    type: "Folder",
    path: "/www/drafts",
  },
  {
    name: "resume",
    type: "File",
    path: "/www/resume",
  },
  {
    name: "manifesto",
    type: "File",
    path: "/www/manifesto",
  },
  {
    name: "notes",
    type: "Folder",
    path: "/www/notes",
  },
  {
    name: "colophon",
    type: "File",
    path: "/www/colophon",
  },
];

onMounted(() => {
  const gridNode = document.getElementById("navigationItemContainer");
  if (!gridNode) return;

  const resizeObserver = useGridObserver({
    gridNode,
    toggleClassName: "above-min",
  });
});
</script>

<style lang="scss" scoped>
.layout {
  width: 100%;
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(3, 1fr);
}

// This class is toggled upon
.above-min {
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
}
</style>
