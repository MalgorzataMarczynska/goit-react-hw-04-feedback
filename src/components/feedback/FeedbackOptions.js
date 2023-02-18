import css from './FeedbackOptions.module.css';
import PropTypes from 'prop-types';

export const FeedbackOptions = ({ option, onLeaveFeedback }) => (
  <button
    id={option}
    className={css.button}
    type="button"
    onClick={onLeaveFeedback}
  >
    {option}
  </button>
);

FeedbackOptions.propTypes = {
  options: PropTypes.string,
  onLeaveFeedback: PropTypes.func,
};
