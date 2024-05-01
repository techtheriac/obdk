<template>
  <nav class="nav">
    <div class="nav-container">
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iure nulla
        consequatur quos praesentium accusantium similique autem dolorum quasi
        voluptas! Porro molestias repellat rerum, laudantium dicta unde sit
        fugiat voluptatum nulla!
      </p>
    </div>
  </nav>
</template>

<script setup lang="ts"></script>
<style lang="scss" scoped>
.nav {
  z-index: 100000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 25px 0;
  min-width: 50px;
  max-height: 50px;
  width: 0;
  border: 1px dotted rgba(var(--ob-color-laurel), 0.3);
  border-radius: 50px;
  background-color: var(--accent);
  color: rgba(var(--ob-color-seaweed));
  transition:
    width 0.4s ease-in-out,
    border-radius 0.4s ease-in-out,
    max-height 0.4s ease-in-out 0.4s;
  transform: translateX(-50%);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}
nav:hover,
nav.opened {
  max-height: 300px;
  width: 33.3%;
  border-radius: 10px;
  transform: translateX(-50%);
}
.nav-container {
  display: none;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

nav:hover .nav-container,
nav.opened .nav-container {
  display: flex;
  animation: fadeIn 0.4s 0.6s ease both;
}

@media (max-width: 950px) {
  nav:hover {
    width: calc(100% - 20px);
    border-radius: 10px;
  }

  nav.opened {
    width: calc(100% - 20px);
  }

  .nav-container {
    padding: 20px;
  }
}
</style>
