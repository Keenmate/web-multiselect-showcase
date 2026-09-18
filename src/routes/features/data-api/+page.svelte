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
	</div>
</DocLayout>
