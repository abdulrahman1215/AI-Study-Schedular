import { useState } from "react"
import API from "../services/api"
import { useDispatch } from "react-redux"
import { setToken } from "../redux/authSlice"
import { useNavigate } from "react-router-dom"

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault()
    try {
      const response = await API.post(
        "/auth/login",
        formData
      )
      const token =
        response.data.access_token
      localStorage.setItem(
        "token",
        token
      )
      dispatch(setToken(token))
      navigate("/dashboard")
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <div className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-slate-900
    ">
      <form
        onSubmit={handleSubmit}
        className="
          bg-slate-800
          p-8
          rounded-2xl
          w-96
          shadow-lg
        "
      >
        <h1 className="
          text-3xl
          font-bold
          mb-6
          text-center
        ">
          Login
        </h1>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="
            w-full
            p-3
            mb-4
            rounded-lg
            bg-slate-700
          "
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="
            w-full
            p-3
            mb-4
            rounded-lg
            bg-slate-700
          "
        />
        <button
          type="submit"
          className="
            w-full
            p-3
            bg-blue-600
            rounded-lg
            hover:bg-blue-700
          "
        >
          Login
        </button>
      </form>
    </div>
  )
}

export default Login