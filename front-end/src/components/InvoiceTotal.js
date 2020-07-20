import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import { transformCurrency, deleteProduct, total } from '../service';

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
  cels: {
    border: '1px solid #3f51b5',
  },
  deleteIcon: {
    cursor: 'pointer',
  },
});

function tableRomDescription({ cels }) {
  return (
    <TableRow className={cels}>
      <TableCell className={cels} align='left'>
        Quantidade
      </TableCell>
      <TableCell className={cels} align='left'>
        Nome
      </TableCell>
      <TableCell className={cels} align='left'>
        Preço
      </TableCell>
    </TableRow>
  );
}

function constructorTableCell(data, { cels, deleteIcon }, setShouldUpdate) {
  return data.map(({ quantity, name, price }) => (
    <TableRow className={cels} key={name}>
      <TableCell className={cels} align='left'>
        {quantity}
      </TableCell>
      <TableCell className={cels} align='left'>
        {name}
      </TableCell>
      <TableCell className={cels} align='left'>
        {transformCurrency(price * quantity)}
      </TableCell>
      <TableCell className={cels} align='left'>
        <DeleteIcon className={deleteIcon} onClick={() => {
          setShouldUpdate(true);
          deleteProduct(name);
        }} />
      </TableCell>
    </TableRow>
  ));
}

function InvoiceTotal(props) {
  const classes = useStyles();
  const { data, setShouldUpdate } = props;

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label='spanning table'>
        <TableHead>{tableRomDescription(classes)}</TableHead>
        <TableBody>
          {constructorTableCell(data, classes, setShouldUpdate)}
          <TableRow>
            <TableCell></TableCell>
            <TableCell colSpan={1}>Total</TableCell>
            <TableCell align='left'>{transformCurrency(total(data))}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default InvoiceTotal;
