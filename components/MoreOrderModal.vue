<script setup lang="ts">
import type { OrderDto } from '~/api/New Api/orders.service'
import type { Order } from '~/types/types'

defineProps<{ order: Order }>()

const formatDate = (dateString: string) => {
	const date = new Date(dateString)
	return (
		date.toLocaleDateString('ru-RU') +
		' ' +
		date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
	)
}

const getStatusText = (status: string) => {
	switch (status) {
		case 'NEW':
			return 'Новый'
		case 'IN_PROGRESS':
			return 'В работе'
		case 'COMPLETED':
			return 'Выполнен'
		case 'CANCELLED':
			return 'Отменен'
		default:
			return status
	}
}
</script>

<template>
	<UModal :title="`Заказ #${order.id.slice(0, 4)}`">
		<slot />
		<template #body>
			<div class="space-y-4">
				<div class="grid grid-cols-2 gap-4">
					<div>
						<p class="text-sm text-gray-500">Дата создания</p>
						<p>{{ formatDate(new Date(order.createdAt)) }}</p>
					</div>
					<div>
						<p class="text-sm text-gray-500">Статус</p>
						<p>{{ getStatusText(order.status) }}</p>
					</div>
					<div>
						<p class="text-sm text-gray-500">Клиент</p>
						<p>{{ order.userName }}</p>
					</div>
					<div>
						<p class="text-sm text-gray-500">ID клиента</p>
						<p class="text-xs font-mono">{{ order.userId }}</p>
					</div>
				</div>

				<UDivider label="Состав заказа" />
				<div class="space-y-3">
					<div
						v-for="(item, index) in order.items"
						:key="index"
						class="flex gap-3"
					>
						<UAvatar
							:src="formatUrl(item.product.imageUrl)"
							:alt="item.product.title"
							size="md"
						/>
						<div class="flex-1">
							<p class="font-medium">{{ item.product.title }}</p>
							<p class="text-sm text-gray-500">{{ item.product.category }}</p>
							<p v-if="item.product.volume" class="text-sm">
								{{ item.product.volume }}
							</p>
							<p v-if="item.product.ingredients" class="text-sm text-gray-500">
								{{ item.product.ingredients }}
							</p>
						</div>
						<div class="text-right">
							<p class="font-medium">
								{{ item.product.price }} ₽ x {{ item.quantity }} шт
							</p>
						</div>
					</div>
				</div>

				<UDivider />
				<div class="flex justify-between items-center">
					<p class="font-medium">Итого</p>
					<p class="text-xl font-bold">{{ order.totalPrice }} ₽</p>
				</div>
			</div>
		</template>
	</UModal>
</template>
