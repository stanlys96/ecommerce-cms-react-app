import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table, Form, FormGroup, Input, Label } from 'reactstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from 'react-redux';
import { addingProduct, gettingProducts } from '../../store/action';

// Create our number formatter.
var formatter = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  maximumFractionDigits: 0,
});

const useStyles = makeStyles((theme) => ({
  scaffold: {
    backgroundColor: '#F9EED3',
    paddingBottom: '30px'
  },
  container: {
    maxWidth: '1200px',
    margin: '8vh auto 0',
  },
  button: {
    marginBottom: '10px',
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: '28px',
    padding: '20px 0 0',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: '400px',
  },
  formGroup: {
    width: '100%',
    margin: '0 0 10px 0',
  },
  buttonLogin: {
    width: '100%',
    margin: '0 0 0 0',
  },
  label: {
    marginBottom: '10px'
  },
  thead: {
    textAlign: 'center'
  },
  tr: {
    textAlign: 'center',
    fontWeight: '600',
  },
  trLast: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    fontWeight: '600',
  },
  tableRow: {
    verticalAlign: 'middle',
    margin: 'auto',
    alignItems: 'center',
    height: '100%',
  },
  tableButton: {
    fontWeight: '600',
    marginBottom: '5px',
  }
}));

const Dashboard = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(1);

  const products = useSelector(state => state.product.products);

  useEffect(() => {
    dispatch(gettingProducts());
  }, []);
  const toggle = () => setModal(!modal);
  return (
    <div className={classes.scaffold}>
      <div className={classes.container}>
        <Typography className={classes.title}>Products List</Typography>
        <div style={{ display: 'flex', width: '100%', justifyContent: 'end' }}>
          <Button color="primary" className={classes.button} onClick={toggle}><FontAwesomeIcon icon={faPlus}></FontAwesomeIcon> &nbsp;Add Product</Button>
        </div>
        <Table>
          <thead className="bg-warning text-dark">
            <tr>
              <th className={classes.thead}>No</th>
              <th className={classes.thead}>Image</th>
              <th className={classes.thead}>Name</th>
              <th className={classes.thead}>Category</th>
              <th className={classes.thead}>Price</th>
              <th className={classes.thead}>Stock</th>
              <th className={classes.thead}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((res, index) => (
                <tr className={classes.tableRow}>
                  <th className={classes.tr} scope="row">{index + 1}</th>
                  <td className={classes.tr}><img href={res.image_url} alt="not found" /></td>
                  <td className={classes.tr}>{res.name}</td>
                  <td className={classes.tr}>{res.category}</td>
                  <td className={classes.tr}>{formatter.format(res.price)}</td>
                  <td className={classes.tr}>{res.stock}</td>
                  <td className={classes.trLast}><Button outline color="primary" className={classes.tableButton}><FontAwesomeIcon icon={faEdit}></FontAwesomeIcon> Edit</Button><Button outline color="danger" className={classes.tableButton}><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon> Delete</Button></td>
                </tr>
              ))
            ) : (<h2 style={{ textAlign: "center" }}>No results found...</h2>
            )}
          </tbody>
        </Table>
      </div>
      <Modal style={{ zIndex: 5 }} isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add A Product</ModalHeader>
        <ModalBody>
          <Form className={classes.form}>
            <FormGroup className={classes.formGroup}>
              <Label className={classes.label}>Image URL</Label>
              <Input onChange={(e) => {
                e.preventDefault();
                setImageUrl(e.target.value);
              }} type="text" name="image_url" id="image_url" placeholder="Image URL" />
            </FormGroup>
            <FormGroup className={classes.formGroup}>
              <Label className={classes.label}>Name</Label>
              <Input onChange={(e) => {
                e.preventDefault();
                setName(e.target.value);
              }} type="text" name="name" id="name" placeholder="Name" />
            </FormGroup>
            <FormGroup className={classes.formGroup}>
              <Label className={classes.label}>Category</Label>
              <Input onChange={(e) => {
                e.preventDefault();
                setCategory(e.target.value);
              }} type="text" name="category" id="category" placeholder="Category" />
            </FormGroup>
            <FormGroup className={classes.formGroup}>
              <Label className={classes.label}>Price</Label>
              <Input onChange={(e) => {
                e.preventDefault();
                setPrice(e.target.value);
              }} type="number" name="price" id="price" placeholder="Price" />
            </FormGroup>
            <FormGroup className={classes.formGroup}>
              <Label className={classes.label}>Stock</Label>
              <Input onChange={(e) => {
                e.preventDefault();
                setStock(e.target.value);
              }} type="number" name="stock" id="stock" placeholder="Stock" />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={(e) => {
            e.preventDefault();
            console.log(imageUrl);
            dispatch(addingProduct(imageUrl, name, category, price, stock));
            toggle();
          }}>Add</Button>
          <Button color="danger" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default Dashboard;