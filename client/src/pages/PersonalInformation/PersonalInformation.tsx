import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import SidePanel from '../../components/SidePanel/SidePanel';

function PersonalInformation(): JSX.Element {
  return (
    <SidePanel>
      <Grid>
        <Typography component="h2" variant="h2">
          Personal Information
        </Typography>
      </Grid>
    </SidePanel>
  );
}

export default PersonalInformation;
