import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab, { TabProps } from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { styled } from '@mui/material';
import VirtualizedList from './listItens';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface MenuProps {
  children?: React.ReactNode;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs(props: MenuProps) {

  const { children } = props;

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <TabButton  label="Agenda Quimioterapia" {...a11yProps(0)} />
          <TabButton label="Agenda de consulta" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <VirtualizedList/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <VirtualizedList/>
      </TabPanel>
    </Box>
  );
}

const TabButton = styled(Tab)<TabProps>(({ theme }) => ({
  color: 'rgba(255, 255, 255, 0.7)',
  '&.Mui-selected': {
    color: '#fff',
  },
  '&.Mui-focusVisible': {
    backgroundColor: 'rgb(94, 114, 95)',
  },
  width: '50%'
}));
