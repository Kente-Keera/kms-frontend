<template>
  <v-container fluid class="bg-light-gray pa-0">
    <!-- Search Section -->
    <v-row class="search-section py-8">
      <v-col cols="12" md="8" class="mx-auto text-center">
        <h1 class="display-2 font-weight-bold mb-10">Search Knowledge Here!</h1>
        <v-row class="align-center">
          <v-col>
            <v-autocomplete
              v-model="searchQuery"
              :items="filteredSearchSuggestions"
              placeholder="Search for Knowledge"
              prepend-inner-icon="mdi-magnify"
              variant="outlined"
              hide-details
              class="custom-search-bar mb-5"
              @update:search="updateSearchSuggestions"
              @keyup.enter="performSearch"
            ></v-autocomplete>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <!-- Main Section -->
    <v-row class="py-10" align="start" justify="center">
      <!-- Filters Sidebar -->
      <v-col cols="12" md="3">
        <div class="filters bg-white p-2">
          <h3 class="mb-4 ms-2">Knowledge Filters</h3>
          
          <!-- Group Dropdown -->
          <v-autocomplete
            v-model="filters.group"
            :items="['All', ...groupOptions]"
            label="Group"
            multiple
            chips
            clearable
            hide-details
            class="mb-4"
            variant="outlined"
          ></v-autocomplete>

          <!-- Category Dropdown -->
          <v-autocomplete
            v-model="filters.category"
            :items="['All', ...getCategoryOptions]"
            label="Category"
            multiple
            chips
            clearable
            hide-details
            class="mb-4"
            variant="outlined"
          ></v-autocomplete>

          <!-- Subcategory Dropdown -->
          <v-autocomplete
            v-model="filters.subcategory"
            :items="['All', ...getSubcategoryOptions]"
            label="Subcategory"
            multiple
            chips
            clearable
            hide-details
            class="mb-4 filter-divider"
            variant="outlined"
          ></v-autocomplete>

          <!-- Sort by Date -->
          <h4 class="mt-4 mb-2">Sort by Date</h4>
          <v-select
            v-model="sortBy"
            :items="sortOptions"
            label="Sort by"
            hide-details
            class="mb-4 mt-6 filter-divider"
            variant="outlined"
          ></v-select>

          <h4 class="mt-4 mb-2">Rating</h4>
          <v-slider
            v-model="filters.rating"
            :min="1"
            :max="5"
            step="0.1"
            thumb-label
            class="mt-2"
            color="blue"
          ></v-slider>
          <p class="font-weight-medium">Minimum rating: {{ filters.rating }}</p>
        </div>
      </v-col>

      <!-- Knowledge Cards Section -->
      <v-col cols="12" md="9">
        <!-- Resources Grid -->
        <v-row>
          <v-col
            v-for="resource in paginatedResources"
            :key="resource.id"
            cols="12"
            md="4"
            class="mb-6"
          >
            <v-card class="resource-card">
              <v-img :src="resource.image" height="180px" cover></v-img>
              <v-card-title class="mt-4"><h3>{{ resource.title }}</h3></v-card-title>
              <v-card-text>
                <div class="d-flex justify-between">
                  <div class="rating d-flex align-center">
                    <v-icon color="#f4b400">mdi-star</v-icon>
                    <span>{{ resource.rating }}</span>
                    <span class="views ml-2 ms-2.5">({{ resource.views }}) views</span>
                  </div>
                </div>
                <p class="mt-2">{{ resource.description }}</p>
                <div class="tags d-flex flex-wrap mt-3">
                  <v-chip
                    v-for="tag in resource.tags"
                    :key="tag"
                    class="mr-2 mb-2"
                    color="gray"
                    text-color="secondary"
                  >
                    {{ tag }}
                  </v-chip>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <!-- Pagination Controls -->
        <v-row class="mt-4">
          <v-col cols="6" class="d-flex justify-space-between align-center">
            <v-select
              v-model="itemsPerPage"
              :items="[6, 12, 18]"
              label="Items per page"
              hide-details
              class="w-25 mx-6"
              variant="outlined"
            ></v-select>
            <div>
              {{ paginationText }}
              <v-btn
                icon="mdi-chevron-double-left"
                @click="goToFirstPage"
                :disabled="currentPage === 1"
                class="no-shadow"
              ></v-btn>
              <v-btn
                icon="mdi-chevron-left"
                @click="goToPreviousPage"
                :disabled="currentPage === 1"
                class="no-shadow"
              ></v-btn>
              <v-btn
                icon="mdi-chevron-right"
                @click="goToNextPage"
                :disabled="currentPage === totalPages"
                class="no-shadow"
              ></v-btn>
              <v-btn
                icon="mdi-chevron-double-right"
                @click="goToLastPage"
                :disabled="currentPage === totalPages"
                class="no-shadow"
              ></v-btn>
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue'

// Search query and suggestions
const searchQuery = ref('')
const searchSuggestions = ref([])
const filteredSearchSuggestions = computed(() => {
  if (!searchQuery.value) return []
  return searchSuggestions.value.filter(suggestion => 
    suggestion.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

// Filters
const filters = ref({
  group: [],
  category: [],
  subcategory: [],
  rating: 1
})

// Filter options
const groupOptions = ['Frontend', 'Backend', 'DevOps']
const categoryOptions = {
  Frontend: ['JavaScript', 'CSS', 'Frameworks'],
  Backend: ['APIs', 'Databases', 'Server'],
  DevOps: ['Containerization', 'CI/CD', 'Cloud']
}
const subcategoryOptions = {
  JavaScript: ['React', 'Vue', 'Angular'],
  CSS: ['Flexbox', 'Grid', 'Animations'],
  Frameworks: ['Next.js', 'Nuxt.js', 'Gatsby'],
  APIs: ['REST', 'GraphQL', 'WebSockets'],
  Databases: ['SQL', 'NoSQL', 'ORM'],
  Server: ['Node.js', 'Python', 'Java'],
  Containerization: ['Docker', 'Kubernetes', 'Microservices'],
  'CI/CD': ['Jenkins', 'GitLab CI', 'GitHub Actions'],
  Cloud: ['AWS', 'Azure', 'Google Cloud']
}

// Computed properties for category and subcategory options
const getCategoryOptions = computed(() => {
  if (filters.value.group.includes('All') || filters.value.group.length === 0) {
    return Object.keys(categoryOptions).flat()
  }
  return filters.value.group.flatMap(group => categoryOptions[group] || [])
})

const getSubcategoryOptions = computed(() => {
  if (filters.value.category.includes('All') || filters.value.category.length === 0) {
    return Object.values(subcategoryOptions).flat()
  }
  return filters.value.category.flatMap(category => subcategoryOptions[category] || [])
})

// Sort options
const sortBy = ref('Most recent')
const sortOptions = ['Most recent', 'Oldest first', 'Highest rated', 'Lowest rated']

// Pagination
const currentPage = ref(1)
const itemsPerPage = ref(6)

// Mock data for resources (20 cards)
const resources = ref([
  {
    id: 1,
    title: 'Advanced React Patterns',
    description: 'Dive deep into advanced React patterns and improve your component architecture.',
    image: 'https://cdn.vuetifyjs.com/images/cards/forest-art.jpg',
    rating: 4.8,
    views: 980,
    tags: ['Frontend', 'JavaScript', 'React'],
    date: new Date('2023-05-15')
  },
  {
    id: 2,
    title: 'Vue.js Fundamentals',
    description: 'Learn the basics of Vue.js and start building reactive web applications.',
    image: 'https://cdn.vuetifyjs.com/images/cards/forest-art.jpg',
    rating: 4.5,
    views: 1200,
    tags: ['Frontend', 'JavaScript', 'Vue'],
    date: new Date('2023-06-20')
  },
  {
    id: 3,
    title: 'RESTful API Design',
    description: 'Learn how to create robust and scalable RESTful APIs.',
    image: 'https://cdn.vuetifyjs.com/images/cards/forest-art.jpg',
    rating: 4.2,
    views: 1500,
    tags: ['Backend', 'APIs', 'REST'],
    date: new Date('2023-07-10')
  },
  {
    id: 4,
    title: 'Machine Learning with Python',
    description: 'Explore the core concepts of machine learning using Python.',
    image: 'https://cdn.vuetifyjs.com/images/cards/forest-art.jpg',
    rating: 4.7,
    views: 2200,
    tags: ['Backend', 'Server', 'Python'],
    date: new Date('2023-08-05')
  },
  {
    id: 5,
    title: 'CSS Grid Mastery',
    description: 'Master the art of creating responsive layouts with CSS Grid.',
    image: 'https://cdn.vuetifyjs.com/images/cards/forest-art.jpg',
    rating: 4.4,
    views: 1800,
    tags: ['Frontend', 'CSS', 'Grid'],
    date: new Date('2023-09-01')
  },
  {
    id: 6,
    title: 'GraphQL for Modern APIs',
    description: 'Learn how to build efficient and flexible APIs using GraphQL.',
    image: 'https://cdn.vuetifyjs.com/images/cards/forest-art.jpg',
    rating: 4.6,
    views: 1600,
    tags: ['Backend', 'APIs', 'GraphQL'],
    date: new Date('2023-09-20')
  },
  {
    id: 7,
    title: 'Docker for Developers',
    description: 'Understand containerization and streamline your development workflow with Docker.',
    image: 'https://cdn.vuetifyjs.com/images/cards/forest-art.jpg',
    rating: 4.3,
    views: 1900,
    tags: ['DevOps', 'Containerization', 'Docker'],
    date: new Date('2023-10-05')
  },
  {
    id: 8,
    title: 'TypeScript Deep Dive',
    description: 'Enhance your JavaScript projects with the power of TypeScript.',
    image: 'https://cdn.vuetifyjs.com/images/cards/forest-art.jpg',
    rating: 4.7,
    views: 2100,
    tags: ['Frontend', 'JavaScript', 'TypeScript'],
    date: new Date('2023-10-25')
  },
  {
    id: 9,
    title: 'Serverless Architecture',
    description: 'Explore the world of serverless computing and build scalable applications.',
    image: 'https://cdn.vuetifyjs.com/images/cards/forest-art.jpg',
    rating: 4.5,
    views: 1700,
    tags: ['DevOps', 'Cloud', 'Serverless'],
    date: new Date('2023-11-10')
  },
  {
    id: 10,
    title: 'CI/CD with GitHub Actions',
    description: 'Learn how to implement continuous integration and deployment using GitHub Actions.',
    image: 'https://cdn.vuetifyjs.com/images/cards/forest-art.jpg',
    rating: 4.8,
    views: 2400,
    tags: ['DevOps', 'CI/CD', 'GitHub Actions'],
    date: new Date('2023-11-30')
  },
  {
    id: 11,
    title: 'Angular Component Architecture',
    description: 'Master the art of building scalable and maintainable Angular applications.',
    image: 'https://cdn.vuetifyjs.com/images/cards/forest-art.jpg',
    rating: 4.6,
    views: 1850,
    tags: ['Frontend', 'JavaScript', 'Angular'],
    date: new Date('2023-12-15')
  },
  {
    id: 12,
    title: 'MongoDB for Node.js Developers',
    description: 'Learn how to integrate MongoDB with Node.js for powerful backend solutions.',
    image: 'https://cdn.vuetifyjs.com/images/cards/forest-art.jpg',
    rating: 4.4,
    views: 2050,
    tags: ['Backend', 'Databases', 'NoSQL'],
    date: new Date('2024-01-05')
  },
  {
    id: 13,
    title: 'AWS Lambda and Serverless',
    description: 'Dive into serverless computing with AWS Lambda and build scalable applications.',
    image: 'https://cdn.vuetifyjs.com/images/cards/forest-art.jpg',
    rating: 4.7,
    views: 2300,
    tags: ['DevOps', 'Cloud', 'AWS'],
    date: new Date('2024-01-20')
  },
  {
    id: 14,
    title: 'Responsive Web Design with Flexbox',
    description: 'Create flexible and responsive layouts using CSS Flexbox.',
    image: 'https://cdn.vuetifyjs.com/images/cards/forest-art.jpg',
    rating: 4.5,
    views: 1750,
    tags: ['Frontend', 'CSS', 'Flexbox'],
    
    date: new Date('2024-02-10')
  },
  {
    id: 15,
    title: 'Microservices with Spring Boot',
    description: 'Build scalable and maintainable microservices using Spring Boot.',
    image: 'https://cdn.vuetifyjs.com/images/cards/forest-art.jpg',
    rating: 4.6,
    views: 2100,
    tags: ['Backend', 'Server', 'Java'],
    date: new Date('2024-02-25')
  },
  {
    id: 16,
    title: 'Kubernetes for DevOps Engineers',
    description: 'Master container orchestration with Kubernetes for efficient DevOps practices.',
    image: 'https://cdn.vuetifyjs.com/images/cards/forest-art.jpg',
    rating: 4.8,
    views: 2500,
    tags: ['DevOps', 'Containerization', 'Kubernetes'],
    date: new Date('2024-03-15')
  },
  {
    id: 17,
    title: 'Next.js and Server-Side Rendering',
    description: 'Learn how to build fast and SEO-friendly React applications with Next.js.',
    image: 'https://cdn.vuetifyjs.com/images/cards/forest-art.jpg',
    rating: 4.7,
    views: 2200,
    tags: ['Frontend', 'Frameworks', 'Next.js'],
    date: new Date('2024-04-01')
  },
  {
    id: 18,
    title: 'GraphQL with Apollo Client',
    description: 'Implement efficient data fetching in your frontend applications using GraphQL and Apollo Client.',
    image: 'https://cdn.vuetifyjs.com/images/cards/forest-art.jpg',
    rating: 4.5,
    views: 1900,
    tags: ['Frontend', 'APIs', 'GraphQL'],
    date: new Date('2024-04-20')
  },
  {
    id: 19,
    title: 'CI/CD with GitLab',
    description: 'Set up robust CI/CD pipelines using GitLab for seamless software delivery.',
    image: 'https://cdn.vuetifyjs.com/images/cards/forest-art.jpg',
    rating: 4.6,
    views: 2000,
    tags: ['DevOps', 'CI/CD', 'GitLab CI'],
    date: new Date('2024-05-10')
  },
  {
    id: 20,
    title: 'Azure Functions and Serverless',
    description: 'Explore serverless computing with Azure Functions and build scalable cloud solutions.',
    image: 'https://cdn.vuetifyjs.com/images/cards/forest-art.jpg',
    rating: 4.4,
    views: 1800,
    tags: ['DevOps', 'Cloud', 'Azure'],
    date: new Date('2024-05-25')
  }
])

// Initialize search suggestions
const initializeSearchSuggestions = () => {
  const suggestions = new Set()
  resources.value.forEach(resource => {
    suggestions.add(resource.title)
    resource.description.split(' ').forEach(word => suggestions.add(word))
    resource.tags.forEach(tag => suggestions.add(tag))
  })
  groupOptions.forEach(group => suggestions.add(group))
  Object.keys(categoryOptions).forEach(category => suggestions.add(category))
  Object.keys(subcategoryOptions).forEach(subcategory => suggestions.add(subcategory))
  searchSuggestions.value = Array.from(suggestions)
}

initializeSearchSuggestions()

// Update search suggestions based on user input
const updateSearchSuggestions = (val) => {
  if (val && val.length > 0) {
    searchQuery.value = val
  }
}

// Filtered and sorted resources
const filteredResources = computed(() => {
  return resources.value
    .filter(resource => {
      const groupMatch = filters.value.group.includes('All') || filters.value.group.length === 0 || filters.value.group.some(g => resource.tags.includes(g))
      const categoryMatch = filters.value.category.includes('All') || filters.value.category.length === 0 || filters.value.category.some(c => resource.tags.includes(c))
      const subcategoryMatch = filters.value.subcategory.includes('All') || filters.value.subcategory.length === 0 || filters.value.subcategory.some(s => resource.tags.includes(s))
      const ratingMatch = resource.rating >= filters.value.rating
      const searchMatch = !searchQuery.value || 
        resource.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.value.toLowerCase()))
      return groupMatch && categoryMatch && subcategoryMatch && ratingMatch && searchMatch
    })
    .sort((a, b) => {
      switch (sortBy.value) {
        case 'Most recent':
          return b.date - a.date
        case 'Oldest first':
          return a.date - b.date
        case 'Highest rated':
          return b.rating - a.rating
        case 'Lowest rated':
          return a.rating - b.rating
        default:
          return 0
      }
    })
})

// Paginated resources
const paginatedResources = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredResources.value.slice(start, end)
})

// Total pages
const totalPages = computed(() => Math.ceil(filteredResources.value.length / itemsPerPage.value))

// Pagination text
const paginationText = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value + 1
  const end = Math.min(currentPage.value * itemsPerPage.value, filteredResources.value.length)
  return `${start}-${end} of ${filteredResources.value.length}`
})

// Pagination methods
const goToFirstPage = () => currentPage.value = 1
const goToPreviousPage = () => currentPage.value--
const goToNextPage = () => currentPage.value++
const goToLastPage = () => currentPage.value = totalPages.value

// Search function
const performSearch = () => {
  console.log('Search for:', searchQuery.value)
  // The actual filtering is done in the filteredResources computed property
}

// Clear filters function
const clearFilters = () => {
  filters.value = {
    group: [],
    category: [],
    subcategory: [],
    rating: 1
  }
  sortBy.value = 'Most recent'
  currentPage.value = 1
  searchQuery.value = ''
}
</script>

<style scoped>
.search-section {
  background-color: #f7f7f7;
}

.filters {
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
  border: 1px solid #ddd;
  padding: 20px;
  border-radius: 8px;
}

.resource-card {
  transition: box-shadow 0.3s ease;
  cursor: pointer;
  min-height: 350px;
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

.filter-divider {
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 16px;
  padding-bottom: 16px;
}

.no-shadow {
  box-shadow: none !important;
}
</style>