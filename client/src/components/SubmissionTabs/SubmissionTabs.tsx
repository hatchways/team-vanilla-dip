import React from 'react';
import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Box from '@material-ui/core/Box';

import Tab from '@material-ui/core/Tab';
import { Paper } from '@material-ui/core';
import useStyles from './useStyles';

import SubmissionCard from './SubmissionCard/SubmissionCard';
import SubmissionCardProps from './SumissionCardInterface';

interface cardProps {
  card: SubmissionCardProps[];
}

function SubmissionTabs({ card }: cardProps): JSX.Element {
  const [value, setValue] = React.useState(0);
  const classes = useStyles();

  return (
    <Grid>
      <Tabs indicatorColor={'primary'} value={value} aria-label="simple tabs" className={classes.tabRoot}>
        <Tab label="Designs (30)" />
        <Tab label="Brief" />
      </Tabs>
      <Paper elevation={1}>
        <Box p={3}>
          <Grid container>
            {card.map((data, key) => (
              <Grid item md={3} xs={12} key={key}>
                <SubmissionCard imageSrc={data.imageSrc} title={data.title} text={data.text} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Paper>
    </Grid>
  );
}

export default SubmissionTabs;
