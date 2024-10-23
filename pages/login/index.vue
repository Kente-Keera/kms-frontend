<template>
  <v-row class="h-screen" style="background-color: #000000">
    <v-col
      cols="6"
      class="d-flex flex-column justify-center align-center h-100 text-white font-weight-bold"
    >
      <h3>KMS</h3>
      <h4>Systems</h4>
    </v-col>
    <v-col
      cols="6"
      class="d-flex align-center justify-center"
      style="background-color: #ffff"
    >
      <v-card rounded="lg" flat width="400px" color="#ffff">
        <div class="text-subtitle-1 text-medium-emphasis">Account</div>

        <v-text-field
          placeholder="Employee ID"
          prepend-inner-icon="mdi-email-outline"
          variant="outlined"
          v-model="empId"
        ></v-text-field>

        <div
          class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between"
        >
          Password
        </div>

        <v-text-field
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          v-model="password"
          placeholder="Enter your password"
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
          @click:append-inner="visible = !visible"
        ></v-text-field>

        <v-btn
          class="mb-8"
          size="large"
          variant="flat"
          color="black"
          block
          @click="onClickLogin()"
        >
          Log In
        </v-btn>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
});

const visible: Ref<boolean> = ref(false);

const empId: Ref<string> = ref("");
const password: Ref<string> = ref("");

const onClickLogin = () => {
  navigateTo("/");
};
</script>
<style lang="scss"></style>
