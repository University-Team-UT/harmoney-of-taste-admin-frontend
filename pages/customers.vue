<script lang="ts" setup>
import { customersService } from '~/api/New Api/customers.service'
import CustomerCartModal from '~/components/CustomerCartModal.vue'

useHead({
	title: 'Пользователи',
})

const formatDate = (dateString: Date) => {
	const date = new Date(dateString)
	return date.toLocaleDateString('ru-RU', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
	})
}
const value = ref('')
const {
	data: customers,
	isLoading,
	fetch,
} = useQuery({
	queryFn: () => customersService.getCustomers(value.value),
	enabled: true,
})

watch(value, () => fetch())

const deleteCustomer = async (id: string) => {
	await customersService.deleteCustomer(id)
	fetch()
}
</script>

<template>
	<div class="p-4">
		<h1 class="text-2xl font-bold mb-6">Пользователи</h1>
		<UInput
			v-model="value"
			icon="i-lucide-search"
			size="xl"
			class="w-full my-4"
			variant="outline"
			placeholder="Поиск по id, email и имени..."
		>
			<template v-if="value?.length" #trailing>
				<UButton
					color="neutral"
					variant="link"
					size="xl"
					icon="i-lucide-x"
					aria-label="Clear input"
					@click="value = ''"
				/>
			</template>
		</UInput>

		<div v-if="isLoading" class="flex justify-center">
			<USpinner class="w-8 h-8" />
		</div>

		<div v-else class="space-y-4">
			<div
				v-for="customer in customers?.data"
				:key="customer.id"
				class="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow"
			>
				<div class="flex items-start justify-between">
					<div>
						<div class="flex items-center space-x-3">
							<UAvatar :alt="customer.name" size="md" class="flex-shrink-0" />
							<div>
								<h3 class="font-semibold text-lg">{{ customer.name }}</h3>
								<p class="text-gray-600">{{ customer.email }}</p>
							</div>
						</div>

						<div class="mt-3 grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
							<div class="flex items-center text-gray-500">
								<UIcon name="i-heroicons-calendar" class="mr-2" />
								<span
									>Зарегистрирован: {{ formatDate(customer.createdAt) }}</span
								>
							</div>

							<div class="flex items-center text-gray-500">
								<UIcon name="i-heroicons-key" class="mr-2" />
								<span class="truncate">ID: {{ customer.id }}</span>
							</div>

							<div class="flex items-center text-gray-500">
								<UIcon name="i-heroicons-finger-print" class="mr-2" />
								<span class="truncate">Токен: {{ customer.userToken }}</span>
							</div>
						</div>
					</div>

					<div class="flex space-x-2">
						<CustomerCartModal :customer="customer">
							<UButton
								variant="ghost"
								icon="i-heroicons-pencil"
								title="Редактировать"
							/>
						</CustomerCartModal>
						<UButton
							color="error"
							variant="ghost"
							icon="i-heroicons-trash"
							title="Удалить"
							@click="deleteCustomer(customer.id)"
						/>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
