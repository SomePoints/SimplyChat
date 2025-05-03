<script setup lang="ts">
import { reactive } from 'vue';

const formData = reactive({
  email: '',
});

const submit = () => {};
</script>

<template>
  <div class="auth-card">
    <div class="auth-card__header">
      <h1>Добро пожаловать</h1>
    </div>
    <div class="auth-card__body">
      <el-form :model="formData" size="large" label-position="top">
        <el-form-item
          class="mb-6"
          label="Почта"
        >
          <el-input
            type="text"
            id="email"
            placeholder="Введите Email адрес"
            v-model="formData.email"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            class="w-full"
            type="primary"
            size="default"
            @click="submit"
          >
            Войти в аккаунт или зарегистрироваться
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style scoped lang="postcss">
.auth-card {
  @apply w-full max-w-[456px];

  &__header {
    @apply py-5 text-center;

    h1 {
      @apply text-[32px] leading-[38px] font-medium text-gray-900 text-nowrap;
    }
  }

  &__body {
    @apply py-5;
  }
}
</style>
