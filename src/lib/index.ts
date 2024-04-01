// place files you want to import through the `$lib` alias in this folder.
export const calcProgress = (current: number, total: number) => {
	return (current / total) * 100;
};
export function getRandomInt(max: number) {
	return Math.floor(Math.random() * max);
}
export function createLogId() {
	return Date.now() + getRandomInt(1000);
}
