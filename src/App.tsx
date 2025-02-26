import { FormEvent,useState } from "react";
import { BiSearch } from "react-icons/bi"
import { BsGithub } from "react-icons/bs"
import { IoEarthOutline } from "react-icons/io5"
import axios from "axios";
import { useFormStatus } from "react-dom";


interface Data {
  country_flag:string,
  country_name: string,
  district?:string,
  calling_code:string,
  country_capital:string
}
function App() {

const [data, setData] = useState<Data>()
const [searchIP, setSearchIP] = useState<string>("")
const [isLoading, setIsLoading] = useState<boolean>(false)
const {pending} =useFormStatus()
const [error, setError] = useState<string|null>(null)
const trackIP = async () => {
  setIsLoading(true)
  try{
    await axios.get(`https://api.ipgeolocation.io/ipgeo?apiKey=e99753828a36470f8156d603dd7dcebb&ip=${searchIP}`)
    .then(({data}) => setData(data))
    .then(() => setIsLoading(false))
    .finally(() => setIsLoading(false))
    .catch((err) => setError(err))
  }catch(err:any) {
    setError(err.message)
    
  }
}

const search = (e:FormEvent<HTMLFormElement>) => {
  e.preventDefault()
  trackIP()
}

const handleSearch = (e:any) => {
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
        <button className="btn btn-neutral ">{pending?'Loading..':'Search'}</button>
      </form>
        {error&&<div role="alert" className="alert alert-error">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 shrink-0 stroke-current"
    fill="none"
    viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
  <span>Error! cannot track the IP Address</span>
</div>
}
      {isLoading?<div className="w-1/2 mx-auto flex justify-center"><span className="loading loading-spinner loading-lg "></span></div>:(<div className="mt-10 flex w-full lg:w-1/3 mx-auto justify-center bg-neutral min-h-10 rounded-lg">
          <ul>
            <li>Country: {data!=null?<img src={data?.country_flag} alt="country flag" className="w-4 h-4 inline"/>:''} {data?.country_name}</li>
            <li>Capital: {data?.country_capital}</li>
            <li>District: {data?.district}</li>
            <li>Calling Code: {data?.calling_code}</li>   
          </ul>
      </div>)}
 
    </>
  );
}



export default App
