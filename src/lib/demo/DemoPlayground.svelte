<script lang="ts">
	import { onMount, type Snippet } from 'svelte';
	import { CodeBlock } from '@keenmate/svelte-docs';
	import Control from './Control.svelte';
	import { configToSnippet, type ControlDef, type DemoConfig } from './codegen';

	interface Props {
		titleText: string;
		subtitleText?: string;
		/** Stable demo code shown before the title and used as the anchor (e.g. "TR02"). */
		code?: string;
		idText?: string;
		tag?: string;
		/** Attributes always applied to the element (and always shown in the snippet). */
		baseAttrs?: Record<string, string>;
		/** Declarative interactive controls. */
		controls?: ControlDef[];
		/** Overrides for the initial control values (otherwise each control's `default`). */
		initialConfig?: DemoConfig;
		/** Imperative setup for object/array/callback props (options, actionButtons, render*). */
		setup?: (el: any) => void;
		/** Extra code appended after the element markup (e.g. JS options/callbacks). */
		trailer?: string;
		codeLang?: string;
		/** Small muted note under the live element. */
		demoNote?: string;
		/** Extra documentation rendered below the code. */
		description?: Snippet;
		/** Imperative buttons that receive the live element (e.g. open()/search()/scrollTo*). */
		actions?: Snippet<[any]>;
		/** Column split (Bootstrap, sums to 12). */
		demoCols?: number;
	}

	let {
		titleText,
		subtitleText,
		code,
		idText,
		tag = 'web-multiselect',
		baseAttrs = {},
		controls = [],
		initialConfig = {},
		setup,
		trailer,
		codeLang = 'html',
		demoNote,
		description,
		actions,
		demoCols = 7
	}: Props = $props();

	function initialValues(): DemoConfig {
		const cfg: DemoConfig = {};
		for (const c of controls) cfg[c.key] = c.default;
		return { ...cfg, ...initialConfig };
	}

	let config = $state<DemoConfig>(initialValues());
	let elRef = $state<any>();

	const anchorId =
		idText ??
		(code
			? code.toLowerCase()
			: titleText.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''));

	// Reflect control config onto the live element.
	$effect(() => {
		const el = elRef;
		if (!el) return;
		for (const c of controls) {
			const attr = c.attr ?? c.key.replace(/[A-Z]/g, (m) => '-' + m.toLowerCase());
			const value = config[c.key];
			const unset = value === c.default || value === '' || value === undefined || value === null;
			if (unset) el.removeAttribute(attr);
			else el.setAttribute(attr, String(value));
		}
	});

	onMount(() => {
		if (elRef && setup) setup(elRef);
	});

	function reset() {
		config = initialValues();
	}

	let snippetCode = $derived(configToSnippet(controls, config, { tag, baseAttrs, trailer }));
</script>

<section class="demo-playground py-4" id={anchorId}>
	<h2 class="h4 mb-1">{code ? `${code} ${titleText}` : titleText}</h2>
	{#if subtitleText}
		<p class="text-muted mb-3">{subtitleText}</p>
	{/if}

	<div class="row g-3">
		<div class="col-lg-{demoCols}">
			<div class="multiselect-demo">
				<svelte:element this={tag} bind:this={elRef} {...baseAttrs}></svelte:element>
				{#if actions}
					<div class="demo-actions d-flex flex-wrap gap-2 mt-2">
						{@render actions(elRef)}
					</div>
				{/if}
				{#if demoNote}
					<p class="text-muted small mt-2 mb-0">{demoNote}</p>
				{/if}
			</div>
		</div>
		{#if controls.length}
			<div class="col-lg-{12 - demoCols}">
				<div class="demo-controls">
					<div class="d-flex justify-content-between align-items-center mb-2">
						<span class="fw-semibold small text-uppercase text-muted">Controls</span>
						<button type="button" class="btn btn-sm btn-outline-secondary py-0" onclick={reset}>
							Reset
						</button>
					</div>
					{#each controls as def (def.key)}
						<Control {def} bind:config />
					{/each}
				</div>
			</div>
		{/if}
	</div>

	<div class="mt-3">
		<CodeBlock codeContent={snippetCode} languageType={codeLang} titleText="Quick usage" />
	</div>

	{#if description}
		<div class="prose small mt-3">
			{@render description()}
		</div>
	{/if}
</section>

<style>
	.demo-controls {
		display: flex;
		flex-direction: column;
		padding: 1rem;
		border: 1px solid var(--bs-border-color);
		border-radius: 0.375rem;
		background-color: var(--bs-tertiary-bg, var(--bs-light));
		height: 100%;
	}
	.demo-playground {
		scroll-margin-top: 5rem;
	}
</style>
