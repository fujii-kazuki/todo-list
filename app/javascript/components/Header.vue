<script setup>
const props = defineProps({
  title: {
    type: String,
    default: 'ToDoリスト'
  }
});
</script>

<template>
  <h1>{{ title }}</h1>
</template>