//source: http://stackoverflow.com/a/14794066
export function isInt(value) {
	return !isNaN(value) && parseInt(Number(value)) == value && !isNaN(parseInt(value, 10));
}