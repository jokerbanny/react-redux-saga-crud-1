import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { loadUsersStart, deleteUserStart } from '../redux/actions'
import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBBtn,
  MDBIcon,
  MDBTooltip,
  MDBSpinner,
} from 'mdb-react-ui-kit'

import { Link } from 'react-router-dom'

function Home() {
  const dispatch = useDispatch()

  const { users, loading } = useSelector((state) => state.data)

  useEffect(() => {
    dispatch(loadUsersStart())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete')) {
      dispatch(deleteUserStart(id))
    }
  }

  if (loading) {
    return (
      <MDBSpinner style={{ marginTop: '150px' }} role='status'>
        <span className='visually-hidden'>Loading...</span>
      </MDBSpinner>
    )
  }
  return (
    <div className='container' style={{ marginTop: '150px' }}>
      <MDBTable>
        <MDBTableHead dark>
          <tr>
            <th cope='col'>No.</th>
            <th cope='col'>Name.</th>
            <th cope='col'>Email.</th>
            <th cope='col'>Phone.</th>
            <th cope='col'>Address.</th>
            <th cope='col'>Action.</th>
          </tr>
        </MDBTableHead>
        {users &&
          users.map((item, index) => (
            <MDBTableBody key={index}>
              <tr>
                <th scope='row'>{index + 1}</th>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>{item.address}</td>
                <td>
                  <MDBBtn
                    className='m-1'
                    tag='a'
                    color='none'
                    onClick={() => handleDelete(item.id)}
                  >
                    <MDBTooltip title='Delete' tag='a'>
                      <MDBIcon
                        fas
                        icon='trash'
                        style={{ color: 'red' }}
                        size='lg'
                      />
                    </MDBTooltip>
                  </MDBBtn>{' '}
                  <Link to={`/edit-user/${item.id}`}>
                    <MDBTooltip title='Edit' tag='a'>
                      <MDBIcon
                        fas
                        icon='pen'
                        style={{ color: 'blue', marginBottom: '10px' }}
                        size='lg'
                      />
                    </MDBTooltip>
                  </Link>{' '}
                  <Link to={`/user-info/${item.id}`}>
                    <MDBTooltip title='View' tag='a'>
                      <MDBIcon
                        fas
                        icon='eye'
                        style={{ color: 'green', marginBottom: '10px' }}
                        size='lg'
                      />
                    </MDBTooltip>
                  </Link>{' '}
                </td>
              </tr>
            </MDBTableBody>
          ))}
      </MDBTable>
    </div>
  )
}

export default Home
