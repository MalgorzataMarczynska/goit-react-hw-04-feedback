import React from 'react';
import { useEffect, useState } from 'react';
import { Section } from './section/Section.js';
import { FeedbackOptions } from './feedback/FeedbackOptions.js';
import { Statistics } from './statistics/Statistics.js';
export const App = () => {
  const [state, setState] = useState({ good: 0, neutral: 0, bad: 0 });
  const { good, neutral, bad } = state;
  const updateStats = evt => {
    const key = evt.target.id;
    setState(prevState => ({
      ...prevState,
      [key]: Number(prevState[key] + 1),
    }));
  };

  const countTotalFeedback = () => {
    const totalRatingAmount = Object.values(state).reduce(
      (total, value) => (total += value)
    );
    return Number(totalRatingAmount);
  };
  const countPositiveFeedbackPercentage = () => {
    const totalRatingAmount = countTotalFeedback();
    if (totalRatingAmount > 0) {
      const positiveFeedback = Number(good / totalRatingAmount) * 100;
      return Math.round(positiveFeedback);
    }
    return;
  };
  //lub  const total = good + neutral + bad;

  // const countPositiveFeedbackPercentage =
  //   total > 0 ? Math.round((good / total) * 100) : 0;
  useEffect(() => {
    console.log('some rating has been changed', good, neutral, bad);
  }, [good, neutral, bad]);
  return (
    <div>
      <Section title="Please leave feedback">
        {Object.keys(state).map(key => (
          <FeedbackOptions
            option={key}
            key={key}
            onLeaveFeedback={updateStats}
          />
        ))}
      </Section>
      <Section title="Statistics">
        <Statistics
          good={good}
          neutral={neutral}
          bad={bad}
          total={countTotalFeedback()}
          positivePercentage={countPositiveFeedbackPercentage()}
        ></Statistics>
      </Section>
    </div>
  );
};
