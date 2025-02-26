import { FormEvent,useState } from "react";
import { BiSearch } from "react-icons/bi"
import { BsGithub } from "react-icons/bs"
import { IoEarthOutline } from "react-icons/io5"
import axios from "axios";



function App() {

const [data, setData] = useState<Object>({})
const [searchIP, setSearchIP] = useState<string>("")
const trackIP = async () => {
  try{
    await axios.get(`https://api.ipgeolocation.io/ipgeo?apiKey=e99753828a36470f8156d603dd7dcebb&ip=${searchIP}`)
    .then(({data}) => setData(data))
    .catch((err) => console.log(err))
  }catch(err) {
    console.log(err);
    
  }
}

const search = (e:FormEvent<HTMLFormElement>) => {
  e.preventDefault()
  trackIP()
}

const handleSearch = (e) => {
  setSearchIP(e.target.value)
}



console.log(data);

  return (
    <>
      <div className="navbar bg-neutral">
        <div className="flex-1">
          <a className="text-neutral-100 text-2xl font-bold ">
            IPtracker <IoEarthOutline className="text-info inline" />
          </a>
        </div>
        <div className="flex-none">
          <BsGithub size={30} className="text-neutral-100" />
        </div>
      </div>
      <div className="mt-10 mx-auto">
        <h1 className="text-4xl text-center text-neutral-100 font-md">
          Geolocalize IP address <BiSearch className="inline " size={40} />
        </h1>
      </div>
      <form onSubmit={search} className="lg:w-1/2 w-full mt-10 mx-auto p-4 flex justify-center gap-2">
        <label className="input input-bordered   flex items-center gap-2 w-2/3">
          <input
            type="text"
            className="grow "
            placeholder="Search for IP address..."
            onChange={handleSearch}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>
        <button className="btn btn-neutral ">Search</button>
      </form>
    </>
  );
}



export default App
