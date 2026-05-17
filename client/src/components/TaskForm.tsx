import { useState } from "react"

interface Props {
  onCreate: (task: any) => void
}

const TaskForm = ({
  onCreate
}: Props) => {

  const [title, setTitle] = useState("")

  const [description, setDescription] =
    useState("")

  const handleSubmit = (
    e: React.FormEvent
  ) => {

    e.preventDefault()

    onCreate({
      title,
      description,
      priority: "medium"
    })

    setTitle("")
    setDescription("")
  }

  return (

    <form
      onSubmit={handleSubmit}
      className="
        bg-slate-800/50
        border
        border-slate-700
        p-6
        rounded-2xl
        mb-8
      "
    >

      <h2 className="
        text-2xl
        font-bold
        mb-4
      ">
        Create Task
      </h2>

      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
        className="
          w-full
          p-3
          rounded-lg
          bg-slate-700
          mb-4
        "
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) =>
          setDescription(e.target.value)
        }
        className="
          w-full
          p-3
          rounded-lg
          bg-slate-700
          mb-4
        "
      />

      <button
        type="submit"
        className="
          bg-blue-600
          px-6
          py-3
          rounded-lg
          hover:bg-blue-700
          transition
        "
      >
        Add Task
      </button>

    </form>
  )
}

export default TaskForm