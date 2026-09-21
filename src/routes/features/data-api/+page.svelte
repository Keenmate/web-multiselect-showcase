<script lang="ts">
	import { DocLayout, CodeBlock } from '@keenmate/svelte-docs';
	import { DemoPlayground, technologies, countries } from '$lib/demo';
	import type { ControlDef } from '$lib/demo';

	// --- Demo 1: data shapes -------------------------------------------------
	const countriesSetup = (el: any) => {
		el.options = countries;
	};

	const displayCallbackExample = `// Members map a single property; a callback computes the label.
// Callbacks take precedence over the matching *-member attribute.
const el = document.querySelector('web-multiselect');

el.getDisplayValueCallback = (country) => \`\${country.flag} \${country.name}\`;
el.getValueCallback = (country) => country.code;
el.options = countries;

// [key, value] tuples are auto-detected — no members needed:
el.options = [
  ['us', 'United States'],
  ['gb', 'United Kingdom']
];`;

	// --- Demo 2: form value-format -------------------------------------------
	const formSetup = (el: any) => {
		el.options = technologies;
	};

	const formControls: ControlDef[] = [
		{
			key: 'valueFormat',
			label: 'value-format',
			type: 'select',
			attr: 'value-format',
			default: 'json',
			options: [
				{ value: 'json', label: 'json' },
				{ value: 'csv', label: 'csv' },
				{ value: 'array', label: 'array' }
			],
			hint: 'json → ["a","b"] · csv → a,b · array → repeated name[] inputs'
		}
	];

	// --- Demo 3: imperative API ----------------------------------------------
	const apiSetup = (el: any) => {
		el.options = technologies;
	};

	let currentValue = $state('(not read yet)');

	// --- Demo 4: deferred initialization (defer / ready, v2.1.0) -------------
	let deferEl = $state<any>();
	let deferStatus = $state('held — waiting for data…');
	let deferNonce = $state(0); // bump to remount a fresh deferred element (Replay)
	let deferWired: any = null;
	let releaseDefer: (() => void) | null = null;

	function startDeferDemo(el: any) {
		// Wire the badge color + options WHILE held — nothing paints yet.
		el.customStylesCallback = () =>
			`.ms__badge { background: #6d28d9; color: #fff; border-color: #6d28d9; }`;
		el.options = technologies;
		el.addEventListener(
			'ready',
			() => { deferStatus = `isReady: ${el.isReady} — built flash-free ✓`; },
			{ once: true }
		);

		// Simulate a 2 s data load: hold, count down, then build once on release.
		const DELAY = 2000;
		const start = performance.now();
		let released = false;
		releaseDefer = () => {
			if (released) return;
			released = true;
			el.ready(); // builds once, with options + styles already applied
		};
		const tick = () => {
			if (released || el !== deferEl) return; // stop if replaced by a Replay
			const remain = Math.max(0, DELAY - (performance.now() - start));
			deferStatus = `held — building in ${(remain / 1000).toFixed(1)}s (loading options, no flash)`;
			if (remain > 0) requestAnimationFrame(tick);
			else releaseDefer?.();
		};
		requestAnimationFrame(tick);
	}

	// Wire each freshly-mounted deferred element (initial mount + every Replay).
	$effect(() => {
		if (deferEl && deferEl !== deferWired) {
			deferWired = deferEl;
			startDeferDemo(deferEl);
		}
	});

	function replayDefer() {
		deferStatus = 'held — waiting for data…';
		deferWired = null;
		releaseDefer = null;
		deferNonce++;
	}

	const deferExample = `<!-- defer holds the first render through the upgrade race -->
<web-multiselect defer id="skills"></web-multiselect>

const el = document.querySelector('#skills');
el.options = await loadSkills();
el.customStylesCallback = () => \`.ms__badge { background: var(--brand); color: #fff; }\`;
el.addEventListener('change', (e) => console.log(e.detail.selectedValues));
el.ready();          // build once — styled badges appear in one shot, no flash
// (or, server-driven e.g. LiveView: just remove the \`defer\` attribute)`;
</script>

<DocLayout
	titleText="Data & API"
	descriptionText="Shape your own data with member attributes and callbacks, serialize it for forms, and drive the control with the v2.0.0 imperative API."
>
	<div class="py-3">
		<p class="lead">
			The component reads <em>your</em> objects — you only tell it which property holds the value,
			the label, the icon, and so on. Anything a plain property can't express becomes a callback.
		</p>

		<DemoPlayground
			code="DA01"
			titleText="Data shapes"
			subtitleText="Member attributes map your object properties onto the control."
			baseAttrs={{
				'value-member': 'code',
				'display-value-member': 'name',
				'icon-member': 'flag',
				'search-placeholder': 'Search countries…'
			}}
			setup={countriesSetup}
			idText="data-shapes"
		>
			{#snippet description()}
				<ul class="mb-2">
					<li>
						<code>value-member</code>, <code>display-value-member</code> and
						<code>icon-member</code> point at properties of each option
						(<code>code</code>, <code>name</code>, <code>flag</code> here).
					</li>
					<li>
						Every member has a callback counterpart —
						<code>getValueCallback</code>, <code>getDisplayValueCallback</code>,
						<code>getIconCallback</code>, … — for computed values. Callbacks are set as
						properties in JS (never attributes) and <strong>take precedence</strong> over the
						matching member.
					</li>
					<li>
						An array of <code>[key, value]</code> tuples is
						<strong>auto-detected</strong> — no members required.
					</li>
				</ul>
				<CodeBlock codeContent={displayCallbackExample} languageType="javascript" titleText="getDisplayValueCallback" />
			{/snippet}
		</DemoPlayground>

		<hr class="my-4" />

		<DemoPlayground
			code="DA02"
			titleText="Form value-format"
			subtitleText="A named control auto-creates hidden inputs so it submits like any native field."
			baseAttrs={{
				name: 'stack',
				'value-member': 'value',
				'display-value-member': 'label',
				'search-placeholder': 'Pick your stack…'
			}}
			setup={formSetup}
			controls={formControls}
			demoNote="Select a few items, then inspect the DOM — hidden inputs named “stack” appear in the light DOM and update live."
			idText="form-value-format"
		>
			{#snippet description()}
				<ul class="mb-0">
					<li>
						With a <code>name</code>, the component writes the selection into auto-created
						hidden <code>&lt;input&gt;</code>s in the light DOM, so a normal
						<code>FormData</code> / form submit picks it up.
					</li>
					<li>
						<code>value-format</code> controls the serialization:
						<code>json</code> → <code>["html","css"]</code>,
						<code>csv</code> → <code>html,css</code>,
						<code>array</code> → one repeated <code>stack[]</code> input per value.
					</li>
				</ul>
			{/snippet}
		</DemoPlayground>

		<hr class="my-4" />

		<DemoPlayground
			code="DA03"
			titleText="Imperative API (v2.0.0)"
			subtitleText="Drive the dropdown, the search box and scrolling from your own code."
			baseAttrs={{
				'value-member': 'value',
				'display-value-member': 'label',
				'search-placeholder': 'Search technologies…'
			}}
			setup={apiSetup}
			idText="imperative-api"
		>
			{#snippet actions(el)}
				<button type="button" class="btn btn-sm btn-outline-primary" onclick={() => el?.open()}>Open</button>
				<button type="button" class="btn btn-sm btn-outline-primary" onclick={() => el?.close()}>Close</button>
				<button type="button" class="btn btn-sm btn-outline-primary" onclick={() => el?.toggle()}>Toggle</button>
				<button type="button" class="btn btn-sm btn-outline-secondary" onclick={() => el?.search('type')}>Search "type"</button>
				<button type="button" class="btn btn-sm btn-outline-secondary" onclick={() => el?.clearSearch()}>Clear search</button>
				<button type="button" class="btn btn-sm btn-outline-secondary" onclick={() => el?.scrollToValue('svelte')}>Scroll to Svelte</button>
				<button
					type="button"
					class="btn btn-sm btn-outline-success"
					onclick={() => (currentValue = JSON.stringify(el?.getValue()))}
				>
					Get value
				</button>
			{/snippet}
			{#snippet description()}
				<p class="mb-1">Last <code>getValue()</code>:</p>
				<pre class="bg-body-tertiary border rounded p-2 mb-3"><code>{currentValue}</code></pre>
				<ul class="mb-0">
					<li>
						<code>open()</code> / <code>close()</code> / <code>toggle()</code> and the
						<code>isOpen</code> getter/setter drive the dropdown — new in v2.0.0.
					</li>
					<li>
						<code>search(term)</code> applies a query as if typed (without opening the
						dropdown), <code>searchText</code> reads it back, and <code>clearSearch()</code>
						restores the full list — new in v2.0.0.
					</li>
					<li>
						<code>scrollToIndex</code> / <code>scrollToValue</code> / <code>scrollToGroup</code>
						bring an option into view (they return <code>false</code> when it is filtered out) —
						new in v2.0.0.
					</li>
					<li>See the full list on the <a href="/api/methods">Methods</a> page.</li>
				</ul>
			{/snippet}
		</DemoPlayground>

		<hr class="my-4" />

		<section class="py-2" id="deferred-init">
			<h2 class="h4 mb-1">DA04 · Deferred initialization (v2.1.0)</h2>
			<p class="text-muted mb-3">
				A custom element upgrades the instant its script loads and paints with the component's
				<em>default</em> styles, so anything you wire in afterward — a
				<code>customStylesCallback</code>, your options — lands a beat late and the badges visibly
				restyle: the classic flash. The <code>defer</code> attribute holds the first render until
				you release it.
			</p>

			<div class="multiselect-demo">
				{#key deferNonce}
					<web-multiselect
						bind:this={deferEl}
						defer
						value-member="value"
						display-value-member="label"
						icon-member="icon"
						initial-values={'["js","ts","svelte"]'}
						search-placeholder="Search technologies…"
					></web-multiselect>
				{/key}

				<div class="d-flex flex-wrap gap-2 align-items-center mt-3">
					<button type="button" class="btn btn-sm btn-primary" onclick={() => releaseDefer?.()}>
						release now (ready())
					</button>
					<button type="button" class="btn btn-sm btn-outline-secondary" onclick={replayDefer}>
						Replay
					</button>
					<code class="small text-muted">{deferStatus}</code>
				</div>
			</div>

			<ul class="mt-3 mb-3">
				<li>
					While <code>defer</code> is set the element builds <strong>nothing</strong> on upgrade
					(it only reserves space via <code>:host([defer]:not([is-ready]))</code>), so you wire
					<code>options</code>, callbacks and listeners first.
				</li>
				<li>
					<code>ready()</code> — or removing the <code>defer</code> attribute, which suits
					server-driven frameworks like Phoenix LiveView — builds the picker <strong>once</strong>,
					with the purple pre-selected badges appearing in one shot. The gate is latched.
				</li>
				<li>
					<code>isReady</code> is reflected as an <code>is-ready</code> attribute, and a one-time
					<code>ready</code> event fires right after the first build. See the
					<a href="/api/methods">methods</a> page.
				</li>
			</ul>

			<CodeBlock codeContent={deferExample} languageType="javascript" titleText="defer / ready()" />
		</section>
	</div>
</DocLayout>
