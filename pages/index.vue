<script setup lang="ts">
import ContentBlock from '~/components/ContentBlock.vue'
</script>

<template>
	<section>
		<h1 class="text-3xl">Панель управления</h1>
		<div class="grid-cols-4 mt-4 gap-10 items-center grid">
			<ContentBlock
				class="col-span-2"
				title="Пользователи"
				text="Мониторинг пользователей"
				link="/customers"
				image-src="/Welcome-4--Streamline-Milano.png"
			/>
			<ContentBlock
				class="col-span-2"
				title="Меню"
				text="Изменить меню"
				link="/menu"
				image-src="/Coffee-Tea-4--Streamline-Milano.png"
			/>
			<ContentBlock
				class="col-span-4"
				title="Заказы"
				text="Отслеживание и манипуляции с заказами"
				link="/orders"
				image-src="/Security-3--Streamline-Milano.png"
			/>
		</div>
	</section>
</template>
