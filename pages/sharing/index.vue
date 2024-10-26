<template>
  <v-container>
    <v-row>
      <v-col>
        <h1 class="text-h3 font-weight-bold mb-6 mt-6">Knowledge Sharing System</h1>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <h1 class="text-h5 font-weight-bold mb-0">Share your knowledge here!</h1>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-btn
          color="black"
          class="text-capitalize"
          to="/sharing/sharingKM"
        >
          Add Knowledge
        </v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-divider class="my-4"></v-divider>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <h2 class="text-h4 font-weight-medium mb-4">Your Knowledge Sharing</h2>
      </v-col>
    </v-row>

    <v-row>
      <v-col
        v-for="knowledge in knowledgeItems"
        :key="knowledge.id"
        cols="12"
        md="4"
      >
        <v-card class="mx-auto resource-card" elevation="2">
          <v-img
            :src="knowledge.image"
            height="200px"
            cover
            :alt="knowledge.imageAlt"
          ></v-img>

          <v-card-title class="mt-2"><h3>{{ knowledge.title }}</h3></v-card-title>
          
          <v-card-text class="mt-2">
            <v-row align="center" class="mx-0">
              <v-icon color="#f4b400">mdi-star</v-icon>
              <span class="ml-1">{{ knowledge.rating }}</span>
              <div class="text-grey ms-2">({{ knowledge.reviews }}) Reviews</div>
            </v-row>
            
            <p class="mt-2 mt-5">{{ knowledge.description }}</p>
            
            <v-chip-group class="mt-3">
              <v-chip
                v-for="tag in knowledge.tags"
                :key="tag"
                class="mr-2 mb-2"
                color="grey-lighten-3"
                text-color="grey-darken-3"
                small
              >
                {{ tag }}
              </v-chip>
            </v-chip-group>

            <v-switch
              v-model="knowledge.isPublished"
              :label="`${knowledge.isPublished ? 'Published' : 'Unpublished'}`"
              false-value="unpublished"
              true-value="published"
              hide-details
              class="mt-0"
              color="blue"
              @change="updatePublishStatus(knowledge)"
            ></v-switch>

            <div class="mt-3 text-caption text-grey">
              Created: {{ formatDate(knowledge.createdAt) }}
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      knowledgeItems: [
        {
          id: 1,
          title: 'Introduction to Vue.js',
          description: 'A guide to Vue.js basics',
          image: 'https://cdn.vuetifyjs.com/images/cards/forest-art.jpg',
          imageAlt: 'Placeholder image for Introduction to Vue.js',
          rating: 4.5,
          reviews: 64,
          tags: ['Vue.js', 'JavaScript', 'Frontend'],
          isPublished: 'published',
          createdAt: new Date('2023-05-15'),
        },
        {
          id: 2,
          title: 'Advanced TypeScript',
          description: 'Mastering TypeScript with advanced features',
          image: 'https://cdn.vuetifyjs.com/images/cards/forest-art.jpg',
          imageAlt: 'Placeholder image for Advanced TypeScript',
          rating: 4.0,
          reviews: 98,
          tags: ['TypeScript', 'JavaScript'],
          isPublished: 'published',
          createdAt: new Date('2023-06-01'),
        },
        {
          id: 3,
          title: 'RESTful API Design',
          description: 'Best practices for RESTful API design',
          image: 'https://cdn.vuetifyjs.com/images/cards/forest-art.jpg',
          imageAlt: 'Placeholder image for RESTful API Design',
          rating: 4.5,
          reviews: 150,
          tags: ['API', 'REST', 'Backend'],
          isPublished: 'published',
          createdAt: new Date('2023-05-20'),
        },
      ],
    }
  },
  methods: {
    updatePublishStatus(knowledge) {
      console.log(`Knowledge "${knowledge.title}" is now ${knowledge.isPublished}`)
      // Here you can add logic to update the publish status in your backend
    },
    formatDate(date) {
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }).format(date);
    }
  }
}
</script>

<style scoped>
.resource-card {
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  background-color: #fff;
  border: 1px solid #efefef;
}

.resource-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1) !important;
}
</style>