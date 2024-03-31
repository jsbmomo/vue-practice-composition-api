# vue-compoistion-api

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

----
## Vue composition-api 사용

### 문법의 차이


#### Vue 2

    <template>
    </template>

    <script>
    export default {
      data() {
        return {}
      },
      methods: {

      }
    }
    </script>


#### Vue composition-api ( or Vue3 )

    <template>
    </template>

    <script>
    export default {
      props: [],
      setup(props, context) {
        return {}
      }
    }
    </script>


물론, composition-api를 사용한다고 해서, 이전의 Vue2 방식을 사용하지 못하는 건 아닙니다.
아래와 같이 composition-api의 setup과 Vue2의 methods를 같이 사용할 수 있습니다. 


    export default {
      data() {
        return {}
      },
      setup(props, context) {
        return {}
      },
      methods: {}
    }


---

### Life cycle

https://joshua1988.github.io/vue-camp/composition/lifecycle.html

Life cycle에 대한 상세한 내용은 위의 문서를 참고하면 좋을 것 같습니다..
composition-api에서는 Vue2에서 created, mounted를 선언하여 사용하는 방식과 달리, 해당 요소들을 마치 API처럼 호출하여 사용하게 되었습니다.


    import { onBeforeMount, onMounted, ref } from 'vue';

    export default {
      setup(props, context) {
        onBeforeMount(() => {})
        onMounted(() => {})
      },
    }


추가로, 위와 같이 onMounted가 아닌 setup 안에 호출된 함수 또는 변수들은 기본적으로 created에서 동작하게 됩니다.


---

### props와 emit사용법의 변화

composition-api에서 props와 emit을 사용할 경우, setup의 매개변수로 받아서 사용하게 됩니다.
아래의 코드를 보면 이전의 Vue2 문법과 같이 props를 작성해주되 this로 접근하지 않는 것을 확인할 수 있습니다.


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

> ### 주의사항
> 위의 코드에서는 context에서 emit를 가져오는 걸 알 수 있다.
> Javascript에 익숙한 개발자라면 Destructure를 사용하여 emit를 가져오려고 할 수 있다.
> 하지만, 그렇게 emit를 가져올 경우, Vue의 Reactivity를 잃게되어 의도한 것과 같이 emit를 사용할 수 없으니, 주의해야 한다.

