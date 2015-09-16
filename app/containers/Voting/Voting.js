import React, {Component, PropTypes} from 'react';
import { VotingControls, AnswersNav, Answer} from 'components';

export default class Voting extends Component {
  static propTypes = {
    answers: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
  }

  render() {
    const answers = this.props.answers.map(function renderAnswer(answer) {
      return <Answer id={answer.id} text="answer.text"/>;
    });
    return (
      <div>
        <h2>Самоубийство</h2>
        <h3>Может ли человек добровольно лишить себя жизни?</h3>
        <VotingControls/>
        <AnswersNav/>
        {answers}
        <Answer id="1" text="Совершая самоубийство, человек делает нечто необратимое. Это та крайняя мера, которая всегда остается как последний аргумент. Человек вправе решить уйти из жизни, если сочтёт что его миссия и его роль закончены. Человек – это центр своей собственной вселенной, поэтому он вправе выбирать, как жить и как умереть, если у него есть возможность сделать свой выбор. Выбор смерти заслуживает уважения (если конечно речь не идёт о истеричке, хотевшей напугать маму)."/>
      </div>
    );
  }
}
