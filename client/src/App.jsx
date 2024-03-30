import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import image from "./images/form_img.jpg"
import { IoIosArrowDown } from "react-icons/io";
import axios from "axios"
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

axios.defaults.baseURL = `https://customer-churn-predictor-nd29.onrender.com`

const App = () =>  {

  const {register, handleSubmit,reset,setValue,getValues,formState:{errors}, formState} = useForm()
  const [showAge, setShowAge] = useState(false)
  const [showProducts, setShowProducts] = useState(false)
  const [showGeography, setShowGeography] = useState(false)

  const [geography, setGeography] = useState("--select--")
  const [age, setAge] = useState("--select--")
  const [products, setProducts] = useState("--select--")

  const [exit, setExit] = useState("")
  const [probability, setProbability] = useState("")

  const onSubmit = async (data) => {
    console.log(data)
    const res = await axios.post('/predict',data)
    console.log(res.data)
    setExit(res.data.customer_exist)
    setProbability(res.data.probability)
    setGeography("--select--")
    setAge("--select--")
    setProducts("--select--")
    toast.success("Form submitted", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Slide,
      })
  }


  const options = [];
  for (let i = 1; i <= 100; i++) {
    options.push(<div key={i} onClick={ () => {setValue('age',i); setAge(getValues('age'))}} className="hover:bg-bg_blue cursor-pointer w-full h-1/5 pl-3 p-1 rounded-md flex items-center">{i}</div>);
  }

  const productOptioins = []
  for (let i = 1; i <= 10; i++) {
    productOptioins.push(<div key={i} onClick={ () => {setValue('products',i); setProducts(getValues('products'))}} className="hover:bg-bg_blue cursor-pointer w-full h-1/5 pl-3 p-1 rounded-md flex items-center">{i}</div>)
  }

  useEffect(() => {
    
  }, [])
  
  
  return (
    <>
      <div className='w-full min-h-[100vh] h-full py-10 flex justify-center items-center bg-bg_blue_dark overflow-auto'>
        <form onSubmit={handleSubmit(onSubmit)} className="w-[90%] md:w-[80%] lg:w-[70%] h-fit md:flex items-center bg-white rounded-3xl shadow-2xl">
          <div className='h-full w-full md:w-[60%] flex-col p-5'>
            <h1 className=" text-4xl sm:text-6xl md:text-4xl xl:text-6xl lg:text-5xl font-semibold text-bg_blue_dark w-full flex justify-center items-center"> Customer Churn </h1>
            <img className="w-full h-fit" src={image}/>
            <div className={`w-full justify-center flex text-xl lg:text-2xl font-semibold text-blue-500 ${exit !== "" ? "visible" : "hidden"}`}>The customer will leave:<p className="text-xl lg:text-2xl font-semibold text-blue-800 justify-center pl-2">{exit}</p></div>
            <div className={`w-full ${probability !== "" ? 'visible' : 'hidden'}`}> <p className="w-full flex justify-center text-xl lg:text-2xl font-semibold text-blue-500">The probability customer will leave:</p><p className="text-xl lg:text-2xl font-semibold text-blue-800 flex w-full justify-center">{probability}</p></div>
          </div>
          <div className="h-full w-full md:w-[40%] bg-white p-5 space-y-2 rounded-3xl">
            <div className=" flex-row">
              <div className=" flex w-full">Credit Score: <p className=" pl-2 text-sm flex justify-end items-center text-red-600">{errors.creditScore?.message}</p> </div>
              <input {...register('creditScore', { required: {value : true, message: "credit score required !"}})} className="rounded-md p-1 w-full bg-slate-200" name="creditScore" placeholder="Credit"/>
            </div>
            <div className=" flex-col">
              <div className="w-full flex">Geography: <p className=" pl-2 text-sm flex justify-end items-center text-red-600">{errors.geography?.message}</p></div>
              <div className=" relative">
                <button onClick={(e) => {e.preventDefault(); setShowGeography(!showGeography)}} className=" bg-slate-200 rounded-md p-1 w-full text-slate-400 justify-between flex items-center cursor-pointer">
                {geography} <IoIosArrowDown />
                </button>
                <div {...register('geography', { required: {value : true, message: "geography required !"}})} onClick={(e) => {e.preventDefault(); setShowGeography(!showGeography)}} className={`rounded-md bg-bg_blue_light absolute top-10 w-full shadow-xl h-fit z-20 overflow-auto ${showGeography === true ? "visible" : "hidden"}`}>
                  <div onClick={ () => { setValue('geography',"Spain"); setGeography(getValues('geography'))}} className="hover:bg-bg_blue cursor-pointer w-full h-1/5 pl-3 p-1 rounded-md flex items-center">Spain</div>
                  <div onClick={ () => { setValue('geography',"Germany"); setGeography(getValues('geography'))}} className="hover:bg-bg_blue cursor-pointer w-full h-1/5 pl-3 p-1 rounded-md flex items-center">Germany</div>
                  <div onClick={ () => { setValue('geography',"France"); setGeography(getValues('geography'))}} className="hover:bg-bg_blue cursor-pointer w-full h-1/5 pl-3 p-1 rounded-md flex items-center">France</div>
                </div>
              </div>
            </div>
            <div className=" flex-col">
              <div className="w-full flex">Gender: <p className=" pl-2 text-sm flex justify-end items-center text-red-600">{errors.gender?.message}</p></div>
              <div className="flex w-full space-x-4">
                <div>
                  <input {...register("gender", { required: {value : true, message: "gender required !"}})} value='Male' className="bg-slate-200 ml-2" type="radio"/>
                  <label> Male </label>
                </div>
                <div>
                  <input {...register("gender", { required: {value : true, message: "gender required !"}})} value='Female' className="bg-slate-200 ml-2" type="radio"/>
                  <label> Female </label>
                </div>
              </div>
            </div>
            <div className=" flex-col">
              <div className="w-full flex">Age: <p className=" pl-2 text-sm flex justify-end items-center text-red-600">{errors.age?.message}</p></div>
              <div className=" relative">
                <button onClick={(e) => {e.preventDefault(); setShowAge(!showAge)}} className=" bg-slate-200 rounded-md p-1 w-full text-slate-400 justify-between flex items-center cursor-pointer">
                {age} <IoIosArrowDown />
                </button>
                <div {...register('age', { required: {value : true, message: "age required !"}})} onClick={(e) => {e.preventDefault(); setShowAge(!showAge)}} className={`rounded-md bg-bg_blue_light absolute top-10 w-full shadow-xl h-48 z-20 overflow-auto ${showAge === true ? "visible" : "hidden"}`}>
                  {options}
                </div>
              </div>
            </div>
            <div className=" flex-col">
              <div className="w-full flex">Tenure with bank (years): <p className=" pl-2 text-sm flex justify-end items-center text-red-600">{errors.tenure?.message}</p></div>
              <input {...register("tenure", { required: {value : true, message: "tenure required !"}})} className="rounded-md p-1 w-full bg-slate-200" name="tenure" placeholder="Years"/>
            </div>
            <div className=" flex-col">
              <div className="w-full flex">Balance: <p className=" pl-2 text-sm flex justify-end items-center text-red-600">{errors.balance?.message}</p></div>
              <input {...register("balance", { required: {value : true, message: "balance required !"}})} className="rounded-md p-1 w-full bg-slate-200" name="balance" placeholder="Balance"/>
            </div>
            <div className=" flex-col">
              <div className="w-full flex">Number of Products: <p className=" pl-2 text-sm flex justify-end items-center text-red-600">{errors.products?.message}</p></div>
              <div className=" relative">
                <button onClick={(e) => {e.preventDefault(); setShowProducts(!showProducts)}} className=" bg-slate-200 rounded-md p-1 w-full text-slate-400 justify-between flex items-center cursor-pointer">
                {products} <IoIosArrowDown />
                </button>
                <div {...register('products', { required: {value : true, message: "products required !"}})} onClick={(e) => {e.preventDefault(); setShowProducts(!showProducts)}}  className={`rounded-md bg-bg_blue_light absolute top-10 w-full shadow-xl h-32 overflow-auto ${showProducts === true ? "visible" : "hidden"}`}>
                  {productOptioins}
                </div>
              </div>
            </div>
            <div className=" flex-col">
              <div className="w-full flex">Has Credit Card: <p className=" pl-2 text-sm flex justify-end items-center text-red-600">{errors.creditCard?.message}</p></div>
              <div className="flex w-full space-x-4">
                <div>
                  <input {...register("creditCard", { required: {value : true, message: "select an option !"}})} value='1' className="bg-slate-200 ml-2" type="radio"/>
                  <label> YES </label>
                </div>
                <div>
                  <input {...register("creditCard", { required: {value : true, message: "select an option !"}})} value='0' className="bg-slate-200 ml-2" type="radio"/>
                  <label> NO </label>
                </div>
              </div>
            </div>
            <div className=" flex-col">
              <div className="w-full flex">Is Active Menber: <p className=" pl-2 text-sm flex justify-end items-center text-red-600">{errors.activeMember?.message}</p></div>
              <div className="flex w-full space-x-4">
                <div>
                  <input {...register("activeMember", { required: {value : true, message: "select an option !"}})} value='1' className="bg-slate-200 ml-2" type="radio"/>
                  <label> YES </label>
                </div>
                <div>
                  <input {...register("activeMember", { required: {value : true, message: "select an option !"}})} value='0' className="bg-slate-200 ml-2" type="radio"/>
                  <label> NO </label>
                </div>
              </div>
            </div>
            <div className=" flex-col">
              <div className="w-full flex">Estimated Salary: <p className=" pl-2 text-sm flex justify-end items-center text-red-600">{errors.estimateSalary?.message}</p></div>
              <input {...register("estimateSalary", { required: {value : true, message: "salary is required !"}})} className="rounded-md p-1 w-full bg-slate-200" name="estimateSalary" placeholder="Salary"/>
            </div>
            <div className="w-full flex justify-center">
              <button className=" bg-bg_blue_dark w-1/2 p-2 rounded-full"> Submit </button>
            </div>
          </div>
        </form>
        <ToastContainer />
      </div>
    </>
  )
}

export default App
