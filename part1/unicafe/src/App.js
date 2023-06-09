import { useState } from 'react';

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>;

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  const average = Math.round(((good - bad) / total + Number.EPSILON) * 100) / 100;
  const percentage = Math.round(((good / total) * 100 + Number.EPSILON) * 100) / 100;

  return total === 0 ? (
    <p>No feedback given</p>
  ) : (
    <table>
      <tbody>
        <StatisticLine
          text={'good'}
          value={good}
        />
        <StatisticLine
          text={'neutral'}
          value={neutral}
        />
        <StatisticLine
          text={'bad'}
          value={bad}
        />
        <StatisticLine
          text={'all'}
          value={total}
        />
        <StatisticLine
          text={'average'}
          value={average}
        />
        <StatisticLine
          text={'positive'}
          value={percentage + ' %'}
        />
      </tbody>
    </table>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodClick = () => {
    setGood(good + 1);
  };

  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
  };

  const handleBadClick = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <h2>give feedback</h2>
      <Button
        handleClick={handleGoodClick}
        text='good'
      />
      <Button
        handleClick={handleNeutralClick}
        text='neutral'
      />
      <Button
        handleClick={handleBadClick}
        text='bad'
      />
      <h2>statistics</h2>
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
      />
    </div>
  );
};

export default App;
