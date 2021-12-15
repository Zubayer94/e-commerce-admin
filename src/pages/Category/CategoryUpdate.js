import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import axios from 'axios'

import { Input, Label, Select, Button, Textarea } from '@windmill/react-ui'
import PageTitle from '../../components/Typography/PageTitle'
import { Toast } from '../../utils/SwalUti';

function CategoryUpdate({ match }) {
    const history = useHistory()
    const [id, setID] = useState('')
    const [title, setTitle] = useState('')
    const [is_active, setIsActive] = useState('')
    const [description, setDescription] = useState('')

    const updateCategory = async (e) => {
        e.preventDefault();
        await axios.put(`/categories/${id}`, { title, is_active, description })
            .then(_ => {
                Toast.fire({
                    icon: 'success',
                    title: 'Updated successfully'
                })
                history.push(`/app/categories`)
            })
            .catch(error => {
                console.log('error ' + error)
            })
    }

    const getThisCategory = () => {
        axios.get(`/categories/${match.params.id}`)
            .then(({ data: { category } }) => {
                setID(category.id)
                setTitle(category.title)
                setIsActive(category.is_active)
                setDescription(category.description)
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        getThisCategory()
    }, [match.params.id])

    return (
        <>
            <PageTitle>Category Update</PageTitle>
            <form onSubmit={updateCategory} >
                <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
                    <Label>
                        <span>Category Title</span>
                        <Input className="mt-1" value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" />
                    </Label>

                    <Label className="mt-4">
                        <span className="mb-2">Product status</span> <br />
                        <label className="inline-flex items-center">
                            <input type="radio" onChange={e => setIsActive(e.target.value)} className="form-radio text-green-600" checked={is_active == 1} name="is_active" value="1" />
                            <span className="ml-2">Active</span>
                        </label>
                        <label className="inline-flex items-center ml-6">
                            <input type="radio" checked={is_active == 0} onChange={e => setIsActive(e.target.value)} className="form-radio text-pink-600" name="is_active" value="0" />
                            <span className="ml-2">Inactive</span>
                        </label>
                    </Label>

                    <Label className="mt-4">
                        <span>Description</span>
                        <Textarea className="mt-1" value={description} onChange={e => setDescription(e.target.value)} placeholder="Description here..." ></Textarea>
                    </Label>

                    <div>
                        <Button className="mt-4" size="large" type="submit" >Update</Button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default CategoryUpdate
