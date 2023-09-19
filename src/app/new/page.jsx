'use client'
import { useRouter } from 'next/navigation'

const NewPage = () => {
	const router = useRouter()

	const onSubmit = async e => {
		e.preventDefault()
		const title = e.target.title.value
		const description = e.target.description.value

		const response = await fetch('/api/tasks', {
			method: 'POST',
			body: JSON.stringify({ title, description }),
			header: {
				'Content-Type': 'application/json',
			},
		})

		const data = await response.json()
		console.log(data)
		router.push('/')
	}

	return (
		<div className="h-screen flex justify-center items-center">
			<form className="bg-slate-800 p-10 w-1/2" onSubmit={onSubmit}>
				<label htmlFor="title" className="font-bold text-sm">
					Título de la tarea
				</label>
				<input
					type="text"
					id="title"
					className="border-gray-400 p-2 mb-4 w-full text-black"
					placeholder="Título"
				/>
				<label htmlFor="description" className="font-bold text-sm">
					Descripción de la tarea
				</label>
				<textarea
					id="description"
					rows="3"
					className="border-gray-400 p-2 mb-4 w-full text-black"
					placeholder="Describe tu tarea"
				/>
				<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4">
					Crear
				</button>
			</form>
		</div>
	)
}

export default NewPage
