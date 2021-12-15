import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
  TableFooter,
  TableContainer,
  Button,
  Input,
  Pagination,
  Label,
  Select,
  Modal, ModalHeader, ModalBody, ModalFooter,
} from '@windmill/react-ui'
import { EditIcon, TrashIcon, AscIcon, DescIcon} from '../../icons';
import PageTitle from '../../components/Typography/PageTitle'
import { useDispatch, useSelector } from 'react-redux';
import { getOrders } from '../../Store/Slices/orderSlice';
import { swalDel, Toast } from '../../utils/SwalUti';

function Order() {
  const dispatch = useDispatch()
  const ordersPagination = useSelector(state => state.entities.order.ordersPagination)
  const orders = useSelector(state => state.entities.order.orders)
  const [title, setTitle] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [status, setStatus] = useState('')
  const [unit, setUnit] = useState('')
  const [currentOrderId, setcurrentOrderId] = useState('')

  const openModal = (id) => {
    axios.get(`/orders/${id}`)
      .then(({ data: { order } }) => {
        setStatus(order.status)
        setcurrentOrderId(id)
        setUnit(order.unit)
        setIsModalOpen(true)
      })
      .catch(err => {
        console.log(err)
      }) 
  }

  function closeModal() {
    setIsModalOpen(false)
  }

  const handleOrderUpdate = async (e) => {
    e.preventDefault();
    await axios.put(`/orders/${currentOrderId}`, { status, unit })
      .then(_ => {
        Toast.fire({
          icon: 'success',
          title: 'Updated successfully'
        })
        getAllOrders(ordersPagination.current_page)
        setIsModalOpen(false)
      })
      .catch(error => {
        console.log('error ' + error)
      })
  }
  
  const handleDelete = (id) => {
    swalDel('This order would be deleted permanently!')
    .then((result) => {
      if (result.value) {
        axios.delete(`/orders/${id}`)
        .then(_ => {
          Toast.fire({
            icon: 'success',
            title: 'Deleted successfully'
          })
          getAllOrders(ordersPagination.current_page)
        })
        .catch(error => {
          console.log(error);
        })
      }
    })
  }

  const getAllOrders = (page) => {
    dispatch(getOrders({ page: page, length: 15, title } ))
  }
  useEffect(() => {
    getAllOrders(ordersPagination.current_page)
  }, [title])

  return (
    <>
      <PageTitle>Order List</PageTitle>

      <div className="grid grid-cols-1 mb-2">
        <div className="col-start-1 col-end-8" >
          <Input placeholder="Search Order by Title" onChange={e => setTitle(e.target.value)} />
        </div>
      </div>

      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>ID</TableCell>
              <TableCell>UID</TableCell>
              <TableCell>Product Title</TableCell>
              <TableCell>Product Price</TableCell>
              <TableCell>Product Image</TableCell>
              <TableCell>Unit</TableCell>
              <TableCell>Customer Name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Actions</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {
              !!orders && orders.map((order, index) => (
                <TableRow key={index} >
                  <TableCell>
                    <p className="font-semibold">{order.id}</p>
                  </TableCell>

                  <TableCell>
                    <p className="font-semibold">{order.uid}</p>
                  </TableCell>

                  <TableCell>
                    <span className="text-sm">{order.product_title}</span>
                  </TableCell>

                  <TableCell>
                    <span className="text-sm">{order.product_price}</span>
                  </TableCell>

                  <TableCell>
                    <span className="text-sm">
                      <img className="inline w-1/3 h-1/3" src={order.image} alt="Order Image"></img>
                    </span>
                  </TableCell>

                  <TableCell>
                    <span className="text-sm">{order.unit}</span>
                  </TableCell>

                  <TableCell>
                    <span className="text-sm">{order.u_name}</span>
                  </TableCell>

                  <TableCell>
                    <span className="text-sm">{order.status}</span>
                  </TableCell>

                  <TableCell>
                    <span className="text-sm">{order.created_at}</span>
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center space-x-4">
                    <span className="text-sm">{order.created_at}</span>
                      <Button layout="link" size="icon" aria-label="Edit" onClick={() => openModal(order.id)}>
                        <EditIcon className="w-5 h-5" aria-hidden="true" />
                      </Button>

                      <Button layout="link" size="icon" aria-label="Delete">
                        <TrashIcon className="w-5 h-5" aria-hidden="true" onClick={() => handleDelete(order.id)} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
        {
          !!ordersPagination.total ?
            <TableFooter>
              <Pagination
                totalResults={ordersPagination.total}
                resultsPerPage={15}
                onChange={(e) => getAllOrders(e)}
                label="Table navigation"
              />
            </TableFooter>
          :
          null
        }
      </TableContainer>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalHeader>Update Status</ModalHeader>
        <form onSubmit={handleOrderUpdate} >
          <ModalBody>
            <Label className="mt-4">
              <span>Select Order Status</span>
              <Select className="mt-1" value={status} onChange={(e) => setStatus(e.target.value)} >
                <option value="">Open this to select status</option>
                <option value="Approved" key="Approved" >Approved</option>
                <option value="Rejected" key="Rejected" >Rejected</option>
                <option value="Processing" key="Processing" >Processing</option>
                <option value="Shipped" key="Shipped" >Shipped</option>
                <option value="Delivered" key="Delivered" >Delivered</option>
              </Select>
            </Label>
          </ModalBody>
          <ModalFooter>
            <div className="hidden sm:block">
              <Button layout="outline" onClick={closeModal}>
                Cancel
              </Button>
            </div>
            <div className="hidden sm:block" >
              <Button type="submit" >Accept</Button>
            </div>
          </ModalFooter>
        </form>
      </Modal>
    </>
  )
}

export default Order
