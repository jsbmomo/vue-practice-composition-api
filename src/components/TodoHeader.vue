<template>
  <h1>{{ appTitle }}</h1>
  <h4>{{ newTitle }}</h4>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'header',
  props: ['appTitle'],
  setup(props) {

    const newTitle = computed(() => {
      return props.appTitle + '!!';
    });

    return { newTitle }
  }
}
</script>