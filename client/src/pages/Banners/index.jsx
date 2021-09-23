import React, { useEffect, useState } from "react";
import Swal from 'sweetalert2';
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table, Form, FormGroup, Input, Label } from 'reactstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from 'react-redux';
import { addingBanner, gettingBanners, updatingBanner, deletingBanner } from '../../store/action';
import Loader from "react-loader-spinner";

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
    width: '150px',
    display: 'block',
    margin: '0 auto',
  },
  img: {
    width: '500px',
  }
}));

const Banners = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  // Add Banner
  const [modal, setModal] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState('');

  // Edit Banner
  const [editModal, setEditModal] = useState(false);
  const [editId, setEditId] = useState(0);
  const [editImageUrl, setEditImageUrl] = useState('');
  const [editName, setEditName] = useState('');
  const [editStatus, setEditStatus] = useState('');

  const banners = useSelector(state => state.banner.banners);

  useEffect(async () => {
    await dispatch(gettingBanners());
  }, []);
  const toggle = () => setModal(!modal);
  const editToggle = () => setEditModal(!editModal);
  return (
    <div className={classes.scaffold}>
      <div className={classes.container}>
        <Typography className={classes.title}>Banners List</Typography>
        {banners.length > 0 ? <div style={{ display: 'flex', width: '100%', justifyContent: 'end' }}>
          <Button color="primary" className={classes.button} onClick={toggle}><FontAwesomeIcon icon={faPlus}></FontAwesomeIcon> &nbsp;Add Banner</Button>
        </div> : null}
        {banners.length > 0 ? <Table>
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
            {banners.map((res, index) => (
              <tr className={classes.tableRow}>
                <th className={classes.tr} scope="row">{index + 1}</th>
                <td className={classes.tr}><img className={classes.img} src={res.image_url} /></td>
                <td className={classes.tr}>{res.name}</td>
                <td className={classes.tr}>{String(res.status)[0].toUpperCase() + String(res.status).slice(1)}</td>
                <td className={classes.trLast}><Button outline color="primary" onClick={(e) => {
                  e.preventDefault();
                  setEditId(res.banner_id);
                  setEditImageUrl(res.image_url);
                  setEditName(res.name);
                  setEditStatus(res.status);
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
                      dispatch(deletingBanner(res.banner_id));
                      Toast.fire({
                        icon: 'success',
                        title: `Successfully deleted ${res.name}!`
                      });
                    }
                  })
                }} className={classes.tableButton}><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon> Delete</Button></td>
              </tr>
            ))
            }
          </tbody>
        </Table> : <div style={{ width: '100%', margin: '0 auto' }}>
          <Loader
            style={{ textAlign: 'center', marginTop: '100px' }}
            type="Puff"
            color="#00BFFF"
            height={150}
            width={150}
            timeout={10000000}
          />
          <h2 style={{ textAlign: 'center' }}>Loading...</h2>
        </div>}
      </div>
      <Modal style={{ zIndex: 5 }} isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add A Banner</ModalHeader>
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
              <Label className={classes.label}>Status</Label>
              <select onChange={(e) => { setStatus(e.target.value) }} class="form-select" aria-label="Default select example">
                <option value="" selected>=== SELECT STATUS ===</option>
                <option value="true">True</option>
                <option value="false">False</option>
              </select>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={(e) => {
            e.preventDefault();
            if (imageUrl == "" || name == "" || status == "") {
              Swal.fire({
                icon: 'error',
                title: 'Error...',
                text: 'All fields must be filled!',
              });
            } else {
              dispatch(addingBanner(imageUrl, name, status));
              setImageUrl('');
              setName('');
              setStatus('');
              console.log('Hello');
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
            setStatus('');
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
              <Label className={classes.label}>Status</Label>
              <select onChange={(e) => {
                setEditStatus(e.target.value);
              }} class="form-select" aria-label="Default select example">
                <option value="True" selected={editStatus == true ? true : false}>True</option>
                <option value="False" selected={editStatus == false ? true : false}>False</option>
              </select>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={(e) => {
            e.preventDefault();
            if (editImageUrl == "" || editName == "" || editStatus == "") {
              Swal.fire({
                icon: 'error',
                title: 'Error...',
                text: 'All fields must be filled!',
              });
            } else {
              dispatch(updatingBanner(editId, editImageUrl, editName, editStatus));
              Toast.fire({
                icon: 'success',
                title: `Successfully edited a banner!`
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