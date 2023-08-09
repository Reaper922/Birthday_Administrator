<script setup>
defineProps({
  isOpen: {
    type: Boolean,
    required: true
  }
});
</script>

<template>
  <transition name="sidebar-slide">
    <aside class="sidebar" v-if="isOpen">
      <!-- Sidebar Content -->
      <h1>Sidebar</h1>
    </aside>
  </transition>
</template>

<style>
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  padding: 16px;
  width: var(--sidebar-width);
  background: white;
  box-shadow: var(--box-shadow-md);
  z-index: 5;
}

.sidebar-slide-enter-active,
.sidebar-slide-leave-active,
.container {
  transition: transform var(--transition-time);
}

.sidebar-slide-enter-from,
.sidebar-slide-leave-to {
  transform: translateX(calc(var(--sidebar-width) * -1));
}
</style>
