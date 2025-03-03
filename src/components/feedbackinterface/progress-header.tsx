import React, { useState } from 'react';
import { Box, Typography, Button, CircularProgress } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Send from '@mui/icons-material/Send';
import Progressbar from './progressbar';

interface ProgressHeaderProps {
  showProgressBar: boolean;
  numEpisodes: number;
  currentStep: number;
  maxRankingElements: number;
  onSubmit: () => void;
  onSubmitHover: (isHovering: boolean) => void;
  isSubmitDisabled: boolean;
}

export const ProgressHeader: React.FC<ProgressHeaderProps> = ({
  showProgressBar,
  numEpisodes,
  currentStep,
  maxRankingElements,
  onSubmit,
  onSubmitHover,
  isSubmitDisabled,
}) => {
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    await onSubmit();
    setIsLoading(false);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', backgroundColor: theme.palette.background.l1, justifyContent: 'flex-end' }}>
      {showProgressBar && (
        <Box
          id="progress-bar"
          sx={{
            display: 'flex',
            flex: 1,
            boxSizing: 'border-box',
            backgroundColor: theme.palette.background.l1,
            padding: 0.5,
          }}
        >
          <Typography
            sx={{
              color: theme.palette.text.secondary,
              m: 0.5,
              minWidth: '10vw',
            }}
          >
            Experiment Progress:
          </Typography>
          <Progressbar
            maxSteps={Math.ceil(numEpisodes / maxRankingElements) ?? 1}
            currentStep={currentStep}
          />
        </Box>
      )}
      <Box sx={{ p: 1, backgroundColor: theme.palette.background.l1 }}>
        <Button
          variant="contained"
          endIcon={isLoading ? <CircularProgress size={20} color="inherit" /> :<Send />}
          // endIcon={<Send />}
          onClick={handleSubmit}
          // onClick={onSubmit}          
          onMouseEnter={() => onSubmitHover(true)}
          onMouseLeave={() => onSubmitHover(false)}
          disabled={isLoading || isSubmitDisabled}
        >
          {isLoading ? 'Submitting...' : 'Submit Feedback'}
          {/* Submit Feedback           */}
        </Button>
      </Box>
    </Box>
  );
};
