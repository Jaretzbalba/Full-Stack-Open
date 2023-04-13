import { useState } from 'react';

const Title = ({ title }) => <h1>{title}</h1>;

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>;

const Anecdotes = ({ anecdote, votes }) => {
  return (
    <>
      <p>{anecdote}</p>
      <p>has {votes} votes</p>
    </>
  );
};

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.',
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Uint8Array(anecdotes.length));

  const handleNext = () => {
    let randomNum = Math.floor(Math.random() * 8);
    setSelected(randomNum);
  };

  const handleVote = () => {
    const copy = [...votes];
    copy[selected] += 1;
    setVotes(copy);
  };

  const mostVotedAnecdote = votes.indexOf(Math.max(...votes));

  return (
    <>
      <div>
        <Title title={'Anecdote of the day'} />
        <Anecdotes
          anecdote={anecdotes[selected]}
          votes={votes[selected]}
        />
        <Button
          handleClick={handleVote}
          text={'vote'}
        />
        <Button
          handleClick={handleNext}
          text={'next anecdote'}
        />
      </div>
      <div>
        <Title title={'Anecdote with most votes'} />
        <Anecdotes
          anecdote={anecdotes[mostVotedAnecdote]}
          votes={Math.max(...votes)}
        />
      </div>
    </>
  );
};

export default App;
