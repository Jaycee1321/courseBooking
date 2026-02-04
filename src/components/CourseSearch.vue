<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-lg-8">

        <div class="card shadow-sm">
          <div class="card-body">

            <h4 class="card-title mb-3">
              Search Course
            </h4>

            <!-- Search Form -->
            <form @submit.prevent="searchCourse" style="max-width: 500px;">
              <div class="input-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter course name"
                  v-model="courseName"
                  required
                />
                <button
                  class="btn btn-primary"
                  type="submit"
                  :disabled="isSearching"
                >
                  {{ isSearching ? 'Searching...' : 'Search' }}
                </button>
              </div>
            </form>

            <!-- Results -->
            <div v-if="courses.length > 0">
              <h6 class="mt-4">Search Results</h6>
              <div class="row">
              	<CourseComponent v-for="course in courses" :key="course._id" :courseData="course"/>
              </div>
            </div>

            <!-- No Results -->
            <div
              v-else-if="hasSearched"
              class="alert alert-warning mt-4"
            >
              No courses found.
            </div>

          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Notyf } from 'notyf'
import 'notyf/notyf.min.css'
import CourseComponent from './CourseComponent.vue';

import api from '../api.js'

const courseName = ref('')
const courses = ref([])
const isSearching = ref(false)
const hasSearched = ref(false)

const notyf = new Notyf()

const searchCourse = async () => {
  if (!courseName.value.trim()) {
    notyf.error('Please enter a course name')
    return
  }

  try {
    isSearching.value = true
    hasSearched.value = false

    const response = await api.post('/courses/search', {
      courseName: courseName.value
    })

    courses.value = response.data
    hasSearched.value = true

    if (courses.value.length === 0) {
      notyf.error('No matching courses found')
    } else {
      notyf.success(`${courses.value.length} course(s) found`)
    }

  } catch (error) {
    const message =
      error.response?.data?.message || 'Failed to search courses'
    notyf.error(message)
  } finally {
    isSearching.value = false
  }
}
</script>
