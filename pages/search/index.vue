<template>
  <v-container fluid class="bg-light-gray pa-0">
    <!-- Search Section -->
    <v-row class="search-section py-8">
      <v-col cols="12" md="8" class="mx-auto text-left">
        <h1 class="display-2 font-weight-bold mb-6">Find Your Knowledge Here</h1>
        <v-row class="align-left">
          <v-col  cols="12" md="8">
            <v-text-field
                v-model="searchQuery"
                placeholder="Search for Knowledge"
                prepend-inner-icon="mdi-magnify"
                variant="outlined"
                hide-details
                class="justify-center custom-search-bar mb-6"
                @keyup.enter="performSearch"
              ></v-text-field>
          </v-col>
          <!--
          <v-col cols="12" md="3">
            <v-text-field
              v-model="category"
              placeholder="Category"
              prepend-inner-icon="mdi-format-list-bulleted"
              hide-details
              outlined
              class="custom-input"
            />
          </v-col>
          <v-col cols="12" md="1">
            <v-btn color="primary" large @click="performSearch">
              Search
            </v-btn>
          </v-col> -->
        </v-row>
      </v-col>
    </v-row>

    <!-- Main Section -->
    <v-row class="py-10" align="start" justify="center">
      <!-- Filters Sidebar -->
      <v-col cols="12" md="3">
        <div class="filters bg-white rounded-lg p-3">

          <h4 class="mb-0">Resource Type</h4>
          <v-checkbox v-model="filters.resourceType" label="Article" />
          <v-checkbox v-model="filters.resourceType" label="Video" />
          <v-checkbox v-model="filters.resourceType" label="Course" />
          <v-checkbox v-model="filters.resourceType" label="Ebook" />

          <h4 class="mt-0 mb-0">Difficulty Level</h4>
          <v-checkbox v-model="filters.difficultyLevel" label="Beginner" />
          <v-checkbox v-model="filters.difficultyLevel" label="Intermediate" />
          <v-checkbox v-model="filters.difficultyLevel" label="Advanced" />

          <h4 class="mt-0 mb-0">Rating</h4>
          <v-slider
            v-model="filters.rating"
            :min="1"
            :max="5"
            step="0.1"
            thumb-label
            class="mt-2"
          ></v-slider>
          <p class="font-weight-medium">Minimum rating: {{ filters.rating }}</p>
        </div>
      </v-col>

      <!-- Recommended Resources Section -->
      <v-col cols="12" md="9">
        <div class="d-flex justify-between align-center mb-4">
          <h2 class="text-h4 font-weight-bold">Recommended Resources</h2>
          <v-select v-model="sortBy" :items="sortOptions" label="Sort by" class="sort-select"></v-select>
        </div>

        <!-- Resources Grid -->
        <v-row>
          <v-col
            v-for="resource in filteredResources"
            :key="resource.id"
            cols="12"
            md="4"
            class="mb-6"
          >
            <v-card class="resource-card">
              <v-img :src="resource.image" height="180px" cover></v-img>
              <v-card-title>{{ resource.title }}</v-card-title>
              <v-card-text>
                <div class="d-flex justify-between">
                  <div class="rating d-flex align-center">
                    <v-icon color="yellow">mdi-star</v-icon>
                    <span>{{ resource.rating }}</span>
                    <span class="views ml-2">{{ resource.views }} views</span>
                  </div>
                </div>
                <p class="mt-2">{{ resource.description }}</p>
                <div class="tags d-flex flex-wrap mt-3">
                  <v-chip
                    v-for="tag in resource.tags"
                    :key="tag"
                    class="mr-2 mb-2"
                    color="primary"
                    text-color="white"
                  >
                    {{ tag }}
                  </v-chip>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue'

// Search query and category
const searchQuery = ref('')
const category = ref('')

// Filters
const filters = ref({
  resourceType: [],
  difficultyLevel: [],
  rating: 1
})

// Sort options
const sortBy = ref('Highest rated')
const sortOptions = ['Highest rated', 'Most recent', 'Most popular']

// Mock data for resources
const resources = ref([
  {
    id: 1,
    title: 'Advanced React Patterns',
    description: 'Dive deep into advanced React patterns and improve your component architecture.',
    image: 'https://cdn.vuetifyjs.com/images/cards/road.jpg',
    rating: 4.8,
    views: 980,
    tags: ['React', 'JavaScript', 'Advanced']
  },
  {
    id: 2,
    title: 'Introduction to Vue.js',
    description: 'Learn the basics of Vue.js and start building reactive web applications.',
    image: 'https://cdn.vuetifyjs.com/images/cards/home.jpg',
    rating: 4.5,
    views: 1200,
    tags: ['Vue.js', 'JavaScript', 'Frontend']
  },
  {
    id: 3,
    title: 'Building RESTful APIs with Node.js',
    description: 'Learn how to create robust and scalable RESTful APIs using Node.js and Express.',
    image: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg',
    rating: 4.2,
    views: 1500,
    tags: ['Node.js', 'API', 'Backend']
  }
])

// Filtered and sorted resources
const filteredResources = computed(() => {
  return resources.value
    .filter(resource => resource.rating >= filters.value.rating)
    .sort((a, b) => {
      if (sortBy.value === 'Highest rated') return b.rating - a.rating
      if (sortBy.value === 'Most recent') return b.id - a.id
      return b.views - a.views
    })
})

// Search function
const performSearch = () => {
  console.log('Search for:', searchQuery.value, 'in category:', category.value)
}

// Clear filters function
const clearFilters = () => {
  filters.value.resourceType = []
  filters.value.difficultyLevel = []
  filters.value.rating = 1
}
</script>

<style scoped>
.search-section {
  background-color: #f7f7f7;
}

.filters {
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
  border: 1px solid #ddd; /* Add border */
  padding: 20px; /* Add padding for spacing */
  border-radius: 8px;
}

.resource-card {
  transition: box-shadow 0.3s ease;
  cursor: pointer;
  min-height: 350px; /* Set a consistent height */
  box-sizing: border-box;
}

.resource-card:hover {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.rating {
  display: flex;
  align-items: center;
}

.views {
  color: #888;
}

.tags {
  margin-top: 8px;
}
</style>
