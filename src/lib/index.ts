import type { Rarity } from '../stores/types';

// place files you want to import through the `$lib` alias in this folder.
export const calcProgress = (current: number, total: number) => {
	return (current / total) * 100;
};
export function getRandomInt(max: number) {
	return Math.floor(Math.random() * max);
}
export function createId() {
	return Date.now() + getRandomInt(1000);
}
export const raritiesMap: Record<Rarity, string> = {
	common: 'Comum',
	uncommon: 'Incomum',
	rare: 'Raro',
	epic: 'Épico',
	legendary: 'Lendário'
};
/**
 * @link https://stackoverflow.com/questions/10168285/markdown-to-convert-double-asterisks-to-bold-text-in-javascript
 * @description Transforma texto entre ** em negrito
 * @example richText('**negrito**') => '<strong>negrito</strong>'
 * @example richText('[vermelho](red)') => '<span style="color:red">vermelho</span>'
 */
export function richText(text: string) {
	let bold = /\*\*(.*?)\*\*/gm;
	let html = text.replace(bold, '<strong>$1</strong>');
	let color = /\[(.*?)\]\((.*?)\)/gm;
	html = html.replace(color, '<span style="color:$2">$1</span>');

	return html;
}
