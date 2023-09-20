'use client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const NewPage = ({ params }) => {
	const router = useRouter()
	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')

	useEffect(() => {
		if (params.id) {
			fetch(`/api/tasks/${params.id}`)
				.then(response => response.json())
				.then(data => {
					setTitle(data.title)
					setDescription(data.description)
				})
		}
	}, [])

	const handleSubmit = async e => {
		e.preventDefault()
		if (params.id) {
			const response = await fetch(`/api/tasks/${params.id}`, {
				method: 'PUT',
				body: JSON.stringify({ title, description }),
				header: {
					'Content-Type': 'application/json',
				},
			})
			const data = await response.json()
			console.log(data)
		} else {
			const response = await fetch('/api/tasks', {
				method: 'POST',
				body: JSON.stringify({ title, description }),
				header: {
					'Content-Type': 'application/json',
				},
			})
			const data = await response.json()
		}
		router.refresh()
		router.push('/')
	}

	return (
		<div className="h-screen flex justify-center items-center">
			<form className="bg-slate-800 p-10 w-1/2" onSubmit={handleSubmit}>
				<label htmlFor="title" className="font-bold text-sm">
					Título de la tarea
				</label>
				<input
					type="text"
					id="title"
					className="border-gray-400 p-2 mb-4 w-full text-black"
					placeholder="Título"
					onChange={e => setTitle(e.target.value)}
					value={title}
				/>
				<label htmlFor="description" className="font-bold text-sm">
					Descripción de la tarea
				</label>
				<textarea
					id="description"
					rows="3"
					className="border-gray-400 p-2 mb-4 w-full text-black"
					placeholder="Describe tu tarea"
					onChange={e => setDescription(e.target.value)}
					value={description}
				/>
				<div className="flex justify-between">
					<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
						Crear
					</button>
					{params.id && (
						<button
							className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
							type="button"
							onClick={async () => {
								const response = await fetch(`/api/tasks/${params.id}`, {
									method: 'DELETE',
								})
								const data = await response.json()
								router.refresh()
								router.push('/')
							}}
						>
							Borrar
						</button>
					)}
				</div>
			</form>
		</div>
	)
}

export default NewPage
