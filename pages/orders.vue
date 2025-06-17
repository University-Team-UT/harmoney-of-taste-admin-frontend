<script lang="ts" setup>
import type { TabsItem } from '@nuxt/ui'
import { ordersService, type OrderDto } from '~/api/New Api/orders.service'
import { OrderStatus } from '~/types/types'

useHead({
	title: 'Заказы',
})
const items = [
	{
		label: 'Все',
		description: 'Просмотр всех заказов, включая новые, в работе и завершенные',
		slot: 'all' as const,
	},
	{
		label: 'Новые',
		description: 'Новые заказы, требующие вашего внимания и обработки',
		icon: 'lucide:bell',
		slot: 'new' as const,
	},
	{
		label: 'В работе',
		description: 'Заказы, которые сейчас находятся в процессе выполнения',
		icon: 'lucide:phone-call',
		slot: 'in_work' as const,
	},
	{
		label: 'Готовые',
		description: 'Готовые заказы',
		icon: 'lucide:smile',
		slot: 'ready' as const,
	},
	{
		label: 'Выполненные',
		description: 'Успешно завершенные заказы',
		icon: 'i-lucide-check',
		slot: 'completed' as const,
	},
	{
		label: 'Отмененные',
		description: 'Заказы, которые были отменены',
		icon: 'i-lucide-x',
		slot: 'canceled' as const,
	},
] satisfies TabsItem[]

const { data, fetch } = useQuery({
	queryFn: () => ordersService.getOrders(),
})

const filteredData = (orders: OrderDto[] | undefined, status: OrderStatus) =>
	orders?.filter(order => order.status === status)
</script>

<template>
	<div>
		<h1 class="text-2xl font-bold">Заказы</h1>

		<div>
			<UTabs :items="items" class="gap-4 w-full" :ui="{ trigger: 'grow' }">
				<template #all="{ item }">
					<p class="text-muted mb-4">
						{{ item.description }}
					</p>
					<OrdersList :orders="data?.data" @fetch-orders="fetch" />
				</template>

				<template #new="{ item }">
					<p class="text-muted mb-4">
						{{ item.description }}
					</p>

					<OrdersList
						:orders="filteredData(data?.data, OrderStatus.NEW)"
						@fetch-orders="fetch"
					/>
				</template>
				<template #in_work="{ item }">
					<p class="text-muted mb-4">
						{{ item.description }}
					</p>

					<OrdersList
						:orders="filteredData(data?.data, OrderStatus.IN_PROGRESS)"
						@fetch-orders="fetch"
					/>
				</template>
				<template #ready="{ item }">
					<p class="text-muted mb-4">
						{{ item.description }}
					</p>

					<OrdersList
						:orders="filteredData(data?.data, OrderStatus.READY)"
						@fetch-orders="fetch"
					/>
				</template>
				<template #completed="{ item }">
					<p class="text-muted mb-4">
						{{ item.description }}
					</p>

					<OrdersList
						:orders="filteredData(data?.data, OrderStatus.COMPLETED)"
						@fetch-orders="fetch"
					/>
				</template>
				<template #canceled="{ item }">
					<p class="text-muted mb-4">
						{{ item.description }}
					</p>

					<OrdersList
						:orders="filteredData(data?.data, OrderStatus.CANCELLED)"
						@fetch-orders="fetch"
					/>
				</template>
			</UTabs>
		</div>
	</div>
</template>

<style scoped></style>
