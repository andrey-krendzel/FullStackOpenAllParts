import React from 'react';
import logo from './logo.svg';
import './App.css';

const Header = ({ courseName }: { courseName: string }) => {
  return(
  <h1>{courseName}</h1>)
};

const Part = ({ name, exerciseCount }:{ name: string, exerciseCount: number }) => {
  return(
    <p>{name} {exerciseCount}</p>
  )
};

const Total = ({total}: {total: number}) => (
  
    <p>Number of exercises {total}</p>
  )
;

const App = () => {
  const courseName = "Half Stack application development";

  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  return (
    <div>
      <Header courseName={courseName} />
      <Part name={courseParts[0].name} exerciseCount={courseParts[0].exerciseCount} />
      <Part name={courseParts[1].name} exerciseCount={courseParts[1].exerciseCount} />
      <Part name={courseParts[2].name} exerciseCount={courseParts[2].exerciseCount} />
      <Total total={courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)} />

    </div>
  );
};

export default App;
