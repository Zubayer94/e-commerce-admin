import React, { useEffect } from 'react'
import axios from 'axios';

import PageTitle from '../../components/Typography/PageTitle'

function Product() {

  useEffect(() => {
    axios.get(`/demo`)
      .then(response => console.log(response))
      .catch(err => console.log(err))
  }, [])

  return (
    <>
      <PageTitle>Product List</PageTitle>
    </>
  )
}

export default Product
