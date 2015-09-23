# Enculturation

### Client state spec

```
{
	questions: [
		{
			id: 1,
			title: "Самубийство",
			subtitle: "Позволительно ли человеку лишать себя жизни?",
		}
	],
	voting: [
		activeAnswer: 0,
		votedAnswer: null,
		answers: [
			{
				id: 1,
				questionId: 1,
				worldviewId: 1,
				authorName: 'Вася',
				authorTitle: 'Доктор наук',
				quizText: 'Текст ответа на вопрос',
				fullVideo: 'https://vimeo.com/',
				fullText: 'Расшифровка видео ответа',
				votesCount: 123,
			}
		],
	],
	worldviews: [
		{
			id: 1,
			title: 'Буддизм',
		}
	],
	router: {},
}
```
