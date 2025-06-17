<script setup lang="ts">
import { ru } from '@nuxt/ui/locale'
useHead({
	titleTemplate: titleChunk => {
		return titleChunk
			? `${titleChunk} - Гармония вкуса Админ панель`
			: 'Гармония вкуса Админ панель'
	},
	htmlAttrs: {
		lang: 'ru',
	},
})
</script>

<template>
	<UApp
		:locale="ru"
		:toaster="{
			position: 'top-center',
		}"
		class="bg-neutral-100"
	>
		<AuthProvider>
			<NuxtLoadingIndicator color="amber" />
			<NuxtLayout>
				<NuxtPage />
			</NuxtLayout>
		</AuthProvider>
	</UApp>
</template>
