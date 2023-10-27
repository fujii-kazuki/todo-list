import { createApp } from "vue";
import Index from "../../components/homes/Index.vue";

document.addEventListener('DOMContentLoaded', () => {
  const app = createApp(Index)
  app.mount('#app');
});