import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import axios from 'axios'
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
  TableFooter,
  TableContainer,
  Badge,
  Avatar,
  Button,
  Input,
  Label,
  Pagination,
} from '@windmill/react-ui'
import { EditIcon, TrashIcon, AscIcon, DescIcon, SearchIcon, BackspaceIcon} from '../../icons';
import PageTitle from '../../components/Typography/PageTitle'
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../Store/Slices/productSlice';
import { swalDel, Toast } from '../../utils/SwalUti';

function Product() {
  const history = useHistory()
  const productsPagination = useSelector(state => state.entities.product.productsPagination)
  const products = useSelector(state => state.entities.product.products)
  const dispatch = useDispatch()
  const [title, setTitle] = useState('')
  
  const reidrectProductEdit = (id) => history.push(`/app/products-update/${id}`) // history.push(`/products-update/${id}`)

  const handleDelete = (id) => {
    swalDel('This product would be deleted permanently!')
    .then((result) => {
      if (result.value) {
        axios.delete(`/products/${id}`)
        .then(_ => {
          Toast.fire({
            icon: 'success',
            title: 'Deleted successfully'
          })
          getAllProducts(productsPagination.current_page)
        })
        .catch(error => {
          console.log(error);
        })
      }
    })
  }

  const getAllProducts = (page) => {
    dispatch(getProducts({ page: page, title } ))
  }
  useEffect(() => {
    getAllProducts(productsPagination.current_page)
  }, [title])

  return (
    <>
      <PageTitle>Product List</PageTitle>

      <div className="grid grid-cols-1 mb-2">
        <div className="col-start-1 col-end-8" >
          <Input placeholder="Search Product by Title" onChange={e => setTitle(e.target.value)} />
        </div>
      </div>

      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Unit</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Actions</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {
              !!products && products.map((product, index) => (
                <TableRow key={index} >
                  <TableCell>
                    <p className="font-semibold">{product.id}</p>
                  </TableCell>

                  <TableCell>
                    <p className="font-semibold">{product.title}</p>
                  </TableCell>

                  <TableCell>
                    <span className="text-sm">{product.price}</span>
                  </TableCell>

                  <TableCell>
                    <span className="text-sm">Image</span>
                  </TableCell>

                  <TableCell>
                    <span className="text-sm">{product.qty}</span>
                  </TableCell>

                  <TableCell>
                    <span className="text-sm">{product.category_title}</span>
                  </TableCell>

                  <TableCell>
                    <span className="text-sm">{product.created_at}</span>
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center space-x-4">
                      <Button layout="link" size="icon" aria-label="Edit" onClick={() => reidrectProductEdit(product.id)}>
                        <EditIcon className="w-5 h-5" aria-hidden="true" />
                      </Button>
                      <Button layout="link" size="icon" aria-label="Delete">
                        <TrashIcon className="w-5 h-5" aria-hidden="true" onClick={() => handleDelete(product.id)} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
        {
          !!productsPagination.total ?
            <TableFooter>
              <Pagination
                totalResults={productsPagination.total}
                resultsPerPage={15}
                onChange={(e) => getAllProducts(e)}
                label="Table navigation"
              />
            </TableFooter>
          :
          null
        }
      </TableContainer>
    </>
  )
}

export default Product
