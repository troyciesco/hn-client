<script>
	import SadFaceIcon from "$lib/icons/SadFaceIcon.svelte"
</script>

<div class="flex flex-col items-center px-4">
	<div
		class="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-white text-orange-600 shadow-[0_1px_3px_rgba(0,0,0,0.1),0_1px_2px_rgba(0,0,0,0.06)]"
	>
		<SadFaceIcon />
	</div>
	<div class="mb-2 text-xl font-medium leading-[28px]">Unexpected error</div>
	<p class="max-w-xs text-center">
		We're facing some issues at the moment. Please try again later or contact support at <a
			href="mailto:support@example.com"
			class="text-orange-600">support@example.com</a
		>
	</p>
</div>
