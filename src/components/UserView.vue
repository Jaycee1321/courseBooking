<template>
    <div class="row">
        <div class="col my-5">
            <h1 class="text-center text-primary py-1">Courses Offered</h1>
            <p class="text-center">Select a course to enroll in!</p>


            <CourseSearch />
            <!-- Add double moustaches to render/display the value of the total reactive reference -->
            <!-- When the handleEnroll method is run, the total reactive ref will be updated. -->
            <!-- <h4 class="text-center text-danger pt-4" v-if="total === 60">
                All Classes Full
            </h4>
            <h4 class="text-center text-primary pt-4" v-else>
                Total Number of Students Enrolled:  {{total}}
            </h4> -->
        </div>
    </div>
			<!-- v-for is a vuejs directive that creates an element for each element in the exposed array given -->
      		<!-- :courseData is a v-bind directive that allow us to pass each item in the array a prop. -->
      		<!-- @<customEmitEvent> - "@enrollment" is a custom event from an emit() in the child component. -->
      		<!-- @<event> - is a shortcut to v-on:<event> -->
      		<!-- When the emit() method in the child component is run, the custom event here will be triggered. -->
      		<!-- <CourseComponent v-for="course in courses" :courseData="course" @enrollment="handleEnroll"/> -->

        	<!-- Update v-for, data property contains the array of courses. -->
      		

			<!-- 
			<div class="col-md-4">
				<CourseComponent />
			</div>
			<div class="col-md-4">
				<CourseComponent2 />
			</div>
			<div class="col-md-4">
				<CourseComponent3 />
			</div>
			<div class="col-md-4">
				<CourseComponent4 />
			</div>
			<div class="col-md-4">
				<CourseComponent5 />
			</div>
			<div class="col-md-4">
				<CourseComponent6 />
			</div> 
			-->
</template>

<script setup>
import CourseComponent from '../components/CourseComponent.vue';
import { defineProps } from 'vue';
import CourseSearch from '../components/CourseSearch.vue';

const props = defineProps({
    coursesData: Array
});

</script>