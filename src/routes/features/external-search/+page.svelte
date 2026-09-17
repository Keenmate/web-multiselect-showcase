<script lang="ts">
	import { DocLayout, CodeBlock } from '@keenmate/svelte-docs';
	import { DemoPlayground, countries } from '$lib/demo';
	import type { ControlDef } from '$lib/demo';

	const baseAttrs = {
		'value-member': 'code',
		'display-value-member': 'name',
		'icon-member': 'flag',
		'search-placeholder': 'Type a country…'
	};

	const setup = (el: any) => {
		el.searchCallback = async (term: string, signal?: AbortSignal) => {
			// Simulate a network round-trip. A real API would use fetch(url, { signal }).
			await new Promise((r) => setTimeout(r, 400));
			if (signal?.aborted) return [];
			const t = term.toLowerCase();
			return countries.filter((c) => c.name.toLowerCase().includes(t));
		};
	};

	const controls: ControlDef[] = [
		{
			key: 'searchDebounce',
			label: 'Search debounce',
			type: 'number',
			attr: 'search-debounce',
			default: 0,
			min: 0,
			step: 100,
			hint: 'ms'
		},
		{
			key: 'minSearchLength',
			label: 'Min search length',
			type: 'number',
			attr: 'min-search-length',
			default: 0,
			min: 0
		}
	];

	const callbackSource = `// searchCallback receives (term, signal). Wire the AbortSignal into
// fetch so a keystroke that supersedes an in-flight request cancels it.
el.searchCallback = async (term, signal) => {
  // --- Real API ---------------------------------------------------
  // const res = await fetch(
  //   \`/api/countries?q=\${encodeURIComponent(term)}\`,
  //   { signal }
  // );
  // return res.json();

  // --- This demo: simulated latency over a local list -------------
  await new Promise((r) => setTimeout(r, 400));
  if (signal?.aborted) return []; // the term moved on — drop stale results
  const t = term.toLowerCase();
  return countries.filter((c) => c.name.toLowerCase().includes(t));
};`;
</script>

<DocLayout
	titleText="External Search"
	descriptionText="Replace the built-in substring filter with your own engine or a remote API via searchCallback."
>
	<div class="py-3">
		<p class="lead">
			The built-in search is a plain case-insensitive <strong>substring</strong> match. When you need
			fuzzy, accent-insensitive, ranked, or remote results, hand the whole search off to
			<code>searchCallback</code> — the component stays dependency-free and just renders what you return.
		</p>

		<p>
			<code>searchCallback</code> is called as <code>(term, signal) =&gt; Promise&lt;T[]&gt;</code>.
			Wire the <code>AbortSignal</code> into <code>fetch</code> so that when the user keeps typing, the
			previous in-flight request is aborted and its stale results never overwrite the newer ones.
		</p>

		<DemoPlayground
			titleText="Async searchCallback"
			subtitleText="Debounced, min-length-gated async search with AbortSignal cancellation."
			{baseAttrs}
			{controls}
			{setup}
			idText="async-search"
		>
			{#snippet description()}
				<ul class="mb-0">
					<li>
						<code>search-debounce</code> waits N ms after the last keystroke before firing the callback —
						fewer requests while typing fast.
					</li>
					<li>
						<code>min-search-length</code> holds the callback until at least that many characters are
						typed.
					</li>
					<li>
						Each new term aborts the previous request via the <code>AbortSignal</code>; the callback
						returns <code>[]</code> when <code>signal.aborted</code> so late responses are discarded.
					</li>
				</ul>
			{/snippet}
		</DemoPlayground>

		<div class="mt-4">
			<CodeBlock codeContent={callbackSource} languageType="javascript" titleText="searchCallback" />
		</div>
	</div>
</DocLayout>
