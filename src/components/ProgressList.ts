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
const loadDataFromLocalStorage = () => {
  const storedData = localStorage.getItem('progressData');
  if (storedData) {
    try {
      progressItems.value = JSON.parse(storedData) as ProgressItem[];
    } catch (error) {
      console.error('Error parsing data from localStorage:', error);
    }
  }
};

// 保存数据到本地存储
const saveDataToLocalStorage = () => {
  try {
    localStorage.setItem('progressData', JSON.stringify(progressItems.value));
  } catch (error) {
    console.error('Error saving data to localStorage:', error);
  }
};

// 页面加载时从本地存储加载数据
onMounted(() => {
  loadDataFromLocalStorage();
});

// 监听 progressItems 变化，更新本地存储
watch(progressItems, (newValue) => {
  saveDataToLocalStorage();
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

export {
  progressItems,
  editIndex,
  newProgress,
  editProgress,
  addModalVisible,
  editModalVisible,
  openAddModal,
  closeAddModal,
  openEditModal,
  closeEditModal,
  addProgress,
  saveEdit,
  deleteProgress
};