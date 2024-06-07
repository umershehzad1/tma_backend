export function generateHandleCollection(handle: string): string {
	return handle.toLowerCase().replace(/ /g, "-");
}
