import { useCallback } from 'react';
import axios from 'axios';
import { Feedback } from '../../../types';
import { useAppDispatch } from '../../../AppStateContext';

export const useFeedbackSubmission = (sampleEpisodes: () => Promise<void>) => {
  const dispatch = useAppDispatch();

  const scheduleFeedback = useCallback((feedback: Feedback) => {
    dispatch({ type: 'SCHEDULE_FEEDBACK', payload: feedback });
  }, [dispatch]);

  const submitFeedback = async (scheduledFeedback: Feedback[]) => {
    // Send all feedback simultaneously when Submit button is clicked
    await Promise.all(
      scheduledFeedback.map(feedback => 
        axios.post('/data/give_feedback', feedback)
      )
    );
    
    dispatch({ type: 'CLEAR_SCHEDULED_FEEDBACK' });
    await sampleEpisodes();
  };

  return { scheduleFeedback, submitFeedback };
};







// const submitFeedback = (scheduledFeedback: Feedback[]) => {
//   axios.post('/data/give_feedback', scheduledFeedback)
//     .then(() => {
//       dispatch({ type: 'CLEAR_SCHEDULED_FEEDBACK' });
//       sampleEpisodes();
//     })
//     .catch(error => {
//       console.error('Error submitting feedback:', error);
//     });
// };

