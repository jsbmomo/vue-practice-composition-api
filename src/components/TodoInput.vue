<template>
  <div>
    <input type="text">
    <button @click="addTodo">Add</button>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup(props, context) {
    const todoInput = ref('');

    function addTodo() {
      const todo = todoInput.value;
      
      context.emit('add', todo);
      clearTodo();
    }

    const clearTodo = () => todoInput.value = '';

    return { todoInput, addTodo }
  }
}
</script>

<style lang="scss" scoped>
</style>