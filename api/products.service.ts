import type { ProductCategory } from '~/types/types'
import { privateApi } from './interceptors'
import { API_ROUTES } from '~/config/apiRoutes'

export interface ProductsDto {
	id?: string
	title: string
	category: ProductCategory
	volume?: string
	imageUrl: string
	ingredients?: string
	price: number
}
export type UpdateProductsDto = Partial<ProductsDto>

export const productsService = {
	async getProducts() {
		return await privateApi.get(API_ROUTES.PRODUCT_MANAGEMENT.GET)
	},
	async deleteProductById(productId: string) {
		return await privateApi.delete(
			API_ROUTES.PRODUCT_MANAGEMENT.DELETE(productId)
		)
	},
	async createProduct(dto: ProductsDto) {
		return await privateApi.post(API_ROUTES.PRODUCT_MANAGEMENT.CREATE, dto)
	},
	async updateProduct(productId: string, dto: UpdateProductsDto) {
		return await privateApi.patch(
			API_ROUTES.PRODUCT_MANAGEMENT.UPDATE(productId),
			dto
		)
	},
}
