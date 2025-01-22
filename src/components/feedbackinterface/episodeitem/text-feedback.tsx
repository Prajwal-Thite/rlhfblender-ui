
import React, { useMemo, useCallback, useState } from 'react';
import { Box, TextField, useTheme, IconButton, Tooltip, Typography, Grid  } from '@mui/material';
import { Feedback, FeedbackType } from '../../../types';
import { EpisodeFromID } from '../../../id';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

interface TextFeedbackProps {
    showTextFeedback: boolean;
    scheduleFeedback: (feedback: Feedback) => void;
    episodeId: string;
    sessionId: string;
    hasTextFeedback?: boolean;
  // value: string;
}

const TextFeedback: React.FC<TextFeedbackProps> = ({ showTextFeedback, scheduleFeedback, episodeId, sessionId, hasTextFeedback }) => {
  //const [feedback, setFeedback] = useState('');
  const theme = useTheme();
  const [text, setText] = useState('');

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setText(event.target.value);
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
      Welcome to our project! Your feedback plays a vital role in improving the performance of our AI football agents <strong style={{ color: '#FFD700' }}>(Yellow Team)</strong>. To ensure that your feedback is clear and actionable, please follow the guidelines below.
    </Typography>

    {[
      {
        icon: '🤖',
        title: "1. Agent Reference Guide",
        content: [
          "When providing feedback, always refer to the agent explicitly. For example:",
          "• \"The agent should improve its passing.\"",
          "• \"The agent should focus on maintaining better defensive positioning.\"",
          "• \"The agent's decision to shoot was effective.\""
        ],
        color: '#2196F3'
      },
      {
        icon: '📊',
        title: "2. Performance Analysis",
        content: [
          "You can comment on whether the agent's actions were good or bad. If you believe an action was suboptimal, suggest specific improvements. For example:",
          "• \"The agent's pass was well-executed but could be more frequent in similar situations.\"",
          "• \"The agent should avoid idle time and focus on running to better positions.\"",
          "• \"Instead of a short pass, the agent should consider a high pass when crossing.\""
        ],
        color: '#4CAF50'
      },
      {
        icon: '⚽',
        title: "3. Action-Specific Feedback",
        content: [
          "You can refer to specific actions from the list below when giving feedback on the agent’s performance:",
          "• Movement: Run (8 directions), Sprint",
          "• Ball Control: Short/High/Long pass, Shot, Dribble",
          "• Defense: Sliding, Positioning",
          "• Special: Idle, Release sprint/dribble",
          "For example:",
          "• \"The agent should use short passes more often when under pressure.\"",
          "• \"The agent should sprint less to conserve stamina for the second half.\"",
          "• \"The agent’s dribbling needs improvement when moving toward the goal.\""
        ],
        color: '#FF9800'
      },
      {
        icon: '⚔️',
        title: "4. Tactical Insights",
        content: [
          "You can also provide broader tactical feedback about the agent’s positioning or strategy:",
          "• \"Improve defensive positioning for better opponent coverage.\"",
          "• \"The agent should prioritize attacking positions when the team is trailing.\"",
          "• \"Maintain formation structure during transitions\""
        ],
        color: '#9C27B0'
      },
      {
        icon: '🎯',
        title: "5. Mission Suggestions",
        content: [
          "To help the agent understand goals that lead to positive results, you can provide mission-based feedback. Missions are specific objectives that guide the agent’s performance. Set clear objectives:",
          "• \"Score a goal in the second half\"",
          "• \"Intercept passes in defensive half\"",
          "• \"Complete three successful high passes\""
        ],
        color: '#E91E63'
      },
      {
        icon: '💡',
        title: "6. Constructive Communication",
        content: [
          "Ensure your feedback is actionable and easy to understand. Avoid vague statements and focus on specific actions or strategies that can help the agent improve:",
          "• Instead of: \"The agent was bad.\"",
          "• Say: \"The agent should improve passing accuracy and possession.\"",
          "• Provide specific, measurable improvements."
        ],
        color: '#00BCD4'
      }      
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
