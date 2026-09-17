// Reusable sample datasets for showcase demos.

export interface TechOption {
	value: string;
	label: string;
	icon?: string;
	subtitle?: string;
	group?: string;
}

export const technologies: TechOption[] = [
	{ value: 'html', label: 'HTML', icon: '📄', subtitle: 'Markup', group: 'Languages' },
	{ value: 'css', label: 'CSS', icon: '🎨', subtitle: 'Styling', group: 'Languages' },
	{ value: 'js', label: 'JavaScript', icon: '🟨', subtitle: 'Scripting', group: 'Languages' },
	{ value: 'ts', label: 'TypeScript', icon: '🔷', subtitle: 'Typed JS', group: 'Languages' },
	{ value: 'react', label: 'React', icon: '⚛️', subtitle: 'UI library', group: 'Frameworks' },
	{ value: 'vue', label: 'Vue', icon: '💚', subtitle: 'Progressive framework', group: 'Frameworks' },
	{ value: 'svelte', label: 'Svelte', icon: '🧡', subtitle: 'Compiler', group: 'Frameworks' },
	{ value: 'angular', label: 'Angular', icon: '🅰️', subtitle: 'Platform', group: 'Frameworks' },
	{ value: 'node', label: 'Node.js', icon: '🟢', subtitle: 'Runtime', group: 'Runtime' },
	{ value: 'deno', label: 'Deno', icon: '🦕', subtitle: 'Secure runtime', group: 'Runtime' },
	{ value: 'bun', label: 'Bun', icon: '🥟', subtitle: 'Fast runtime', group: 'Runtime' }
];

export interface CountryOption {
	code: string;
	name: string;
	flag: string;
}

export const countries: CountryOption[] = [
	{ code: 'us', name: 'United States', flag: '🇺🇸' },
	{ code: 'gb', name: 'United Kingdom', flag: '🇬🇧' },
	{ code: 'de', name: 'Germany', flag: '🇩🇪' },
	{ code: 'fr', name: 'France', flag: '🇫🇷' },
	{ code: 'es', name: 'Spain', flag: '🇪🇸' },
	{ code: 'it', name: 'Italy', flag: '🇮🇹' },
	{ code: 'cz', name: 'Czechia', flag: '🇨🇿' },
	{ code: 'pl', name: 'Poland', flag: '🇵🇱' },
	{ code: 'jp', name: 'Japan', flag: '🇯🇵' },
	{ code: 'br', name: 'Brazil', flag: '🇧🇷' },
	{ code: 'in', name: 'India', flag: '🇮🇳' },
	{ code: 'au', name: 'Australia', flag: '🇦🇺' }
];

// Materialized-path tree (fruit / vegetable classification).
export interface TreeOption {
	path: string;
	name: string;
	full: string;
}

export const foodTree: TreeOption[] = [
	{ path: '1', name: 'Fruit', full: 'Fruit' },
	{ path: '1.1', name: 'Pome', full: 'Fruit / Pome' },
	{ path: '1.1.1', name: 'Apple', full: 'Fruit / Pome / Apple' },
	{ path: '1.1.2', name: 'Pear', full: 'Fruit / Pome / Pear' },
	{ path: '1.2', name: 'Citrus', full: 'Fruit / Citrus' },
	{ path: '1.2.1', name: 'Orange', full: 'Fruit / Citrus / Orange' },
	{ path: '1.2.2', name: 'Lemon', full: 'Fruit / Citrus / Lemon' },
	{ path: '2', name: 'Vegetable', full: 'Vegetable' },
	{ path: '2.1', name: 'Leafy', full: 'Vegetable / Leafy' },
	{ path: '2.1.1', name: 'Kale', full: 'Vegetable / Leafy / Kale' },
	{ path: '2.1.2', name: 'Spinach', full: 'Vegetable / Leafy / Spinach' },
	{ path: '2.2', name: 'Root', full: 'Vegetable / Root' },
	{ path: '2.2.1', name: 'Carrot', full: 'Vegetable / Root / Carrot' },
	{ path: '2.2.2', name: 'Beet', full: 'Vegetable / Root / Beet' }
];

/** Generate a large flat dataset for virtual-scroll demos. */
export function makeLargeDataset(count = 15000): { value: string; label: string }[] {
	const out: { value: string; label: string }[] = [];
	for (let i = 0; i < count; i++) {
		out.push({ value: `item-${i}`, label: `Item #${i + 1}` });
	}
	return out;
}

export interface RtlOption {
	value: string;
	label: string;
}

export const arabicOptions: RtlOption[] = [
	{ value: 'sa', label: 'المملكة العربية السعودية' },
	{ value: 'eg', label: 'مصر' },
	{ value: 'ae', label: 'الإمارات العربية المتحدة' },
	{ value: 'jo', label: 'الأردن' },
	{ value: 'ma', label: 'المغرب' }
];
