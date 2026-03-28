import { useEffect, useState } from 'react'
import { Box, Typography, Button, Card, CardContent, CardActions, Grid, Chip } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import API from '../api/axios'
import ImageSlider from '../components/ImageSlider'

export default function ProductList() {
  const [products, setProducts] = useState([])
  const navigate = useNavigate()

  const fetchProducts = async () => {
    const res = await API.get('/products')
    setProducts(res.data)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Delete this product?')) {
      await API.delete(`/products/${id}`)
      fetchProducts()
    }
  }

  useEffect(() => { fetchProducts() }, [])

  return (
    <Box sx={{ p: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Products</Typography>
        <Button variant="contained" onClick={() => navigate('/add-product')}>+ Add Product</Button>
      </Box>
      <Grid container spacing={3}>
        {products.map((p) => (
          <Grid item xs={12} sm={6} md={4} key={p._id}>
            <Card elevation={3}>
              {p.gallery?.length > 0 && <ImageSlider images={p.gallery} />}
              <CardContent>
                <Typography variant="h6">{p.productName}</Typography>
                <Typography variant="body2" color="text.secondary">{p.metaTitle}</Typography>
                <Box sx={{ mt: 1 }}>
                  <Chip label={`₹${p.discountedPrice}`} color="success" size="small" sx={{ mr: 1 }} />
                  <Chip label={`MRP ₹${p.price}`} size="small" sx={{ textDecoration: 'line-through' }} />
                </Box>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => navigate(`/edit-product/${p._id}`)}>Edit</Button>
                <Button size="small" color="error" onClick={() => handleDelete(p._id)}>Delete</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}