<template>
  <div>
    <div v-for="navigation in IndexMap">
      <NavigationItem :navigation-option="navigation" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { NavigationItemOption } from "~/types";
const IndexMap: NavigationItemOption[] = [
  {
    name: "musings",
    type: "Folder",
    path: "/index/musings",
  },
  {
    name: "artx",
    type: "Folder",
    path: "/index/artx",
  },
  {
    name: "poetry",
    type: "Folder",
    path: "/index/poetry",
  },
  {
    name: "drafts",
    type: "Folder",
    path: "/index/drafts",
  },
  {
    name: "resume",
    type: "File",
    path: "/index/resume",
  },
  {
    name: "manifesto",
    type: "File",
    path: "/index/manifesto",
  },
  {
    name: "notes",
    type: "Folder",
    path: "/index/manifesto",
  },
];
</script>

<style lang="scss" scoped></style>
