<template>
    <v-footer app class="small-footer">
      <v-container>
        <v-row justify="center">
          <v-col class="text-center">
            &copy; 2024 Knowledge Management System
          </v-col>
        </v-row>
      </v-container>
    </v-footer>
  </template>
  
  <script>
  export default {
    name: 'Footer',
  };
  </script>
  
  <style scoped>
  .small-footer {
    height: 40px; /* Adjust the height as needed */
    padding-top: 10px;
    padding-bottom: 10px;
    font-size: 0.8rem; /* Adjust the font size */
  }
  </style>
  