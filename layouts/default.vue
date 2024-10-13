<template>
  <v-card>
    <v-layout>
      <!-- App Bar -->
      <v-app-bar color="primary" >
        <!-- App Bar Navigation Icon (Drawer Toggle) -->
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

        <!-- App Title -->
        <v-toolbar-title class="app-title font-weight-bold" color="primary">Knowledge Hub</v-toolbar-title>


        <v-spacer></v-spacer>

        <!-- Horizontal Menu Bar -->

          <v-btn
            v-for="item in menuItems"
            :key="item.title"
            class="menu-btn mx-2"
            text
            :to="item.route"
            exact
          >
            {{ item.title }}
          </v-btn>
       

        <!-- Notification Icon -->
        <v-btn class="text-none" stacked>
          <v-badge color="error" content="2">
            <v-icon>mdi-bell-outline</v-icon>
          </v-badge>
        </v-btn>

        <!-- User Avatar Dropdown Menu -->
        <v-menu offset-y rounded min-width="250px">
          <template v-slot:activator="{ props }">
            <v-btn icon v-bind="props">
              <v-avatar color="Gray" size="40">
                <span class="text-h5">{{ user.initials }}</span>
              </v-avatar>
            </v-btn>
          </template>

          <!-- Profile Card in Menu -->
          <v-card>
            <v-card-text class="text-center">
              <v-avatar size="80" class="mx-auto" color="brown">
                <span class="text-h5">{{ user.initials }}</span>
              </v-avatar>
              <h3 class="mt-2">{{ user.fullName }}</h3>
              <p class="text-caption mt-1">{{ user.email }}</p>

              <v-divider class="my-3"></v-divider>

              <v-btn color="secondary" variant="text" rounded class="mb-2">
                Edit Account
              </v-btn>

              <v-divider class="my-3"></v-divider>

              <v-btn color="secondary" variant="text" rounded class="mb-2">
                Logout
              </v-btn>
            </v-card-text>
          </v-card>
        </v-menu>
      </v-app-bar>

      <!-- Navigation Drawer -->
      <v-navigation-drawer v-model="drawer" :location="$vuetify.display.mobile ? 'bottom' : undefined" temporary>
        <v-list dense>
          <v-list-item prepend-icon="mdi-home" title="Home" :to="'/'"></v-list-item>
          <v-list-item prepend-icon="mdi-folder-search-outline" title="Search the Knowledge" :to="'/search'"></v-list-item>
          <v-list-item prepend-icon="mdi-account-multiple" title="Shared with me" :to="'/sharing'"></v-list-item>
          <v-list-item prepend-icon="mdi-chart-pie" title="Dashboard" :to="'/dashboard'"></v-list-item>
          <v-list-item prepend-icon="mdi-phone" title="Contact" :to="'/contact'"></v-list-item>
        </v-list>
      </v-navigation-drawer>

      <!-- Main Content -->
      <v-main>
        <v-card-text>
          <!-- This will render the content of the current route -->
          <router-view></router-view>
        </v-card-text>
      </v-main>
    </v-layout>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      drawer: false, // Controls the visibility of the drawer
      user: {
        initials: 'JD',
        fullName: 'John Doe',
        email: 'john.doe@example.com',
      },
      menuItems: [
        { title: 'Home', route: '/'},
        { title: 'Search', route: '/search' },
        { title: 'Sharing', route: '/sharing' },
        { title: 'Dashboard', route: '/dashboard' },
        { title: 'Contact', route: '/contact' },
      ],
    };
  },
};
</script>

<style scoped>
/* Apply the modern, minimal font */
body {
  font-family: 'Poppins', sans-serif; /* You can use 'Roboto' if you prefer */
}

/* Styling for the app title */
.app-title {
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  font-size: 24px;
  color: black;
}

/* Styling for the menu bar buttons */
.menu-btn {
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  font-size: 16px;
  color: rgb(4, 4, 4);
  transition: color 0.3s ease;
}

.menu-btn:hover {
  color: lightgray;
}

/* Optional custom styles for avatar and profile card */
h3 {
  margin-top: 10px;
  font-weight: bold;
}
.v-avatar {
  display: flex;
  justify-content: center;
  align-items: center;
}
.v-card-text {
  padding-bottom: 10px;
}
</style>