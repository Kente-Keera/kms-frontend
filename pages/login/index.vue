<script setup lang="ts">
import { useServiceStore } from "../../stores/serviceStore.ts";

const store = useServiceStore();
const router = useRouter();

definePageMeta({
  layout: false,
});

const isValid: Ref<boolean> = ref(false);
const lockForm: Ref<boolean> = ref(false);

const loginForm: {
  username: string;
  password: string | null;
} = reactive({
  username: "",
  password: "",
});

const rules = {
  required: (value: string) => !!value || "Field is required.",
  email: (value: string) => {
    const pattern =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return pattern.test(value) || "Invalid e-mail.";
  },
  min: (value: string) => {
    return value?.length >= 8 || "Minimum 8 characters";
  },
};

const onToggleLogin = async () => {
  isValid.value = false;
  lockForm.value = true;

  const user = await store.setLogin(loginForm);

  if (user === "LOGIN_SUCCESS") {
    navigateTo({ path: "/" });
  } else {
    lockForm.value = false;
    loginForm.password = null;
  }
};
</script>

<template>
  <v-row no-gutters class="h-screen overflow-hidden">
    <v-col cols="12" md="6" class="bg-black d-flex align-center">
      <v-img alt="icon" src="../../public/img/nav/logo.png" height="80px">
      </v-img>
    </v-col>
    <v-col cols="12" md="6" class="d-flex justify-center align-center">
      <v-card flat width="580px" class="py-8 px-15" color="rgba(0, 0, 0, 0)">
        <v-form ref="form" @submit.prevent="onToggleLogin" v-model="isValid">
          <div class="d-flex ga-5 align-center mb-10">
            <div class="pt-2">
              <h3 class="font-weight-medium text-login-color">LOGIN</h3>
            </div>
            <v-progress-circular
              color="primary"
              indeterminate
              :width="5"
              v-if="lockForm"
            ></v-progress-circular>
          </div>
          <v-text-field
            density="comfortable"
            placeholder="Employee ID"
            variant="outlined"
            bg-color="white"
            rounded="sm"
            class="my-2"
            :disabled="lockForm"
            v-model="loginForm.username"
            :rules="[rules.required, rules.email]"
          ></v-text-field>
          <v-text-field
            class="my-2"
            density="comfortable"
            bg-color="white"
            placeholder="Password"
            variant="outlined"
            rounded="sm"
            :disabled="lockForm"
            v-model="loginForm.password"
            :rules="[rules.required, rules.min]"
            required
          ></v-text-field>
          <div class="d-flex justify-space-between mt-8">
            <v-btn
              class="text-none"
              color="secondary"
              type="submit"
              @click.prevent="onToggleLogin()"
              rounded="sm"
              variant="flat"
              :disabled="!isValid"
              append-icon="mdi-arrow-right"
              >Login to Admin Portal</v-btn
            >
          </div>
        </v-form>
      </v-card>

      <div class="bg-filter w-100 h-screen overflow-hidden">
        <video autoplay loop muted>
          <source src="../../public/video/bg-login.mp4" type="video/mp4" />
        </video>
      </div>
    </v-col>
  </v-row>
</template>

<style lang="scss">
.bg-filter {
  position: absolute;
  top: 0;
  z-index: -1;
  display: inline-block;
}

.bg-filter::after {
  position: absolute;
  content: "";
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  background: linear-gradient(
    to right,
    rgba(44, 61, 89, 0.8) 0%,
    rgba(5, 28, 44, 1) 100%
  );
}

.text-login-color {
  background: linear-gradient(to right, #f4f4f4, #8888);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  width: 100%;
}
</style>
