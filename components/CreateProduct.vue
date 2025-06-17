<script lang="ts" setup>
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import { UButton } from '#components'
import { productsService } from '~/api/products.service'
import { ProductCategory } from '~/types/types'

const schema = z.object({
	title: z.string().min(1),
	category: z.nativeEnum(ProductCategory),
	volume: z.string().optional(),
	imageUrl: z.string().min(1),
	ingredients: z.string().optional(),
	price: z.number().min(1),
})

type Schema = z.output<typeof schema>

const emit = defineEmits<{ refresh: [] }>()

const state = reactive<Schema>({
	title: '',
	category: ProductCategory.COFFEE,
	volume: '',
	imageUrl: '',
	ingredients: '',
	price: 0,
})

const currentImage = ref<string | null>(null)

const { mutate: create } = useMutation({
	mutationFn: (data: Schema) => productsService.createProduct(data),
	onSuccess: () => {
		toast.add({
			title: 'Успех',
			description: 'Продукт успешно создан.',
			color: 'success',
		})
		emit('refresh')
		isOpen.value = false
	},
	onError: error => {
		toast.add({ title: 'Ошибка', description: error.message, color: 'error' })
	},
})

function onSubmit(event: FormSubmitEvent<Schema>) {
	create(event.data)
}

function createImage(file: string | null) {
	currentImage.value = file
	state.imageUrl = file || ''
}

const isOpen = ref<boolean>(false)
const toast = useToast()

const selectItems = Object.entries(ProductCategory).map(([key, value]) => ({
	label: value,
	value: value,
}))
</script>

<template>
	<UDrawer
		v-model:open="isOpen"
		:ui="{ content: 'w-118' }"
		direction="right"
		inset
		title="Создать продукт"
	>
		<slot></slot>
		<template #content>
			<UForm
				:schema="schema"
				:state="state"
				class="w-full flex flex-col gap-4"
				@submit="onSubmit"
			>
				<div class="flex flex-col gap-3">
					<div
						class="w-full px-2 flex items-center justify-center relative h-60"
					>
						<div class="w-full h-full rounded-lg overflow-hidden">
							<NuxtImg
								v-if="currentImage"
								:src="formatUrl(currentImage)"
								alt="image preview"
								class="w-full h-full object-cover"
							/>
							<div
								v-else
								class="w-full h-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center"
							>
								<h1 class="text-gray-500 dark:text-gray-400">
									Фото не загружено
								</h1>
							</div>
						</div>
						<div
							class="absolute inset-0 flex flex-col justify-center items-center z-20"
						>
							<UploadImage
								class="w-full h-full"
								@image-change="file => createImage(file)"
							/>
						</div>
					</div>

					<UFormField label="Название" name="title">
						<UInput v-model="state.title" class="w-full" />
					</UFormField>

					<UFormField label="Категория" name="category">
						<USelect
							v-model="state.category"
							:items="selectItems"
							placeholder="Выберите категорию"
							class="w-full"
						/>
					</UFormField>

					<UFormField label="Цена" name="price">
						<UInputNumber v-model="state.price" class="w-full" />
					</UFormField>

					<UFormField label="Объем" name="volume">
						<UInput v-model="state.volume" class="w-full" />
					</UFormField>

					<UFormField label="Состав (через запятую)" name="ingredients">
						<UInput v-model="state.ingredients" class="w-full" />
					</UFormField>
				</div>

				<div class="flex gap-2">
					<UButton type="submit" class="w-full">Создать</UButton>
				</div>
			</UForm>
		</template>
	</UDrawer>
</template>
