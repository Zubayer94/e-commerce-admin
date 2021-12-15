import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import axios from 'axios'

import { Input, Label, Select, Button, Textarea } from '@windmill/react-ui'
import PageTitle from '../../components/Typography/PageTitle'
import { Toast } from '../../utils/SwalUti';

function OrderUpdate({ match }) {
  const history = useHistory()
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const [qty, setQty] = useState('')
  const [category_id, setCategoryId] = useState('')
  const [image, setImage] = useState('')
  const [description, setDescription] = useState('')
  const [allCategories, setAllCategories] = useState('')
  const [showImage, setShowImage] = useState('')
  const [id, setID] = useState('')

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

  const updateOrder = async (e) => {
    e.preventDefault();
    await axios.put(`/orders/${id}`, { title, price, qty, category_id, image, description })
      .then(_ => {
        Toast.fire({
          icon: 'success',
          title: 'Updated successfully'
        })
        history.push(`/app/orders`)
      })
      .catch(error => {
        console.log('error ' + error)
      })
  }

  const getCategories = () => {
    axios.get(`categories`)
      .then(res => setAllCategories(res.data.categories))
      .catch(err => console.log("error occured while getting all categories", err))
  }
  const getThisOrder = () => {
    axios.get(`/orders/${match.params.id}`)
      .then(({ data: { order } }) => {
        setID(order.id)
        setTitle(order.title)
        setPrice(order.price)
        setQty(order.qty)
        setCategoryId(order.category_id)
        setShowImage(order.image)
        setDescription(order.description)
      })
      .catch(err => {
        console.log(err)
      }) 
  }

  useEffect(() => {
    getThisOrder()
    getCategories()
    
  }, [match.params.id])

  return (
    <>
      <PageTitle>Order Update</PageTitle>
      <form onSubmit={updateOrder} >
        <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
          <Label>
            <span>Order Title</span>
            <Input className="mt-1" value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" />
          </Label>

          <Label className="mt-4">
            <span>Order Price</span>
            <Input className="mt-1" value={price} onChange={e => setPrice(e.target.value)} type="number" placeholder="0000 ৳" />
          </Label>

          <Label className="mt-4">
            <span className='mr-2'>Order Current Image</span>
            <img className="inline w-1/4 h-1/4" src={showImage} alt="Order"></img>
          </Label>

          <Label className="mt-4">
            <span>Order Image</span>
            <Input className="mt-1" type="file" placeholder="Upload Image" onChange={(e) => handleImage(e)} />
          </Label>

          <Label className="mt-4">
            <span>Order Unit</span>
            <Input className="mt-1" value={qty} onChange={e => setQty(e.target.value)} type="number" placeholder="Unit" />
          </Label>

          <Label className="mt-4">
            <span>Select Order Category</span>
            <Select className="mt-1" value={category_id} onChange={(e) => setCategoryId(e.target.value)} >
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

export default OrderUpdate
