import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table, Form, FormGroup, Input, Label } from 'reactstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from 'react-redux';
import { addingProduct, gettingProducts } from '../../store/action';
import Image from '../../assets/macbook_air.png';

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
  },
  img: {
    width: '150px',
  }
}));

const Dashboard = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  // Add Product
  const [modal, setModal] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(1);

  // Edit Product
  const [editModal, setEditModal] = useState(false);
  const [editId, setEditId] = useState(0);
  const [editImageUrl, setEditImageUrl] = useState('');
  const [editName, setEditName] = useState('');
  const [editCategory, setEditCategory] = useState('');
  const [editPrice, setEditPrice] = useState(0);
  const [editStock, setEditStock] = useState(1);

  const products = useSelector(state => state.product.products);

  useEffect(() => {
    dispatch(gettingProducts());
  }, []);
  const toggle = () => setModal(!modal);
  const editToggle = () => setEditModal(!editModal);
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
                  <td className={classes.tr}><img className={classes.img} src={res.image_url} /></td>
                  <td className={classes.tr}>{res.name}</td>
                  <td className={classes.tr}>{res.category}</td>
                  <td className={classes.tr}>{formatter.format(res.price)}</td>
                  <td className={classes.tr}>{res.stock}</td>
                  <td className={classes.trLast}><Button outline color="primary" onClick={(e) => {
                    e.preventDefault();
                    setEditId(res.id);
                    setEditImageUrl(res.image_url);
                    setEditName(res.name);
                    setEditCategory(res.category);
                    setEditPrice(res.price);
                    setEditStock(res.stock);
                    editToggle();
                  }} className={classes.tableButton}><FontAwesomeIcon icon={faEdit}></FontAwesomeIcon> Edit</Button><Button outline color="danger" className={classes.tableButton}><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon> Delete</Button></td>
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
      <Modal style={{ zIndex: 5 }} isOpen={editModal} toggle={editToggle}>
        <ModalHeader toggle={editToggle}>Edit Product</ModalHeader>
        <ModalBody>
          <Form className={classes.form}>
            <FormGroup className={classes.formGroup}>
              <Label className={classes.label}>Image URL</Label>
              <Input value={editImageUrl} onChange={(e) => {
                e.preventDefault();
                setEditImageUrl(e.target.value);
              }} type="text" name="image_url" id="image_url" placeholder="Image URL" />
            </FormGroup>
            <FormGroup className={classes.formGroup}>
              <Label className={classes.label}>Name</Label>
              <Input value={editName} onChange={(e) => {
                e.preventDefault();
                setEditName(e.target.value);
              }} type="text" name="name" id="name" placeholder="Name" />
            </FormGroup>
            <FormGroup className={classes.formGroup}>
              <Label className={classes.label}>Category</Label>
              <Input value={editCategory} onChange={(e) => {
                e.preventDefault();
                setEditCategory(e.target.value);
              }} type="text" name="category" id="category" placeholder="Category" />
            </FormGroup>
            <FormGroup className={classes.formGroup}>
              <Label className={classes.label}>Price</Label>
              <Input value={editPrice} onChange={(e) => {
                e.preventDefault();
                setEditPrice(e.target.value);
              }} type="number" name="price" id="price" placeholder="Price" />
            </FormGroup>
            <FormGroup className={classes.formGroup}>
              <Label className={classes.label}>Stock</Label>
              <Input value={editStock} onChange={(e) => {
                e.preventDefault();
                setEditStock(e.target.value);
              }} type="number" name="stock" id="stock" placeholder="Stock" />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={(e) => {
            e.preventDefault();
            editToggle();
          }}>Edit</Button>
          <Button color="danger" onClick={editToggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default Dashboard;