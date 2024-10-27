<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="8">
        <v-card elevation="0" class="h-100">
          <iframe
            :src="fetchData?.path"
            style="height: 100%; width: 100%"
            title="Iframe Example"
          ></iframe>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card elevation="0">
          <v-card-title
            class="text-h6 d-flex justify-space-between align-center border mt-4 rounded-sm"
          >
            <div class="d-flex align-center">
              <v-icon left>mdi-file-document-outline</v-icon>
              Download File
            </div>
            <v-btn
              color="#4285f4"
              dark
              class="text-uppercase font-weight-bold"
              elevation="0"
            >
              <v-icon left>mdi-download</v-icon>
              Download
            </v-btn>
          </v-card-title>

          <div class="mt-5">
            <div>
              <h1 class="mb-4">{{ fetchData.title }}</h1>
              <v-icon color="#f4b400">mdi-star</v-icon>
              <span class="ml-2">0 reviews</span>
            </div>

            <h3 class="mt-4">Description</h3>
            <p class="mt-2">
              {{ fetchData.description }}
            </p>

            <div class="tags d-flex flex-wrap mt-3">
              <v-chip
                v-for="(tag, index) in fetchData?.tag.split(',')"
                :key="index"
                class="mr-2 mb-2"
                color="gray"
                text-color="secondary"
              >
                {{ tag }}
              </v-chip>
            </div>
          </div>

          <div class="mt-5">
            <h1 class="mb-2">Reviews</h1>
            <div class="d-flex align-center">
              <v-rating
                v-model="rating"
                color="#f4b400"
                background-color="grey lighten-1"
                half-increments
                hover
              ></v-rating>
              <span class="text-h6 ml-4">Your rating: {{ rating }}</span>
            </div>
            <v-textarea
              label="Add a comment"
              outlined
              variant="outlined"
              class="mt-4"
            ></v-textarea>
            <v-btn color="secondary" class="mb-4 flex-grow-1" flat>
              Post Comment
            </v-btn>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup lang="ts">
import { useServiceStore } from "../../stores/serviceStore";

const store = useServiceStore();
const route = useRoute();

await store.getKnowledgeById(route.params.id);
const fetchData: any = ref(store.knowledgeId);

const rating = ref(0);
</script>
