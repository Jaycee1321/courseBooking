<template>
    <h1 class="text-center text-primary mt-5">Admin Dashboard</h1>
    <table class="table table-striped border">
        <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Availability</th>
                <th colspan="2">Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="course in coursesData" :key="course._id">
                <td>{{ course._id }}</td>

                <!-- Name -->
                <td v-if="editingCourseId !== course._id">{{ course.name }}</td>
                <td v-else><input v-model="editForm.name" class="form-control"/></td>

                <!-- Description -->
                <td v-if="editingCourseId !== course._id">{{ course.description }}</td>
                <td v-else><input v-model="editForm.description" class="form-control"/></td>

                <!-- Price -->
                <td v-if="editingCourseId !== course._id">{{ course.price }}</td>
                <td v-else><input v-model="editForm.price" type="number" class="form-control"/></td>

                <!-- Availability -->
                <td>
                    <span v-if="course.isActive" class="text-success">Available</span>
                    <span v-else class="text-danger">Unavailable</span>
                </td>

                <!-- Edit / Save / Cancel -->
                <td>
                    <button 
                        v-if="editingCourseId !== course._id" 
                        class="btn btn-primary" 
                        @click="startEdit(course)"
                    >
                        Edit
                    </button>

                    <div v-else class="d-flex gap-1">
                        <button class="btn btn-success" @click="saveEdit(course._id)">Save</button>
                        <button class="btn btn-secondary" @click="cancelEdit">Cancel</button>
                    </div>
                </td>

                <!-- Archive -->
                <td>
                    <button class="btn btn-danger" @click="archiveCourse(course._id)">
                        Archive
                    </button>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script setup>
import { ref, reactive } from "vue";
import { Notyf } from "notyf";

const notyf = new Notyf();

const props = defineProps({
    coursesData: Array,
});

// ----- Inline Editing -----
const editingCourseId = ref(null);
const editForm = reactive({
    name: "",
    description: "",
    price: 0
});

// Start editing a course
const startEdit = (course) => {
    editingCourseId.value = course._id;
    editForm.name = course.name;
    editForm.description = course.description;
    editForm.price = course.price;
};

// Cancel editing
const cancelEdit = () => {
    editingCourseId.value = null;
};

// Save edited course
const saveEdit = async (courseId) => {
    try {
        const token = localStorage.getItem("token");

        const response = await fetch(`http://localhost:4000/courses/${courseId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                name: editForm.name,
                description: editForm.description,
                price: editForm.price
            })
        });

        if (!response.ok) throw new Error("Update failed");

        notyf.success("Course updated successfully!");
        editingCourseId.value = null;

        // Optional: update coursesData locally
        const index = props.coursesData.findIndex(c => c._id === courseId);
        if (index !== -1) {
            props.coursesData[index].name = editForm.name;
            props.coursesData[index].description = editForm.description;
            props.coursesData[index].price = editForm.price;
        }

    } catch (err) {
        console.error(err);
        notyf.error("Failed to update course.");
    }
};

// ----- Archive Course -----
const archiveCourse = async (courseId) => {
    try {
        const token = localStorage.getItem("token");

        const response = await fetch(`http://localhost:4000/courses/${courseId}/archive`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        });

        if (!response.ok) throw new Error("Archive failed");

        notyf.success("Course archived successfully!");

        // Remove course from table locally
        const index = props.coursesData.findIndex(c => c._id === courseId);
        if (index !== -1) props.coursesData.splice(index, 1);

    } catch (err) {
        console.error(err);
        notyf.error("Failed to archive course.");
    }
};
</script>
