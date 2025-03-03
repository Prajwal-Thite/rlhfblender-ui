
import React, { useMemo, useCallback, useState } from 'react';
import { Box, TextField, useTheme, IconButton, Tooltip, Typography, Grid  } from '@mui/material';
import { Feedback, FeedbackType } from '../../../types';
import { EpisodeFromID } from '../../../id';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { debounce } from 'lodash';

interface TextFeedbackProps {
    showTextFeedback: boolean;
    scheduleFeedback: (feedback: Feedback) => void;
    episodeId: string;
    sessionId: string;
    hasTextFeedback?: boolean;
    onFeedbackChange: (hasText: boolean) => void;
  // value: string;
}

const TextFeedback: React.FC<TextFeedbackProps> = ({ showTextFeedback, scheduleFeedback, episodeId, sessionId, hasTextFeedback, onFeedbackChange }) => {
  //const [feedback, setFeedback] = useState('');
  const theme = useTheme();
  const [text, setText] = useState('');

  const debouncedFeedbackChange = useCallback(
    debounce((value: string) => {
      onFeedbackChange(value.trim().length > 0);
    }, 100),
    [onFeedbackChange]
  );

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newText = event.target.value;
    setText(newText);
    debouncedFeedbackChange(newText);
  };

  const handleSubmit = useCallback(() => {
    if (text.trim()) {
      const feedback = {
        feedback_type: FeedbackType.Text,
        targets: [{
          target_id: episodeId,
          reference: EpisodeFromID(episodeId || ''),
          origin: 'offline',
          timestamp: Date.now(),
        }],
        granularity: 'episode' as const,
        timestamp: Date.now(),
        session_id: sessionId,
        text_feedback: text.trim(),
      };
      scheduleFeedback(feedback);
    }
  }, [text, episodeId, sessionId, scheduleFeedback]);
  
  return (
    <>
    <Box
      component="form"    
      sx={{
        display: 'flex',
        alignItems: 'center',
        borderRadius: '10px',
        backgroundColor: theme.palette.background.l0,
        border: hasTextFeedback
          ? `1px solid ${theme.palette.primary.main}`
          : `1px solid ${theme.palette.divider}`,
        boxShadow: hasTextFeedback
          ? `0px 0px 20px 0px ${theme.palette.primary.main}`
          : 'none',
        overflow: 'hidden',
        gridArea: 'mission',
        margin: '10px',
        width: 'auto',
        position: 'relative'
      }}
    >
      <Tooltip 
        title={instructionsText} 
        placement="left-start"
        PopperProps={{
          sx: {
            '& .MuiTooltip-tooltip': {
              height: '600px',              
              maxWidth: '1000px',
              overflow: 'auto'
            }
          }
        }}
      >
        <IconButton 
          sx={{ 
            position: 'absolute',
            right: 8,
            top: 8,
            zIndex: 1
          }}
        >
          <HelpOutlineIcon />
        </IconButton>
      </Tooltip>
      <TextField        
        onChange={handleTextChange}
        onBlur={handleSubmit}
        value={text}
        placeholder="Enter your feedback here..."
        multiline
        rows={4}
        fullWidth
        variant="outlined"
      />
    </Box>
  </>
  );
};

const instructionsText = (
  <Box sx={{ 
    p: 4, 
    bgcolor: 'background.paper', 
    overflow: 'auto',
    borderRadius: 2,
    boxShadow: 'inset 0 0 15px rgba(0,0,0,0.1)'
  }}>
    <Typography variant="h4" sx={{ 
      mb: 4, 
      background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      textAlign: 'center', 
      fontWeight: 'bold',
      textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
    }}>
      🎮 Master Guide: Text Feedback for AI Football Agents
    </Typography>

    <Typography variant="h6" sx={{ 
      mb: 3, 
      color: 'text.secondary',
      textAlign: 'center',
      fontStyle: 'italic'
    }}>
      Welcome to our project! Your feedback plays a vital role in improving the performance of our AI football agents <strong style={{ color: '#FFD700' }}>(Yellow Team)</strong>. Here are some examples of clear and specific feedback that helps improve our AI football agents.
    </Typography>

    {[
      {
        icon: '🤖',
        title: "1. Feedback Examples",
        content: [
          "•\"The agent received the ball near the penalty area but hesitated before passing, allowing the defender to close the gap. A quicker decision would have preserved the attacking momentum and created a better scoring opportunity.\"",
          "• \"When pressing high, the agent frequently sprinted toward the ball without considering defensive cover. Instead, it should balance its positioning to prevent the opponent from easily bypassing the press.\"",
          "• \"During a counterattack, the agent opted for a short pass despite having an open teammate further up the field. In this scenario, a high pass would have been more effective in quickly transitioning to an attacking position.\"",
          "• \"The agent attempted to dribble past two defenders but lost possession in a dangerous area. A safer option would have been to pass to a nearby teammate and reposition instead of forcing the dribble.\"",
          "• \"Compared to the previous episode, the agent demonstrated improved passing accuracy but still struggles with defensive positioning. It should focus on maintaining a structured formation to avoid leaving gaps at the back.\""
        ],
        color: '#2196F3'
      },      
    
    ].map((section, index) => (
      <Box key={index} sx={{ 
        mb: 4,
        p: 2,
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'divider',
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          transform: 'translateY(-2px)',
          borderColor: section.color
        }
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Typography variant="h2" sx={{ mr: 2, fontSize: '2rem' }}>
            {section.icon}
          </Typography>
          <Typography variant="h6" sx={{ 
            color: section.color,
            fontWeight: 'bold'
          }}>
            {section.title}
          </Typography>
        </Box>
        {section.content.map((text, i) => (
          <Typography key={i} variant="body1" sx={{ 
            color: 'text.secondary',
            ml: text.startsWith('•') ? 3 : 0,
            mb: 1,
            pl: text.startsWith('•') ? 2 : 0,
            borderLeft: text.startsWith('•') ? `3px solid ${section.color}` : 'none',
            transition: 'all 0.2s ease',
            '&:hover': {
              color: 'text.primary'
            }
          }}>
            {text}
          </Typography>
        ))}
      </Box>
    ))}

    <Box sx={{ 
      mt: 4, 
      p: 3, 
      background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
      borderRadius: 3,
      boxShadow: '0 4px 20px rgba(33,150,243,0.2)'
    }}>
      <Typography variant="h6" sx={{ 
        color: 'white', 
        textAlign: 'center',
        textShadow: '1px 1px 2px rgba(0,0,0,0.2)'
      }}>
        💡 Your time and expertise drives AI evolution in football!
      </Typography>
    </Box>
  </Box>
);

export { instructionsText };
export default TextFeedback;
