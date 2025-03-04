import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import ntxLogo from '../assets/nutanix.svg';
import { useNavigate, useLocation } from 'react-router';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import IconButton from '@mui/material/IconButton';
import { Tooltip } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import {
  Info,
  BookOpen,
  Sparkles,
  Gamepad,
  Trash2,
  House
} from 'lucide-react';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import { CircularProgress, Divider, ListItem, Typography, Modal } from '@mui/material';
import AboutModal from './AboutModal';
import ErrorModal from './ErrorModal';
import ConfirmModal from './ConfirmModal';
import ChironButton from './ChironButton';
import { getKBfromLocalStorage } from '../utils/localStorage';

const Navbar = ({ brainRot, setBrainRot, isLoading, savedKbs, editing, setMetadata, selectSavedKB, clearHistory }) => {
  const navigate = useNavigate();

  const [errorModalOpen, setErrorModalOpen] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');

  const [confirmModalOpen, setConfirmModalOpen] = React.useState(false);

  const [openAbout, setOpenAbout] = React.useState(false);

  const [openDrawer, setOpenDrawer] = React.useState(false);

  // Close the sidebar on navigation event, and refresh the saved KBs
  const location = useLocation();
  React.useEffect(() => {
    setOpenDrawer(false);
  }, [location.pathname]);

  const handleClearAll = () => {
    clearHistory();
    navigate('/');
    setConfirmModalOpen(false);
  };

  function formatDateTime(epochString) {
    const date = new Date(parseInt(epochString));
    const formattedDateTime = new Intl.DateTimeFormat('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }).format(date);

    return formattedDateTime;
  }

  return (
    <>
      <AppBar 
        position='static' 
        color='primary'
        sx={{
          boxShadow: '0 10px 8px rgba(0, 0, 0, 0.5)',
        }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: {
              xs: '0 8px',
              sm: '0 16px'
            },
            minHeight: {
              xs: '56px',
              sm: '64px'
            }
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {/* Sidebar components */}
            <IconButton
              onClick={() => {
                if (editing) {
                  setErrorMessage("You are in editing mode, you will lose your changes if you navigate away. Save your work first!");
                  setErrorModalOpen(true);
                } else {
                  setOpenDrawer(true);
                }
              }}
              onKeyDown={(e) => { e.preventDefault() }}
              disabled={isLoading}
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{
                padding: {
                  xs: '8px',
                  sm: '12px'
                }
              }}
            >
              {isLoading ? (
                <CircularProgress 
                  size={24}
                  sx={{
                    color: 'white'
                  }}
                />
              ) : (
                <DensityMediumIcon 
                  sx={{ 
                    fontSize: {
                      xs: 24,
                      sm: 28
                    }
                  }}
                />
              )}
            </IconButton>

            {/* Chiron framework button */}
            <ChironButton 
              isLoading={isLoading}
              editing={editing}
              setErrorMessage={setErrorMessage}
              setErrorModalOpen={setErrorModalOpen}
              navigate={navigate}
              sx={{
                '& .button-text': {
                  display: {
                    xs: 'none',
                    sm: 'block'
                  }
                }
              }}
            />
          </Box>

          <Box 
            sx={{ 
              display: 'flex',
              alignItems: 'center',
              gap: {
                xs: 1,
                sm: 3
              }
            }}
          >
            <Tooltip title="Instructions" arrow>
              <IconButton
                onClick={() => {
                  if (isLoading) {
                    setErrorMessage("You cannot navigate to a different page while the script is generating.");
                    setErrorModalOpen(true);
                  } else if (editing) {
                    setErrorMessage("You are in editing mode, you will lose your changes if you navigate away. Save your work first!");
                    setErrorModalOpen(true);
                  } else {
                    navigate('/instructions');
                  }
                }}
                sx={{
                  color: 'white',
                  transition: 'all 0.2s ease-in-out',
                }}
              >
                <HelpOutlineIcon 
                  sx={{ 
                    fontSize: {
                      xs: 28,
                      sm: 40
                    }
                  }} 
                />
              </IconButton>
            </Tooltip>

            {/* NTNX logo */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                transition: 'transform 0.3s ease, filter 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                  filter: 'drop-shadow(0px 0px 8px rgba(168, 85, 247, 0.6))',
                  cursor: 'pointer',
                },
              }}
              onClick={() => {
                window.open("https://portal.nutanix.com/", '_blank').focus();
              }}
            >
              <Box
                component="img"
                src={ntxLogo}
                alt='Nutanix Logo'
                sx={{
                  height: {
                    xs: 14,
                    sm: 20
                  },
                  width: 'auto',
                  marginLeft: '4px'
                }}
              />
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Drawer
        open={openDrawer}
        onClose={() => { setOpenDrawer(false) }}
        PaperProps={{
          sx: {
            background: 'rgba(4, 4, 4, 0.95)',
            backdropFilter: 'blur(10px)',
            borderRight: '1px solid rgba(255, 255, 255, 0.1)',
            padding: '24px 16px',
            overflowY: 'auto',
            '&::-webkit-scrollbar': {
              width: '8px',
            },
            '&::-webkit-scrollbar-track': {
              background: 'rgba(255, 255, 255, 0.05)',
            },
            '&::-webkit-scrollbar-thumb': {
              background: 'rgba(120, 85, 251, 0.3)',
              borderRadius: '4px',
              '&:hover': {
                background: 'rgba(120, 85, 251, 0.5)',
              },
            },
          }
        }}
      >
        <Box sx={{ width: {
          xs: 250,
          sm: 300
        }}}>
          {/* Menu Header */}
          <Typography
            variant="h6"
            sx={{
              color: 'text.primary',
              fontWeight: 600,
              mb: 3,
              pl: 2
            }}
          >
            Menu
          </Typography>

          {/* Main Menu Items */}
          <Box sx={{ mb: 3 }}>
            <Button
              startIcon={<House size={20} />}
              sx={{
                width: '100%',
                justifyContent: 'flex-start',
                py: 1.5,
                px: 2,
                color: 'text.primary',
                textTransform: 'none',
                fontSize: '1rem',
                fontWeight: 500,
                '&:hover': {
                  backgroundColor: 'rgba(120, 85, 251, 0.1)',
                }
              }}
              onClick={() => { navigate("/"); }}
            >
              Home
            </Button>

            <Button
              startIcon={<Info size={20} />}
              sx={{
                width: '100%',
                justifyContent: 'flex-start',
                py: 1.5,
                px: 2,
                color: 'text.primary',
                textTransform: 'none',
                fontSize: '1rem',
                fontWeight: 500,
                '&:hover': {
                  backgroundColor: 'rgba(120, 85, 251, 0.1)',
                }
              }}
              onClick={() => { 
                setOpenDrawer(false);
                setOpenAbout(true);
              }}
            >
              About
            </Button>

            <Button
              startIcon={<BookOpen size={20} />}
              sx={{
                width: '100%',
                justifyContent: 'flex-start',
                py: 1.5,
                px: 2,
                color: 'text.primary',
                textTransform: 'none',
                fontSize: '1rem',
                fontWeight: 500,
                '&:hover': {
                  backgroundColor: 'rgba(120, 85, 251, 0.1)',
                }
              }}
              onClick={() => { navigate('/instructions'); }}
            >
              Instructions
            </Button>

            <Button
              startIcon={<Sparkles size={20} />}
              sx={{
                width: '100%',
                justifyContent: 'flex-start',
                py: 1.5,
                px: 2,
                color: brainRot ? '#7855fb' : 'text.primary',
                textTransform: 'none',
                fontSize: '1rem',
                fontWeight: 500,
                '&:hover': {
                  backgroundColor: 'rgba(120, 85, 251, 0.1)',
                }
              }}
              onClick={() => { setBrainRot(!brainRot); }}
            >
              Funky mode {brainRot ? "✨" : ""}
            </Button>

            <Button
              disabled={savedKbs.length === 0}
              startIcon={<Trash2 size={20} />}
              sx={{
                width: '100%',
                justifyContent: 'flex-start',
                py: 1.5,
                px: 2,
                color: '#ff4d4d',
                textTransform: 'none',
                fontSize: '1rem',
                fontWeight: 500,
                '&:hover': {
                  backgroundColor: 'rgba(255, 77, 77, 0.1)',
                }
              }}
              onClick={() => setConfirmModalOpen(true)}
            >
              Clear All
            </Button>
          </Box>

          <Divider sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            my: 2
          }} />

          {/* Previous Scripts Section */}
          <Typography
            variant="subtitle2"
            sx={{
              color: 'text.secondary',
              fontWeight: 600,
              mb: 2,
              pl: 2
            }}
          >
            Previous Scripts
          </Typography>

          <List sx={{
            maxHeight: 'calc(100vh - 400px)',
          }}>
            {savedKbs.map((pastKb, idx) => (
              <ListItem
                key={idx}
                disablePadding
                sx={{ mb: 1 }}
              >
                <Button
                  sx={{
                    width: '100%',
                    justifyContent: 'flex-start',
                    py: 1.5,
                    px: 2,
                    color: 'text.secondary',
                    textTransform: 'none',
                    fontSize: '0.9rem',
                    lineHeight: 1.4,
                    textAlign: 'left',
                    '&:hover': {
                      backgroundColor: 'rgba(120, 85, 251, 0.1)',
                      color: 'text.primary',
                    }
                  }}
                  onClick={() => {
                    const saved = getKBfromLocalStorage(idx);
                    setMetadata({
                      url: saved.url,
                      kbId: saved.kbId,
                      title: saved.title,
                      timeGenerated: saved.getTimeGenerated(),
                    })
                    selectSavedKB(idx);
                    navigate('/result', { state: { idx: idx } });
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                  >
                    <Typography variant="subtitle2" sx={{ color: 'text.primary', mb: 0.5 }}>
                      {pastKb.title}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                      {pastKb.kbId} • {formatDateTime(pastKb.getTimeGenerated())}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                      {pastKb.model}
                    </Typography>
                  </Box>
                </Button>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      <Modal
        open={openAbout}
        onClose={() => setOpenAbout(false)}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <AboutModal />
      </Modal>

      <ConfirmModal
        open={confirmModalOpen}
        onClose={() => setConfirmModalOpen(false)}
        message="Clear all previous script generations?"
        onConfirm={handleClearAll}
      />
      <ErrorModal
        open={errorModalOpen}
        onClose={() => setErrorModalOpen(false)}
        message={errorMessage}
      />
    </>
  );
};

export default Navbar;