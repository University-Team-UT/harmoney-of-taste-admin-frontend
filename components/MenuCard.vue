<script setup lang="ts">
import { ref } from 'vue'
import type { ProductsDto } from '~/api/products.service'
import { productsRefreshKey } from '~/lib/keys'

defineProps<{ item: ProductsDto }>()

const loading = ref<boolean>(true)
const refresh = inject(productsRefreshKey)
</script>

<template>
	<div
		class="bg-amber-50 rounded-lg p-3 flex flex-col cursor-default gap-3 h-[420px] overflow-hidden shadow-sm"
	>
		<div class="relative h-52 rounded overflow-hidden">
			<div
				v-if="loading"
				class="absolute inset-0 bg-gray-200 animate-pulse rounded"
			></div>
			<img
				v-show="!loading"
				:src="formatUrl(item.imageUrl)"
				:alt="item.title"
				class="object-cover w-full h-full"
				@load="loading = false"
			/>
		</div>

		<div class="flex flex-col flex-1 gap-1 overflow-hidden">
			<h3 class="font-semibold text-base line-clamp-2">
				{{ item.title }}
			</h3>

			<p class="text-gray-500 text-sm line-clamp-2">
				{{ item.ingredients }}
			</p>

			<p class="text-gray-500 text-sm">
				{{ item.volume }}
			</p>
		</div>

		<div class="flex justify-between items-center mt-auto">
			<p class="font-medium">{{ item.price }} ₽</p>
			<EditProduct :item="item" @refresh="refresh">
				<button
					class="cursor-pointer text-sm text-amber-950 px-4 py-2 rounded-lg bg-amber-100 hover:bg-amber-200 transition-colors"
				>
					Редактировать
				</button>
			</EditProduct>
		</div>
	</div>
</template>
