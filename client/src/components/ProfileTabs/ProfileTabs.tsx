import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import useStyles from './useStyles';
import { useContests } from '../../context/useContestContext';
import { Card, CardContent } from '@material-ui/core';

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
    <Grid>
      <Tabs value={value} onChange={handleChange} indicatorColor={'primary'} className={classes.tabRoot}>
        <Tab label="In Progress" className={classes.tabLabel} />
        <Tab label="completed" className={classes.tabLabel} />
      </Tabs>
      <ContestTabPanel index={0} value={value}>
        {allContests
          .filter((contest) => {
            return new Date(contest.deadlineDate) <= new Date();
          })
          .map((contest) => {
            return (
              <Grid item key={contest.id}>
                <Card>
                  <CardContent>
                    <Typography gutterBottom variant={'h2'} noWrap>
                      {contest.title}
                    </Typography>
                    <Typography gutterBottom>{contest.description}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
      </ContestTabPanel>
      <ContestTabPanel index={1} value={value}>
        {allContests
          .filter((context) => {
            return new Date(context.deadlineDate) > new Date();
          })
          .map((contest) => {
            return (
              <Grid item key={contest.id}>
                <CardContent>
                  <Typography gutterBottom variant={'h2'} noWrap>
                    {contest.title}
                  </Typography>
                  <Typography gutterBottom>{contest.description}</Typography>
                </CardContent>
              </Grid>
            );
          })}
      </ContestTabPanel>
    </Grid>
  );
}
