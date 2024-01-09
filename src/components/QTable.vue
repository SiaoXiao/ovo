<template>
  <q-table
    flat
    bordered
    card-class="text-brown"
    table-class="text-grey-8"
    table-header-class="text-grey-1 bg-grey-6 tableColumns"
    class="q-mt-sm shadow-3"
    :columns="columns"
    :rows="rows"
    row-key="name"
    separator="cell"
    selection="multiple"
    v-model:selected="selected"
    no-data-label="no data"
    :loading="loading"
  >
    <template v-slot:body-cell="props">
      <q-td :props="props">
        <div v-ripple>
          {{ props.value }}
        </div>
        <q-tooltip anchor="bottom middle" self="center middle">
          {{ props.value }}
        </q-tooltip>
      </q-td>
    </template>
    <template v-slot:no-data="{ message }">
      <div class="full-width row flex-center text-accent q-gutter-sm">
        <span>{{ message }} </span>
      </div>
    </template>
  </q-table>
</template>

<script setup>
import { ref, watch } from "vue";
import { useStore } from "vuex";

const props = defineProps({
  columns: {
    type: Array,
    default: () => [],
  },

  rows: {
    type: Array,
    default: () => [],
  },
});
const store = useStore();
const loading = ref(false);
const selected = ref([]);

// 監聽選取事件
watch(selected, (newVla) => {
  store.dispatch("updateCount", newVla.length);
  store.dispatch("updateSelected", newVla);
});
</script>

<style lang="scss" scoped>
:deep(.tableColumns) {
  th {
    letter-spacing: 0.025em;
    font-weight: bold;
  }
}
</style>
