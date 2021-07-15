import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Grid from '@material-ui/core/Grid';

export default function ProfileTabs(): JSX.Element {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<unknown>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Grid>
      <Tabs
        TabIndicatorProps={{
          style: {
            height: '4px',
          },
        }}
        indicatorColor="primary"
        value={value}
        onChange={handleChange}
        textColor="primary"
        centered
        variant="fullWidth"
      >
        <Tab label="IN PROGRESS" />
        <Tab label="COMPLETED" />
      </Tabs>
    </Grid>
  );
}
