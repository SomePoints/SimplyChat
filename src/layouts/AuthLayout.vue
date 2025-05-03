<script setup lang="ts">
</script>

<template>
  <div class="auth-layout">
    <div class="container">
      <div class="auth-layout__logo">
        <img src="@/assets/images/logo.svg" alt="logo">
      </div>
      <slot />
    </div>
  </div>
</template>

<style scoped lang="postcss">
.auth-layout {
  @apply h-screen w-screen;

  .container {
    @apply flex flex-col items-center mx-auto pt-[148px];
  }

  &__logo {
    @apply my-4;
  }
}
</style>
