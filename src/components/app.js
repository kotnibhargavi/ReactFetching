import React,{useState,useEffect} from 'react'
import './app.css'
let url = 'https://jsonplaceholder.typicode.com/users'


const Component1 = ()=>{
    const [userlist,setuserList]= useState([])
    const [isloading,setisloading] = useState(false)
    const [error,seterror] = useState({status:false,msg:''})
const fetchdata = async (apiurl)=>{
    setisloading(true)
    seterror({status:false ,msg:''})
    try{
        seterror({status:false ,msg:''})
        const fetchdata = await fetch(apiurl)
        const data = await fetchdata.json()
        setuserList(data)
        setisloading(false)
        console.log(fetchdata)
        if (fetchdata.status === 404){
            throw new Error('Data Not Found')
        };

    }

   catch(err){
    setisloading(false)
    seterror({status:true, msg : err.message || 'something went wrong'})

        
   }
    
}

useEffect(()=>{
    fetchdata(url)
},[])

if (isloading ===true){
    return (
        <h4 className = 'elements'>Loading....</h4>
    )
}

if (error?.status){
    return (
        <h4 className = 'elements' style= {{color:'red'}} >{error.msg}</h4>
    )
}

return (
<ul>
    <div className = 'elements'>
       {
        userlist.map((each)=>{
            const {id,name,email} = each
            return (
                <li key = {id}>
                    <div>Name :{name}</div>
                    <div>Email :{email}</div>
                </li>
            )

        })
       }

    </div>
</ul>
   


)



}

export default Component1