<template>
  <v-container>
    <v-row>
      <v-col>
        <h1 class="text-h3 font-weight-bold mb-6 mt-6">
          Knowledge Sharing System
        </h1>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <h1 class="text-h5 font-weight-bold mb-0">
          Share your knowledge here!
        </h1>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-btn color="black" class="text-capitalize" to="/sharing/sharingKM">
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
        v-for="(knowledge, index) in fetchData"
        :key="index"
        cols="12"
        sm="6"
        md="4"
      >
        <v-card class="resource-card h-100" @click="viewResource(knowledge.id)">
          <v-img
            src="https://cdn.vuetifyjs.com/images/cards/forest-art.jpg"
            height="240px"
            cover
          ></v-img>
          <v-card-title class="mt-4" style="height: 60px"
            ><h3>{{ knowledge.title }}</h3></v-card-title
          >
          <v-card-text>
            <div class="d-flex justify-between">
              <div class="rating d-flex align-center">
                <v-icon class="mr-2" color="#f4b400">mdi-star</v-icon>
                <span>
                  <b>{{ knowledge.avg_rating }}</b> Score</span
                >
                <span class="views ml-2 ms-2.5"
                  >| <b>{{ knowledge?.comment.length }}</b> Comments
                </span>
              </div>
            </div>
            <p class="mt-5" style="height: 60px">{{ knowledge.description }}</p>
            <div class="tags d-flex flex-wrap mt-3">
              <v-chip
                v-for="(tag, index) in knowledge?.tag.split(',')"
                :key="index"
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
  </v-container>
</template>

<script setup>
// ###############
import { useServiceStore } from "../../stores/serviceStore.ts";
const store = useServiceStore();

await store.getUserKnowledge();
const fetchData = ref(store.profileKnowledge);
// ###############
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
