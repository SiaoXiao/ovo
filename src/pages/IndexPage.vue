<template>
  <q-page class="row justify-left q-pa-lg">
    <div class="block-item">
      <div class="row justify-between items-center">
        <div class="text-h6 tableTitle">員工基本資訊</div>
        <div>
          <q-btn class="q-mr-sm" color="primary" label="新增" @click="handleAddMember" />
          <q-btn color="white" text-color="black" label="刪除" @click="handleOpenDialog" />
        </div>
      </div>
      <QTable :columns="state.columns" :rows="state.rows" />
    </div>
  </q-page>
</template>

<script setup>
import { apiGetMembers } from "src/api/api";
import { onMounted, reactive, watch, computed } from "vue";
import QTable from "src/components/QTable.vue";
import { useStore } from 'vuex'

const state = reactive({
  columns: [
    {
      name: "name",
      label: "姓名",
      align: "left",
      field: "name",
      sortable: true
    },
    {
      name: "cellphone",
      label: "手機",
      align: "left",
      field: "cellphone",
      sortable: true
    },
    {
      name: "email",
      label: "信箱",
      align: "left",
      field: "email",
      sortable: true
    },
    {
      name: "gender",
      label: "性別",
      align: "left",
      field: "gender",
      sortable: true
    },
    {
      name: "birthday",
      label: "生日",
      align: "left",
      field: "birthday",
      format: val => formatDate(val),
      sortable: true
    },
  ],
  rows: [],
});
const store = useStore()
const selected = computed(() => store.state.selected);

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
  await apiGetMembers()
    .then((res) => {
      const membersData = res.data.members;
      state.rows = [...membersData];
    })
    .catch((error) => {
      console.error(error);
    });
};

// 呼叫 Dialog
const handleOpenDialog = () => {
  store.dispatch('handleOpenDialog', true);
}

// 新增員工資料
const handleAddMember = () => {
const fakeData = {
      "name": `name${Math.floor(Math.random() * 90000) + 10000}`,
      "cellphone": "0912345678",
      "email": "email1@email.com",
      "gender": "gender1",
      "birthday": "1997-12-19T11:11:11.111Z"
    }
    state.rows.unshift(fakeData)

}
// 刪除
const handleDelete = () => {
  store.dispatch('updateRemove', false);
  store.dispatch('updateCount', 0);
  selected.value.forEach(selectedItem  => {
    state.rows = state.rows.filter(item => item.name !== selectedItem.name);
  });

}

onMounted(async () => {
  await getMembersData();
});

// 監聽移除
watch(() => store.state.remove, (newVal) => {
  if(newVal) {
    handleDelete()
  }
});

</script>

<style lang="scss" scoped>
.block-item {
  min-width: 100%;
  @media (min-width: 640px) {
    min-width: 400px;
  }
}
.tableTitle{
  color:#252422;
  letter-spacing: 0.025em;
}
</style>
