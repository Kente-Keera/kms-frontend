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
          <v-window v-model="onboarding" show-arrows="hover">
            <v-window-item v-for="n in 3" :key="`card-${n}`">
              <v-card
                class="d-flex align-center justify-center ma-2"
                elevation="2"
                height="200"
              >
                <h1 class="text-h2">Slide {{ n }}</h1>
              </v-card>
            </v-window-item>
          </v-window>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup lang="ts">
const onboarding = ref(0);
</script>
