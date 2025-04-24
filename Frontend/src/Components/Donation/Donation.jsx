import { FaHeart, FaHandHoldingHeart, FaHandsHelping, FaQrcode, FaChild, FaArrowLeft, FaAngleLeft } from "react-icons/fa"
import {Footer} from "../Footer/HomeFooter"
import { useNavigate } from "react-router-dom"
import DonationQr from "../../assets/donationQr.jpg"
import ChildrenImage from "/NGO_Students.jpg"
// export default function DonationPage() {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-zinc-800 via-slate-800 to-zinc-900 text-white">
//       <header className="bg-slate-900 py-4 px-6 shadow-md">
//         <div className="container mx-auto flex justify-between items-center">
//           <h1 className="text-xl md:text-2xl font-bold">Pimpri Chinchwad Apang Vidyalaya</h1>
//           <nav>
//             <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 flex items-center gap-2">
//               <FaHeart /> Donate Now
//             </button>
//           </nav>
//         </div>
//       </header>

//       <main className="container mx-auto px-4 py-8">
//         <section className="flex flex-col md:flex-row gap-8 items-center mb-12 pt-8">
//           <div className="md:w-1/2">
//             <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Help Children Reach Their Full Potential</h2>
//             <p className="text-zinc-300 mb-6">
//               Since 1989, we've been providing care, education, and rehabilitation to children with disabilities from
//               rural Maharashtra.
//             </p>
//             <div className="flex items-center gap-4 text-indigo-300 mb-6">
//               <div className="flex items-center gap-2">
//                 <FaHandsHelping className="text-xl" />
//                 <span>Rehabilitation</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <FaChild className="text-xl" />
//                 <span>Education</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <FaHandHoldingHeart className="text-xl" />
//                 <span>Care</span>
//               </div>
//             </div>
//           </div>
//           <div className="md:w-1/2">
//             <div className="rounded-lg overflow-hidden shadow-xl">
//               <img
//                 src=""
//                 alt="Children at the NGO"
//                 width={600}
//                 height={400}
//                 className="w-full h-auto object-cover"
//               />
//             </div>
//           </div>
//         </section>

//         <section className="bg-slate-800 rounded-lg shadow-xl p-6 md:p-10 mb-12">
//           <div className="flex flex-col md:flex-row gap-8 items-center">
//             <div className="md:w-1/2">
//               <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Make a Difference Today</h3>
//               <p className="text-zinc-300 mb-6">
//                 Your donation helps provide medical care, education, and a nurturing environment for children with
//                 disabilities from rural areas.
//               </p>
//               <div className="bg-slate-700 border-l-4 border-indigo-500 p-4 mb-6">
//                 <p className="text-sm text-zinc-300">
//                   "The Sanstha provides residential facilities including medical care, meals, clothing, and various
//                   activities to help children develop and thrive."
//                 </p>
//               </div>
//               <div className="flex flex-col sm:flex-row gap-4">
//                 <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 flex items-center justify-center gap-2">
//                   <FaHeart /> Donate Monthly
//                 </button>
//                 <button className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300 flex items-center justify-center gap-2">
//                   <FaHandHoldingHeart /> One-time Donation
//                 </button>
//               </div>
//             </div>

//             <div className="md:w-1/2 flex flex-col items-center">
//               <div className="bg-slate-700 p-4 rounded-lg shadow-lg border-2 border-slate-600 mb-4">
//                 <div className="bg-slate-800 p-8 rounded-lg flex flex-col items-center">
//                   <FaQrcode className="text-9xl text-indigo-400 mb-4" />
//                   <p className="text-sm text-zinc-400 text-center">Scan to donate directly</p>
//                 </div>
//               </div>
//               <p className="text-center text-zinc-300 font-medium">Scan the QR code to make a direct payment</p>
//             </div>
//           </div>
//         </section>

          

//         <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
//           <div className="bg-slate-800 p-6 rounded-lg shadow-md border-t-4 border-indigo-500">
//             <h4 className="text-xl font-bold text-white mb-2">Medical Care</h4>
//             <p className="text-zinc-300">
//               We provide orthopedic surgeries and rehabilitation to help children stand on their own.
//             </p>
//           </div>
//           <div className="bg-slate-800 p-6 rounded-lg shadow-md border-t-4 border-indigo-400">
//             <h4 className="text-xl font-bold text-white mb-2">Education</h4>
//             <p className="text-zinc-300">
//               Our residential school provides quality education and all necessary facilities.
//             </p>
//           </div>
//           <div className="bg-slate-800 p-6 rounded-lg shadow-md border-t-4 border-indigo-500">
//             <h4 className="text-xl font-bold text-white mb-2">Skill Development</h4>
//             <p className="text-zinc-300">
//               Children learn tailoring, computing, book binding and other vocational skills.
//             </p>
//           </div>
//         </section>

     
//       </main>

//       <Footer />
//     </div>
//   )
// }





export default function DonationPage() {
  const navigate =useNavigate('')
    return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200 text-gray-800">
      <header className="bg-white py-4 px-6 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
        
        <button className="bg-gray-200 text-indigo-600 hover:text-indigo-700 rounded-full   p-2.5 font-semibold flex items-center gap-2" onClick={()=>{navigate('/')}}>
      <FaAngleLeft size={28} /> 
    </button>
          <h1 className="text-xl md:text-2xl font-bold ">Pimpri Chinchwad Apang Vidyalaya</h1>
          <nav>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 flex items-center gap-2">
              <FaHeart /> Donate Now
            </button>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <section className="flex flex-col md:flex-row gap-8 items-center mb-12 pt-8">
          <div className="md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Help Children Reach Their Full Potential</h2>
            <p className="text-gray-700 mb-6">
              Since 1989, we've been providing care, education, and rehabilitation to children with disabilities from
              rural Maharashtra.
            </p>
            <div className="flex items-center gap-4 text-indigo-600 mb-6">
              <div className="flex items-center gap-2">
                <FaHandsHelping className="text-xl" />
                <span>Rehabilitation</span>
              </div>
              <div className="flex items-center gap-2">
                <FaChild className="text-xl" />
                <span>Education</span>
              </div>
              <div className="flex items-center gap-2">
                <FaHandHoldingHeart className="text-xl" />
                <span>Care</span>
              </div>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="rounded-lg overflow-hidden shadow-xl">
              <img
                src={ChildrenImage}
                alt="Children at the NGO"
                width={500}
                height={350}
                className="w-full h-auto  object-cover"
              />
            </div>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-xl p-6 md:p-10 mb-12">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/2">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Make a Difference Today</h3>
              <p className="text-gray-700 mb-6">
                Your donation helps provide medical care, education, and a nurturing environment for children with
                disabilities from rural areas.
              </p>
              <div className="bg-gray-100 border-l-4 border-indigo-500 p-4 mb-6">
                <p className="text-sm text-gray-700">
                  "The Sanstha provides residential facilities including medical care, meals, clothing, and various
                  activities to help children develop and thrive."
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
            
              </div>
            </div>

            <div className="md:w-1/2 flex flex-col items-center">
              <div className="bg-gray-100 p-3 rounded-lg shadow-lg border-2 border-gray-300 mb-4">
                <div className="bg-white p-6 rounded-lg flex flex-col items-center">
                  <img src={DonationQr} className="text-9xl text-indigo-500 mb-2 h-40 w-40" />
                  {/* <p className="text-sm text-gray-600 text-center">Scan to donate directly</p> */}
                </div>
              </div>
              <p className="text-center text-gray-700 font-medium">Scan the QR code to make a direct donation</p>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-indigo-500">
            <h4 className="text-xl font-bold text-gray-900 mb-2">Medical Care</h4>
            <p className="text-gray-700">
              We provide orthopedic surgeries and rehabilitation to help children stand on their own.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-indigo-400">
            <h4 className="text-xl font-bold text-gray-900 mb-2">Education</h4>
            <p className="text-gray-700">
              Our residential school provides quality education and all necessary facilities.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-indigo-500">
            <h4 className="text-xl font-bold text-gray-900 mb-2">Skill Development</h4>
            <p className="text-gray-700">
              Children learn tailoring, computing, book binding and other vocational skills.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

