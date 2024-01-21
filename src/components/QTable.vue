<template>
  <q-table
    flat
    bordered
    color="secondary"
    table-header-class="tableColumns"
    class="q-mt-md shadow-3"
    :columns="columns"
    :rows="rows"
    :filter="filter"
    row-key="name"
    separator="cell"
    selection="multiple"
    v-model:selected="selected"
    v-model:pagination="pagination"
    no-data-label="no data"
    no-results-label="未找到符合的資料"
    :loading="loading"
  >
    <!-- Search bar -->
    <template v-slot:top>
      <!-- fit row justify-between items-center -->
      <div class="tableSearchWrap">
        <q-input
          borderless
          dense
          outlined
          debounce="300"
          v-model="filter"
          placeholder="Search..."
        >
          <template v-slot:prepend>
            <q-icon name="search"></q-icon>
          </template>
          <template v-slot:append>
            <q-icon
              name="close"
              @click="filter = ''"
              class="cursor-pointer"
            ></q-icon>
          </template>
        </q-input>

        <q-input
          borderless
          dense
          outlined
          debounce="300"
          v-model="ApiFilter"
          placeholder="API Search for name..."
        >
          <template v-slot:prepend>
            <q-icon name="search"></q-icon>
          </template>
          <template v-slot:append>
            <q-icon
              name="close"
              @click="ApiFilter = ''"
              class="cursor-pointer"
            ></q-icon>
          </template>
        </q-input>
      </div>
    </template>

    <!-- Table data tip -->
    <template v-slot:body-cell="props">
      <q-td :props="props">
        <div v-ripple>
          {{ props.value }}
        </div>
        <q-tooltip
          anchor="bottom middle"
          self="center middle"
          class="bg-secondary text-body2"
        >
          {{ props.value }}
        </q-tooltip>
      </q-td>
    </template>

    <!-- 資料狀態處理 -->
    <template v-slot:no-data="{ message, filter }">
      <div class="full-width row justify-center items-center q-pa-xl">
        <q-icon
          v-if="!loading"
          :name="filter ? 'search' : 'warning'"
          :color="filter ? 'secondary' : 'warning'"
          size="lg"
        ></q-icon>
        <span class="text-caption q-ml-sm">{{ message }}</span>
      </div>
    </template>

    <!-- table bottom -->
    <template v-slot:bottom="scope">
      <div class="row justify-center items-center">
        <q-select
          borderless
          v-model="pagination.rowsPerPage"
          :options="options"
          label="每頁筆數"
          class="tableSelect"
          emit-value
          map-options
        ></q-select>
        <q-btn
          v-if="scope.pagesNumber > 2"
          icon="first_page"
          color="grey-8"
          round
          dense
          flat
          :disable="scope.isFirstPage"
          @click="scope.firstPage"
        ></q-btn>
        <div class="row wrap justify-center items-center">
          <q-btn
            icon="chevron_left"
            color="grey-8"
            round
            dense
            flat
            :disable="scope.isFirstPage"
            @click="scope.prevPage"
          ></q-btn>
          <span>{{
            `第 ${scope.pagination.page} 頁，共 ${scope.pagesNumber} 頁`
          }}</span>
          <q-btn
            icon="chevron_right"
            color="grey-8"
            round
            dense
            flat
            :disable="scope.isLastPage"
            @click="scope.nextPage"
          ></q-btn>
          <q-btn
            v-if="scope.pagesNumber > 2"
            icon="last_page"
            color="grey-8"
            round
            dense
            flat
            :disable="scope.isLastPage"
            @click="scope.lastPage"
          ></q-btn>
          <div>{{ `共 ${rows.length} 幾筆資料` }}</div>
        </div>
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
  loading: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["search"]);
const options = [
  { label: "5", value: 5 },
  { label: "7", value: 7 },
  { label: "10", value: 10 },
  { label: "15", value: 15 },
  { label: "20", value: 20 },
  { label: "25", value: 25 },
  { label: "50", value: 50 },
  { label: "All", value: 0 },
];
const store = useStore();
const selected = ref([]);
const filter = ref("");
const ApiFilter = ref("");

const pagination = ref({
  descending: false,
  page: 1,
  rowsPerPage: 5,
});

// 監聽選取事件
watch(selected, (newVla) => {
  store.dispatch("updateCount", newVla.length);
  store.dispatch("updateSelected", newVla);
});

watch(
  () => props.rows,
  () => {
    store.dispatch("updateSelected", []);
    selected.value = [];
  }
);

watch(ApiFilter, (newVla) => {
  emit("search", newVla);
});
</script>

<style lang="scss" scoped>
.tableSearchWrap {
  flex: 1;
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 15px;

  @media (max-width: 640px) {
    flex-direction: column;
    justify-content: center;
    gap: 10px;
    width: 100%;
    :deep(.q-input) {
      width: 100%;
    }
  }
}

:deep(.tableColumns) {
  th {
    background-color: #2f4052;
    color: #fff;
    letter-spacing: 0.025em;
    font-weight: bold;
    .q-checkbox__inner {
      color: #fff;
    }
  }
}

:deep(.q-table) {
  tbody {
    tr {
      color: #73879c;
    }
  }
}
:deep(.q-table__bottom) {
  justify-content: end;
}
.tableSelect {
  width: 150px;
}
</style>
