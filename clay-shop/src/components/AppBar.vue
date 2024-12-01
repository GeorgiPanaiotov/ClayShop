<script setup lang="ts">
import { ref } from 'vue';

const emit = defineEmits(['handle-cart']);

const drawer = ref(false);

const handleCartWindow = () => {
	emit('handle-cart');
};
</script>

<template>
	<v-container>
		<v-app-bar :elevation="3" rounded>
			<template v-slot:prepend>
				<RouterLink class="links" to="/">
					<v-btn icon>
						<v-img src="../assets/logo.png" width="20px" height="20px"></v-img>
					</v-btn>
				</RouterLink>
				<RouterLink class="links" to="/">
					<v-btn>
						<v-app-bar-title>Clay Shop</v-app-bar-title>
					</v-btn>
				</RouterLink>
			</template>

			<v-container class="d-none d-md-flex">
				<template v-slot:default>
					<v-row align="center" justify="center">
						<v-col cols="auto">
							<RouterLink class="links" to="/">Home</RouterLink>
						</v-col>
						<v-col cols="auto">
							<RouterLink class="links" to="/shop">Shop</RouterLink>
						</v-col>
						<v-col cols="auto">
							<RouterLink class="links" to="/blog">Blog</RouterLink>
						</v-col>
						<v-col cols="auto">
							<RouterLink class="links" to="/contact">Contact</RouterLink>
						</v-col>
					</v-row>
				</template>
			</v-container>

			<template v-slot:append>
				<v-btn icon="mdi-magnify"></v-btn>
				<v-btn icon="mdi-cart-outline" @click="handleCartWindow()"></v-btn>
				<v-btn icon="mdi-menu" class="d-md-none" @click="drawer = !drawer"></v-btn>
			</template>
		</v-app-bar>

		<v-navigation-drawer v-model="drawer" absolute temporary>
			<v-list>
				<v-list-item>
					<RouterLink class="links" to="/" @click="drawer = false">Home</RouterLink>
				</v-list-item>
				<v-list-item>
					<RouterLink class="links" to="/shop" @click="drawer = false">Shop</RouterLink>
				</v-list-item>
				<v-list-item>
					<RouterLink class="links" to="/blog" @click="drawer = false">Blog</RouterLink>
				</v-list-item>
				<v-list-item>
					<RouterLink class="links" to="/contact" @click="drawer = false">Contact</RouterLink>
				</v-list-item>
			</v-list>
		</v-navigation-drawer>
	</v-container>
</template>

<style>
.links {
	text-decoration: inherit;
	color: inherit;
}
</style>