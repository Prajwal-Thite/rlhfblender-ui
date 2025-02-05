import React, { useState } from 'react';
import { useAppState, useAppDispatch } from '../../AppStateContext';
import { useSetupConfigState } from '../../SetupConfigContext';

// MUI Components
import { 
  Dialog,
  DialogContent,
  Tabs,
  Tab,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Paper,
  List,
  ListItem,
  ListItemText,
  Grid,
  Container
} from '@mui/material';

// Optional: Import icons if you want to add them to the navigation buttons
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import CheckIcon from '@mui/icons-material/Check';

type ExperimentStartModalProps = {
  onClose: () => void;
};

const ExperimentStartModal = ({ onClose }: ExperimentStartModalProps) => {
  const state = useAppState();
  const dispatch = useAppDispatch();
  const setupConfigState = useSetupConfigState();
  const { activeUIConfig } = setupConfigState;
  const [activeTab, setActiveTab] = useState(0);

  const { startModalOpen, startModalContent } = state;

  const handleClose = () => {
    dispatch({ type: 'SET_START_MODAL_OPEN', payload: false });
    onClose();
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleNext = () => {
    setActiveTab((prev) => Math.min(prev + 1, 3));
  };

  const feedbackTypes = Object.entries(activeUIConfig.feedbackComponents ?? {})
    .filter(([_, v]) => v)
    .map(([key, _]) => ({
      key,
      description: {
        rating: 'Rate episodes by using the slider. This feedback is always given for entire episodes.',
        ranking: 'Drag & Drop Episodes to rank them. You can also rank multiple episodes equally.',
        correction: 'Select a specific step. You can open the correction window by clicking.',
        featureSelection: 'Open the feature selection window by clicking the pen in the rendering window. You can select relevant features via brushing.',
        demonstration: 'Demonstrate a sequence of steps by selecting an action and wait for the next step',
        text: 'Provide textual feedback for the given segment. Hover over the info icon for suggestions.'
      }[key]
    }));

  return (
    <Dialog 
      open={startModalOpen} 
      onClose={handleClose}
      maxWidth="xl"
      fullWidth
      PaperProps={{
        sx: {
          height: '85vh',
          maxHeight: '85vh',
          display: 'flex',
          flexDirection: 'row'
        }
      }}
    >
      {/* Side Navigation */}
      <Paper 
        elevation={0} 
        sx={{ 
          width: 240, 
          borderRight: 1, 
          borderColor: 'divider',
          overflow: 'auto'
        }}
      >
        <List>
          {['Introduction', 'Instructions', 'Feedback Options', 'Privacy Policy'].map((text, index) => (
            <ListItem
              button
              key={text}
              selected={activeTab === index}
              onClick={() => setActiveTab(index)}
              sx={{
                '&.Mui-selected': {
                  backgroundColor: 'primary.light',
                  '&:hover': {
                    backgroundColor: 'primary.light',
                  }
                }
              }}
            >
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Paper>

      {/* Main Content */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', px: 3, pt: 2 }}>
          <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
            RLHF-Blender: Instructions
          </Typography>
          <Tabs value={activeTab} onChange={handleTabChange}>
            <Tab label="Introduction" />
            <Tab label="Instructions" />
            <Tab label="Feedback Options" />
            <Tab label="Privacy Policy" />
          </Tabs>
        </Box>

        <DialogContent sx={{ flex: 1, overflow: 'auto' }}>
          {/* Introduction Tab */}
          {activeTab === 0 && (
            <Box>
              <Typography paragraph>
                Welcome to the experiment! Please watch the following video to get an introduction to the interface:
              </Typography>
              {/* Reduced video size using Container */}
              <Container maxWidth="md" sx={{ mb: 4 }}>
                <Box sx={{ position: 'relative', paddingTop: '56.25%' }}>
                  <iframe
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                    }}
                    src="https://www.youtube.com/embed/nzcNqKEIbCY"
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </Box>
              </Container>
              {startModalContent}
            </Box>
          )}

          {/* Instructions Tab */}
          {activeTab === 1 && (
            <Box>
              <Typography 
                variant="h4" 
                gutterBottom 
                sx={{ 
                  textAlign: 'center',
                  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 4
                }}
              >
                Instructions for Participating in the Study
              </Typography>

              <Grid container spacing={4}>
                {[
                  {
                    title: "Review the Gameplay Videos",
                    content: (
                      <Typography>
                          You will watch gameplay videos featuring the <Box component="span" sx={{ color: '#ffc83d' }}>Yellow Team</Box>. The <Box component="span" sx={{ color: '#ffc83d' }}>Yellow Team's</Box> player acts as the agent. Your task is to observe the agent's gameplay closely and provide detailed feedback.
                      </Typography>
                  ),
                    icon: "🎮"
                  },
                  {
                    title: "Text-Based Feedback Only",
                    content: "This study specifically focuses on text-based feedback. Please provide your input solely in text form. Other forms of feedback such as ratings, rankings etc. are not part of this study and should be avoided.",
                    icon: "✍️"
                  },
                  {
                    title: "Select Project and Test Experiment",
                    content: "To begin, you will need to select the relevant project (RLHF-Blender) and the test experiment (TestExperiment) to initiate your participation in the study.",
                    icon: "🎯"
                  },
                  {
                    title: "Set Up Your Study Configuration",
                    content: "After selecting the project, you will have the option to configure your study settings with optimized default settings.",
                    icon: "⚙️"
                  },
                  {
                    title: "Instruction Guide",
                    content: (
                      <Typography>
                          While providing text feedback, refer to the help icon <Box component="span" sx={{ color: 'error.main', fontWeight: 'bold' }}>(?)</Box> next to the text box for helpful guidelines on writing effective feedback. These guidelines will help you provide detailed and constructive feedback.
                      </Typography>
                  ),
                    icon: "💡"
                  },
                  {
                    title: "Complete the Feedback Form",
                    content: "Once you have reviewed the videos and provided your feedback, you will be directed to a feedback form to complete the study.",
                    icon: "📝"
                  },
                ].map((section, index) => (
                  <Grid item xs={12} md={6} key={index}>
                    <Card 
                      sx={{ 
                        height: '100%',
                        transition: 'transform 0.2s, box-shadow 0.2s',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: 8
                        }
                      }}
                    >
                      <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <Typography variant="h1" sx={{ mr: 2, fontSize: '2.5rem' }}>
                            {section.icon}
                          </Typography>
                          <Typography variant="h6" color="primary">
                            {section.title}
                          </Typography>
                        </Box>
                        <Typography variant="body1" color="text.secondary">
                          {section.content}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}

          {/* Feedback Options Tab */}
          {activeTab === 2 && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Available Feedback Options
              </Typography>
              {/* Centered container with reduced width */}
              <Container maxWidth="lg">
                <Grid container spacing={3} justifyContent="center">
                  {feedbackTypes.map(({ key, description }) => (
                    <Grid item xs={12} sm={6} md={3} key={key}>
                      <Card 
                        variant="outlined"
                        sx={{ 
                          height: '100%',
                          transition: 'box-shadow 0.3s',
                          '&:hover': {
                            boxShadow: 3
                          }
                        }}
                      >
                        <CardContent>
                          <Box 
                            sx={{ 
                              aspectRatio: '1',
                              mb: 2,
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center'
                            }}
                          >
                            <img
                              src={`/files/${key}.png`}
                              alt={key}
                              style={{
                                maxWidth: '100%',
                                maxHeight: '100%',
                                objectFit: 'contain'
                              }}
                            />
                          </Box>
                          <Typography variant="h6" gutterBottom sx={{ textTransform: 'capitalize' }}>
                            {key}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {description}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Container>
            </Box>
          )}

          {/* Privacy Policy Tab */}
          {activeTab === 3 && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Data Protection and Privacy
              </Typography>
              <Typography paragraph color="text.secondary">
                By clicking "Agree and Continue" you agree to participate in this study. With your participation 
                in this study, you agree that your data will be used for research purposes only. 
                Your data will be stored anonymously and will not be passed on to third parties. 
                You can withdraw your consent at any time by contacting the study supervisor.
              </Typography>
            </Box>
          )}
        </DialogContent>

        {/* Navigation Buttons */}
        <Box sx={{ 
          borderTop: 1, 
          borderColor: 'divider',
          p: 2,
          display: 'flex',
          justifyContent: 'flex-end',
          gap: 2
        }}>
          {activeTab !== 3 && (
            <Button
              variant="contained"
              endIcon={<NavigateNextIcon />}
              onClick={handleNext}
            >
              Next
            </Button>
          )}
          {activeTab === 3 && (
            <Button
              variant="contained"
              color="primary"
              endIcon={<CheckIcon />}
              onClick={handleClose}
            >
              Agree and Continue
            </Button>
          )}
        </Box>
      </Box>
    </Dialog>
  );
};

export default ExperimentStartModal;