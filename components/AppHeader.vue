import { ProfileEditModal } from '../.nuxt/components';
<script setup lang="ts">
import { ROUTES } from '~/config/routes'

const sections = [
	{
		label: 'Пользователи',
		link: ROUTES.SECTIONS.EVENTS,
	},
	{
		label: 'Меню',
		link: ROUTES.SECTIONS.MENU,
	},
	{
		label: 'Заказы',
		link: ROUTES.SECTIONS.ADMINISTRATORS,
	},
]

const router = useRouter()
const store = useAuthStore()
</script>

<template>
	<header
		class="h-20 w-full flex items-center bg-transparent backdrop-blur-2xl border-b border-b-neutral-300 z-10 fixed top-0 justify-between inset-x-0 pr-4"
	>
		<AppLogo />
		<div class="flex items-center">
			<div class="flex items-center justify-center gap-1">
				<UButton
					v-for="section in sections"
					:key="section.label"
					:to="section.link"
					:label="section.label"
					variant="soft"
					color="neutral"
					:class="[
						'w-full',
						section.link === router.currentRoute.value.path
							? 'text-amber-800'
							: '',
					]"
					size="lg"
				/>
			</div>
			<div class="flex justify-center items-center ml-5">
				<ProfileEditModal>
					<UButton
						variant="soft"
						color="neutral"
						label="Редактировать профиль"
						icon="lucide:user"
					/>
				</ProfileEditModal>
				<ApproveModal
					@approve="
						() =>
							store.logout(() => {
								router.replace(ROUTES.AUTH.LOGIN)
							})
					"
				>
					<UTooltip text="Выход из системы">
						<UButton
							label=" Выйти"
							variant="soft"
							color="neutral"
							size="lg" /></UTooltip
				></ApproveModal>
			</div>
		</div>
	</header>
</template>

<style scoped></style>
