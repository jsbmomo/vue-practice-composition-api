<template>
  <div id="app">
    <TodoHeader :app-title="title"/>
    <TodoInput @add="addTodoItems"></TodoInput>
    <TodoList :todo-items="todoItems"></TodoList>
  </div>
</template>

<script>
import { onBeforeMount, onMounted, onUnmounted, ref } from 'vue';

import TodoHeader from './components/TodoHeader.vue';
import TodoInput from './components/TodoInput.vue';
import TodoList from './components/TodoList.vue';
import { useTodo } from './hooks/useTodo'

export default {
  name: 'App',
  components: {
    TodoHeader,
    TodoInput,
    TodoList
  },
  data() {
    return {
      title: 'Todo App'
    }
  },
  setup() {
    /**
     * 하위 요소의 함수에 직접 접근하는 것보다,
     * 값을 만들어서 넘겨주는 것을 고려해 볼 것.
     */
    // todoItems.value = fetchTodos(); 

    console.log('1');
    onMounted(() => {
      console.log('2');
    })

    /**
     * 아래와 같이 라이플 사이클에 따라,
     * custom api를 적절히 호출하여 사용하는 방법은,
     * "추상화"가 잘 되어있게 설계된 예제라고 볼 수 있다.
     * 
     * 다만, 무조건 분리하는 것이 좋은 것은 아니며, 기회비용을
     * 생각하여 적재적소에 사용하는 것이 좋다.
     */
    onBeforeMount(() => {
      console.log('3');

      todoItems.value = fetchTodos();
    })

    onUnmounted(() => {
      console.log('4');
    })

    const { 
      todoItems, 
      addTodoItems,
      fetchTodos
    } = useTodo();

    return { todoItems, addTodoItems }
  },
  // setup를 사용한다고 methods를 사용하지 못하는 것이 아니다.
  methods: {
    removeTodoItems(item, index) {  
      this.todoItems.splice(index, 1);
      localStorage.removeItem(item);
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
