import { type createResource, createSpells, createBoolean, createDay, createLogs } from './game';

interface Log {
	id: number;
	message: string;
	type: 'info' | 'warning' | 'end' | 'magic';
	day: number;
	time: Date;
}
export type MagicTreeSpell = {
	id: number;
	tier: number;
	name: string;
	description: string;
	icon: string;
	cost: number;
	progress: number;
	effect: () => void;
};
export type MagicTree = {
	speed: number;
	selected: null | number;
	spells: ReturnType<typeof createSpells>;
};

export type GameStateType = {
	endDay: () => void;
	day: ReturnType<typeof createDay>;
	gold: ReturnType<typeof createResource>;
	food: ReturnType<typeof createResource>;
	/**
	 * @description Velocidade de recuperação dos heróis
	 */
	rally: ReturnType<typeof createResource>;
	logs: ReturnType<typeof createLogs>;
	interface: {
		isMagicTreeOpen: ReturnType<typeof createBoolean>;
	};
};
