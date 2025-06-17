import { API_ROUTES } from '~/config/apiRoutes'
import { privateApi } from '../interceptors'
import type { Order, OrderStatus } from '~/types/types'

export interface OrderDto {
	id: string
	createdAt: Date
	userId: string
	userName: string
	items: string
	orderTime: Date
	totalPrice: string
	status: OrderStatus
}
export const ordersService = {
	async getOrders() {
		return await privateApi.get<Order[]>(API_ROUTES.ORDER_MANAGEMENT.GET)
	},
	async changeOrderStatus(orderId: string, status: OrderStatus) {
		return await privateApi.patch(
			API_ROUTES.ORDER_MANAGEMENT.UPDATE(orderId),
			{ status },
			{
				params: { status },
			}
		)
	},
}
