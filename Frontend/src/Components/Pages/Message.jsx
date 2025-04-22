import { useEffect, useState } from "react"
import axios from "axios"

const Message = () => {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_BASEURL}/api/all-msg`, {
          withCredentials: true,
        })
        setMessages(response.data.messages)
      } catch (error) {
        console.error("Error fetching messages:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchMessages()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 text-gray-900 p-6 rounded-lg shadow-xl">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-8">
          <div className="h-10 w-1 bg-indigo-600 mr-3"></div>
          <h1 className="text-3xl font-bold">Messages</h1>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.length === 0 ? (
              <div className="bg-white border border-gray-200 p-8 rounded-lg text-center shadow">
                <p className="text-xl text-gray-600">No messages available</p>
                <p className="text-sm text-gray-400 mt-2">Check back later for updates</p>
              </div>
            ) : (
              messages.map((msg, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 p-5 rounded-lg shadow-sm hover:shadow-indigo-200 transition-all duration-300"
                >
                  <p className="text-gray-800 mb-3">{msg.message}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-indigo-600">{new Date(msg.createdAt).toLocaleString()}</span>
                    <div className="h-1.5 w-1.5 rounded-full bg-indigo-600"></div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Message
