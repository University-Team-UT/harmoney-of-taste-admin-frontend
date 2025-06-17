import { API_ROUTES } from '~/config/apiRoutes'
import { privateApi, publicApi } from './interceptors'
import {
	removeTokenFromStorage,
	saveToStorage,
	type IAuthData,
} from './auth.helpers'

export const AuthService = {
	async login(email: string, password: string) {
		const res = await publicApi.post<IAuthData>(API_ROUTES.AUTH.LOGIN, {
			email,
			password,
		})
		if (res.data) {
			saveToStorage(res.data)
		}
		return res.data
	},

	async editProfile(
		dto: { email?: string; password?: string },
		userId: string
	) {
		return await privateApi.patch<IAuthData>(
			API_ROUTES.AUTH.EDIT_PROFILE(userId),
			{
				dto,
			}
		)
	},

	logout() {
		removeTokenFromStorage()
		localStorage.removeItem('user')
	},
}
