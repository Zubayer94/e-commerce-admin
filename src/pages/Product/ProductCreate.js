import React, { useState, useEffect } from 'react'
import PageTitle from '../../components/Typography/PageTitle'
import { Input, Label, Select, Button, Textarea } from '@windmill/react-ui'
import { useHistory } from 'react-router-dom';
import axios from 'axios'
import { Toast } from '../../utils/SwalUti';

function ProductCreate() {
  const history = useHistory()
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const [unit, setUnit] = useState('')
  const [categoryId, setCategoryId] = useState('')
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

  const createProduct = () => {
    axios.post('/products', { title, price, unit, categoryId, image, description })
      .then((response) => {
        Toast.fire({
          icon: 'success',
          title: 'Added successfully'
        })
        history.push(`/app/products`)
      })
      .catch(error => {
        this.errors = error.response.data.errors
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

      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <Label>
          <span>Product Title</span>
          <Input className="mt-1" onChange={e => setTitle(e.target.value)} placeholder="Title" />
        </Label>
        
        <Label className="mt-4">
          <span>Product Price</span>
          <Input className="mt-1" onChange={e => setPrice(e.target.value)} type="number" placeholder="0000 ৳" />
        </Label>
        
        <Label className="mt-4">
          <span>Product Image</span>
          <Input className="mt-1" type="file" placeholder="Upload Image" onChange={(e) => handleImage(e)} />
        </Label>

        <Label className="mt-4">
          <span>Product Unit</span>
          <Input className="mt-1" onChange={e => setUnit(e.target.value)} type="number" placeholder="Unit" />
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
          <textarea className="resize rounded-md w-full" onChange={e => setDescription(e.target.value)} ></textarea>
        </Label>
        
        <Button layout="link" size="large">
          Large Button
        </Button>

      </div>
    </>
  )
}

export default ProductCreate
