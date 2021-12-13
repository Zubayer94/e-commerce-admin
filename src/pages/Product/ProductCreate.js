import React, { useState } from 'react'
import PageTitle from '../../components/Typography/PageTitle'
import { Input, HelperText, Label, Select, Textarea } from '@windmill/react-ui'

function ProductCreate() {
  const [categoryId, setCategoryId] = useState('')
  return (
    <>
      <PageTitle>Product Create</PageTitle>

      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <Label>
          <span>Product Title</span>
          <Input className="mt-1" placeholder="Jane Doe" />
          <HelperText>Your password must be at least 6 characters long.</HelperText>
        </Label>
        
        <Label className="mt-4">
          <span>Product Price</span>
          <Input className="mt-1" placeholder="Jane Doe" />
          <HelperText>Your password must be at least 6 characters long.</HelperText>
        </Label>
        
        <Label className="mt-4">
          <span>Product Image</span>
          <Input className="mt-1" placeholder="Jane Doe" />
          <HelperText>Your password must be at least 6 characters long.</HelperText>
        </Label>

        <Label className="mt-4">
          <span>Product Unit</span>
          <Input className="mt-1" placeholder="Jane Doe" />
          <HelperText>Your password must be at least 6 characters long.</HelperText>
        </Label>

        <Label className="mt-4">
          <span>Select Product Category</span>
          <Select className="mt-1" onChange={(e) => setCategoryId(e.target.value)} >
            <option value="">Open this select menu</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </Select>
        </Label>
      </div>
    </>
  )
}

export default ProductCreate
