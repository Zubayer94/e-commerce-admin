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
    Button,
    Input,
    Pagination,
} from '@windmill/react-ui'
import { EditIcon, TrashIcon} from '../../icons';
import PageTitle from '../../components/Typography/PageTitle'
import { useDispatch, useSelector } from 'react-redux';
import { swalDel, Toast } from '../../utils/SwalUti';
import { getCategories } from '../../Store/Slices/categorySlice';

function Category() {
    const history = useHistory()
    const categoryPagination = useSelector(state => state.entities.category.categoryPagination)
    const categories = useSelector(state => state.entities.category.categories)
    const dispatch = useDispatch()
    const [title, setTitle] = useState('')

    const reidrectCategoryEdit = (id) => history.push(`/app/category-update/${id}`)

    const handleDelete = (id) => {
        swalDel('This category would be deleted permanently!')
            .then((result) => {
                if (result.value) {
                    axios.delete(`/categories/${id}`)
                        .then(_ => {
                            Toast.fire({
                                icon: 'success',
                                title: 'Deleted successfully'
                            })
                            getAllcategories(categoryPagination.current_page)
                        })
                        .catch(error => {
                            console.log(error);
                        })
                }
            })
    }

    const getAllcategories = (page) => {
        dispatch(getCategories({ page: page, length: 15, title }))
    }
    useEffect(() => {
        getAllcategories(categoryPagination.current_page)
    }, [title])

    return (
        <>
            <PageTitle>Category List</PageTitle>

            <div className="grid grid-cols-1 mb-2">
                <div className="col-start-1 col-end-8" >
                    <Input placeholder="Search Category by Title" onChange={e => setTitle(e.target.value)} />
                </div>
            </div>

            <TableContainer className="mb-8">
                <Table>
                    <TableHeader>
                        <tr>
                            <TableCell>ID</TableCell>
                            <TableCell>Title</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Created At</TableCell>
                            <TableCell>Actions</TableCell>
                        </tr>
                    </TableHeader>
                    <TableBody>
                        {
                            !!categories && categories.map((category, index) => (
                                <TableRow key={index} >
                                    <TableCell>
                                        <p className="font-semibold">{category.id}</p>
                                    </TableCell>

                                    <TableCell>
                                        <p className="font-semibold">{category.title}</p>
                                    </TableCell>

                                    <TableCell>
                                        {
                                            category.is_active ? 
                                                <span className="bg-green-700 text-green-100 py-2 px-4 rounded-full text-xs font-bold">Active</span>
                                                :
                                                <span className="bg-red-600 text-red-100 py-2 px-4 rounded-full text-xs font-bold">inactive</span>
                                        }
                                    </TableCell>

                                    <TableCell>
                                        <span className="text-sm">{category.created_at}</span>
                                    </TableCell>

                                    <TableCell>
                                        <div className="flex items-center space-x-4">
                                            <Button layout="link" size="icon" aria-label="Edit" onClick={() => reidrectCategoryEdit(category.id)}>
                                                <EditIcon className="w-5 h-5" aria-hidden="true" />
                                            </Button>
                                            <Button layout="link" size="icon" aria-label="Delete">
                                                <TrashIcon className="w-5 h-5" aria-hidden="true" onClick={() => handleDelete(category.id)} />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
                {
                    !!categoryPagination.total ?
                        <TableFooter>
                            <Pagination
                                totalResults={categoryPagination.total}
                                resultsPerPage={15}
                                onChange={(e) => getAllcategories(e)}
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

export default Category
