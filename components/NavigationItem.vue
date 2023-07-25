<template>
  <NuxtLink class="navigation-item" :to="navigationOption.path">
    <div>
      <Document v-if="navigationOption.type === 'File'" />
      <Folder v-else />
    </div>
    <span class="label">
      {{ navigationOption.name }}
    </span>
  </NuxtLink>
</template>

<script setup lang="ts">
import gsap from "gsap";
import { type PropType } from "vue";
import { NavigationItemOption } from "~/obdk";
const props = defineProps({
  navigationOption: {
    type: Object as PropType<NavigationItemOption>,
    required: true,
  },
});

let tl = gsap.timeline({ repeat: 1 });
const blink = (event: Event) => {
  if (event) {
    const blinkable = event.target;
    tl.to(blinkable, { opacity: 0, duration: 0.1 });
    tl.to(blinkable, { opacity: 1, duration: 0.09 });
  }
};
</script>
<style lang="scss" scoped>
@import "../assets/css/utilities/font-definitions";
.label {
  @include gestaltCaps(300, var(--idealSubFontSize));
  color: #fff;
}
.navigation-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
}

.opacity {
  opacity: 0;
}
</style>
~/obdk
