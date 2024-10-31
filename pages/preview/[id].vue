<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="8">
        <v-card
          elevation="0"
          class="h-100"
          v-if="fetchData.content === null || fetchData.content === 'undefined'"
        >
          <iframe
            :src="fetchData?.path"
            style="height: 100%; width: 100%"
            title="Iframe Example"
          ></iframe>
        </v-card>
        <v-card class="h-100 pa-8" v-else>
          <div v-html="fetchData?.content"></div>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card elevation="0">
          <!-- <v-card-title
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
              :href="fetchData?.path"
              target="_blank"
            >
              <v-icon left>mdi-download</v-icon>
              Download
            </v-btn>
          </v-card-title> -->

          <div class="mt-5">
            <div>
              <h1 class="mb-4">{{ fetchData.title }}</h1>
              <v-icon color="#f4b400">mdi-star</v-icon>
              <span class="ml-2">({{ fetchData.avg_rating }} Average Score) |</span>
              <span class="ml-2">{{ fetchData.comment?.length }} Comments</span>
            </div>

            <h3 class="mt-4">Description</h3>
            <p class="mt-2">
              {{ fetchData.description }}
            </p>

            <div class="tags d-flex flex-wrap mt-3">
              <v-chip
                v-for="(tag, index) in fetchData?.tag?.split(',')"
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
              v-model="mes"
              variant="outlined"
              class="mt-4"
            ></v-textarea>
            <v-btn
              color="secondary"
              class="mb-4 flex-grow-1"
              flat
              @click="onSetComment()"
            >
              Post Comment
            </v-btn>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="8">
        <v-card class="pa-8 mt-5" v-for="(comment,index) in fetchData.comment" :key="index" color="#ebebeb">
          <div class="d-flex ga-8">
            <v-btn icon>
              <v-icon color="grey-lighten-1"> mdi-account </v-icon>
            </v-btn>
            <div class="text-h5">
              <div class="d-flex align-center">
                <div>
                  <b style="font-size: 18px;"> {{ comment?.User?.f_name }} *** </b>
                  <p>{{ comment?.User?.email }}</p>
                </div>
  
                <div class="ml-7">
                  <v-rating
                  :model-value="comment.rating"
                  color="#f4b400"
                  half-increments
                  hover
                  readonly
                ></v-rating>
              </div>
              ({{ comment.rating }})
              </div>
              <div class="mt-2 text-black" >
              comment :  {{ comment.mes}}
              </div>
            </div>
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
const mes = ref("");

const user = useCookie<string>("_user");

const onSetComment = async () => {
  const data = {
    mes: mes.value,
    rating: rating.value,
    userId: user.value,
    khowledgeId: route.params.id,
  };

  await store.setComment(data);
  await location.reload()
  
};
</script>
