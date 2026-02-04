<script setup>
import { ref } from "vue";
import { useGlobalStore } from "../stores/global.js";
import api from "../api.js";
import { Notyf } from "notyf";

const notyf = new Notyf();
const { user } = useGlobalStore();

// Reactive input fields initialized with current user data
const firstName = ref(user.firstName);
const lastName = ref(user.lastName);
const mobileNo = ref(user.mobileNo);

const updateProfile = async () => {
  try {
    const token = localStorage.getItem("token");

    const { data } = await api.put(
      "/users/profile",
      {
        firstName: firstName.value,
        lastName: lastName.value,
        mobileNo: mobileNo.value
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Update global store so profile page reflects changes immediately
    user.firstName = firstName.value;
    user.lastName = lastName.value;
    user.mobileNo = mobileNo.value;

    notyf.success("Profile updated successfully!");
  } catch (err) {
    console.error(err);
    notyf.error("Failed to update profile.");
  }
};
</script>

<template>
  <div class="row d-flex justify-content-center mt-4">
    <div class="col-md-6 border rounded-3 p-4">
      <h3 class="text-primary mb-3">Update Profile</h3>

      <div class="mb-3">
        <label class="form-label">First Name</label>
        <input v-model="firstName" type="text" class="form-control" />
      </div>

      <div class="mb-3">
        <label class="form-label">Last Name</label>
        <input v-model="lastName" type="text" class="form-control" />
      </div>

      <div class="mb-3">
        <label class="form-label">Mobile No</label>
        <input v-model="mobileNo" type="text" class="form-control" />
      </div>

      <button class="btn btn-primary w-100" @click="updateProfile">
        Save Changes
      </button>
    </div>
  </div>
</template>
