import React from 'react';
import './index.scss';

const questions = [
  {
    title: 'React - это ... ?',
    variants: ['библиотека', 'фреймворк', 'приложение'],
    correct: 0,
  },
  {
    title: 'Компонент - это ... ',
    variants: ['приложение', 'часть приложения или страницы', 'то, что я не знаю что такое'],
    correct: 1,
  },
  {
    title: 'Что такое JSX?',
    variants: [
      'Это простой HTML',
      'Это функция',
      'Это тот же HTML, но с возможностью выполнять JS-код',
    ],
    correct: 2,
  },
  {
    title: "Какой метод используется для обновления состояния в компоненте React?",
    variants: [
      'this.setState()',
      'this.updateState()',
      'this.changeState()',
    ],
    correct: 0,
  },
  {
    title: "Какой из следующих методов жизненного цикла вызывается перед тем, как компонент будет удален из DOM?",
    variants: [
      'componentDidMount',
      'componentWillUnmount',
      'componentDidUpdate'

    ],
    correct: 1,
  },
  {
    title: "Какой оператор используется для деструктуризации объектов в JavaScript?",
    variants: [
      '?',
      ':',
      '...'

    ],
    correct: 2,
  },
  {
    title: "Какой метод массива используется для добавления элемента в конец массива?" ,
    variants: [
      'push()',
      'add()',
      'append()'

    ],
    correct: 0,
  },
  {
    title: "Какой из следующих типов данных не является примитивным в JavaScript?",
    variants: [
      'String',
      'Number',
      'Object'

    ],
    correct: 2,
  }
];

function Result({correct}) {
  return (
    <div className="result">
      <img src="https://img.freepik.com/free-vector/party-popper_78370-557.jpg" />
      <h2>Вы отгадали {correct} ответа из {questions.length}</h2>
      <a href="/">
      <button>Попробовать снова</button>
      </a>
    </div>
  );
}

function Game({ step, question, onClickVariant,}) {
  const percentage = Math.round((step / questions.length) * 100);
 
  return (
    <>
      <div className="progress">
        <div style={{ width: `${percentage}%` }} className="progress__inner"></div>
      </div>
      <h1>{question.title}</h1>
      <ul>
        {
          question.variants.map((text, index) => <li 
          onClick={() => onClickVariant(index)}
          key={index}>{text}</li>)
        }
        </ul>
    </>
  );
}

function App() {
  const [step, setStep] = React.useState(0);
  const [correct, setCorrect] = React.useState(0);
  const question = questions[step];

  const onClickVariant = (index) => {
      setStep(step + 1);

    if (index === question.correct) {
        setCorrect(correct + 1);
    } 
  }

 
  return (
    <div className="App">
      {
        step !== questions.length ?  (<Game step={step} question={question} onClickVariant={onClickVariant}/>
        ) : (
        <Result correct={correct}/>
      )}
        
    </div>
  );
}

export default App;