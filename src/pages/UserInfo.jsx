import { MDBBtn } from 'mdb-react-ui-kit'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
function UserInfo() {
  const { users } = useSelector((state) => state.data)
  const { id } = useParams()
  const singleUser = users.find((item) => item.id === id)
  return (
    <div style={{ marginTop: '150px' }}>
      <div
        className='row'
        style={{
          margin: 'auto',
          padding: '15px',
          maxWidth: '450px',
          alignItems: 'center',
        }}
      >
        <p className='col-md-12 fs-3'>User Detail</p>
        <hr />
        <p className='col-md-6 fw-bold'>ID:</p>
        <p className='col-md-6 '>{singleUser.id}</p>
        <p className='col-md-6 fw-bold'>Name:</p>
        <p className='col-md-6 '>{singleUser.name}</p>
        <p className='col-md-6 fw-bold'>Email:</p>
        <p className='col-md-6 '>{singleUser.email}</p>
        <p className='col-md-6 fw-bold'>Phone:</p>
        <p className='col-md-6 '>{singleUser.phone}</p>
        <p className='col-md-6 fw-bold'>Address:</p>
        <p className='col-md-6 '>{singleUser.address}</p>
      </div>
      <MDBBtn>
        <Link to='/' className='text-white'>
          Go Back
        </Link>
      </MDBBtn>
    </div>
  )
}

export default UserInfo
