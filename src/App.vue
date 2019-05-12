<template>
  <div id="app">
    <notifications></notifications>
    <transition name="fade">
      <router-view/>
    </transition>
  </div>
</template>
<style>
.fade-enter-active, .fade-leave-active {
  transition-property: opacity;
  transition-duration: .25s;
}

.fade-enter-active {
  transition-delay: .25s;
}

.fade-enter, .fade-leave-active {
  opacity: 0
}
</style>



