<script lang="ts" setup>
import type { TabsItem } from '@nuxt/ui'
import { productsService } from '~/api/products.service'
import CreateProduct from '~/components/CreateProduct.vue'
import { categoriesKey, productsRefreshKey } from '~/lib/keys'
import type { IProduct, TextWithLangs } from '~/types/types'

useHead({
	title: 'Меню',
})

export interface CategoryWithProducts {
	id: string
	title: TextWithLangs
	hrefId: string
	products: IProduct[]
}

export interface TabsItemWithCategory extends TabsItem {
	category: CategoryWithProducts
	items: IProduct[]
}

const { data, fetch } = useQuery({
	queryFn: () => productsService.getProducts(),
	enabled: true,
})

provide(productsRefreshKey, fetch)
</script>

<template>
	<div class="relative">
		<div class="flex justify-between items-center">
			<h1 class="text-2xl font-bold">Мониторинг меню</h1>
		</div>
		<USeparator class="my-2" />
		<div class="flex gap-1">
			<div class="grid grid-cols-6 gap-2">
				<MenuCard
					v-for="product in data?.data"
					:key="product.id"
					:item="product"
				/>
				<CreateProduct @refresh="fetch">
					<div
						class="w-3/4 py-4 bg-amber-50 min-h-30 items-center justify-center self-center flex flex-col gap-2 rounded-lx cursor-pointer hover:bg-amber-100 transition-colors"
					>
						<NuxtImg
							width="160"
							height="auto"
							src="/Coffee-Tea-4--Streamline-Milano.png"
						/>
						<h2 class="text-lg text-center font-bold text-gree-950">
							Добавить новый продукт в меню
						</h2>
					</div>
				</CreateProduct>
			</div>
			<!-- 	<UTabs
				v-if="items"
				:items="items"
				class="w-full relative"
				variant="link"
				color="neutral"
			>
				<template #content="{ item }">
					<div class="flex items-center gap-1 absolute top-0 right-0">
						<AddCategoryModal @refresh="refresh">
							<UButton class="self-start" icon="lucide:plus" color="neutral" />
						</AddCategoryModal>
					</div>
					<UPopover>
						<UButton
							class="self-end mb-4 absolute top-12 right-0"
							icon="lucide:settings"
							color="neutral"
						/>
						<template #content>
							<div class="flex flex-col">
								<CategorySettings :category="item.category" @refresh="refresh">
									<UButton variant="soft" color="neutral" class="rounded-none"
										>Настройки категории</UButton
									>
								</CategorySettings>
								<UTooltip
									:delay-duration="100"
									:disabled="item.items.length === 0"
									text="Нельзя удалить категорию в которой есть элементы"
									><UButton
										:disabled="item.items.length >= 1"
										variant="soft"
										color="error"
										class="rounded-none"
										@click="deleteCategory(item.category.id)"
										>Удалить категорию</UButton
									></UTooltip
								>
							</div>
						</template>
					</UPopover>
					<div class="grid grid-cols-4 gap-2">
						<MenuCard
							v-for="product in item.items"
							:key="product.id"
							:item="product"
						/>
						<CreateProduct @refresh="refresh">
							<div
								class="w-3/4 py-4 bg-green-50 min-h-30 items-center justify-center self-center flex flex-col gap-2 rounded-lx cursor-pointer hover:bg-green-100 transition-colors"
							>
								<NuxtImg
									width="160"
									height="auto"
									src="/Coffee-Tea-4--Streamline-Milano.png"
								/>
								<h2 class="text-lg text-center font-bold text-gree-950">
									Добавить новый продукт в меню
								</h2>
							</div>
						</CreateProduct>
					</div>
				</template>
			</UTabs> -->
		</div>
	</div>
</template>
