<template>
  <ul>
    <li v-for="(item, index) in todoItems" :key="index">
      <spen>{{ item }}</spen>
      <button @click="removeTodo">삭제</button>
    </li>
  </ul>
</template>

<script>
import { ref, watch } from 'vue';

export default {
  props: ['todoItems'],
  setup(props, context) {

    function removeTodo(item, index) {
      context.emit('remove', item, index);
    }

    /** 
     * watch를 사용하면 어디서 어떤 이벤트가 발생하는지 추적이 어려워 
     * 지양하는 것이 좋다.
     */
    watch(props.todoItems, (newValue, oldValue) => {
      console.log({ newValue });
      localStorage.setItems();
    })

    return { removeTodo }
  }
}
</script>

<style lang="scss" scoped>
</style>