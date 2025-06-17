<script lang="ts" setup>
import { ordersService } from '~/api/New Api/orders.service'
import { OrderStatus, type Order } from '~/types/types'

const props = defineProps<{
	order: Order
}>()
const emit = defineEmits<{ fetchOrders: [] }>()
const statusColors = {
	NEW: {
		bg: 'bg-blue-100',
		text: 'text-blue-800',
		border: 'border-blue-300',
	},
	IN_PROGRESS: {
		bg: 'bg-yellow-100',
		text: 'text-yellow-800',
		border: 'border-yellow-300',
	},
	READY: {
		bg: 'bg-purple-100',
		text: 'text-purple-800',
		border: 'border-purple-300',
	},
	COMPLETED: {
		bg: 'bg-green-100',
		text: 'text-green-800',
		border: 'border-green-300',
	},
	CANCELLED: {
		bg: 'bg-red-100',
		text: 'text-red-800',
		border: 'border-red-300',
	},
} as const
const currentStatus =
	statusColors[props.order.status as keyof typeof statusColors] ??
	statusColors.NEW

const formatDate = (date: Date) => {
	return (
		date.toLocaleDateString('ru-RU') +
		' ' +
		date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
	)
}
const statusOptions = [
	{ value: OrderStatus.NEW, label: 'Новый' },
	{ value: OrderStatus.IN_PROGRESS, label: 'В работе' },
	{ value: OrderStatus.READY, label: 'Готов' },
	{ value: OrderStatus.COMPLETED, label: 'Выполнен' },
	{ value: OrderStatus.CANCELLED, label: 'Отменен' },
]
const handleStatusChange = async (newStatus: OrderStatus) => {
	console.log(newStatus)
	await ordersService.changeOrderStatus(props.order.id, newStatus)
	emit('fetchOrders')
}
const status = ref(props.order.status)
</script>

<template>
	<div
		class="flex items-center justify-between p-4 rounded-lg border mb-3 transition-all hover:shadow-md"
		:class="[currentStatus.bg, currentStatus.border]"
	>
		<div class="flex flex-col md:flex-row md:items-center md:space-x-6">
			<div>
				<span class="font-semibold">Заказ #{{ order.id.slice(0, 4) }}</span>
				<span class="block text-sm text-gray-500"
					>от {{ formatDate(new Date(order.createdAt)) }}</span
				>
			</div>

			<div class="mt-2 md:mt-0">
				<span class="font-medium">{{ order.userName }}</span>
				<span class="block text-sm">Сумма: {{ order.totalPrice }} ₽</span>
			</div>
		</div>
		<div class="flex flex-col gap-1 items-end">
			<div
				class="px-3 py-1 rounded-full text-sm font-medium"
				:class="[currentStatus.text, currentStatus.bg]"
			>
				{{
					order.status === 'NEW'
						? 'Новый'
						: order.status === 'IN_PROGRESS'
						? 'В работе'
						: order.status === 'READY'
						? 'Готов'
						: order.status === 'COMPLETED'
						? 'Выполнен'
						: 'Отменен'
				}}
			</div>
			<div class="flex gap-1">
				<MoreOrderModal :order="order">
					<UButton size="sm" color="neutral" icon="lucide:ellipsis-vertical"
						>Подробнее</UButton
					>
				</MoreOrderModal>
				<UPopover>
					<UButton size="sm" color="neutral">Поменять статус</UButton>
					<template #content>
						<div class="p-3">
							<p class="text-sm text-gray-500">Новый статус</p>
							<div class="flex flex-col gap-3 mt-3">
								<UButton
									v-for="currentStatus in statusOptions.filter(
										curr => curr.value !== status
									)"
									:key="currentStatus.value"
									size="sm"
									color="neutral"
									@click="handleStatusChange(currentStatus.value)"
									>{{ currentStatus.label }}</UButton
								>
							</div>
						</div>
					</template>
				</UPopover>
			</div>
		</div>
	</div>
</template>
