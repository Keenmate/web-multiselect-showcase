<script lang="ts">
	import { DocLayout, ShowcaseSection, CodeBlock } from '@keenmate/svelte-docs';
</script>

<DocLayout
	titleText="Getting Started"
	descriptionText="Learn how to install and use @keenmate/web-multiselect in your project">

	<div class="py-4">
		<div class="alert alert-primary">
			<strong>Now on v2.0.0.</strong> New: tree mode, add-new creation, an imperative open/search/scroll-to
			API, container-responsive badge collapse and base-icon theming. Upgrading from v1?
			The event-handler properties (<code>onSelect</code>/<code>onChange</code>) now receive a
			<code>CustomEvent</code> — see the <a href="/api/migration">migration notes</a>.
		</div>

		<!-- Installation -->
		<ShowcaseSection
			titleText="Installation"
			subtitleText="Add the package to your project"
			col1Title="Package Manager"
			col2Title="CDN"
			col3Title="Build Tools">

			{#snippet demoContent()}
				<CodeBlock
					codeContent="npm install @keenmate/web-multiselect"
					languageType="bash"
					titleText="npm"
				/>
				<CodeBlock
					codeContent="pnpm add @keenmate/web-multiselect"
					languageType="bash"
					titleText="pnpm"
				/>
				<CodeBlock
					codeContent="yarn add @keenmate/web-multiselect"
					languageType="bash"
					titleText="yarn"
				/>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`<!-- UMD Build -->
<script src="https://unpkg.com/@keenmate/web-multiselect/dist/multiselect.umd.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@keenmate/web-multiselect/dist/style.css">

<!-- ES Module -->
<script type="module">
  import '@keenmate/web-multiselect';
</script>`}
					languageType="html"
					titleText="CDN Usage"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose">
					<h4>Choose Your Method</h4>
					<p>
						Install via npm/pnpm/yarn for build tool integration, or use the CDN for quick prototyping and simple projects.
					</p>
					<h4>Zero Configuration</h4>
					<p>
						The component registers itself automatically when imported. No additional setup required.
					</p>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- Basic Usage -->
		<ShowcaseSection
			titleText="Basic Usage"
			subtitleText="Your first multiselect component"
			col1Title="HTML"
			col2Title="JavaScript"
			col3Title="Explanation">

			{#snippet demoContent()}
				<CodeBlock
					codeContent={`<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="@keenmate/web-multiselect/dist/style.css">
</head>
<body>
  <web-multiselect
    id="my-select"
    value-member="id"
    display-value-member="label"
    search-placeholder="Search..."
  ></web-multiselect>

  <script type="module">
    import '@keenmate/web-multiselect';
  </script>
</body>
</html>`}
					languageType="html"
					titleText="HTML Structure"
				/>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`const select = document.querySelector('#my-select');

// Set options
select.options = [
  { id: 1, label: 'JavaScript', icon: '🟨' },
  { id: 2, label: 'TypeScript', icon: '🔷' },
  { id: 3, label: 'Python', icon: '🐍' },
  { id: 4, label: 'Ruby', icon: '💎' }
];

// Get selected values
console.log(select.getValue());

// Set selected values
select.setSelected([1, 3]);`}
					languageType="javascript"
					titleText="JavaScript API"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose">
					<h4>Member Properties</h4>
					<p>
						Use <code>value-member</code> and <code>display-value-member</code> to map object properties to the component.
					</p>
					<h4>Reactive API</h4>
					<p>
						Use <code>getValue()</code> and <code>setSelected()</code> to interact with the component programmatically.
					</p>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- Framework Integration -->
		<div class="mt-5">
			<h2 class="mb-4">Framework Integration</h2>
			<div class="row g-4">
				<div class="col-lg-6">
					<CodeBlock
						codeContent={`<!-- Svelte 5 (runes) -->
<script>
  import '@keenmate/web-multiselect';

  let selectElement = $state();
  const options = [
    { id: 1, label: 'Option 1' },
    { id: 2, label: 'Option 2' }
  ];

  $effect(() => {
    if (selectElement) selectElement.options = options;
  });
</script>

<web-multiselect
  bind:this={selectElement}
  value-member="id"
  display-value-member="label"
/>`}
						languageType="svelte"
						titleText="Svelte"
					/>
				</div>
				<div class="col-lg-6">
					<CodeBlock
						codeContent={`// React
import { useEffect, useRef } from 'react';
import '@keenmate/web-multiselect';

function MyComponent() {
  const selectRef = useRef(null);
  
  useEffect(() => {
    if (selectRef.current) {
      selectRef.current.options = [
        { id: 1, label: 'Option 1' },
        { id: 2, label: 'Option 2' }
      ];
    }
  }, []);
  
  return (
    <web-multiselect
      ref={selectRef}
      value-member="id"
      display-value-member="label"
    />
  );
}`}
						languageType="jsx"
						titleText="React"
					/>
				</div>
				<div class="col-lg-6">
					<CodeBlock
						codeContent={`<!-- Vue 3 -->
<template>
  <web-multiselect
    ref="selectRef"
    value-member="id"
    display-value-member="label"
  />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import '@keenmate/web-multiselect';

const selectRef = ref(null);

onMounted(() => {
  selectRef.value.options = [
    { id: 1, label: 'Option 1' },
    { id: 2, label: 'Option 2' }
  ];
});
</script>`}
						languageType="vue"
						titleText="Vue"
					/>
				</div>
				<div class="col-lg-6">
					<CodeBlock
						codeContent={`// Angular
import { Component, ElementRef, ViewChild } from '@angular/core';
import '@keenmate/web-multiselect';

@Component({
  selector: 'app-my-component',
  template: \`
    <web-multiselect
      #select
      value-member="id"
      display-value-member="label"
    ></web-multiselect>
  \`
})
export class MyComponent {
  @ViewChild('select') selectRef!: ElementRef;
  
  ngAfterViewInit() {
    this.selectRef.nativeElement.options = [
      { id: 1, label: 'Option 1' },
      { id: 2, label: 'Option 2' }
    ];
  }
}`}
						languageType="typescript"
						titleText="Angular"
					/>
				</div>
			</div>
		</div>

		<!-- Next Steps -->
		<div class="mt-5 pt-5 border-top">
			<h2 class="mb-4">Next Steps</h2>
			<div class="row g-4">
				<div class="col-md-4">
					<div class="card h-100">
						<div class="card-body">
							<h3 class="h5 card-title">📚 View Examples</h3>
							<p class="card-text">
								Explore comprehensive examples showcasing all features and use cases.
							</p>
							<a href="/features/basic" class="btn btn-primary">
								View Examples →
							</a>
						</div>
					</div>
				</div>
				<div class="col-md-4">
					<div class="card h-100">
						<div class="card-body">
							<h3 class="h5 card-title">🔧 API Reference</h3>
							<p class="card-text">
								Learn about all available properties, methods, events and callbacks.
							</p>
							<a href="/api/properties" class="btn btn-primary">
								API Docs →
							</a>
						</div>
					</div>
				</div>
				<div class="col-md-4">
					<div class="card h-100">
						<div class="card-body">
							<h3 class="h5 card-title">🎨 Styling Guide</h3>
							<p class="card-text">
								Customize the appearance with CSS variables, <code>--ms-rem</code> scaling and the base-icon contract.
							</p>
							<a href="/features/theming" class="btn btn-primary">
								Theming →
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</DocLayout>
