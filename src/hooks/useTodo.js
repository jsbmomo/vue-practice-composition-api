import { onBeforeMount, ref } from "vue";

/**
 * 비즈니스 로직은 너무 분리하는 것보단,
 * 일관성 있게 하나의 파일에 작성하고, 원하는 로직을 찾아보는 것이
 * 유지보수에도 용이해 보인다.
 */
function useTodo() {

  const todoItems = ref([]);

  function fetchTodos() {
    const result = [];

    for (let i = 0; i < localStorage.length; i++) {
      const todoItem = localStorage.key(i);
      result.push(todoItem);
    }

    return result;
  }

  function addTodoItems(todo) {
    todoItems.value.push(todo);
    localStorage.setItem(todo, todo);
  }

  /**
   * 명확한 동작 확인을 위해, custom api에서 life cycle를 사용하는 것은
   * 지양하는 것을 고려할 것.
   */
  // onBeforeMount(() => {
  //   todoItems.vlaue = fetchTodos();
  // })

  return { todoItems, fetchTodos, addTodoItems }
}

export { useTodo }