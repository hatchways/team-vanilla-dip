import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { Paper } from '@material-ui/core';

import CardPanel from './CardPanel/CardPanel';
import useStyles from './useStyles';
import { useContests } from '../../context/useContestContext';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
function ContestTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div hidden={value !== index} id={`landing-tab-panel-${index}`} aria-labelledby={`tab-${index}`} {...other}>
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

export default function ProfileTabs(): JSX.Element {
  const [value, setValue] = React.useState(0);
  const { allContests } = useContests();
  const handleChange = (event: React.ChangeEvent<unknown>, newValue: number) => {
    setValue(newValue);
  };

  const classes = useStyles();

  return (
    <Grid className={classes.profile_container}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor={'primary'}
        className={classes.tabRoot}
        variant="fullWidth"
        aria-label="simple tabs"
      >
        <Tab label="In Progress" className={classes.tabLabel} />
        <Tab label="completed" className={classes.tabLabel} />
      </Tabs>
      <Paper elevation={1}>
        <Box p={3}>
          <ContestTabPanel index={0} value={value}>
            <Grid container spacing={5}>
              {allContests
                .filter((contest) => {
                  return new Date(contest.deadlineDate) > new Date();
                })
                .map((contest) => (
                  <Grid item md={12} key={contest.id}>
                    <CardPanel
                      id={contest.id}
                      imageFiles={contest.imageFiles}
                      title={contest.title}
                      description={contest.description}
                      prizeAmount={contest.prizeAmount}
                    />
                  </Grid>
                ))}
            </Grid>
          </ContestTabPanel>
          <ContestTabPanel index={1} value={value}>
            {allContests
              .filter((context) => {
                return new Date(context.deadlineDate) <= new Date();
              })
              .map((contest) => (
                <Grid item md={12} key={contest.id}>
                  <CardPanel
                    id={contest.id}
                    imageFiles={contest.imageFiles}
                    title={contest.title}
                    description={contest.description}
                    prizeAmount={contest.prizeAmount}
                  />
                </Grid>
              ))}
          </ContestTabPanel>
        </Box>
      </Paper>
    </Grid>
  );
}
