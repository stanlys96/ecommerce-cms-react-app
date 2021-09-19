import React, { useEffect, useState } from "react";
import Swal from 'sweetalert2';
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table, Form, FormGroup, Input, Label } from 'reactstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from 'react-redux';
import { addingProduct, gettingProducts, updatingProduct, deletingProduct } from '../../store/action';

// Create our number formatter.
var formatter = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  maximumFractionDigits: 0,
});

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.close)
  }
})

const useStyles = makeStyles((theme) => ({
  scaffold: {
    backgroundColor: '#F9EED3',
    paddingBottom: '30px',
    minHeight: '92vh',
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
    display: 'block',
    width: '100%',
  },
  img: {
    width: '150px',
  }
}));

const Banners = () => {
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
              <th className={classes.thead}>Status</th>
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
                  }} className={classes.tableButton}><FontAwesomeIcon icon={faEdit}></FontAwesomeIcon> Edit</Button><Button outline color="danger" onClick={(e) => {
                    e.preventDefault();
                    Swal.fire({
                      title: 'Are you sure?',
                      text: "You won't be able to revert this!",
                      icon: 'warning',
                      showCancelButton: true,
                      confirmButtonColor: '#3085d6',
                      cancelButtonColor: '#d33',
                      confirmButtonText: 'Yes, delete it!'
                    }).then((result) => {
                      if (result.isConfirmed) {
                        Toast.fire({
                          icon: 'success',
                          title: `Successfully deleted ${res.name}!`
                        });
                        dispatch(deletingProduct(res.id));
                      }
                    })
                  }} className={classes.tableButton}><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon> Delete</Button></td>
                </tr>
              ))
            ) : (<tr>
              <td colSpan="7"><h2 style={{ textAlign: "center", margin: '0 auto', width: '100%' }}>No results found...</h2>
              </td>
            </tr>
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
              <select onChange={(e) => { setCategory(e.target.value) }} class="form-select" aria-label="Default select example">
                <option value="" selected>=== SELECT CATEGORY ===</option>
                <option value="Laptop">Laptop</option>
                <option value="Phone">Phone</option>
                <option value="Tablet">Tablet</option>
                <option value="Other">Other</option>
              </select>
            </FormGroup>
            <FormGroup className={classes.formGroup}>
              <Label className={classes.label}>Price</Label>
              <Input value={price} onChange={(e) => {
                e.preventDefault();
                setPrice(e.target.value);
              }} type="number" name="price" id="price" placeholder="Price" />
            </FormGroup>
            <FormGroup className={classes.formGroup}>
              <Label className={classes.label}>Stock</Label>
              <Input value={stock} onChange={(e) => {
                e.preventDefault();
                setStock(e.target.value);
              }} type="number" name="stock" id="stock" placeholder="Stock" />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={(e) => {
            e.preventDefault();
            if (imageUrl == "" || name == "" || category == "") {
              Swal.fire({
                icon: 'error',
                title: 'Error...',
                text: 'All fields must be filled!',
              });
            } else if (price < 1 || stock < 1) {
              Swal.fire({
                icon: 'error',
                title: 'Error...',
                text: 'Number values can\'t be zero or minus!',
              });
            } else {
              dispatch(addingProduct(imageUrl, name, category, price, stock));
              Toast.fire({
                icon: 'success',
                title: `Successfully added ${name}!`
              });
              toggle();
            }
          }}>Add</Button>
          <Button color="danger" onClick={() => {
            setImageUrl('');
            setName('');
            setCategory('');
            setPrice(0);
            setStock(1);
            toggle();
          }}>Cancel</Button>
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
              <select onChange={(e) => {
                setEditCategory(e.target.value);
                console.log(e.target.value);
              }} class="form-select" aria-label="Default select example">
                <option value="Laptop" selected={editCategory === "Laptop" ? true : false}>Laptop</option>
                <option value="Phone" selected={editCategory === "Phone" ? true : false}>Phone</option>
                <option value="Tablet" selected={editCategory === "Tablet" ? true : false}>Tablet</option>
                <option value="Other" selected={editCategory === "Other" ? true : false}>Other</option>
              </select>
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
            if (editImageUrl == "" || editName == "" || editCategory == "") {
              Swal.fire({
                icon: 'error',
                title: 'Error...',
                text: 'All fields must be filled!',
              });
            } else if (editPrice < 1 || editStock < 1) {
              Swal.fire({
                icon: 'error',
                title: 'Error...',
                text: 'Number values can\'t be zero or minus!',
              });
            } else {
              dispatch(updatingProduct(editId, editImageUrl, editName, editCategory, editPrice, editStock));
              Toast.fire({
                icon: 'success',
                title: `Successfully edited a product!`
              });
              editToggle();
            }
          }}>Edit</Button>
          <Button color="danger" onClick={editToggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default Banners;