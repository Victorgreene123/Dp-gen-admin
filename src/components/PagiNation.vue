<!-- src/components/Pagination.vue -->
<template>
    <div class="pagination">
      <button
        :disabled="currentPage === 1"
        @click="changePage(currentPage - 1)"
      >
        Previous
      </button>
  
      <button
        v-for="page in totalPages"
        :key="page"
        :class="{ active: page === currentPage }"
        @click="changePage(page)"
      >
        {{ page }}
      </button>
  
      <button
        :disabled="currentPage === totalPages"
        @click="changePage(currentPage + 1)"
      >
        Next
      </button>
    </div>
  </template>
  
  <script setup>
  import { ref, watch, computed } from 'vue'
  
  // Props
  const props = defineProps({
    totalItems: { type: Number, required: true },
    itemsPerPage: { type: Number, required: true },
    modelValue: { type: Number, required: true }
  })
  
  // Emit
  const emit = defineEmits(['update:modelValue'])
  
  // Reactive states
  const currentPage = ref(props.modelValue)
  
  // Watch for modelValue changes
  watch(() => props.modelValue, (newValue) => {
    currentPage.value = newValue
  })
  
  // Computed properties
  const totalPages = computed(() => Math.ceil(props.totalItems / props.itemsPerPage))
  
  // Methods
  const changePage = (page) => {
    if (page >= 1 && page <= totalPages.value) {
      emit('update:modelValue', page)
    }
  }
  </script>
  
  <style scoped>
  .pagination {
    display: flex;
    gap: 0.5rem;
  }
  .pagination button {
    padding: 0.5rem 1rem;
    cursor: pointer;
  }
  .pagination button:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
  .pagination .active {
    font-weight: bold;
  }
  </style>
  