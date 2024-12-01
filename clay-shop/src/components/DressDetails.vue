<script setup lang="ts">
import ReviewSection from './ReviewSection.vue';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { mockedDresses } from '/assets/json-data/mock-data.ts';

const CART_STORAGE_KEY = "shopping_cart";

const cartItems = ref([]);
const activeTab = ref(0);
const route = useRoute();
const dressId = route.params.id;

const dress: Dress = ref(mockedDresses[dressId - 1]);
const selectedSize: string = ref(dress?.value.selectedSizes ?? '');
const selectedColor: string = ref(dress?.value.selectedColor ?? '');
const dressReviews = ref({
  0: 0
});
const averageReview = ref(dress?.value.score ?? 0);
const reviews = ref(dress?.value.score ?? 0);
const totalReviews = ref(dress?.value.reviews ?? 0);

const handleReview = (newReview: number) => {
  const review = dressReviews.value[newReview] ?? 0;
  dressReviews.value = {
    ...dressReviews.value,
    [newReview]: review + 1
  };

  Object.entries(dressReviews.value).forEach(([rating, count]) => {
    reviews.value += rating * count;
    totalReviews.value += count;
  });

  averageReview.value = reviews.value / totalReviews.value;
};

onMounted(() => {
  loadCartFromStorage();
});

const loadCartFromStorage = () => {
  const storedCart = JSON.parse(localStorage.getItem(CART_STORAGE_KEY)) || [];
  cartItems.value = storedCart;
};

const addToCart = (item) => {
  const existingItem = cartItems.value.find((cartItem) => cartItem.id === item.id);
  if (existingItem) {
    existingItem.quantity += 1;
    existingItem.selectedSizes = [...existingItem.selectedSizes, selectedSize.value];
    existingItem.selectedColors = [...existingItem.selectedColors, selectedColor.value];
  } else {
    cartItems.value.push({ ...item, quantity: 1 });
  }
  updateCartInStorage();
};

const updateCartInStorage = () => {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems.value));
};

const handleSize = (size: string) => {
  selectedSize.value = size;
};

const handleColor = (color: string) => {
  selectedColor.value = color;
};
</script>

<template>
  <v-main>
    <v-container class="py-5">
      <v-row class="gap-4">
        <v-col cols="12" md="6">
          <v-card class="d-flex justify-center align-center" elevation="0">
            <v-img :src="dress?.imgSrcs[0]" alt="Dress" aspect-ratio="3/4" class="rounded" />
          </v-card>

          <v-row justify="center" class="mt-4">
            <v-col cols="auto" v-for="image in dress?.imgSrcs" :key="image">
              <v-img :src="image" alt="Thumbnail" width="60" height="60" class="rounded" />
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="12" md="6">
          <div class="d-flex justify-space-between align-center">
            <v-chip color="grey-darken-3" text-color="deep-purple" v-if="dress.isPopular">
              Popular
              <v-icon class="ml-1" color="error" icon="mdi-fire-circle" size="small"></v-icon>
            </v-chip>
            <v-chip color="grey-darken-3" text-color="deep-purple" v-else>
              Sale
              <v-icon class="ml-1" color="error" icon="mdi-sale" size="small"></v-icon>
            </v-chip>

            <v-btn icon="mdi-heart-outline" color="#EDA3B5" variant="text" />
          </div>

          <v-card-title class="text-h5 font-weight-bold">
            {{ dress?.name }}
          </v-card-title>

          <v-row class="align-center">
            <v-rating :model-value="averageReview" length="5" readonly color="#EDA3B5" half-increments />
            <span class="ml-2 grey--text">({{ dress?.reviews }})</span>
          </v-row>

          <v-tabs v-model="activeTab" color="#EDA3B5" class="mt-3">
            <v-tab value="info">Info</v-tab>
            <v-tab value="brand">Brand</v-tab>
            <v-tab value="delivery">Delivery</v-tab>
          </v-tabs>
          <v-tabs-window v-model="activeTab">
            <v-tabs-window-item value="info">
              <p class="grey--text">
                {{ dress?.description }}
              </p>
            </v-tabs-window-item>
            <v-tabs-window-item value="brand">
              <p class="grey--text">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Commodi, deleniti possimus
                ducimus praesentium consectetur laborum unde, labore adipisci accusamus omnis recusandae sequi, in alias
                veniam laudantium quidem cum vero aspernatur.</p>
            </v-tabs-window-item>
            <v-tabs-window-item value="delivery">
              <p class="grey--text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, minima! Voluptates
                fuga rem eligendi suscipit minima quisquam nemo sed, vel incidunt temporibus deleniti placeat culpa
                delectus, laudantium quam ab ullam!</p>
            </v-tabs-window-item>
          </v-tabs-window>

          <div class="mt-4">
            <p class="font-weight-medium">Size</p>
            <v-chip-group v-model="selectedSize" row color="#EDA3B5" class="mt-2">
              <v-chip @click="handleSize(size)" v-for="size in dress?.sizes" :key="size" :value="size" class="ma-1"
                text-color="deep-purple" variant="outlined">
                {{ size }}
              </v-chip>
            </v-chip-group>
          </div>

          <div class="mt-4">
            <p class="font-weight-medium">Color</p>
            <v-chip-group v-model="selectedColor" row color="#EDA3B5" class="mt-2">
              <v-chip @click="handleColor(color)" v-for="color in dress?.availableColors" :key="color" :value="color"
                :style="{ backgroundColor: color }" variant="outlined" filter />
            </v-chip-group>
          </div>

          <div class="d-flex justify-space-between align-center mt-4">
            <p v-if="dress?.onSale" class="text-h4 font-weight-bold mb-0">$ <del>{{ dress?.price }}</del> {{
              dress.salePrice }}</p>
            <p v-else class="text-h4 font-weight-bold mb-0">$ {{ dress?.price }}</p>

            <v-spacer />
            <v-btn class="mx-2" color="#EDA3B5" variant="outlined" rounded="lg">
              Shop Now
            </v-btn>
            <v-btn @click="addToCart(dress)" class="mx-2" color="#EDA3B5" variant="elevated" rounded="lg">
              Add to cart
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <ReviewSection @update-review-score="handleReview($event)" />
  </v-main>
</template>