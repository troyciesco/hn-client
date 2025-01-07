<script lang="ts">
	import "../app.css"
	import logo from "$lib/images/logo.svg"
	import { page } from "$app/state"
	import HomeIcon from "$lib/icons/HomeIcon.svelte"
	import AskIcon from "$lib/icons/AskIcon.svelte"
	import ShowIcon from "$lib/icons/ShowIcon.svelte"
	import JobIcon from "$lib/icons/JobIcon.svelte"
	import MenuIcon from "$lib/icons/MenuIcon.svelte"
	import CloseIcon from "$lib/icons/CloseIcon.svelte"

	let { children } = $props()
	let showMenu = $state(false)
</script>

<div class="relative flex min-h-screen flex-col text-neutral-900 md:flex-row">
	<div
		class={["fixed z-[1] h-full w-full bg-neutral-950/70 md:hidden", !showMenu && "hidden"]}
	></div>
	<div
		class="flex w-full items-center justify-between border-b border-neutral-200 px-8 py-5 md:hidden"
	>
		<div class="md:py-4">
			<img src={logo} alt="Hacker News logo" />
		</div>
		<button class="md:hidden" onclick={() => (showMenu = true)}>
			<MenuIcon />
		</button>
	</div>
	<aside
		class={[
			"fixed z-[2] h-full w-60 border-b-0 border-r border-neutral-200 bg-white p-4",
			!showMenu && "hidden md:block"
		]}
	>
		<nav>
			<div class="flex items-center justify-between">
				<div class="py-4">
					<img src={logo} alt="Hacker News logo" />
				</div>
				<button class="md:hidden" onclick={() => (showMenu = false)}>
					<CloseIcon />
				</button>
			</div>
			<ul class="flex-col gap-4 text-sm">
				<li>
					<a
						href="/"
						onclick={() => (showMenu = false)}
						class={[
							"flex items-center gap-3 rounded-[4px] p-[6px]",
							page.url.pathname === "/" && "bg-orange-50 text-orange-600"
						]}
					>
						<HomeIcon />
						New
					</a>
				</li>
				<li>
					<a
						href="/ask"
						onclick={() => (showMenu = false)}
						class={[
							"flex items-center gap-3 rounded-[4px] p-[6px]",
							page.url.pathname === "/ask" && "bg-orange-50 text-orange-600"
						]}
					>
						<AskIcon />
						Ask
					</a>
				</li>
				<li>
					<a
						href="/show"
						onclick={() => (showMenu = false)}
						class={[
							"flex items-center gap-3 rounded-[4px] p-[6px]",
							page.url.pathname === "/show" && "bg-orange-50 text-orange-600"
						]}
					>
						<ShowIcon />
						Show
					</a>
				</li>
				<li>
					<a
						href="/jobs"
						onclick={() => (showMenu = false)}
						class={[
							"flex items-center gap-3 rounded-[4px] p-[6px]",
							page.url.pathname === "/jobs" && "bg-orange-50 text-orange-600"
						]}
					>
						<JobIcon />
						Jobs
					</a>
				</li>
			</ul>
		</nav>
	</aside>
	<div class="flex min-h-screen w-full flex-col px-8 md:ml-[240px] lg:px-16">
		<main class="grow py-8">
			{@render children()}
		</main>
		<footer class="flex w-full items-center justify-between py-8">
			<div>Built by Troy Ciesco</div>
			<div>Hacker News API</div>
		</footer>
	</div>
</div>
