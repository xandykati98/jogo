import { createId, richText } from '$lib';
import { decisions, gameState } from '../stores/game';
import type { Decision } from '../stores/types';

export const timedDecisions: {
	[day: number]: Decision[];
} = {
	1: [
		{
			id: 1,
			text: 'Você herdou essa taverna, sua tarefa agora é gerenciá-la o melhor possível. Boa sorte!',
			title: 'Bem-vindo!',
			image: 'teste',
			right: {
				text: 'Vamos lá!',
				effect: {
					description: richText('Você começa a trabalhar na taverna. Ganha **100** de Ouro.'),
					activate: () => {
						gameState.gold.incrementTotal(100);
					}
				}
			},
			left: {
				text: 'Ignorar',
				effect: {
					description: richText('Você ignorou a taverna e foi embora.'),
					activate: () => {
						gameState.logs.add({
							message: 'Você ignorou a taverna e foi embora.',
							type: 'info'
						});
					}
				}
			}
		},
		{
			id: 2,
			text: richText(
				'Você encontrou um livro mágico, ele pode te ajudar a melhorar sua taverna com magias.'
			),
			title: 'Livro mágico',
			image: 'book',
			right: {
				text: 'Pegar',
				effect: {
					description: richText('Você pegou o livro mágico.'),
					activate: () => {
						gameState.logs.add({
							message: richText(
								'Para melhorar sua taverna com magias clique no ícone de livro mágico na barra de ações na esquerda.'
							),
							type: 'magic'
						});
					}
				}
			},
			left: {
				text: 'Ignorar',
				effect: {
					description: richText('Você ignorou o livro mágico.'),
					activate: () => {
						gameState.logs.add({
							message: 'Você ignorou o livro mágico. Mas ele continua disponível na taverna.',
							type: 'info'
						});
					}
				}
			}
		}
	]
};

export const createTimedDecision = (day: number, decision: Decision) => {
	timedDecisions[day] = [...(timedDecisions[day] || []), decision];
};
