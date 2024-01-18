<template>
  <q-page class="row justify-left q-pa-lg">
    <div class="block-item">
      <div class="row justify-end items-center">
        <div class="TableOperate row no-wrap justify-start items-start">
          <q-btn class="primaryBtn btn" label="新增" @click="handleOpenDialog('add')" />
          <q-btn class="btn" label="刪除" @click="handleOpenDialog('remove')" />
        </div>
      </div>
      <QTable :columns="state.columns" :rows="state.rows" :loading="loading" @search="handleSearch" />
    </div>
  </q-page>
</template>

<script setup>
import { apiGetMembers, apiPostSearch } from "src/api/api";
import { onMounted, reactive, ref, watch, computed } from "vue";
import QTable from "src/components/QTable.vue";
import { useStore } from "vuex";

const state = reactive({
  columns: [
    {
      name: "name",
      label: "姓名",
      align: "left",
      field: "name",
      sortable: true,
    },
    {
      name: "cellphone",
      label: "手機",
      align: "left",
      field: "cellphone",
      sortable: true,
    },
    {
      name: "email",
      label: "信箱",
      align: "left",
      field: "email",
      sortable: true,
    },
    {
      name: "gender",
      label: "性別",
      align: "left",
      field: "gender",
      sortable: true,
    },
    {
      name: "birthday",
      label: "生日",
      align: "left",
      field: "birthday",
      format: (val) => formatDate(val),
      sortable: true,
    },
  ],
  rows: [],
});
const store = useStore();
const selected = computed(() => store.state.selected);
const loading = ref(false);

// 格式化時間格式
const formatDate = (date) => {
  const dateParts = date.split("T")[0].split("-");
  const year = dateParts[0];
  const month = dateParts[1].padStart(2, "0");
  const day = dateParts[2].padStart(2, "0");

  return `${year}/${month}/${day}`;
};

// 取得員工資料
const getMembersData = async () => {
  loading.value = true
  await apiGetMembers()
    .then((res) => {
      const membersData = res.data.members;
      state.rows = [...membersData];
      loading.value = false
    })
    .catch((error) => {
      console.error(error);
    });
};

// 呼叫 Dialog
const handleOpenDialog = (type) => {
  if(type === 'add') {
    store.dispatch('handleOpenAddDialog', true)
  } else if (type === 'remove') {
    store.dispatch("handleOpenDialog", true);
  }
};

// 新增員工資料
const handleAddMember = () => {
  state.rows.unshift(store.state.memberData);
};

// 刪除
const handleDelete = () => {
  store.dispatch("updateRemove", false);
  store.dispatch("updateCount", 0);
  selected.value.forEach((selectedItem) => {
    state.rows = state.rows.filter((item) => item.name !== selectedItem.name);
  });
};

// 搜尋
const handleSearch = async (val) => {
  loading.value = true

  const data = JSON.stringify({
  "filter": {
    "name": val
  }
});

  await apiPostSearch(data)
    .then((res) => {
      const membersData = res.data.members;
      state.rows = [...membersData];
      loading.value = false
    })
    .catch((error) => {
      console.error(error);
    });
}

onMounted(async () => {
  await getMembersData();
});

// 監聽移除
watch(
  () => store.state.remove,
  (newVal) => {
    if (newVal) {
      handleDelete();
    }
  }
);

// 監聽新增
watch(
  () => store.state.add,
  (newVal) => {
    if (newVal) {
      handleAddMember();
    }
  }
);
</script>

<style lang="scss" scoped>
.block-item {
  min-width: 980px;
  @media (max-width: 1024px) {
    min-width: 100%;
  }
}

.TableOperate {
  gap: 15px;
}
</style>
