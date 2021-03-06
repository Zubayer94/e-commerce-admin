import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import axios from 'axios'

import PageTitle from '../../components/Typography/PageTitle'
import { Input, Label, Select, Button, Textarea } from '@windmill/react-ui'
import { Toast } from '../../utils/SwalUti';

function ProductCreate() {
  const history = useHistory()
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const [qty, setQty] = useState('')
  const [category_id, setCategoryId] = useState('')
  const [image, setImage] = useState('')
  const [description, setDescription] = useState('')
  const [allCategories, setAllCategories] = useState('')

  const getBase64 = (file) => new Promise(function (resolve, reject) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject('Error: ', error);
  })

  const handleImage = (e) => {
    const file = e.target.files[0];
    getBase64(file)
      .then((result) => {
        setImage(result);
      })
      .catch(e => console.log(e))
  }

  const createProduct = async (e) => {
    e.preventDefault();
    await axios.post('/products', { title, price, qty, category_id, image, description })
      .then(_ => {
        Toast.fire({
          icon: 'success',
          title: 'Added successfully'
        })
        history.push(`/app/products`)
      })
      .catch(error => {
        console.log('error ' + error)
      })
  }

  useEffect(() => {
    axios.get(`categories`)
    .then(res => setAllCategories(res.data.categories))
    .catch(err => console.log("error occured while getting all categories",err))
  }, [])

  return (
    <>
      <PageTitle>Product Create</PageTitle>
      <form onSubmit={createProduct} >
        <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
          <Label>
            <span>Product Title</span>
            <Input className="mt-1" onChange={e => setTitle(e.target.value)} placeholder="Title" />
          </Label>
          
          <Label className="mt-4">
            <span>Product Price</span>
            <Input className="mt-1" onChange={e => setPrice(e.target.value)} type="number" placeholder="0000 ???" />
          </Label>
          
          <Label className="mt-4">
            <span>Product Image</span>
            <Input className="mt-1" type="file" placeholder="Upload Image" onChange={(e) => handleImage(e)} />
          </Label>

          <Label className="mt-4">
            <span>Product Unit</span>
            <Input className="mt-1" onChange={e => setQty(e.target.value)} type="number" placeholder="Unit" />
          </Label>

          <Label className="mt-4">
            <span>Select Product Category</span>
            <Select className="mt-1" onChange={(e) => setCategoryId(e.target.value)} >
              <option value="">Open this to select menu</option>
              {
                !!allCategories && allCategories.map((allCategory, index) => (
                  <option value={allCategory.id} key={index} >{allCategory.title}</option>
                ))
              }
            </Select>
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

export default ProductCreate
