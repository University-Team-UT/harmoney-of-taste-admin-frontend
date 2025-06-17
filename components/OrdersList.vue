<script setup lang="ts">
import type { OrderDto } from '~/api/New Api/orders.service'

defineProps<{ orders: OrderDto[] | undefined }>()
const emit = defineEmits<{ fetchOrders: [] }>()
onMounted(() => emit('fetchOrders'))
</script>

<template>
	<OrderItem
		v-for="order in orders"
		:key="order.id"
		:order="order"
		@fetch-orders="emit('fetchOrders')"
	/>
</template>

<style scoped></style>
