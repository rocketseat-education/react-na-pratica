import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Toaster } from 'sonner'
import './globals.css'
import { Tags } from './pages/tags/tags'

const queryClient = new QueryClient()

const router = createBrowserRouter([
	{
		path: '/',
		element: <Tags />,
	},
])

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<Toaster />
			<RouterProvider router={router} />
		</QueryClientProvider>
	</React.StrictMode>
)
