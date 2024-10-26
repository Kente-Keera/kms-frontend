<template>
  <v-container fluid class="pa-0">
    <v-row align="center" justify="center" class="hero-section">
      <v-col cols="12" md="8" class="text-center">
        <h1 class="text-h2 font-weight-bold mb-4">
          Unlock the Power of Knowledge
        </h1>
        <p class="text-h5 font-weight-regular mb-8">
          Your journey to discovery starts here. Explore endless insights,
          resources, and knowledge to fuel your growth.
        </p>
        <v-text-field
          v-model="searchQuery"
          placeholder="Search for Knowledge"
          prepend-inner-icon="mdi-magnify"
          variant="outlined"
          hide-details
          class="custom-search-bar mb-6"
          @keyup.enter="performSearch"
        ></v-text-field>
        <v-chip-group class="justify-center">
          <v-chip
            v-for="tag in tags"
            :key="tag"
            class="ma-2 custom-chip"
            color="grey-lighten-3"
            text-color="grey-darken-3"
            @click="addToSearch(tag)"
          >
            {{ tag }}
          </v-chip>
        </v-chip-group>
      </v-col>
    </v-row>

    <v-container>
      <v-tabs v-model="activeTab" grow class="mb-6" color="grey-darken-3">
        <v-tab value="recent">Recent Updates</v-tab>
        <v-tab value="popular">Popular Resources</v-tab>
      </v-tabs>

      <!-- {{ fetchData }} -->

      <v-window v-model="activeTab">
        <v-window-item value="recent">
          <h2 class="text-h4 mb-6 text-center">{{ tabTitle }} CC</h2>
          <v-row>
            <v-col
              v-for="knowledge in fetchData"
              :key="knowledge.id"
              cols="12"
              sm="6"
              md="4"
            >
              <v-card class="mx-auto resource-card" elevation="2">
                <v-img
                  src="https://cdn.vuetifyjs.com/images/cards/forest-art.jpg"
                  height="200px"
                  cover
                ></v-img>

                <v-card-title>{{ knowledge.title }}</v-card-title>
                <v-card-subtitle> {{ knowledge.description }} </v-card-subtitle>
                <v-card-text>
                  <!-- <v-row align="center" class="mx-0">
                    <v-rating
                      :model-value="resource.id"
                      color="amber"
                      density="compact"
                      size="small"
                      half-increments
                      readonly
                    ></v-rating>
                    <div class="text-grey ms-2">xxx Reviews</div>
                  </v-row> -->
                </v-card-text>
                <v-card-actions>
                  <v-btn
                    color="grey-darken-3"
                    variant="outlined"
                    @click="viewResource(resource.id)"
                  >
                    View More
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-window-item>

        <v-window-item value="popular">
          <h2 class="text-h4 mb-6 text-center">{{ tabTitle }}</h2>
          <v-row>
            <v-col
              v-for="resource in resources"
              :key="resource.id"
              cols="12"
              sm="6"
              md="4"
            >
              <v-card class="mx-auto resource-card" elevation="2">
                <v-img :src="resource.image" height="200px" cover></v-img>
                <v-card-title>{{ resource.title }}</v-card-title>
                <v-card-subtitle>
                  {{ resource.subtitle }}
                </v-card-subtitle>
                <v-card-text>
                  <v-row align="center" class="mx-0">
                    
                    <v-rating
                      :model-value="resource.rating"
                      color="amber"
                      density="compact"
                      size="small"
                      half-increments
                      readonly
                    ></v-rating>
                  
                    <div class="text-grey ms-2">
                      {{ resource.reviews }} Reviews
                    </div>
                  </v-row>
                  
                </v-card-text>
                <v-card-actions>
                  <v-btn
                    color="grey-darken-3"
                    variant="outlined"
                    @click="viewResource(resource.id)"
                  >
                    Learn More
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-window-item>
      </v-window>
    </v-container>
  </v-container>
</template>

<script setup>
import { ref, computed } from "vue";

// ###############
import { useServiceStore } from "../../stores/serviceStore.ts";
const store = useServiceStore();

await store.getKnowledge();
const fetchData = ref(store.knowledge);
// ###############

const searchQuery = ref("");
const activeTab = ref("recent");

const tags = [
  "#Requirement",
  "#Design",
  "#Construction",
  "#Testing",
  "#Maintenance",
  "#Quality",
  "#Management",
];

const resources = [
  {
    id: 1,
    title: "Introduction to Scrum",
    subtitle: "A guide to Agile Scrum methodologies",
    image: "https://cdn.vuetifyjs.com/images/cards/forest-art.jpg",
    rating: 4,
    reviews: 64,
  },
  {
    id: 2,
    title: "Continuous Improvement",
    subtitle: "The importance of ongoing improvements in projects",
    image: "https://cdn.vuetifyjs.com/images/cards/forest-art.jpg",
    rating: 4.5,
    reviews: 30,
  },
  {
    id: 3,
    title: "Standup Meetings 101",
    subtitle: "How to run effective standup meetings",
    image: "https://cdn.vuetifyjs.com/images/cards/forest-art.jpg",
    rating: 3.5,
    reviews: 45,
  },
  {
    id: 4,
    title: "Agile Development",
    subtitle: "Understanding Agile methodology in depth",
    image: "https://cdn.vuetifyjs.com/images/cards/forest-art.jpg",
    rating: 5,
    reviews: 98,
  },
  {
    id: 5,
    title: "Sprint Retrospectives",
    subtitle: "How to reflect and improve after every sprint",
    image: "https://cdn.vuetifyjs.com/images/cards/forest-art.jpg",
    rating: 4.8,
    reviews: 80,
  },
  {
    id: 6,
    title: "Team Collaboration Tools",
    subtitle: "The best tools for effective collaboration",
    image: "https://cdn.vuetifyjs.com/images/cards/forest-art.jpg",
    rating: 4.3,
    reviews: 60,
  },
];

const tabTitle = computed(() => {
  return activeTab.value === "recent"
    ? "Latest Knowledge Updates"
    : "Most Popular Resources";
});

const performSearch = () => {
  console.log("Searching for:", searchQuery.value);
  // Implement search functionality here
};

const addToSearch = (tag) => {
  searchQuery.value += " " + tag;
};

const viewResource = (id) => {
  console.log("Viewing resource:", id);
  // Implement resource viewing functionality here
};

definePageMeta({
  middleware: ["auth"],
});
</script>

<style scoped>
.hero-section {
  background: linear-gradient(135deg, #f5f5f5 0%, #f0f0f0 100%);
  color: #000000;
  padding: 80px 0;
}

.custom-search-bar {
  max-width: 600px;
  margin: 0 auto;
}

.custom-search-bar :deep(.v-field__outline__start),
.custom-search-bar :deep(.v-field__outline__end) {
  border-color: #333 !important;
}

.custom-chip {
  font-weight: 500;
}

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
