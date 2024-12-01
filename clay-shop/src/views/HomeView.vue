<script setup lang="ts">
import ProductCard from '@/components/ProductCard.vue';
import { mockedDresses, Dress } from '../../assets/json-data/mock-data.ts';
import { ref } from 'vue';

const dresses = ref<Dress[]>(mockedDresses);

const updateFavorite = (id: number, favorite: boolean) => {
  const dress = dresses.value.find((d) => d.id === id);
  if (dress) {
    dress.favorite = favorite;
  }
};

</script>

<template>
  <v-main>
    <v-row align="start" justify="center">
      <v-col cols="auto" v-for="dress in dresses" :key="dress.id">
        <ProductCard :dress="dress" @update-favorite="updateFavorite(dress.id, $event)"
          @click="$router.push(`/shop/${dress.id}`)" />
      </v-col>
    </v-row>
  </v-main>
</template>
