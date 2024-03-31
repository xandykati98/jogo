import { type createResource } from './game';

interface Log {
    id: number,
    message: string,
    type: 'info' | 'warning',
    day: number,
    time: Date
}

export type GameState = {
    gold: ReturnType<typeof createResource>,
    food: ReturnType<typeof createResource>,
    logs: Log[]
}