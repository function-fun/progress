<template>
  <div>
    <!-- 头部 -->
    <div class="header">
      <h1>进度条列表</h1>
      <button class="add-button" @click="openAddModal">
        <svg class="button-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
        </svg>
      </button>
    </div>
    <!-- 进度列表 -->
    <div class="progress-list" id="progressList">
      <div
        v-for="(item, index) in progressItems"
        :key="index"
        class="progress-item"
        :data-step="item.step"
        :data-unit="item.unit"
      >
        <div class="progress-info">
          <div class="progress-title">{{ item.title }}</div>
          <div class="progress-bar-container">
            <div
              class="progress-bar"
              :style="{ backgroundColor: item.color, width: (item.current / item.total) * 100 + '%' }"
            >
              <div class="progress-value">{{ item.current }} / {{ item.total }}, {{ item.unit }}</div>
            </div>
          </div>
        </div>
        <button class="edit-button" @click="openEditModal(item)">编辑</button>
        <button class="delete-button" @click="deleteProgress(index)">删除</button>
      </div>
    </div>
    <!-- 弹出框 -->
    <div class="modal" id="addModal" :class="{ show: addModalVisible }">
      <div class="modal-content">
        <h2>添加新进度</h2>
        <div class="input-group">
          <label for="titleInput" class="input-label">标题:</label>
          <input type="text" class="input-field" v-model="newProgress.title" placeholder="标题" />
        </div>
        <div class="input-group">
          <label for="currentInput" class="input-label">当前:</label>
          <input
            type="number"
            class="input-field"
            v-model="newProgress.current"
            placeholder="当前"
          />
        </div>
        <div class="input-group">
          <label for="stepInput" class="input-label">步进:</label>
          <input
            type="number"
            class="input-field"
            v-model="newProgress.step"
            placeholder="步进"
          />
        </div>
        <div class="input-group">
          <label for="totalInput" class="input-label">总数:</label>
          <input
            type="number"
            class="input-field"
            v-model="newProgress.total"
            placeholder="总数"
          />
        </div>
        <div class="input-group">
          <label for="unitInput" class="input-label">单位:</label>
          <input type="text" class="input-field" v-model="newProgress.unit" placeholder="单位" />
        </div>
        <div class="button-container">
          <button class="modal-button" @click="addProgress">
            <svg class="button-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
            </svg>
            添加
          </button>
          <button class="modal-button" @click="closeAddModal">
            <svg class="button-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            </svg>
            取消
          </button>
        </div>
      </div>
    </div>
    <!-- 编辑弹出框 -->
    <div class="modal" id="editModal" :class="{ show: editModalVisible }">
      <div class="modal-content">
        <h2>编辑进度</h2>
        <div class="input-group">
          <label for="editTitleInput" class="input-label">标题:</label>
          <input
            type="text"
            class="input-field"
            v-model="editProgress.title"
            placeholder="标题"
          />
        </div>
        <div class="input-group">
          <label for="editCurrentInput" class="input-label">当前:</label>
          <input
            type="number"
            class="input-field"
            v-model="editProgress.current"
            placeholder="当前"
          />
        </div>
        <div class="input-group">
          <label for="editStepInput" class="input-label">步进:</label>
          <input
            type="number"
            class="input-field"
            v-model="editProgress.step"
            placeholder="步进"
          />
        </div>
        <div class="input-group">
          <label for="editTotalInput" class="input-label">总数:</label>
          <input
            type="number"
            class="input-field"
            v-model="editProgress.total"
            placeholder="总数"
          />
        </div>
        <div class="input-group">
          <label for="editUnitInput" class="input-label">单位:</label>
          <input
            type="text"
            class="input-field"
            v-model="editProgress.unit"
            placeholder="单位"
          />
        </div>
        <div class="button-container">
          <button class="modal-button" @click="saveEdit">
            <svg class="button-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z" />
            </svg>
            保存
          </button>
          <button class="modal-button" @click="closeEditModal">
            <svg class="button-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            </svg>
            取消
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue';

// 定义进度项的接口
interface ProgressItem {
  title: string;
  current: number;
  step: number;
  total: number;
  unit: string;
  color: string;
}

const macaronColors = ['#FFB6C1', '#FFDAB9', '#B0E0E6', '#98FB98', '#DDA0DD', '#F0E68C'];

// 存储进度项的数组
const progressItems = ref<ProgressItem[]>([]);
// 当前编辑的项的索引
const editIndex = ref<number | null>(null);
// 新进度项
const newProgress = ref<ProgressItem>({
  title: '',
  current: 0,
  step: 0,
  total: 0,
  unit: '',
  color: macaronColors[0],
});
// 编辑的进度项
const editProgress = ref<ProgressItem>({
  title: '',
  current: 0,
  step: 0,
  total: 0,
  unit: '',
  color: macaronColors[0],
});
// 添加模态框可见性
const addModalVisible = ref<boolean>(false);
// 编辑模态框可见性
const editModalVisible = ref<boolean>(false);

// 页面加载时从本地存储加载数据
onMounted(() => {
  const storedData = localStorage.getItem('progressData');
  if (storedData) {
    progressItems.value = JSON.parse(storedData) as ProgressItem[];
  }
});

// 监听 progressItems 变化，更新本地存储
watch(progressItems, (newValue) => {
  localStorage.setItem('progressData', JSON.stringify(newValue));
}, { deep: true });

// 打开添加弹出框
const openAddModal = () => {
  addModalVisible.value = true;
  // 重置新进度项
  newProgress.value = {
    title: '',
    current: 0,
    step: 0,
    total: 0,
    unit: '',
    color: macaronColors[0],
  };
};

// 关闭添加弹出框
const closeAddModal = () => {
  addModalVisible.value = false;
};

// 打开编辑弹出框
const openEditModal = (item: ProgressItem) => {
  editIndex.value = progressItems.value.indexOf(item);
  editProgress.value = { ...item };
  editModalVisible.value = true;
};

// 关闭编辑弹出框
const closeEditModal = () => {
  editModalVisible.value = false;
  editIndex.value = null;
};

// 添加新进度项
const addProgress = () => {
  if (
    newProgress.value.title &&
    newProgress.value.current !== null &&
    newProgress.value.step !== null &&
    newProgress.value.total !== null &&
    newProgress.value.unit
  ) {
    progressItems.value.push({ ...newProgress.value });
    closeAddModal();
  }
};

// 保存编辑
const saveEdit = () => {
  if (editIndex.value !== null) {
    progressItems.value[editIndex.value] = { ...editProgress.value };
    closeEditModal();
  }
};

// 删除进度项
const deleteProgress = (index: number) => {
  progressItems.value.splice(index, 1);
};
</script>