<template>
    <div class="relative">
      <div
        @click="toggleDropdown"
        class="bg-gray-200 p-2 rounded-md cursor-pointer flex items-center justify-between"
        :aria-expanded="isOpen"
        aria-haspopup="listbox"
        role="button"
      >
        <div class="flex flex-wrap gap-2">
          <span
            v-for="item in selectedItems.slice(0, 2)"
            :key="item"
            class="bg-gray-300 px-2 py-1 rounded-full text-sm"
          >
            {{ item }}
          </span>
          <span v-if="selectedItems.length > 2" class="text-sm text-gray-600">
            {{ selectedItems.length - 2 }} others
          </span>
        </div>
        <svg
          class="w-5 h-5 text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </div>
      <div
        v-if="isOpen"
        class="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg"
        role="listbox"
      >
        <div class="p-2 max-h-60 overflow-y-auto">
          <label
            v-for="item in items"
            :key="item"
            class="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
          >
            <input
              type="checkbox"
              :value="item"
              v-model="selectedItems"
              class="form-checkbox h-5 w-5 text-gray-600"
              :aria-label="item"
            />
            <span class="ml-2">{{ item }}</span>
          </label>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'CustomDropdown',
    props: {
      items: {
        type: Array,
        required: true
      },
      modelValue: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
        isOpen: false,
        selectedItems: this.modelValue
      }
    },
    watch: {
      selectedItems(newValue) {
        this.$emit('update:modelValue', newValue)
      }
    },
    methods: {
      toggleDropdown() {
        this.isOpen = !this.isOpen
      }
    }
  }
  </script>