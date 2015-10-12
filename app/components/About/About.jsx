import React, {Component, PropTypes} from 'react';

export default class About extends Component {
  static propTypes = {
    question: PropTypes.object.isRequired,
  }

  render() {
    return (
      <div className='About marginTop-double'>
        <div className='row'>
          <div className='medium-10 medium-offset-1 large-8 large-offset-2 columns fixed-width'>
            <h1 className='marginVertical-double mdl-typography--display-1-color-contrast'>О проекте</h1>
            <h2 className='marginTop-double marginBottom-single mdl-typography--headline-color-contrast'>Как это работает</h2>
            <p className='mdl-typography--body-1-color-contrast'>Аутентичные представители различных духовных движений коротко отвечают на жизненно важные вопросы, раскрывая специфику своих взглядов на мир.</p>
            <p className='mdl-typography--body-1-color-contrast'>Вы выбираете ответ вслепую, не зная, к какому именно мировоззрению, движению, течению относится его автор. Только сделав выбор, вы узнаёте, что вы выбрали.</p>

            <h2 className='marginTop-double marginBottom-single mdl-typography--headline-color-contrast'>Идеология проекта</h2>
            <p className='mdl-typography--body-1-color-contrast'>«Изм.» является идеологически нейтральным проектом. Он не ассоциируется ни с одним духовным или идеологическим движением, не ангажирован им и не контролируется им.</p>

            <h2 className='marginTop-double marginBottom-single mdl-typography--headline-color-contrast'>Команда</h2>
            <p className='mdl-typography--title marginTop-double marginBottom-single'>Автор идеи</p>
            <p className='mdl-typography--body-1-color-contrast'><strong>Тихонравов Юрий Владимирович</strong>, кандидат философских наук, директор Центра изучения и развития межкультурных отношений.</p>

            <p className='mdl-typography--title marginTop-double marginBottom-single'>Координатор проекта</p>
            <p className='mdl-typography--body-1-color-contrast'><strong>Щербак Сергей Викторович</strong>, религиовед, культуролог, преподаватель, автор исследований по вопросам современной религиозности.</p>

            <p className='mdl-typography--title marginTop-double marginBottom-single'>Консультанты проекта</p>

            <p className='mdl-typography--body-1-color-contrast'><strong>Иваненко Сергей Игоревич</strong>, российский религиовед, доктор философских наук, автор многочисленных монографий и публикаций по религиоведению.</p>

            <p className='mdl-typography--body-1-color-contrast'><strong>Пчелинцев Анатолий Васильевич</strong>, российский правовед, доктор юридических наук, профессор, главный редактор журнала «Религия и право».</p>

            <p className='mdl-typography--body-1-color-contrast'><strong>Себенцов Андрей Евгеньевич</strong>, российский религиовед, кандидат философских наук, действительный государственный советник Российской Федерации первого класса.</p>
          </div>
        </div>
      </div>
    );
  }
}

