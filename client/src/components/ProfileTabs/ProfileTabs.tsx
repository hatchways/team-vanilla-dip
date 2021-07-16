import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import useStyles from './useStyles';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
function ContestTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div hidden={value !== index} id={`landing-tab-panel-${index}`} aria-labelledby={`tab-${index}`} {...other}>
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
export default function ProfileTabs(): JSX.Element {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<unknown>, newValue: number) => {
    setValue(newValue);
  };
  const classes = useStyles();
  return (
    <Grid>
      <Tabs value={value} onChange={handleChange} indicatorColor={'primary'} className={classes.tabRoot}>
        <Tab label="In Progress" className={classes.tabLabel} />
        <Tab label="completed" className={classes.tabLabel} />
      </Tabs>
      <ContestTabPanel index={0} value={value}>
        in progress contests
      </ContestTabPanel>
      <ContestTabPanel index={1} value={value}>
        completed contests
      </ContestTabPanel>
    </Grid>
  );
}
