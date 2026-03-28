import { useState, useEffect } from 'react'
import { Box, TextField, Button, Typography, Paper } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import API from '../api/axios'

export default function ProductForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = Boolean(id)

  const [form, setForm] = useState({
    metaTitle: '', productName: '', slug: '',
    price: '', discountedPrice: '', description: '', gallery: ''
  })
  const [error, setError] = useState('')

  useEffect(() => {
    if (isEdit) {
      API.get(`/products/${id}`).then((res) => {
        const p = res.data
        setForm({ ...p, gallery: p.gallery?.join(', ') || '' })
      })
    }
  }, [id])

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async () => {
    try {
      const payload = {
        ...form,
        gallery: form.gallery.split(',').map((g) => g.trim()).filter(Boolean),
        price: Number(form.price),
        discountedPrice: Number(form.discountedPrice),
      }
      if (isEdit) await API.put(`/products/${id}`, payload)
      else await API.post('/products', payload)
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong')
    }
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
      <Paper sx={{ p: 4, width: '100%', maxWidth: 700 }}>
        <Typography variant="h5" mb={3}>{isEdit ? 'Edit Product' : 'Add Product'}</Typography>
        {error && <Typography color="error" mb={2}>{error}</Typography>}
        <TextField fullWidth label="Meta Title" name="metaTitle" value={form.metaTitle} onChange={handleChange} sx={{ mb: 2 }} />
        <TextField fullWidth label="Product Name" name="productName" value={form.productName} onChange={handleChange} sx={{ mb: 2 }} />
        <TextField fullWidth label="URL Slug" name="slug" value={form.slug} onChange={handleChange} sx={{ mb: 2 }} />
        <TextField fullWidth label="Gallery Image URLs (comma separated)" name="gallery" value={form.gallery} onChange={handleChange} sx={{ mb: 2 }} />
        <TextField fullWidth label="Price (₹)" name="price" type="number" value={form.price} onChange={handleChange} sx={{ mb: 2 }} />
        <TextField fullWidth label="Discounted Price (₹)" name="discountedPrice" type="number" value={form.discountedPrice} onChange={handleChange} sx={{ mb: 2 }} />
        <Typography mb={1}>Description</Typography>
        <CKEditor
          editor={ClassicEditor}
          data={form.description}
          onChange={(_, editor) => setForm({ ...form, description: editor.getData() })}
        />
        <Button fullWidth variant="contained" sx={{ mt: 3 }} onClick={handleSubmit}>
          {isEdit ? 'Update Product' : 'Add Product'}
        </Button>
      </Paper>
    </Box>
  )
}