import { FaHeart, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa"

export  function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-8 px-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Pimpri Chinchwad Apang Vidyalaya</h3>
            <p className="text-zinc-400 mb-2">Apang Vidyalaya, Nigdi, Pune-44</p>
            <p className="text-zinc-400">Maharashtra, India</p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-zinc-400">
                <FaPhone className="text-indigo-400" />
                <span>+91 9689903365</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-400">
                <FaEnvelope className="text-indigo-400" />
                <span>apangvidhyalayanigdi@yahoo.in</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-400">
                <FaMapMarkerAlt className="text-indigo-400" />
                <span>Nigdi, Pune-44, Maharashtra</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Support Us</h3>
            <p className="text-zinc-400 mb-4">
              Your donations help us provide better care and education for children with disabilities.
            </p>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 flex items-center gap-2">
              <FaHeart /> Donate Now
            </button>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-700 text-center text-zinc-400 text-sm">
          <p>© {new Date().getFullYear()} Pimpri Chinchwad Apang Vidyalaya. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
