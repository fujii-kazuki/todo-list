<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const tasks = ref([]);
const newTask = ref('');

onMounted(() => {
  axios.get('/api/tasks').then((response) => {
    for(let i = 0; i < response.data.tasks.length; i++) {
      tasks.value.push(response.data.tasks[i]);
    }
  }, (error) => {
    console.log(error);
  });
});

const createTask = () => {
  if(newTask.value == '') return;

  axios.post('/api/tasks', { task: { name: newTask.value } }).then((response) => {
    tasks.value.unshift(response.data.task);
    newTask.value = '';
  }, (error) => {
    console.log(error);
  });
};

const deleteTask = (task_id, index) => {
  axios.delete('/api/tasks/' + task_id).then((response) => {
    tasks.value.splice(index, 1);
  }, (error) => {
    console.log(error);
  });
};

const update = (task_id) => {
  axios.put('/api/tasks/' + task_id).then((responce) => {
  }, (error) => {
    console.log(error);
  });
}
</script>

<template>
  <div>
    <input v-model="newTask" placeholder="ToDoを追加して下さい">
    <button v-on:click="createTask">追加</button>
  </div>
  <ul>
    <li v-for="(task, index) in tasks">
      <input type="checkbox" v-model="task.is_done" v-on:click="update(task.id, index)">
      <span v-bind:class="{done: task.is_done}">{{ task.name }}</span>
      <button v-on:click="deleteTask(task.id, index)">削除</button>
    </li>
  </ul>
</template>