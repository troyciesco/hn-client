<script lang="ts">
	import "../app.css"
	import logo from "$lib/images/logo.svg"
	import { page } from "$app/state"
	import HomeIcon from "$lib/icons/HomeIcon.svelte"
	import AskIcon from "$lib/icons/AskIcon.svelte"
	import ShowIcon from "$lib/icons/ShowIcon.svelte"
	import JobIcon from "$lib/icons/JobIcon.svelte"

	let { children } = $props()
</script>

<div class="flex min-h-screen text-neutral-900">
	<aside class="w-60 border-r border-neutral-200 p-4">
		<nav>
			<div class="py-4">
				<img src={logo} alt="Hacker News logo" />
			</div>
			<ul class="flex flex-col gap-4 text-sm">
				<li>
					<a
						href="/"
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
	<div class="w-full px-16">
		<main class="py-8">
			{@render children()}
		</main>
		<footer class="flex w-full items-center justify-between py-8">
			<div>Built by Troy Ciesco</div>
			<div>Hacker News API</div>
		</footer>
	</div>
</div>
