<script lang="ts">
	import { onMount } from 'svelte';
	import { DocLayout, CodeBlock } from '@keenmate/svelte-docs';
	import { technologies } from '$lib/demo';

	const TAG = 'web-multiselect';

	let el = $state<any>();

	// Live registry snapshot (populated on mount).
	let registered = $state(false);
	let version = $state<string>('—');
	let instanceCount = $state<number>(0);
	let lastAction = $state<string>('Nothing yet — click a button, then interact with the picker.');

	/** Safe accessor for the global registry entry (browser-only). */
	function reg(): any {
		if (typeof window === 'undefined') return undefined;
		return (window as any).components?.[TAG];
	}

	function refresh() {
		const r = reg();
		registered = !!r;
		version = r?.version?.() ?? '—';
		instanceCount = r?.getInstances?.()?.length ?? 0;
	}

	onMount(() => {
		if (el) el.options = technologies;
		refresh();
	});

	function enableAll() {
		reg()?.logging?.enableLogging?.('debug');
		lastAction = "reg.logging.enableLogging('debug') — all categories now log at debug. Open DevTools console.";
	}

	function disableAll() {
		reg()?.logging?.disableLogging?.();
		lastAction = 'reg.logging.disableLogging() — logging silenced.';
	}

	function onlyData() {
		const r = reg();
		r?.logging?.disableLogging?.();
		r?.logging?.setCategoryLevel?.('DATA', 'debug');
		lastAction = "reg.logging.setCategoryLevel('DATA','debug') — only DATA logs now.";
	}

	function enableThisInstance() {
		el?.enableLogging?.('debug');
		lastAction = "el.enableLogging('debug') — this one element is verbose (targets el.log).";
	}

	const registryApi = `// No import needed — the registry is a global, populated the moment the
// component module loads anywhere on the page.
const ms = window.components['web-multiselect'];

ms.version();                              // e.g. "2.0.0"
ms.config;                                 // { name, version, author, license, … }
ms.getInstances();                         // live <web-multiselect> elements

// Logging (a flattened view of the core logger bundle)
ms.logging.enableLogging('debug');         // all categories → debug
ms.logging.setCategoryLevel('DATA', 'debug');
ms.logging.disableLogging();               // silence everything (prod default)

// Per-instance override — make ONE element verbose (targets el.log)
const el = document.querySelector('web-multiselect');
el.enableLogging('debug');`;
</script>

<DocLayout
	titleText="Logging & Diagnostics"
	descriptionText="Introspect and control the component through the global registry — window.components['web-multiselect']."
>
	<div class="py-3">
		<p class="lead">
			Every KeenMate component publishes an entry on
			<code>window.components['web-multiselect']</code>. It exposes package metadata, the live list of
			connected instances, and a logging bundle. Logs are written to the browser console under four
			categories: <code>INIT</code>, <code>DATA</code>, <code>UI</code>, and <code>INTERACTION</code>.
		</p>

		<div class="alert alert-info" role="alert">
			<strong>Open the DevTools console (F12).</strong> Click a button below to change the log level, then
			open the picker and select options — you will see the corresponding category logs appear.
		</div>

		<section class="py-2">
			<h2 class="h4 mb-1">Live demo</h2>
			<p class="text-muted mb-3">
				Set a level, then interact with the picker to produce console output.
			</p>

			<div class="row g-3">
				<div class="col-lg-7">
					<div class="multiselect-demo">
						<web-multiselect
							bind:this={el}
							value-member="value"
							display-value-member="label"
							icon-member="icon"
							subtitle-member="subtitle"
							multiple="true"
							search-placeholder="Search technologies…"
						></web-multiselect>

						<div class="d-flex flex-wrap gap-2 mt-3">
							<button type="button" class="btn btn-sm btn-primary" onclick={enableAll}>
								Enable logging (debug)
							</button>
							<button type="button" class="btn btn-sm btn-outline-secondary" onclick={disableAll}>
								Disable logging
							</button>
							<button type="button" class="btn btn-sm btn-outline-secondary" onclick={onlyData}>
								Only DATA → debug
							</button>
							<button type="button" class="btn btn-sm btn-outline-primary" onclick={enableThisInstance}>
								Enable this instance
							</button>
						</div>

						<p class="text-muted small mt-2 mb-0"><code>{lastAction}</code></p>
					</div>
				</div>

				<div class="col-lg-5">
					<div class="registry-panel">
						<div class="fw-semibold small text-uppercase text-muted mb-2">Registry</div>
						<dl class="row mb-0 small">
							<dt class="col-6">registered</dt>
							<dd class="col-6">
								{#if registered}
									<span class="badge bg-success">yes</span>
								{:else}
									<span class="badge bg-secondary">no</span>
								{/if}
							</dd>
							<dt class="col-6">version()</dt>
							<dd class="col-6"><code>{version}</code></dd>
							<dt class="col-6">getInstances()</dt>
							<dd class="col-6"><span class="badge bg-primary">{instanceCount}</span></dd>
						</dl>
						<button type="button" class="btn btn-sm btn-outline-secondary mt-2" onclick={refresh}>
							Refresh
						</button>
					</div>
				</div>
			</div>
		</section>

		<hr class="my-4" />

		<section class="py-2">
			<h2 class="h4 mb-1">The registry API</h2>
			<p class="text-muted mb-3">
				Everything above goes through this single global — nothing else is imported at the call site.
			</p>
			<CodeBlock codeContent={registryApi} languageType="javascript" titleText="window.components API" />
		</section>

		<section class="py-2">
			<h2 class="h4 mb-1">Log categories</h2>
			<ul class="small">
				<li><strong>INIT</strong> — initialization, config parsing, RTL detection, destruction</li>
				<li><strong>DATA</strong> — async loading, option parsing, adding options, errors</li>
				<li><strong>UI</strong> — dropdown/popover/tooltip rendering, positioning, badges</li>
				<li><strong>INTERACTION</strong> — clicks, selections, keyboard, close-on-select</li>
			</ul>
		</section>
	</div>
</DocLayout>

<style>
	.registry-panel {
		padding: 1rem;
		border: 1px solid var(--bs-border-color);
		border-radius: 0.375rem;
		background-color: var(--bs-tertiary-bg, var(--bs-light));
		height: 100%;
	}
</style>
