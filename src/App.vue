<template>
  <router-view />
</template>

<script>
export default {
  name: 'App',
}
</script>

<style lang="scss">
@import url('primevue/resources/themes/saga-blue/theme.css');
@import url('primevue/resources/primevue.min.css');
@import url('primeicons/primeicons.css');
@import url('primevue/resources/themes/lara-light-indigo/theme.css');

#app {
  width: 100%;
  height: 100vh;
  background: #8E2DE2;
  background: -webkit-linear-gradient(to right, #4A00E0, #8E2DE2);
  background: linear-gradient(to right, #4A00E0, #8E2DE2);
  display: flex;
  align-items: center;
  justify-content: center;
}

.p-paginator-bottom {
  margin-top: 1.5rem;
}

.table-header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media screen and (max-width: 960px) {
    align-items: start;
	}
}

.confirmation-content {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>