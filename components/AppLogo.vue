<script setup lang="ts">
import { ROUTES } from '~/config/routes'
</script>

<template>
	<NuxtLink
		:to="ROUTES.INDEX"
		class="flex group items-center cursor-default p-2 text-amber-700"
	>
		<NuxtImg src="/logo.png" width="190" height="190" class="size-16" />
		<div
			class="flex group-hover:translate-x-2 transition-transform duration-200"
		>
			<UIcon size="30" name="lucide:chevron-right" />
			<h2 class="text-xl font-bold">Администрация</h2>
		</div>
	</NuxtLink>
</template>

<style scoped></style>
