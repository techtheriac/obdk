<template>
  <button @click="animateItems">
    Click
  </button>
</template>

<script setup>
  import {onMounted} from "vue";
  import gsap from "gsap";
  let stackedItems;
  let stackContainer;

  let visible = ref(false);

  let t1;

  onMounted(() => {
    stackedItems = document.querySelectorAll(".stacked_item");
    stackContainer = document.querySelector(".stacked")

   t1 = gsap.timeline({onReverseComplete: () => toggleHidden()})
   .from(stackContainer, {autoAlpha: 0, duration: 0.2})
   .from(stackedItems, {
      duration: 0.5,
      stagger: .2,
      autoAlpha: 0,
      xPercent: 50,
   }).pause()
  })

  function animateItems() {
   if(!visible.value) {
    stackContainer.classList.remove("hidden")

    if(t1.reversed()) {
      t1.play()
    }
    t1.resume()
    visible.value = true; 
   }
   else {
    t1.reverse(0.7)
    visible.value = false;
   }
  } 

  function toggleHidden() {
    stackContainer.classList.add("hidden");
  }
</script>

<style lang="scss" scoped>
button {
  position:  absolute;
  top: 50%;
  right: 10%;
  z-index: 4;
}
</style>
