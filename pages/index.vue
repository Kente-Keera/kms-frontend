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
        <v-row>
          <v-col cols="12" md="10">
            <v-autocomplete
              v-model="searchQuery"
              :items="suggestList"
              placeholder="Search for Knowledge"
              prepend-inner-icon="mdi-magnify"
              variant="outlined"
              hide-details
              class="custom-search-bar mb-5"
              @update:search="updateSearchSuggestions"
              @keyup.enter="performSearch"
            ></v-autocomplete>
          </v-col>
          <v-col cols="12" md="2">
            <v-btn
              color="secondary"
              class="text-capitalize text-none w-100"
              height="56"
              flat
              @click="onSearchPage()"
              >Search</v-btn
            >
          </v-col>
        </v-row>

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

      <v-window v-model="activeTab">
        <v-window-item value="recent">
          <h2 class="text-h4 mb-6 text-center">{{ tabTitle }}</h2>
          <v-row class="pa-5">
            <v-col
              v-for="(knowledge, index) in fetchData.slice(0, 6)"
              :key="index"
              cols="12"
              sm="6"
              md="4"
            >
              <v-card
                class="resource-card h-100"
                @click="viewResource(knowledge.id)"
              >
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
                  <p class="mt-5 " style="height: 60px;">{{ knowledge.description }}</p>
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
        </v-window-item>

        <v-window-item value="popular">
          <h2 class="text-h4 mb-6 text-center">{{ tabTitle }}</h2>
          <v-row class="pa-5">
            <v-col
              v-for="(knowledge, index) in fetchData.slice(0, 6)"
              :key="index"
              cols="12"
              sm="6"
              md="4"
            >
              <v-card class="resource-card">
                <v-img
                  src="https://cdn.vuetifyjs.com/images/cards/forest-art.jpg"
                  height="180px"
                  cover
                ></v-img>
                <v-card-title class="mt-4"
                  ><h3>{{ knowledge?.title }}</h3></v-card-title
                >
                <v-card-text>
                  <div class="d-flex justify-between">
                    <div class="rating d-flex align-center">
                      <v-icon class="mr-2" color="#f4b400">mdi-star</v-icon>
                      <span>
                        <b>{{ knowledge?.avg_rating || 0 }}</b> Score</span
                      >
                      <span class="views ml-2 ms-2.5"
                        >| <b>{{ knowledge?.comment?.length }}</b> Comments
                      </span>
                    </div>
                  </div>
                  <p class="mt-2">{{ knowledge?.description }}</p>
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
        </v-window-item>
      </v-window>
    </v-container>
  </v-container>
</template>

<script setup>

// ###############
import { useServiceStore } from "../../stores/serviceStore.ts";
const store = useServiceStore();

await store.getKnowledge();
const fetchData = ref(store.knowledge);
// ###############

const activeTab = ref("recent");

const tags = [
  "Requirement",
  "Design",
  "Construction",
  "Testing",
  "Maintenance",
  "Quality",
  "Management",
];

const tabTitle = computed(() => {
  return activeTab.value === "recent"
    ? "Latest Knowledge Updates"
    : "Most Popular Resources";
});

const addToSearch = (tag) => {
  searchQuery.value += " " + tag;
};

const viewResource = (id) => {
  window.location.href = "/preview/" + id;
};

definePageMeta({
  middleware: ["auth"],
});

const searchQuery = ref("");

const updateSearchSuggestions = (val) => {
  if (val && val.length > 0) {
    searchQuery.value = val;
  }
};

const performSearch = async () => {
  console.log("Search for:", searchQuery.value);
};

const onSearchPage = () => {
  window.location.href = "/search/" + searchQuery.value;
};

const suggestList = await ref(fetchData.value.map((item) => item.title));
console.log(suggestList.value);
</script>

<style scoped>
.hero-section {
  background: linear-gradient(135deg, #f5f5f5 0%, #f0f0f0 100%);
  color: #000000;
  padding: 80px 0;
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

.v-card-title {
  white-space: wrap !important;
}
</style>
