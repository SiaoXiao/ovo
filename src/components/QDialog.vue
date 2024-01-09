<template>
  <q-dialog :model-value="isOpen" persistent>
    <q-card class="ovo">
      <div class="dialogTitleBtn">
        <q-btn icon="close" flat dense @click="close"></q-btn>
      </div>
      <q-card-section class="dialogTitle">
        <div v-if="count !== 0">刪除</div>
        <span v-if="count == 0">請至少選取一筆資料</span>
        <span v-else class="dialogConten">{{ `是否確定刪除${count}筆資料?` }}</span>
      </q-card-section>

      <q-card-actions align="center" class="dialogBtns">
        <q-btn color="white" text-color="black" label="取消" @click="close" />
        <q-btn color="primary" label="確認" @click="close" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useStore } from 'vuex'
import { computed } from 'vue'

const store = useStore()
const isOpen = computed(() => store.state.isOpen);
const count = computed(() => store.state.count);

const close = () => {
  store.dispatch('handleOpenDialog', false);
  if(count.value === 0) return
  store.dispatch('updateRemove', true);
}
</script>

<style lang="scss" scoped>
.dialogTitleBtn {
  display: flex;
  align-items: center;
  justify-content: right;
  padding: 2px;
}
.ovo {
  width: 360px;
}
:deep(.q-card__section) {
  padding-top: 0;
}
.dialogTitle {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;
  div {
    margin: 0;
    font-size: 24px;
    font-weight: bold;
    letter-spacing: 0.025em;
  }
}
.dialogConten {
  font-size: 16px;
  letter-spacing: 0.025em;
}
.dialogBtns {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  padding: 16px 16px 32px 16px;
  button{
    width: 100px;
  }
}
</style>
