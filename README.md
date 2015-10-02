# Enculturation

### Client state spec

```
{
	voting: {
		questions: [
			{
				id: 1,
				title: "Самубийство",
				subtitle: "Позволительно ли человеку лишать себя жизни?",
				answers: [
					{
						id: 1,
						worldviewId: 1,
						authorName: 'Вася',
						authorTitle: 'Доктор наук',
						quizText: 'Текст ответа на вопрос',
						fullVideo: 'https://vimeo.com/',
						fullText: 'Расшифровка видео ответа',
						votesCount: 123,
						isLiked: true || false || null,
					}
				],
				activeAnswer: 0,
				votedAnswer: null,
			},
		],
		activeQuestion: 0,
	},
	worldviews: [
		{
			id: 1,
			title: 'Буддизм',
		}
	],
	router: {},
}
```
