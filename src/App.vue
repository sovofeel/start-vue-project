<template lang="html">
  <div class="wrapper-app">
    <h1>{{ title }}</h1>
    <span v-if="seen">Меня видно</span>
  </div>
</template>

<script>
export default {
  data: () => ({
    title: 'hello',
    seen: true
  }),

  methods: () => ({})
}
</script>
