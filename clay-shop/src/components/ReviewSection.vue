<script setup lang="ts">
import { ref } from 'vue';

const emit = defineEmits(['update-review-score']);

const reviews = ref([]);
const newReview = ref({
  name: '',
  email: '',
  message: '',
  rating: 0,
});

const handleReview = () => {
  reviews.value.push({ ...newReview.value });
  emit('update-review-score', newReview.value.rating);
  newReview.value = { name: '', email: '', message: '', rating: 0 };
};
</script>

<template>
  <v-container>
    <h2>Reviews</h2>
    <v-rating v-model="newReview.rating" length="5" color="#EDA3B5" class="my-5" half-increments />
    <v-row>
      <v-col cols="12" md="6">
        <v-text-field label="Name" v-model="newReview.name" outlined></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field label="Email" v-model="newReview.email" outlined></v-text-field>
      </v-col>
    </v-row>
    <v-textarea label="Message" v-model="newReview.message" outlined rows="3"></v-textarea>

    <v-btn variant="outlined" rounded="lg" class="my-5" @click="handleReview" color="#EDA3B5">Add
      Review</v-btn>
    <v-divider class="my-4"></v-divider>

    <div v-for="review in reviews" :key="review.email" class="mb-4">
      <v-card elevation="1" class="pa-3">
        <div class="d-flex justify-space-between align-center">
          <div>
            <h4>{{ review.name }}</h4>
            <p class="grey--text">{{ review.email }}</p>
          </div>
          <v-rating :model-value="review.rating" readonly length="5" color="#EDA3B5" half-increments />
        </div>
        <p>{{ review.message }}</p>
      </v-card>
    </div>
  </v-container>
</template>