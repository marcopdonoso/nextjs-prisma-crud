import TaskCard from '@/components/TaskCard'

async function loadTasks() {
	const response = await fetch('http://localhost:3000/api/tasks')
	return await response.json()
}

const HomePage = async () => {
	const tasks = await loadTasks()
	console.log(tasks)
	return (
		<section className="container mx-auto mt-10">
			<div className="grid grid-cols-3 gap-3">
				{tasks.map(task => (
					<TaskCard key={task.id} task={task} />
				))}
			</div>
		</section>
	)
}

export default HomePage
