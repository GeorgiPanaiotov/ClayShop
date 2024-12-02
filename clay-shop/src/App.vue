<script setup lang="ts">
import { RouterView } from 'vue-router';
import AppBar from './components/AppBar.vue';
import CustomFooter from './components/CustomFooter.vue';
import CartPopup from './components/CartPopup.vue';
import { ref, onMounted } from "vue";
import init from './wasm/pkg/cart_calculator';

const cartDialogVisible = ref(false);
const cartItems = ref([
  {
    name: "Gucci Leather belt",
    image: "https://via.placeholder.com/75",
    size: "70 cm",
    color: "yellow",
    price: 32,
    quantity: 1,
  },
  {
    name: "Fendi D-frame gold-tone sunglasses",
    image: "https://via.placeholder.com/75",
    size: "Height: 6 cm / Width: 15 cm",
    color: "black",
    price: 26,
    quantity: 1,
  },
]);

const openCart = () => {
  cartDialogVisible.value = true;
};

const initWasm = async () => {
  try {
    await init();
  } catch (err) {
    console.error('Error initializing WASM module:', err);
  }
};

onMounted(() => {
  initWasm();
});

</script>

<template>
  <v-app>
    <v-dialog v-model="cartDialogVisible" max-width="600" persistent>
      <CartPopup :isOpen="cartDialogVisible" :cartData="cartItems" @update:isOpen="cartDialogVisible = $event" />
    </v-dialog>
    <AppBar @handle-cart="openCart()" />
    <RouterView />
    <CustomFooter />
  </v-app>
</template>
