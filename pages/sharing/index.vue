<template>
  <v-container>
    <v-row>
      <v-col>
        <h1 class="text-h3 font-weight-bold mb-6">Knowledge Sharing System</h1>
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
        <v-card class="mx-auto" max-width="400">
          <v-img
            :src="knowledge.image"
            height="200px"
            cover
            :alt="knowledge.imageAlt"
          ></v-img>

          <v-card-title>{{ knowledge.title }}</v-card-title>

          <v-card-subtitle>{{ knowledge.description }}</v-card-subtitle>

          <v-card-text>
            <v-row align="center" class="mx-0">
              <v-rating
                :model-value="knowledge.rating"
                color="amber"
                density="compact"
                half-increments
                readonly
                size="small"
              ></v-rating>

              <div class="text-grey ms-4">
                {{ knowledge.reviews }} Reviews
              </div>
            </v-row>

            <div class="my-4 text-subtitle-1">
              <v-chip-group>
                <v-chip
                  v-for="tag in knowledge.tags"
                  :key="tag"
                  class="mr-2 mb-2"
                  color="grey-lighten-3"
                  label
                  small
                >
                  {{ tag }}
                </v-chip>
              </v-chip-group>
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
        },
      ],
    }
  },
}
</script>