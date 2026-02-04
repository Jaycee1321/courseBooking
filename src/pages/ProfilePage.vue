<script setup>
import { ref, onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import { useGlobalStore } from "../stores/global.js";
import ProfileUpdate from "../components/ProfileUpdate.vue";
import ResetPassword from "../components/ResetPassword.vue";
import api from "../api.js";

const { user } = useGlobalStore();
const router = useRouter();
const loading = ref(true);

onBeforeMount(async () => {
  if (!user.token) {
    router.push({ path: "/" });
    return;
  }

  try {
    // Fetch full user profile from backend
    const { data } = await api.get("/users/details", {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    user.firstName = data.firstName;
    user.lastName = data.lastName;
    user.mobileNo = data.mobileNo;
    user.email = data.email;
  } catch (err) {
    console.error("Failed to load profile:", err);
    router.push({ path: "/" });
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div v-if="!loading" class="container-fluid">
    <h1 class="my-5 text-primary text-center">Profile Page</h1>

    <div class="row d-flex justify-content-center mb-4">
      <div class="col-md-5 border rounded-3 p-4 text-center">
        <h2>{{ user.firstName }} {{ user.lastName }}</h2>
        <hr />
        <h4>Contacts</h4>
        <ul class="list-unstyled">
          <li>Email: {{ user.email }}</li>
          <li>Mobile No: {{ user.mobileNo }}</li>
        </ul>
      </div>
    </div>

    <ProfileUpdate />
    <ResetPassword />
  </div>

  <div v-else class="text-center mt-5">
    Loading profile...
  </div>
</template>
