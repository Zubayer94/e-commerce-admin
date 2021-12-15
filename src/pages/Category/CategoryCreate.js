import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import axios from 'axios'

import PageTitle from '../../components/Typography/PageTitle'
import { Input, Label, Button, Textarea } from '@windmill/react-ui'
import { Toast } from '../../utils/SwalUti';

function CategoryCreate() {
    const history = useHistory()
    const [title, setTitle] = useState('')
    const [is_active, setIsActive] = useState("1")
    const [description, setDescription] = useState('')

    const createCategory = async (e) => {
        e.preventDefault();
        await axios.post('/categories', { title, is_active, description })
            .then(_ => {
                Toast.fire({
                    icon: 'success',
                    title: 'Added successfully'
                })
                history.push(`/app/categories`)
            })
            .catch(error => {
                console.log('error ' + error)
            })
    }

    return (
        <>
            <PageTitle>Category Create</PageTitle>
            <form onSubmit={createCategory} >
                <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
                    <Label>
                        <span>Product Title</span>
                        <Input className="mt-1" onChange={e => setTitle(e.target.value)} placeholder="Title" />
                    </Label>

                    <Label className="mt-4">
                        <span className="mb-2">Product status</span> <br />
                        <label className="inline-flex items-center">
                            <input type="radio" checked={is_active == 1} onChange={e => setIsActive(e.target.value)} className="form-radio text-green-600" name="is_active" value="1" />
                                <span className="ml-2">Active</span>
                        </label>
                        <label className="inline-flex items-center ml-6">
                            <input type="radio" checked={is_active == 0} onChange={e => setIsActive(e.target.value)} className="form-radio text-pink-600" name="is_active" value="0" />
                                <span className="ml-2">Inactive</span>
                        </label>
                    </Label>

                    <Label className="mt-4">
                        <span>Description</span>
                        <Textarea className="mt-1" onChange={e => setDescription(e.target.value)} placeholder="Description here..." ></Textarea>
                    </Label>

                    <div>
                        <Button className="mt-4" size="large" type="submit" >Create</Button>
                    </div>

                </div>
            </form>
        </>
    )
}

export default CategoryCreate
