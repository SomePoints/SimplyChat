<script setup lang="ts">
import { type Component, computed } from 'vue';
import { RouterView, useRoute } from 'vue-router';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import AuthLayout from '@/layouts/AuthLayout.vue';
import type { LayoutNames } from '@/layouts/types';

const route = useRoute();

const layouts: Record<LayoutNames, Component> = {
  'default-layout': DefaultLayout,
  'auth-layout': AuthLayout,
};

const resolveLayout = computed(() => {
  return route.meta.layout ? layouts[route.meta.layout] : 'div';
});
</script>

<template>
  <component :is="resolveLayout">
    <router-view />
  </component>
</template>
