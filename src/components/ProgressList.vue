<template>
  <div>
    <!-- 头部 -->
    <div class="header">
      <h1>进度条列表</h1>
      <button class="add-button rounded-button" @click="openAddModal">
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
        <div class="progress-info-row">
          <div class="progress-title">{{ item.title }}</div>
          <div class="progress-bar-container">
            <div
              class="progress-bar"
              :style="{ backgroundColor: item.color, width: ((item.current > item.total ? 100 : (item.current / item.total) * 100).toFixed(2)) + '%' }"
            >
              
            </div>
            <div class="progress-value">{{ item.current }} / {{ item.total }}, {{ item.unit }}</div>
            <div class="progress-percentage">{{((item.current > item.total ? 100 : (item.current / item.total) * 100).toFixed(2))}}%</div>
          </div>
          <button class="edit-button" @click="openEditModal(item)">
            <svg class="button-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
            </svg>
          </button>
          <button class="delete-button" @click="deleteProgress(index)">
            <svg class="button-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
            </svg>
          </button>
        </div>
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
import {
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
} from './ProgressList.ts';
</script>