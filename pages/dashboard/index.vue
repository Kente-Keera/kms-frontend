<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <h1 class="text-h3 font-weight-bold mb-6">Dashboard</h1>
      </v-col>
    </v-row>

    <!-- Statistics Cards -->
    <v-row>
      <v-col cols="12" md="4">
        <v-card>
          <v-card-title>User Transactions</v-card-title>
          <v-card-text>
            <h2 class="text-h4 font-weight-bold">{{ filteredTransactions }}</h2>
            <v-select
              v-model="transactionFilter"
              :items="timeFilters"
              label="Filter"
              dense
              outlined
              @change="updateTransactions"
            ></v-select>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card>
          <v-card-title>Number of Views</v-card-title>
          <v-card-text>
            <h2 class="text-h4 font-weight-bold">{{ filteredViews }}</h2>
            <v-select
              v-model="viewFilter"
              :items="timeFilters"
              label="Filter"
              dense
              outlined
              @change="updateViews"
            ></v-select>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card>
          <v-card-title>Number of Downloads</v-card-title>
          <v-card-text>
            <h2 class="text-h4 font-weight-bold">{{ filteredDownloads }}</h2>
            <v-select
              v-model="downloadFilter"
              :items="timeFilters"
              label="Filter"
              dense
              outlined
              @change="updateDownloads"
            ></v-select>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Top and Bottom Knowledge Ratings -->
    <v-row class="mt-6">
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Top 5 Knowledge Ratings</v-card-title>
          <v-list dense>
            <v-list-item v-for="item in topRatedKnowledge" :key="item.id">
              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
                <v-list-item-subtitle>
                  Rating: {{ item.rating }}
                  <v-rating
                    :value="item.rating"
                    color="amber"
                    dense
                    half-increments
                    readonly
                    size="14"
                  ></v-rating>
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Bottom 5 Knowledge Ratings</v-card-title>
          <v-list dense>
            <v-list-item v-for="item in bottomRatedKnowledge" :key="item.id">
              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
                <v-list-item-subtitle>
                  Rating: {{ item.rating }}
                  <v-rating
                    :value="item.rating"
                    color="amber"
                    dense
                    half-increments
                    readonly
                    size="14"
                  ></v-rating>
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>

    <!-- Top and Bottom Knowledge Views -->
    <v-row class="mt-6">
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Top 5 Most Viewed Knowledge</v-card-title>
          <v-list dense>
            <v-list-item v-for="item in topViewedKnowledge" :key="item.id">
              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
                <v-list-item-subtitle>Views: {{ item.views }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Bottom 5 Least Viewed Knowledge</v-card-title>
          <v-list dense>
            <v-list-item v-for="item in bottomViewedKnowledge" :key="item.id">
              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
                <v-list-item-subtitle>Views: {{ item.views }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>

    <!-- Top Users -->
    <v-row class="mt-6">
      <v-col cols="12">
        <v-card>
          <v-card-title>Top 5 Users of Knowledge</v-card-title>
          <v-list dense>
            <v-list-item v-for="user in topUsers" :key="user.id">
              <v-list-item-content>
                <v-list-item-title>{{ user.name }}</v-list-item-title>
                <v-list-item-subtitle>Usage Count: {{ user.usageCount }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      transactionFilter: 'weekly',
      viewFilter: 'weekly',
      downloadFilter: 'weekly',
      timeFilters: ['weekly', 'monthly', 'yearly'],
      filteredTransactions: 0,
      filteredViews: 0,
      filteredDownloads: 0,
      topRatedKnowledge: [],
      bottomRatedKnowledge: [],
      topViewedKnowledge: [],
      bottomViewedKnowledge: [],
      topUsers: [],
    }
  },
  mounted() {
    this.updateTransactions()
    this.updateViews()
    this.updateDownloads()
    this.fetchKnowledgeRatings()
    this.fetchKnowledgeViews()
    this.fetchTopUsers()
  },
  methods: {
    updateTransactions() {
      // Simulated API call
      setTimeout(() => {
        this.filteredTransactions = Math.floor(Math.random() * 1000)
      }, 500)
    },
    updateViews() {
      // Simulated API call
      setTimeout(() => {
        this.filteredViews = Math.floor(Math.random() * 10000)
      }, 500)
    },
    updateDownloads() {
      // Simulated API call
      setTimeout(() => {
        this.filteredDownloads = Math.floor(Math.random() * 5000)
      }, 500)
    },
    fetchKnowledgeRatings() {
      // Simulated API call
      setTimeout(() => {
        const allKnowledge = Array.from({ length: 20 }, (_, i) => ({
          id: i + 1,
          title: `Knowledge Item ${i + 1}`,
          rating: (Math.random() * 5).toFixed(1)
        }))
        
        this.topRatedKnowledge = allKnowledge
          .sort((a, b) => b.rating - a.rating)
          .slice(0, 5)
        
        this.bottomRatedKnowledge = allKnowledge
          .sort((a, b) => a.rating - b.rating)
          .slice(0, 5)
      }, 500)
    },
    fetchKnowledgeViews() {
      // Simulated API call
      setTimeout(() => {
        const allKnowledge = Array.from({ length: 20 }, (_, i) => ({
          id: i + 1,
          title: `Knowledge Item ${i + 1}`,
          views: Math.floor(Math.random() * 1000)
        }))
        
        this.topViewedKnowledge = allKnowledge
          .sort((a, b) => b.views - a.views)
          .slice(0, 5)
        
        this.bottomViewedKnowledge = allKnowledge
          .sort((a, b) => a.views - b.views)
          .slice(0, 5)
      }, 500)
    },
    fetchTopUsers() {
      // Simulated API call
      setTimeout(() => {
        this.topUsers = Array.from({ length: 5 }, (_, i) => ({
          id: i + 1,
          name: `User ${i + 1}`,
          usageCount: Math.floor(Math.random() * 100)
        })).sort((a, b) => b.usageCount - a.usageCount)
      }, 500)
    }
  }
}
</script>