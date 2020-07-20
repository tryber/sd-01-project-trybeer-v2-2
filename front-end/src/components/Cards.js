import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import { transformCurrency } from '../service';

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(3),
    backgroundColor: 'white',
    border: '1px solid black',
    width: theme.spacing(22),
    minHeight: theme.spacing(49),
    maxHeight: theme.spacing(50),
    textAlign: 'center'
  },
  media: {
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
}));

function updateTotalValue(setTotal, price, method) {
  const { totalValue, setTotalValue } = setTotal;
  method === 'add' ? setTotalValue(totalValue + price) : setTotalValue(totalValue - price);
  return true;
}

function changeQuantity(props, qtt, setCurrentyQuantity, method) {
  const { setTotal, price, name, func } = props;
  if (qtt < 0) return null;
  updateTotalValue(setTotal, price, method)
  func(name, qtt);
  setCurrentyQuantity(qtt)
}



function returnButtons(props, currentyQuantity, setCurrentyQuantity) {
  const { id } = props;
  return (
    <CardActions>
      <Button size='small' color='primary'
        data-testid={`${id}-product-minus`}
        onClick={() => changeQuantity(props, currentyQuantity - 1, setCurrentyQuantity, 'remove')
        }>
        <RemoveCircleIcon />
      </Button>
      <span data-testid={`${id}-product-qtd`}>{currentyQuantity}</span>
      <Button size='small' color='primary'
        data-testid={`${id}-product-plus`}
        onClick={() => changeQuantity(props, currentyQuantity + 1, setCurrentyQuantity, 'add')
        }>
        <AddCircleIcon />
      </Button>
    </CardActions>
  );
}

function Cards(props) {
  const classes = useStyles();
  const { image, price, name, id, quantity } = props;
  const [currentyQuantity, setCurrentyQuantity] = useState(quantity);

  return (
    <div>
      <Card className={classes.root}>
        <CardMedia id={id} className={classes.media} image={image} title={name} data-testid={`${id}-product-img`} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h3" data-testid={`${id}-product-name`}>
            {name}
          </Typography>
          <Typography variant="h6" color="textSecondary" component="h2" data-testid={`${id}-product-price`}>
            {transformCurrency(price)}
          </Typography>
        </CardContent>
        {returnButtons(props, currentyQuantity, setCurrentyQuantity)}
      </Card>
    </div>
  );
}

export default Cards;
