import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App, { HomePage, TopicPage, TagPage } from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="tag/:tag" element={<TagPage />} />
          <Route path=":topic" element={<TopicPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
