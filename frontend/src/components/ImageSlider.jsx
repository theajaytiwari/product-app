import { useState } from 'react'
import { Box, IconButton } from '@mui/material'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

export default function ImageSlider({ images }) {
  const [current, setCurrent] = useState(0)
  const [mainImage, setMainImage] = useState(images[0])

  const prev = () => setCurrent((c) => (c === 0 ? images.length - 1 : c - 1))
  const next = () => setCurrent((c) => (c === images.length - 1 ? 0 : c + 1))

  return (
    <Box>
      <Box sx={{ textAlign: 'center', mb: 2 }}>
        <img src={mainImage} alt="main" style={{ width: '100%', maxHeight: 400, objectFit: 'contain', borderRadius: 8 }} />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <IconButton onClick={prev}><ArrowBackIosIcon /></IconButton>
        <Box sx={{ display: 'flex', gap: 1, overflow: 'hidden', flexGrow: 1, justifyContent: 'center' }}>
          {images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`slide-${i}`}
              onClick={() => setMainImage(img)}
              style={{
                width: 80, height: 80, objectFit: 'cover', borderRadius: 6, cursor: 'pointer',
                border: mainImage === img ? '3px solid #1976d2' : '2px solid #ccc'
              }}
            />
          ))}
        </Box>
        <IconButton onClick={next}><ArrowForwardIosIcon /></IconButton>
      </Box>
    </Box>
  )
}