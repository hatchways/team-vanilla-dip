import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Button } from '@material-ui/core';
import useStyles from '../useStyles';
import { Card, CardActionArea, CardContent, CardMedia } from '@material-ui/core';
import { Link } from 'react-router-dom';

interface ContestProps {
  title: string;
  description: string;
  prizeAmount: number;
  imageFiles: string[];
  id: string;
}

function CardPanel({ id, imageFiles, title, description, prizeAmount }: ContestProps): JSX.Element {
  const classes = useStyles();

  return (
    <Card elevation={0}>
      <CardActionArea component={Link} to={'/contest/' + id}>
        <Grid container>
          <Grid item md={4}>
            <Box>
              <CardMedia component="img" image={imageFiles[0]} height="250" />
            </Box>
          </Grid>
          <Grid item md={8}>
            <CardContent>
              <Typography gutterBottom variant={'h4'} noWrap>
                {title}
              </Typography>
              <Typography gutterBottom>{description}</Typography>
              <Box my={5}>
                <Button className={classes.price}>$ {prizeAmount}</Button>
              </Box>
            </CardContent>
          </Grid>
        </Grid>
      </CardActionArea>
    </Card>
  );
}

export default CardPanel;
