<script lang="ts">
	import { onMount } from 'svelte';
	import { DocLayout, CodeBlock } from '@keenmate/svelte-docs';
	import { DemoPlayground, technologies } from '$lib/demo';

	// --- Demo 1: live event log (hand-authored) --------------------------------
	interface LogEntry {
		id: number;
		kind: 'change' | 'select';
		time: string;
		text: string;
	}

	let eventEl = $state<any>();
	let log = $state<LogEntry[]>([]);
	let logId = 0;

	function push(kind: LogEntry['kind'], text: string) {
		log = [
			{ id: logId++, kind, time: new Date().toLocaleTimeString(), text },
			...log
		].slice(0, 12);
	}

	onMount(() => {
		const el = eventEl;
		if (!el) return;
		el.options = technologies;

		const onSelect = (e: any) => push('select', e.detail.option.label);
		const onChange = (e: any) =>
			push('change', JSON.stringify(e.detail.selectedValues));

		el.addEventListener('select', onSelect);
		el.addEventListener('change', onChange);

		return () => {
			el.removeEventListener('select', onSelect);
			el.removeEventListener('change', onChange);
		};
	});

	const eventCode = `const el = document.querySelector('web-multiselect');
el.options = technologies;

// Bubbling DOM CustomEvents — detail = { option, selectedOptions, selectedValues }
el.addEventListener('select', (e) => {
  console.log('selected', e.detail.option.label);
});
el.addEventListener('change', (e) => {
  console.log('now selected', e.detail.selectedValues);
});

// v2.0.0: the on* handler PROPERTIES now receive a CustomEvent too,
// not a bare option. Read e.detail.* just like the listeners above.
el.onChange = (e) => console.log(e.detail.selectedValues);`;

	// --- Demo 2: beforeSelectCallback veto -------------------------------------
	const vetoAttrs = {
		'value-member': 'value',
		'display-value-member': 'label',
		'icon-member': 'icon',
		'search-placeholder': 'Pick up to 3…'
	};

	const vetoSetup = (el: any) => {
		el.options = technologies;
		el.beforeSelectCallback = (_opt: any, selected: any[]) =>
			selected.length >= 3 ? 'Pick at most 3' : true;
	};

	const vetoTrailer = `// Return true to allow, false to veto silently,
// or a string to veto AND surface it as a toast over the control.
el.beforeSelectCallback = (option, selected) =>
  selected.length >= 3 ? 'Pick at most 3' : true;`;

	// --- Demo 3: add-new creation (v2.0.0) -------------------------------------
	interface Member {
		value: string;
		label: string;
		icon?: string;
	}

	const addAttrs = {
		'value-member': 'value',
		'display-value-member': 'label',
		'icon-member': 'icon',
		'allow-add-new': 'true',
		'add-new-text': 'Add "{value}"',
		'search-placeholder': 'Search or type a new tag…'
	};

	let addLog = $state<string[]>([]);

	const addSetup = (el: any) => {
		el.options = [
			{ value: 'urgent', label: 'Urgent', icon: '🔥' },
			{ value: 'backend', label: 'Backend', icon: '⚙️' },
			{ value: 'design', label: 'Design', icon: '🎨' }
		] satisfies Member[];

		el.addNewCallback = async (value: string): Promise<Member> => {
			await new Promise((r) => setTimeout(r, 800));
			return {
				value: value.toLowerCase().replace(/\s+/g, '-'),
				label: value,
				icon: '✨'
			};
		};

		el.addEventListener('add', (e: any) => {
			addLog = [`created "${e.detail.option.label}" (${e.detail.value})`, ...addLog].slice(0, 6);
		});
	};

	const addTrailer = `el.options = [
  { value: 'urgent',  label: 'Urgent',  icon: '🔥' },
  { value: 'backend', label: 'Backend', icon: '⚙️' },
  { value: 'design',  label: 'Design',  icon: '🎨' },
];

// Async + cancelable: return an option to create + select it,
// or null/undefined to abort. Shows the pending text while it runs.
el.addNewCallback = async (value) => {
  await new Promise((r) => setTimeout(r, 800));   // server round-trip
  return {
    value: value.toLowerCase().replace(/\\s+/g, '-'),
    label: value,
    icon: '✨',
  };
};

// The \`add\` event fires only when creation actually happened.
el.addEventListener('add', (e) => {
  // e.detail = { value, option, selectedOptions, selectedValues }
  console.log('created', e.detail.option.label);
});`;
</script>

<DocLayout
	titleText="Events & Callbacks"
	descriptionText="Fire-and-forget events, veto interceptors, and the v2.0.0 async add-new creation flow."
>
	<div class="py-3">
		<p class="lead">
			Notifications come two ways — bubbling DOM <code>CustomEvent</code>s and the matching
			<code>on*</code> handler properties — plus <em>interceptor</em> callbacks that can veto an
			action before it happens.
		</p>

		<!-- Demo 1: live event log -->
		<section class="demo-playground py-4" id="events">
			<h2 class="h4 mb-1">EV01 Events</h2>
			<p class="text-muted mb-3">
				Select and deselect options to watch <code>select</code> and <code>change</code> fire.
			</p>

			<div class="row g-3">
				<div class="col-lg-7">
					<div class="multiselect-demo">
						<web-multiselect
							bind:this={eventEl}
							value-member="value"
							display-value-member="label"
							icon-member="icon"
							search-placeholder="Select technologies…"
						></web-multiselect>
						<p class="text-muted small mt-2 mb-0">
							Each <code>CustomEvent</code> carries <code>detail.option</code>,
							<code>detail.selectedOptions</code> and <code>detail.selectedValues</code>.
						</p>
					</div>
				</div>
				<div class="col-lg-5">
					<div class="event-log">
						<div class="d-flex justify-content-between align-items-center mb-2">
							<span class="fw-semibold small text-uppercase text-muted">Event log</span>
							{#if log.length}
								<button
									type="button"
									class="btn btn-sm btn-outline-secondary py-0"
									onclick={() => (log = [])}
								>
									Clear
								</button>
							{/if}
						</div>
						{#if log.length === 0}
							<p class="text-muted small mb-0">Pick an option to see events appear here…</p>
						{:else}
							<ul class="list-unstyled mb-0 small">
								{#each log as entry (entry.id)}
									<li class="mb-1">
										<span class="badge {entry.kind === 'select' ? 'text-bg-primary' : 'text-bg-secondary'}">
											{entry.kind}
										</span>
										<span class="text-muted">{entry.time}</span>
										<code>{entry.text}</code>
									</li>
								{/each}
							</ul>
						{/if}
					</div>
				</div>
			</div>

			<div class="mt-3">
				<CodeBlock codeContent={eventCode} languageType="javascript" titleText="Wiring the events" />
			</div>

			<div class="prose small mt-3">
				<p class="mb-0">
					<strong>Breaking change in v2.0.0:</strong> the <code>onSelect</code> /
					<code>onDeselect</code> / <code>onChange</code> handler <em>properties</em> now receive a
					<code>CustomEvent</code> (read <code>e.detail.*</code>), matching
					<code>addEventListener</code> — they used to receive the bare option. See the
					<a href="/api/migration">Migration</a> guide.
				</p>
			</div>
		</section>

		<hr class="my-4" />

		<!-- Demo 2: beforeSelectCallback veto -->
		<DemoPlayground
			code="EV02"
			titleText="beforeSelectCallback veto"
			subtitleText="Intercept a selection before it happens and cap the picks at three."
			baseAttrs={vetoAttrs}
			setup={vetoSetup}
			trailer={vetoTrailer}
			codeLang="javascript"
			demoNote="Select three items, then try a fourth — the pick is vetoed and a toast appears over the control."
			idText="before-select"
		>
			{#snippet description()}
				<ul class="mb-0">
					<li><code>beforeSelectCallback</code> runs <em>before</em> an option is added.</li>
					<li>Return <code>true</code> to allow, <code>false</code> to veto silently.</li>
					<li>
						Returning a <strong>string</strong> vetoes the selection <em>and</em> surfaces that string
						as a transient toast (via the built-in <code>showMessage</code>), visible even in the
						fullscreen overlay.
					</li>
				</ul>
			{/snippet}
		</DemoPlayground>

		<hr class="my-4" />

		<!-- Demo 3: add-new creation -->
		<DemoPlayground
			code="EV03"
			titleText="Add-new creation (v2.0.0)"
			subtitleText="Turn the picker into a creation tool — type something new and add it on the fly."
			baseAttrs={addAttrs}
			setup={addSetup}
			trailer={addTrailer}
			codeLang="javascript"
			demoNote='Type a tag that is not listed (e.g. "Frontend"), then click the "Add …" prompt or press Enter.'
			idText="add-new"
		>
			{#snippet actions()}
				<div class="event-log w-100">
					<span class="fw-semibold small text-uppercase text-muted">Add log</span>
					{#if addLog.length === 0}
						<p class="text-muted small mb-0 mt-1">Created items log here after the ~800ms delay…</p>
					{:else}
						<ul class="list-unstyled mb-0 small mt-1">
							{#each addLog as line, i (i)}
								<li class="mb-1"><code>{line}</code></li>
							{/each}
						</ul>
					{/if}
				</div>
			{/snippet}
			{#snippet description()}
				<ul class="mb-0">
					<li>
						<strong>New in v2.0.0.</strong> With <code>allow-add-new</code> on, a search with no
						matches shows an <em>“Add …”</em> prompt (label templated by
						<code>add-new-text</code>, where <code>&#123;value&#125;</code> is the typed text).
					</li>
					<li>
						<code>addNewCallback</code> is <strong>async and cancelable</strong>: return the created
						option to add + select it, or <code>null</code>/<code>undefined</code> to abort. While it
						runs, the prompt shows the pending text (<code>add-new-pending-text</code>).
					</li>
					<li>
						The <code>add</code> event fires only when creation actually happens —
						<code>e.detail</code> carries the typed <code>value</code>, the created
						<code>option</code>, and the updated selection.
					</li>
				</ul>
			{/snippet}
		</DemoPlayground>
	</div>
</DocLayout>

<style>
	.demo-playground {
		scroll-margin-top: 5rem;
	}
	.event-log {
		padding: 1rem;
		border: 1px solid var(--bs-border-color);
		border-radius: 0.375rem;
		background-color: var(--bs-tertiary-bg, var(--bs-light));
		height: 100%;
	}
</style>
