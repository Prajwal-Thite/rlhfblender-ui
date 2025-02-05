// BabyAIInput.tsx

import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import chroma from 'chroma-js';
import { DesignTheme } from '../theme';

const BabyAIInputContainer = styled('div')(({ theme }) => ({
  display: 'grid',
  width: '100%',
  height: '100%',
  gridTemplateRows: '1fr 1fr 1fr 1fr 1fr 1fr',
  gridTemplateColumns: '1fr 1fr 1fr',
  gridTemplateAreas: `
        "left forward right"
        "backward  Shot Idle"
        "Long_pass Short_pass High_pass"
        "Sprint Sprint Sprint"
        "Sliding Sliding Sliding"
        "Dribble Dribble Dribble"
    `,
  gap: theme.spacing(1),
}));

interface StyledBabyAIInputButtonProps {
  theme?: DesignTheme;
  isNextStep?: boolean;
  selected?: boolean;
}

const BabyAIInputButton = styled(Button)<StyledBabyAIInputButtonProps>(
  ({ theme, isNextStep, selected }) => ({
    backgroundColor: selected
      ? chroma.mix(theme.palette.background.l1, theme.palette.primary.main, 0.5).hex()
      : theme.palette.background.l1,
    color: selected
      ? theme.palette.primary.contrastText
      : theme.palette.text.primary,
    border: `1px solid ${theme.palette.divider}`,
    '&:hover': {
      backgroundColor: chroma
        .mix(theme.palette.background.l1, theme.palette.primary.main, 0.7)
        .hex(),
    },
    '&:active': {
      backgroundColor: chroma
        .mix(theme.palette.background.l1, theme.palette.primary.main, 0.85)
        .hex(),
    },
  })
);

export default function BabyAIInput(props: any) {
  const [selectedAction, setSelectedAction] = React.useState<number | null>(null);

  const handleAction = (actionIndex: number) => {
    setSelectedAction(actionIndex);
    props.setFeedback(actionIndex); // Immediately call the feedback action
  };

  return (
    <BabyAIInputContainer>
      <BabyAIInputButton
        selected={selectedAction === 0}
        sx={{ gridArea: 'left' }}
        onClick={() => handleAction(0)}
      >
        Turn Left
      </BabyAIInputButton>
      <BabyAIInputButton
        selected={selectedAction === 2}
        sx={{ gridArea: 'forward' }}
        onClick={() => handleAction(2)}
      >
        Go Forward
      </BabyAIInputButton>
      <BabyAIInputButton
        selected={selectedAction === 1}
        sx={{ gridArea: 'right' }}
        onClick={() => handleAction(1)}
      >
        Turn Right
      </BabyAIInputButton>
      <BabyAIInputButton
        selected={selectedAction === 3}
        sx={{ gridArea: 'backward' }}
        onClick={() => handleAction(3)}
      >
        Backward
      </BabyAIInputButton>
      <BabyAIInputButton
        selected={selectedAction === 4}
        sx={{ gridArea: 'Shot' }}
        onClick={() => handleAction(4)}
      >
        Shot
      </BabyAIInputButton>
      <BabyAIInputButton
        selected={selectedAction === 5}
        sx={{ gridArea: 'Idle' }}
        onClick={() => handleAction(5)}
      >
        Idle
      </BabyAIInputButton>
      <BabyAIInputButton
        selected={selectedAction === 6}
        sx={{ gridArea: 'Long_pass' }}
        onClick={() => handleAction(6)}
      >
        Long Pass
      </BabyAIInputButton>
      <BabyAIInputButton
        selected={selectedAction === 7}
        sx={{ gridArea: 'Short_pass' }}
        onClick={() => handleAction(7)}
      >
        Short Pass
      </BabyAIInputButton>
      <BabyAIInputButton
        selected={selectedAction === 8}
        sx={{ gridArea: 'High_pass' }}
        onClick={() => handleAction(8)}
      >
        High Pass
      </BabyAIInputButton>
      <BabyAIInputButton
        selected={selectedAction === 9}
        sx={{ gridArea: 'Sprint' }}
        onClick={() => handleAction(9)}
      >
        Sprint
      </BabyAIInputButton>
      <BabyAIInputButton
        selected={selectedAction === 10}
        sx={{ gridArea: 'Sliding' }}
        onClick={() => handleAction(10)}
      >
        Sliding
      </BabyAIInputButton>
      <BabyAIInputButton
        selected={selectedAction === 11}
        sx={{ gridArea: 'Dribble' }}
        onClick={() => handleAction(11)}
      >
        Dribble
      </BabyAIInputButton>
    </BabyAIInputContainer>
  );
}
