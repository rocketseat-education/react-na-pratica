export function getSlugFromString(input: string): string {
	return input
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.toLowerCase()
		.replace(/[^\w\s]/g, '')
		.replace(/\s+/g, '-')
}
