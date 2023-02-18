import React from 'react';
import { useEffect, useState } from 'react';
import { Section } from './section/Section.js';
import { FeedbackOptions } from './feedback/FeedbackOptions.js';
import { Statistics } from './statistics/Statistics.js';
export const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const stateKeys = Array.of('good', 'neutral', 'bad');
  const stateKeysValues = Array.of(good, neutral, bad);
  const stateMethods = Array.of(setGood, setNeutral, setBad);

  const updateStats = evt => {
    const rating = evt.target.id;
    const ratingIndex = stateKeys.findIndex(key => key === rating);
    //zmiana stanu
    stateMethods[ratingIndex](stateKeysValues[ratingIndex] + 1);
  };

  const countTotalFeedback = () => {
    const totalRatingAmount = stateKeysValues.reduce((total, value) => {
      return total + value;
    }, 0);
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
  useEffect(() => {
    console.log('some rating has been changed', good, neutral, bad);
  }, [good, neutral, bad]);
  return (
    <div>
      <Section title="Please leave feedback">
        {stateKeys.map(key => (
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
