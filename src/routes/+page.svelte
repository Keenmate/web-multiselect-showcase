<script lang="ts">
	import { DocLayout, FeatureCard, CodeBlock } from '@keenmate/svelte-docs';

	const htmlExample = `<web-multiselect
  value-member="id"
  display-value-member="name"
  icon-member="icon"
  search-placeholder="Search items…"
></web-multiselect>

<script>
  const select = document.querySelector('web-multiselect');
  select.options = [
    { id: 1, name: 'JavaScript', icon: '🟨' },
    { id: 2, name: 'TypeScript', icon: '🔷' },
    { id: 3, name: 'Python', icon: '🐍' }
  ];
<\/script>`;

	const advancedExample = `<form>
  <web-multiselect
    name="technologies"
    value-format="json"
    value-member="id"
    display-value-member="name"
    allow-add-new="true"
    show-clear="true"
  ></web-multiselect>
  <button type="submit">Submit</button>
</form>

<script>
  const select = document.querySelector('web-multiselect');
  select.searchCallback = async (term, signal) => {
    const res = await fetch(\`/api/search?q=\${term}\`, { signal });
    return await res.json();
  };
<\/script>`;
</script>

<DocLayout
	titleText="Web MultiSelect Showcase"
	descriptionText="A feature-rich multiselect web component with typeahead search, tree mode, virtual scrolling, and deep theming.">
	<div class="py-1">
		<div class="text-center mb-5">
			<h1 class="display-5 fw-bold mb-3">
				<span class="text-primary">@keenmate/web-multiselect</span>
			</h1>
			<p class="lead mb-4">
				A lightweight, framework-agnostic multiselect web component — typeahead search, tree data,
				virtual scrolling, add-new creation, an imperative API, and extensive CSS-variable theming.
			</p>
			<div class="d-flex gap-3 justify-content-center flex-wrap">
				<a href="/getting-started" class="btn btn-primary btn-lg">🚀 Get Started</a>
				<a href="/features/basic" class="btn btn-outline-primary btn-lg">🎨 Explore Features</a>
				<a href="https://github.com/keenmate/web-multiselect" target="_blank" rel="noreferrer" class="btn btn-outline-dark btn-lg">GitHub</a>
			</div>
		</div>

		<div class="row g-4 mb-5">
			<div class="col-md-6 col-lg-4">
				<FeatureCard iconEmoji="🎯" titleText="Framework Agnostic" variantType="primary"
					descriptionText="A pure Web Component — works with vanilla JS, React, Vue, Angular, Svelte and more."
					linkHref="/getting-started" linkLabel="Get started" />
			</div>
			<div class="col-md-6 col-lg-4">
				<FeatureCard iconEmoji="🔄" titleText="Flexible Data & API" variantType="success"
					descriptionText="Member properties or callbacks for any shape, plus an imperative open/search/scroll-to API."
					linkHref="/features/data-api" linkLabel="Data & API" badgeText="v2.0" badgeVariantType="success" />
			</div>
			<div class="col-md-6 col-lg-4">
				<FeatureCard iconEmoji="🌳" titleText="Tree Mode" variantType="info"
					descriptionText="Materialized-path hierarchies with cascade checkboxes, ancestor-preserving search and breadcrumb badges."
					linkHref="/features/tree" linkLabel="Tree" badgeText="v2.0" badgeVariantType="info" />
			</div>
			<div class="col-md-6 col-lg-4">
				<FeatureCard iconEmoji="➕" titleText="Add-new Creation" variantType="warning"
					descriptionText="Let users create options on the fly with an async, cancelable addNewCallback."
					linkHref="/features/events-callbacks" linkLabel="Events & callbacks" badgeText="v2.0" badgeVariantType="warning" />
			</div>
			<div class="col-md-6 col-lg-4">
				<FeatureCard iconEmoji="⚡" titleText="Virtual Scrolling" variantType="danger"
					descriptionText="Render 15,000+ options smoothly, with a scroll-to API that jumps to any row instantly."
					linkHref="/features/virtual-scrolling" linkLabel="Virtual scrolling" />
			</div>
			<div class="col-md-6 col-lg-4">
				<FeatureCard iconEmoji="🎨" titleText="Deep Theming" variantType="secondary"
					descriptionText="Scale with --ms-rem, reskin glyphs via the base-icon contract, and theme every part with CSS variables."
					linkHref="/features/theming" linkLabel="Theming" />
			</div>
		</div>

		<div class="mt-5">
			<h2 class="mb-4">Example usage</h2>
			<div class="row g-4">
				<div class="col-lg-6">
					<CodeBlock codeContent={htmlExample} languageType="html" titleText="Basic usage" />
				</div>
				<div class="col-lg-6">
					<CodeBlock codeContent={advancedExample} languageType="html" titleText="Form + async search + add-new" />
				</div>
			</div>
		</div>

		<div class="row text-center mt-5 pt-5 border-top">
			<div class="col-6 col-md-3"><h3 class="display-6">🌳</h3><p class="text-muted">Tree mode</p></div>
			<div class="col-6 col-md-3"><h3 class="display-6">⚡</h3><p class="text-muted">Virtual scrolling</p></div>
			<div class="col-6 col-md-3"><h3 class="display-6">📱</h3><p class="text-muted">Responsive & RTL</p></div>
			<div class="col-6 col-md-3"><h3 class="display-6">⌨️</h3><p class="text-muted">Keyboard first</p></div>
		</div>
	</div>
</DocLayout>
