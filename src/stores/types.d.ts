import { type createResource } from './game';

interface Log {
	id: number;
	message: string;
	type: 'info' | 'warning';
	day: number;
	time: Date;
}

export type GameStateType = {
	gold: ReturnType<typeof createResource>;
	food: ReturnType<typeof createResource>;
	logs: Log[];
	interface: {
		isMagicTreeOpen: ReturnType<typeof createBoolean>;
	};
};
