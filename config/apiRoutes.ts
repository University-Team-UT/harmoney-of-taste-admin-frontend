export const API_ROUTES = {
	HOST: 'http://harmoney-of-taste-backend-xw2ufl-fa7a2f-5-129-207-103.traefik.me',
	BASE_URL:
		'http://harmoney-of-taste-backend-xw2ufl-fa7a2f-5-129-207-103.traefik.me',
	MEDIA: '/media',
	AUTH: {
		LOGIN: '/auth/login-admin',
		EDIT_PROFILE: (id: string) => `auth/edit/${id}`,
	},
	PRODUCT_MANAGEMENT: {
		GET: '/products',
		CREATE: '/product-management/create',
		UPDATE: (id: string) => `/product-management/update/${id}`,
		DELETE: (id: string) => `/product-management/delete/${id}`,
	},
	ORDER_MANAGEMENT: {
		GET: `/admin-orders`,
		UPDATE: (id: string) => `/admin-orders/change-status/${id}`,
	},
	CUSTOMER_MANAGEMENT: {
		GET_CUSTOMERS: '/customers',
		GET_CUSTOMER_CART: (id: string) => `/customers/${id}/cart`,
		DELETE_CUSTOMER: (id: string) => `/customers/${id}`,
	},
} as const
