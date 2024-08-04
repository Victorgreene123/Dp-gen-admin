<template>
  <div class="pagination">
    <button @click="prevPage" :disabled="currentPage === 1" class="pagination__button">
      <i class="fa-solid fa-angle-left"></i> Previous
    </button>

    <span class="pagination__info"> Page {{ currentPage }} of {{ totalPages }} </span>

    <button @click="nextPage" :disabled="currentPage === totalPages" class="pagination__button">
      Next <i class="fa-solid fa-angle-right"></i>
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  totalItems: {
    type: Number,
    required: true
  },
  itemsPerPage: {
    type: Number,
    required: true
  },
  modelValue: {
    type: Number,
    default: 1
  }
})

const emit = defineEmits(['update:modelValue'])

const currentPage = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})

const totalPages = computed(() => {
  return Math.ceil(props.totalItems / props.itemsPerPage)
})

function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}
</script>

<style scoped>
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.pagination__button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  font-family: 'Poppins', sans-serif;
}

.pagination__button:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.pagination__info {
  font-size: 16px;
  font-family: 'Poppins', sans-serif;
}
</style>
