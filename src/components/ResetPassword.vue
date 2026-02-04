<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-5">
        <div class="card shadow-sm">
          <div class="card-body">
            <h4 class="card-title text-center mb-4">
              Reset Password
            </h4>

            <form @submit.prevent="handleResetPassword">
              <!-- New Password -->
              <div class="mb-3">
                <label class="form-label">New Password</label>
                <input
                  type="password"
                  class="form-control"
                  v-model="password"
                  required
                  minlength="8"
                />
              </div>

              <!-- Confirm Password -->
              <div class="mb-3">
                <label class="form-label">Confirm Password</label>
                <input
                  type="password"
                  class="form-control"
                  v-model="confirmPassword"
                  required
                />
              </div>

              <div class="d-grid">
                <button
                  type="submit"
                  class="btn btn-primary"
                  :disabled="isSubmitting"
                >
                  {{ isSubmitting ? 'Resetting...' : 'Reset Password' }}
                </button>
              </div>
            </form>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Notyf } from 'notyf'
import 'notyf/notyf.min.css'

import api from '../api.js' // axios instance

const route = useRoute()
const router = useRouter()
const notyf = new Notyf()

const password = ref('')
const confirmPassword = ref('')
const isSubmitting = ref(false)

// JWT token typically comes from URL query or params

const handleResetPassword = async () => {
  if (password.value !== confirmPassword.value) {
    notyf.error('Passwords do not match')
    return
  }

  try {
    isSubmitting.value = true

    await api.put(
      '/users/reset-password',
      {
        newPassword: password.value
      }
    )

    notyf.success('Password reset successful')

    // Optional redirect
    setTimeout(() => {
      router.push('/logout')
    }, 1500)

  } catch (error) {
    const message =
      error.response?.data?.message || 'Password reset failed'
    notyf.error(message)
  } finally {
    isSubmitting.value = false
  }
}
</script>
