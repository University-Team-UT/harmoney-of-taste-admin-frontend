import { API_ROUTES } from '~/config/apiRoutes'
import { privateApi } from '../interceptors'

export interface CustomersDto {
	id: string
	createdAt: Date
	email: string
	name?: string
	userToken: string
}
export interface CartItem {
	id: string
	product: {
		id: string
		title: string
		price: number
		imageUrl: string
		volume?: string
		ingredients?: string
		category: string
		createdAt: string
	}
	quantity: number
	productId: string
	userToken: string
}

export const customersService = {
	async getCustomers(search?: string) {
		return await privateApi.get<CustomersDto[]>(
			API_ROUTES.CUSTOMER_MANAGEMENT.GET_CUSTOMERS,
			{
				params: search ? { search } : {},
			}
		)
	},
	async getCustomerCart(customerId: string) {
		return await privateApi.get<CartItem[]>(
			API_ROUTES.CUSTOMER_MANAGEMENT.GET_CUSTOMER_CART(customerId)
		)
	},
	async deleteCustomer(customerId: string) {
		return await privateApi.delete(
			API_ROUTES.CUSTOMER_MANAGEMENT.DELETE_CUSTOMER(customerId)
		)
	},
}
