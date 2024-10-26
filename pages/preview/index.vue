<template>
    <v-app>
      <v-main>
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
                    <v-icon size="64" color="grey lighten-2">mdi-file-document-outline</v-icon>
                  </v-sheet>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12" md="4">
              <v-card elevation="0">
                <v-card-title class="text-h6 d-flex justify-space-between align-center">
                  <div class="d-flex align-center">
                    <v-icon left>mdi-file-document-outline</v-icon>
                    Mountain.jpg
                  </div>
                  <v-btn
                    color="#4285f4"
                    dark
                    @click="downloadFile"
                    class="text-uppercase font-weight-bold"
                    elevation="0"
                  >
                    <v-icon left>mdi-download</v-icon>
                    Download
                  </v-btn>
                </v-card-title>
                <v-card-text>
                  <v-tabs
                    v-model="tab"
                    align-with-title
                  >
                    <v-tab value="1">Knowledge Profile</v-tab>
                    <v-tab value="2">Review</v-tab>
                  </v-tabs>
  
                  <v-window v-model="tab">
                    <v-window-item value="1">
                      <v-container fluid>
                        <div>
                        <h1 class=" mb-4">Knowledge title</h1>
                        <v-icon color="#f4b400">mdi-star</v-icon>
                        <span class="ml-2">{{ averageRating.toFixed(1) }} ({{ totalReviews }} reviews)</span>
                        </div>
                       
                        
                        <h3 class="mt-4">Description</h3>
                        <p class="mt-2">
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus a ornare purus, rhoncus consequat
                          ipsum. Maecenas scelerisque sollicitudin nisi, a placerat erat venenatis commodo.
                        </p>
                        <v-chip-group class="mt-4">
                          <v-chip small color="blue lighten-4">Software Requirement</v-chip>
                          <v-chip small color="blue lighten-4">Backend</v-chip>
                          <v-chip small color="blue lighten-4">Design</v-chip>
                        </v-chip-group>
                        <v-list-item class="px-0 mt-4">
                          
                          <v-list-item-content>
                            <v-list-item-title>Created by Knowledge creator name</v-list-item-title>
                          </v-list-item-content>
                        </v-list-item>
                      </v-container>
                    </v-window-item>
  
                    <v-window-item value="2">
                      <v-container fluid>
                        <h1 class=" mb-4">Reviews</h1>
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
                          v-model="newComment"
                          label="Add a comment"
                          outlined
                          variant="outlined"
                          class="mt-4"
                        ></v-textarea>
                        <v-btn color="secondary" @click="addComment" class="mb-4 flex-grow-1" :loading="loading" variant="tonal">
                            Post Comment
                        </v-btn>
                        <v-list>
                          <template v-for="(comment, index) in comments" :key="comment.id">
                            <v-list-item>
                              <v-list-item-content>
                                <v-list-item-title>{{ comment.username }}</v-list-item-title>
                                <v-list-item-subtitle class="d-flex align-center">
                                  <v-icon color="#f4b400">mdi-star</v-icon>
                                  <span class="ml-1">{{ comment.rating }}</span>
                                </v-list-item-subtitle>
                                <v-list-item-subtitle>{{ comment.text }}</v-list-item-subtitle>
                                <v-list-item-subtitle class="text-caption">{{ comment.date }}</v-list-item-subtitle>
                              </v-list-item-content>
                            </v-list-item>
                            <v-divider
                              v-if="index < comments.length - 1"
                              :key="'divider-' + comment.id"
                              class="my-2 mt-4"
                            ></v-divider>
                          </template>
                        </v-list>
                      </v-container>
                    </v-window-item>
                  </v-window>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </v-app>
  </template>
  
  <script>
  export default {
    name: 'FilePreview',
    data() {
      return {
        tab: '1',
        rating: 3.5,
        newComment: '',
        comments: [
          {
            id: 1,
            username: 'User1',
            rating: 4,
            text: 'Great file! The image quality is excellent.',
            date: '2023-10-25',
            likes: 5
          },
          {
            id: 2,
            username: 'User2',
            rating: 3,
            text: 'Nice content, but could be better resolution.',
            date: '2023-10-24',
            likes: 2
          },
          {
            id: 3,
            username: 'User3',
            rating: 5,
            text: 'Absolutely stunning landscape! Perfect for my project.',
            date: '2023-10-23',
            likes: 8
          },
          {
            id: 4,
            username: 'User4',
            rating: 4,
            text: 'Good composition, but the colors seem a bit oversaturated.',
            date: '2023-10-22',
            likes: 3
          }
        ]
      }
    },
    computed: {
      averageRating() {
        const sum = this.comments.reduce((acc, comment) => acc + comment.rating, 0);
        return this.comments.length > 0 ? sum / this.comments.length : 0;
      },
      totalReviews() {
        return this.comments.length;
      }
    },
    methods: {
      addComment() {
        if (this.newComment.trim() !== '') {
          const newId = Math.max(...this.comments.map(c => c.id), 0) + 1;
          this.comments.unshift({
            id: newId,
            username: 'You',
            rating: this.rating,
            text: this.newComment,
            date: new Date().toISOString().split('T')[0],
            likes: 0
          });
          this.newComment = '';
          this.rating = 3.5;
        }
      },
      downloadFile() {
        // Implement download functionality here
        console.log('Downloading file: Mountain.jpg');
      }
    }
  }
  </script>