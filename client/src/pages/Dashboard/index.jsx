import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table, Form, FormGroup, Input, Label } from 'reactstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const useStyles = makeStyles((theme) => ({
  scaffold: {
    backgroundColor: '#F9EED3',
    height: '93vh',
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
  }
}));

const Dashboard = () => {
  const classes = useStyles();
  const [modal, setModal] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(1);

  const toggle = () => setModal(!modal);
  return (
    <div className={classes.scaffold}>
      <div className={classes.container}>
        <Typography className={classes.title}>Products List</Typography>
        <div style={{ display: 'flex', width: '100%', justifyContent: 'end' }}>
          <Button color="danger" className={classes.button} onClick={toggle}><FontAwesomeIcon icon={faPlus}></FontAwesomeIcon> &nbsp;Add Product</Button>
        </div>
        <Table>
          <thead className="bg-primary text-light">
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
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Larry</td>
              <td>the Bird</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </Table>
      </div>
      <Modal isOpen={modal} toggle={toggle}>
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
          <Button color="primary" onClick={toggle}>Add</Button>
          <Button color="danger" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default Dashboard;