// Live code-snippet generation for the interactive demo harness.
// svelte-docs ships no reactive code-block, so we derive the snippet ourselves
// from the current control config and feed the string to <CodeBlock>.

export type ControlType = 'toggle' | 'select' | 'number' | 'text';

export interface SelectOption {
	value: string;
	label: string;
}

export interface ControlDef {
	/** Config key (also the property name on the config object). */
	key: string;
	/** Human label shown next to the control. */
	label: string;
	type: ControlType;
	/** HTML attribute name to reflect onto the element. Defaults to kebab-case of `key`. */
	attr?: string;
	/** Default value. When the live value equals this, the attribute is omitted (keeps snippets minimal). */
	default: string | number | boolean;
	/** Options for `select` controls. */
	options?: SelectOption[];
	/** Optional min/max/step for `number` controls. */
	min?: number;
	max?: number;
	step?: number;
	/** Optional short hint rendered under the control. */
	hint?: string;
}

export type DemoConfig = Record<string, string | number | boolean>;

export function toKebab(key: string): string {
	return key.replace(/[A-Z]/g, (m) => '-' + m.toLowerCase());
}

/** True when the value should be treated as "not set" (default / empty). */
export function isDefault(def: ControlDef, value: unknown): boolean {
	return value === def.default || value === '' || value === undefined || value === null;
}

export interface SnippetOptions {
	tag?: string;
	/** Attributes always shown in the snippet (and applied to the element declaratively). */
	baseAttrs?: Record<string, string>;
	/** Extra JS/HTML appended after the element (e.g. options assignment, callbacks). */
	trailer?: string;
	/** Indent used between attributes. */
	indent?: string;
}

/**
 * Build an HTML snippet reflecting the current config.
 * Base attributes are always included; control attributes are included only
 * when they differ from their default.
 */
export function configToSnippet(
	controls: ControlDef[],
	config: DemoConfig,
	opts: SnippetOptions = {}
): string {
	const tag = opts.tag ?? 'web-multiselect';
	const indent = opts.indent ?? '  ';
	const attrs: string[] = [];

	for (const [name, value] of Object.entries(opts.baseAttrs ?? {})) {
		attrs.push(`${name}="${value}"`);
	}

	for (const def of controls) {
		const value = config[def.key];
		if (isDefault(def, value)) continue;
		const attr = def.attr ?? toKebab(def.key);
		attrs.push(`${attr}="${value}"`);
	}

	const body =
		attrs.length === 0
			? `<${tag}></${tag}>`
			: `<${tag}\n${attrs.map((a) => indent + a).join('\n')}\n></${tag}>`;

	return opts.trailer ? `${body}\n\n${opts.trailer}` : body;
}
