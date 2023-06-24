<template>
  <div class="layout">
    <Path />
    <div v-for="navigation in homeMap">
      <NavigationItem :navigation-option="navigation" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { NavigationItemOption } from "~/types";
const homeMap: NavigationItemOption[] = [
  {
    name: "musings",
    type: "Folder",
    path: "/home/musings",
  },
  {
    name: "artx",
    type: "Folder",
    path: "/home/artx",
  },
  {
    name: "poetry",
    type: "Folder",
    path: "/home/poetry",
  },
  {
    name: "drafts",
    type: "Folder",
    path: "/home/drafts",
  },
  {
    name: "resume",
    type: "File",
    path: "/home/resume",
  },
  {
    name: "manifesto",
    type: "File",
    path: "/home/manifesto",
  },
  {
    name: "notes",
    type: "Folder",
    path: "/home/notes",
  },
];
</script>

<style lang="scss" scoped>
.layout {
  // min-height: 100vh;
  padding: 20px 30px;
  // border-top: 1px solid white;
  display: grid;
  margin: 50px;
  grid-template-columns: repeat(5, 1fr);
  row-gap: 40px;
}
</style>
