import { useEffect, useState } from 'react'
import { MDBValidation, MDBInput, MDBBtn } from 'mdb-react-ui-kit'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { createUserStart, updateUserStart } from '../redux/actions'
import { useParams } from 'react-router-dom'

import { nanoid } from 'nanoid'

const initailState = {
  name: '',
  email: '',
  phone: '',
  address: '',
}
function AddEditUser() {
  const { id } = useParams()
  const { users } = useSelector((state) => state.data)

  const [editMode, setEditMode] = useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [formValue, setFormValue] = useState(initailState)

  const { name, email, phone, address } = formValue

  useEffect(() => {
    if (id) {
      setEditMode(true)
      const singleUser = users.find((item) => item.id === id)
      setFormValue({ ...singleUser })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  const onInputChange = (e) => {
    let { name, value } = e.target
    setFormValue({ ...formValue, id: nanoid(), [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (name && email && phone && address) {
      if (!editMode) {
        dispatch(createUserStart(formValue))
        setTimeout(() => navigate('/'), 500)
      } else {
        dispatch(updateUserStart({ id, formValue }))
        setEditMode(false)
        setTimeout(() => navigate('/'), 500)
      }
    }
  }

  return (
    <MDBValidation
      className='row g-3'
      style={{ marginTop: '100px' }}
      noValidation
      onSubmit={handleSubmit}
    >
      <p className='fs-2 fw-bold'>
        {!editMode ? 'Add User Detail' : 'Update User Detail'}
      </p>
      <div
        style={{
          margin: 'auto',
          padding: '15px',
          maxWidth: '400px',
          alignItems: 'center',
        }}
      >
        <MDBInput
          value={name || ''}
          name='name'
          type='text'
          onChange={onInputChange}
          label='name'
          required
          validation='Please provide a name'
          invalid
        />{' '}
        <br />
        <MDBInput
          value={email || ''}
          name='email'
          type='text'
          onChange={onInputChange}
          label='email'
          required
          validation='Please provide a email'
          invalid
        />{' '}
        <br />
        <MDBInput
          value={phone || ''}
          name='phone'
          type='text'
          onChange={onInputChange}
          label='phone'
          required
          validation='Please provide a phone'
          invalid
        />{' '}
        <br />
        <MDBInput
          value={address || ''}
          name='address'
          type='text'
          onChange={onInputChange}
          label='address'
          required
          validation='Please provide a address'
          invalid
        />
        <br />
        <div className='col-12'>
          <MDBBtn style={{ marginRight: '10px' }} type='submit'>
            {!editMode ? 'ADD' : 'UPDATE'}
          </MDBBtn>
          <MDBBtn color='danger'>
            <Link to='/' className='text-white'>
              {' '}
              Go Back
            </Link>
          </MDBBtn>
        </div>
      </div>
    </MDBValidation>
  )
}

export default AddEditUser
