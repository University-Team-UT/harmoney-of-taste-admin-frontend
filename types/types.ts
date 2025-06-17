import type { DateValue } from '@internationalized/date'
import type { ProductsDto } from '~/api/products.service'

export interface User {
	id: string
	email: string
	isEmailVerified: boolean
}
export interface IMainBlock {
	id: string
	title: TextWithLangs
	description: TextWithLangs
	imageSide: ImageSide
	position: number
	image: string
}
export interface IEvent {
	id: string
	name: TextWithLangs
	date: string
	description: TextWithLangs
	image: string
	content: EventContent
	formattedDate?: DateValue
}
export interface IProduct {
	id: string
	name: TextWithLangs
	description: TextWithLangs
	price: MinMaxValue
	volumes: MinMaxValue
	nutrition: Nutrition
	composition: string[]
	categoryId: string
	image: string
}
export type ImageSide = 'left' | 'right'

export type EventContent = Record<string, TextWithLangs>
export type TextWithLangs = {
	ru: string
	en: string
}

export type MinMaxValue = {
	value: number
	max: number
}

export type Nutrition = {
	calories: {
		value: number
		max: number
		title: NUTRITION.CALORIES
	}
	proteins: {
		value: number
		max: number
		title: NUTRITION.PROTEINS
	}
	fats: {
		value: number
		max: number
		title: NUTRITION.FATS
	}
	carbohydrates: {
		value: number
		max: number
		title: NUTRITION.CARBS
	}
}

export enum NUTRITION {
	CALORIES = 'nutrition.calories',
	PROTEINS = 'nutrition.proteins',
	FATS = 'nutrition.fats',
	CARBS = 'nutrition.carbs',
}

export enum ProductCategory {
	FOOD = 'FOOD',
	COFFEE = 'COFFEE',
	COLD_DRINK = 'COLD_DRINK',
	HOT_DRINK = 'HOT_DRINK',
	DESSERT = 'DESSERT',
}
export interface Customer {
	id: string
	userId: string
	userName: string
}
export enum OrderStatus {
	NEW = 'NEW',
	IN_PROGRESS = 'IN_PROGRESS',
	COMPLETED = 'COMPLETED',
	CANCELLED = 'CANCELLED',
	READY = 'READY',
}

export interface Order {
	id: string
	createdAt: string
	status: OrderStatus
	totalPrice: number
	user: User
	userId: string
	userName: string
	items: {
		product: ProductsDto
		quantity: number
	}[]
}
