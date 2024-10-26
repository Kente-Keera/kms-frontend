<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="8">
        <v-card elevation="0">
          <v-card-text class="pa-0">
            <v-sheet
              class="d-flex align-center justify-center"
              color="grey lighten-2"
              height="400"
            >
              <v-icon size="64" color="grey lighten-2"
                >mdi-file-document-outline</v-icon
              >
            </v-sheet>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card elevation="0">
          <v-card-title
            class="text-h6 d-flex justify-space-between align-center"
          >
            <div class="d-flex align-center">
              <v-icon left>mdi-file-document-outline</v-icon>
              Mountain.jpg
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
          <v-card-text>
            <v-tabs align-with-title>
              <v-tab value="1">Knowledge Profile</v-tab>
              <v-tab value="2">Review</v-tab>
            </v-tabs>
          </v-card-text>
          <v-window v-model="window">
            <v-window-item>
              <v-container fluid>
                <div>
                  <h1 class="mb-4">Knowledge title</h1>
                  <v-icon color="#f4b400">mdi-star</v-icon>
                  <span class="ml-2">ccc reviews</span>
                </div>

                <h3 class="mt-4">Description</h3>
                <p class="mt-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Vivamus a ornare purus, rhoncus consequat ipsum. Maecenas
                  scelerisque sollicitudin nisi, a placerat erat venenatis
                  commodo.
                </p>
                <v-chip-group class="mt-4">
                  <v-chip small color="blue lighten-4"
                    >Software Requirement</v-chip
                  >
                  <v-chip small color="blue lighten-4">Backend</v-chip>
                  <v-chip small color="blue lighten-4">Design</v-chip>
                </v-chip-group>
                <v-list-item class="px-0 mt-4">
                  <v-list-item-content>
                    <v-list-item-title
                      >Created by Knowledge creator name</v-list-item-title
                    >
                  </v-list-item-content>
                </v-list-item>
              </v-container>
            </v-window-item>

            <!-- <v-window-item>
              <v-container fluid>
                <h1 class="mb-4">Reviews</h1>
                <div class="d-flex align-center">
                  <v-rating
                    color="#f4b400"
                    background-color="grey lighten-1"
                    half-increments
                    hover
                  ></v-rating>
                  <span class="text-h6 ml-4">Your rating: fff</span>
                </div>
                <v-textarea
                  label="Add a comment"
                  outlined
                  variant="outlined"
                  class="mt-4"
                ></v-textarea>
                <v-btn
                  color="secondary"
                  class="mb-4 flex-grow-1"
                  variant="tonal"
                >
                  Post Comment
                </v-btn>
                <v-list>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>ddd</v-list-item-title>
                      <v-list-item-subtitle class="d-flex align-center">
                        <v-icon color="#f4b400">mdi-star</v-icon>
                        <span class="ml-1">fff</span>
                      </v-list-item-subtitle>
                      <v-list-item-subtitle>dddd</v-list-item-subtitle>
                      <v-list-item-subtitle class="text-caption"
                        >ffff</v-list-item-subtitle
                      >
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-container>
            </v-window-item> -->
          </v-window>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup lang="ts">
const window = ref(0);
</script>
