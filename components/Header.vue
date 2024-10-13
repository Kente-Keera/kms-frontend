<template>
    <v-app-bar app color="primary" flat>
      <!-- Left Section (App Logo or Title) -->
      <v-row align="center">
        <v-col cols="auto">
          <v-icon>mdi-cloud</v-icon>
        </v-col>
        <v-col cols="auto">
          <h3 class="white--text">KMS</h3>
        </v-col>
      </v-row>
  
      <!-- Spacer to push menu items to the right -->
      <v-spacer />
  
      <!-- Horizontal Menu Links -->
      <v-btn text class="white--text">Home</v-btn>
      <v-btn text class="white--text">Search</v-btn>
      <v-btn text class="white--text">Sharing</v-btn>
      <v-btn text class="white--text">Dashboard</v-btn>
      <v-btn text class="white--text">Settings</v-btn>
  
      <!-- Right Section (Icons and Profile Avatar) -->
      <v-btn icon>
        <v-icon>mdi-bell</v-icon>
      </v-btn>
  
      <v-avatar size="40">
        <img src="https://via.placeholder.com/50" alt="User Avatar" />
      </v-avatar>
    </v-app-bar>
  </template>
  
  <script>
  export default {
    name: "Header",
  };
  </script>
  
  <style scoped>
  /* Styling adjustments if needed */
  </style>
  