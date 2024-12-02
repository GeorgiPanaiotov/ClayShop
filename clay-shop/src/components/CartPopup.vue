<script setup lang="ts">
import { ref, onMounted } from "vue";
import { calculate_cart_total } from '../wasm/pkg/cart_calculator';

const CART_STORAGE_KEY = "shopping_cart";

const cartItems = ref([]);

const loadCartFromStorage = () => {
  const storedCart = JSON.parse(localStorage.getItem(CART_STORAGE_KEY)) || [];
  cartItems.value = storedCart;
};

const updateCartInStorage = () => {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems.value));
};

const incrementItem = (index) => {
  cartItems.value[index].quantity += 1;
  updateCartInStorage();
};

const decrementItem = (index) => {
  if (cartItems.value[index].quantity > 1) {
    cartItems.value[index].quantity -= 1;
    updateCartInStorage();
  } else {
    cartItems.value.splice(index, 1);
    updateCartInStorage();
  }
};

const totalAmount = () => {
  const prices = cartItems.value.map((x) => x.price);
  const quantities = cartItems.value.map((x) => x.quantity);

  const total = calculate_cart_total(prices, quantities);
  return total;
};

onMounted(() => {
  loadCartFromStorage();
});

const emit = defineEmits(["update:isOpen"]);

const closeDialog = () => {
  emit("update:isOpen", false);
};

const activeTab = ref(0);

const completedTabs = ref([]);

const markTabComplete = (tabIndex) => {
  if (!completedTabs.value.includes(tabIndex)) {
    completedTabs.value.push(tabIndex);
  }
};

const isTabCompleted = (tabName) => {
  const tabIndexMap = { cart: 0, checkout: 1, shipping: 2, done: 3 };
  return completedTabs.value.includes(tabIndexMap[tabName]);
};

const nextStep = () => {
  if (activeTab.value < 3) {
    markTabComplete(activeTab.value);
    activeTab.value += 1;
  }
};

const previousStep = () => {
  if (activeTab.value > 0) {
    activeTab.value -= 1;
  }
};

const clearCart = () => {
  cartItems.value = [];
  updateCartInStorage();
  closeDialog();
};
</script>

<template>
  <v-card>
    <v-card>
      <v-tabs v-model="activeTab" background-color="white" fixed-tabs>
        <v-tab @click="activeTab = 0" value="0">
          <v-icon icon="mdi-check-circle" v-if="isTabCompleted('cart')" class="mr-2" color="green" />
          Cart
        </v-tab>
        <v-tab @click="activeTab = 1" value="1">
          <v-icon icon="mdi-check-circle" v-if="isTabCompleted('checkout')" class="mr-2" color="green" />
          Checkout
        </v-tab>
        <v-tab @click="activeTab = 2" value="2">
          <v-icon icon="mdi-check-circle" v-if="isTabCompleted('shipping')" class="mr-2" color="green" />
          Shipping
        </v-tab>
        <v-tab @click="activeTab = 3" value="3">
          <v-icon icon="mdi-check-circle" v-if="isTabCompleted('done')" class="mr-2" color="green" />
          Done
        </v-tab>
      </v-tabs>

      <v-tabs-window v-model="activeTab">
        <v-tabs-window-item>
          <v-card-text>
            <v-row v-for="(item, index) in cartItems" :key="index" class="mb-4">
              <v-col cols="3">
                <v-img :src="item.imgSrcs[0]" max-height="75" max-width="75"></v-img>
              </v-col>
              <v-col cols="6">
                <div class="text-subtitle-1 font-weight-bold">{{ item.name }}</div>
                <div class="text-caption">Size: <span class="mr-1" v-for="(size, index) in item.selectedSizes"
                    :key="index">{{ size
                    }}</span>
                </div>
                <div class="text-caption">Color: <v-icon v-for="(color, index) in item.selectedColors" :color="color"
                    icon="mdi-circle" :key="index" /></div>
              </v-col>
              <v-col cols="3" class="text-right">
                <v-row align="center" justify="center">
                  <v-btn class="mr-1" size="x-small" icon @click="decrementItem(index)">
                    <v-icon icon="mdi-minus" />
                  </v-btn>
                  <span>{{ item.quantity }}</span>
                  <v-btn class="ml-1" size="x-small" icon @click="incrementItem(index)">
                    <v-icon icon="mdi-plus" />
                  </v-btn>
                </v-row>
                <div class="text-body-2 font-weight-bold mt-8">${{ item.price * item.quantity }}</div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-tabs-window-item>

        <v-tabs-window-item>
          <v-card-text>
            <div class="text-h6 mb-4">Enter payment details</div>
            <v-text-field label="Card Number" outlined></v-text-field>
            <v-text-field label="Expiry Date" outlined></v-text-field>
            <v-text-field label="CVV" outlined></v-text-field>
          </v-card-text>
        </v-tabs-window-item>

        <v-tabs-window-item>
          <v-card-text>
            <div class="text-h6 mb-4">Enter shipping address</div>
            <v-text-field label="Address Line 1" outlined></v-text-field>
            <v-text-field label="City" outlined></v-text-field>
            <v-text-field label="Zip Code" outlined></v-text-field>
          </v-card-text>
        </v-tabs-window-item>

        <v-tabs-window-item>
          <v-card-text>
            <div class="text-h6 text-center">Thank you for your purchase!</div>
          </v-card-text>
        </v-tabs-window-item>
      </v-tabs-window>

      <v-card-text class="d-flex justify-space-between align-center">
        <span class="text-h6">Total Amount</span>
        <span class="text-h6 font-weight-bold">${{ totalAmount() }}</span>
      </v-card-text>

      <v-divider />

      <v-card-actions>
        <v-btn outlined color="#EDA3B5" @click="closeDialog">To Shop</v-btn>
        <v-btn outlined color="#EDA3B5" @click="previousStep" v-if="activeTab !== 0">Back</v-btn>
        <v-spacer></v-spacer>
        <v-btn color="#EDA3B5" @click="nextStep" v-if="activeTab !== 3" variant="elevated">Continue</v-btn>
        <v-btn color="#EDA3B5" @click="clearCart" v-else variant="elevated">Back to Shop</v-btn>
      </v-card-actions>

    </v-card>
  </v-card>
</template>