export const API_ROUTES = {
	HOST: 'http://localhost:4202',
	BASE_URL: 'http://localhost:4202',
	MEDIA: '/media',
	AUTH: {
		LOGIN: '/auth/login-admin',
		EDIT_PROFILE: (id: string) => `auth/edit/${id}`,
	},
	PRODUCT_MANAGEMENT: {
		CREATE_BANNER: '/product-management/create',
		UPDATE_BANNER: (id: string) => `/product-management/update/${id}`,
		DELETE_BANNER: (id: string) => `/product-management/delete/${id}`,
	},
	ORDER_MANAGEMENT: {
		GET: `/orders-management`,
		UPDATE: `/orders-management`,
	},
	CUSTOMER_MANAGEMENT: {
		GE_CUSTOMERS: '/customers',
		GET_CUSTOMER_CART: (id: string) => `/customers/${id}/cart`,
		DELETE_CUSTOMER: (id: string) => `/customers/${id}`,
	},
} as const
