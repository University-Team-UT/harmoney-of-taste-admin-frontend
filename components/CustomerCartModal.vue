<script setup lang="ts">
import {
	customersService,
	type CustomersDto,
} from '~/api/New Api/customers.service'

const props = defineProps<{
	customer: CustomersDto
}>()

const { data: cartItems, isLoading } = useQuery({
	queryFn: () => customersService.getCustomerCart(props.customer.id),
	enabled: true,
})

const formatDate = (dateString: string) => {
	const date = new Date(dateString)
	return date.toLocaleDateString('ru-RU')
}

const totalPrice = computed(() => {
	return (
		cartItems.value?.data.reduce(
			(sum, item) => sum + item.product.price * item.quantity,
			0
		) ?? 0
	)
})
</script>

<template>
	<UModal :title="customer.name || customer.email">
		<slot />
		<template #body>
			<div v-if="isLoading" class="flex justify-center p-8">
				<USpinner />
			</div>

			<div v-else class="space-y-4">
				<div
					v-for="item in cartItems?.data"
					:key="item.id"
					class="flex gap-4 p-3 border-b"
				>
					<UAvatar
						:src="formatUrl(item.product.imageUrl)"
						:alt="item.product.title"
						size="lg"
					/>

					<div class="flex-1">
						<h3 class="font-semibold">{{ item.product.title }}</h3>
						<p class="text-sm text-gray-500">{{ item.product.category }}</p>
						<p v-if="item.product.volume" class="text-sm">
							Объем: {{ item.product.volume }}
						</p>
						<p class="text-sm">Количество: {{ item.quantity }}</p>
					</div>

					<div class="text-right">
						<p class="font-semibold">
							{{ item.product.price }} ₽ × {{ item.quantity }}
						</p>
						<p class="text-lg font-bold text-primary">
							{{ item.product.price * item.quantity }} ₽
						</p>
						<p class="text-xs text-gray-400">
							Добавлено: {{ formatDate(item.product.createdAt) }}
						</p>
					</div>
				</div>

				<div class="border-t pt-4">
					<div class="flex justify-between items-center">
						<span class="font-semibold">Итого:</span>
						<span class="text-xl font-bold">{{ totalPrice }} ₽</span>
					</div>
				</div>
			</div>

			<div
				v-if="!isLoading && (!cartItems || cartItems.data.length === 0)"
				class="text-center py-8 text-gray-500"
			>
				Корзина пуста
			</div>
		</template>
	</UModal>
</template>
