<script setup lang="ts">
import { ref } from 'vue';
import type { Dress } from '../../assets/json-data/mock-data.ts';

defineProps<{ dress: Dress }>();

const favorite = ref(false);
const emit = defineEmits(['update-favorite', 'open-dialog']);

const handleFavorite = () => {
  favorite.value = !favorite.value;
  emit('update-favorite', !favorite.value);
};

const handleDialog = () => {
  emit('open-dialog');
};
</script>

<template>
  <v-card @click="handleDialog" class="mx-auto" max-width="374">
    <v-img max-height="300" :src="dress.imgSrcs[0]" cover></v-img>

    <v-card-item>
      <v-card-title>{{ dress.name }}</v-card-title>

      <v-card-subtitle v-if="dress.isPopular">
        <span class="me-1">Popular</span>
        <v-icon color="error" icon="mdi-fire-circle" size="small"></v-icon>
      </v-card-subtitle>
      <v-card-subtitle v-else>
        <span class="me-1">Sale</span>
        <v-icon color="error" icon="mdi-sale" size="small"></v-icon>
      </v-card-subtitle>
    </v-card-item>

    <v-card-text>
      <v-row align="center" class="mx-0">
        <v-rating :model-value="dress.score" color="#EDA3B5" density="compact" size="medium" half-increments
          readonly></v-rating>

        <div class="text-grey ms-4">
          {{ `${dress.score} (${dress.reviews})` }}
        </div>
      </v-row>

      <div v-if="!dress.onSale" class="my-4 text-subtitle-1">
        $ {{ dress.price }}
      </div>

      <div v-else class="my-4 text-subtitle-1">
        $ <del>{{ dress.price }}</del> $ {{ dress.salePrice }}
      </div>
    </v-card-text>

    <v-divider class="mx-4 mb-1"></v-divider>

    <v-card-actions @click.stop class="d-flex justify-space-between default-pointer">
      <v-btn variant="elevated" color="#EDA3B5" border>Add to cart</v-btn>
      <v-btn @click="handleDialog" color="#EDA3B5" border>Details</v-btn>
      <div class="spacer"></div>
      <v-btn @click="handleFavorite" color="#EDA3B5"
        :icon="favorite ? 'mdi-heart' : 'mdi-heart-outline'" />
    </v-card-actions>
  </v-card>
</template>

<style>
.default-pointer {
  cursor: default;
}
</style>
