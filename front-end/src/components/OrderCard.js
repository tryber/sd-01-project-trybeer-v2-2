import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    border: '1px solid black',
    minWidth: 200,
    maxWidth: 350,
    margin: 20,
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'space-around',
  }
});

function OrderCard({ order, isAdmin }) {
  const linkRoute = isAdmin ? '/admin' : '';
  const orderStatus = order.finished ? 'Entregue' : 'Pendente';
  const date = new Date(order.purchase_date);
  const purchaseDate = `${date.getDate()}/${date.getMonth()}`;
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea href={`${linkRoute}/orders/${order.purchase_id}`}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2" data-testid={`${order.purchase_id}-order-number`}>
            {`Pedido ${order.purchase_id}`}
          </Typography>
          <Typography className={classes.pos} color="textSecondary" data-testid={`${order.purchase_id}-order-${isAdmin ? 'address' : 'date'}`}>
            {isAdmin ? `${order.street}, ${order.number}` : purchaseDate}
          </Typography>
        </CardContent>
        <CardActions className={classes.cardActions}>
          <Typography variant="h5" component="p" data-testid={`${order.purchase_id}-order-total-value`}>
            {`R$ ${order.price}`}
          </Typography>
          <Typography component="p">
            {isAdmin !== 0 && orderStatus}
          </Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  );
}

export default OrderCard;
