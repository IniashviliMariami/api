
import { useState } from 'react';
import './App.css';
import UserForm from './components/UserForm';

const API_KEY=`Q_N9-B6gTbTi8QP_lMumQmSiXz2lU1Ak1DBO-neJUAoLwnoEXA`;

function App() {

 const[userlist,setUserList] = useState([])
 const getUser=()=>{
  fetch(`/api/v1/users`,{
    method:"GET",
    headers:{
    "Content-Type": "application/json",
    "Authorization": `Bearer ${API_KEY}`,
  }
  }).then(res=>{
    if(!res.ok) throw new Error("Response faild")
      return res.json()
  })
  .then(data => setUserList(data.items.map(user => {
    return{
    firsName:user.firsName,
    lastName:user.lastName,
    id:user._uuid
  }
  })))
  .catch(err => console.log(err))
 }

  const onFormSubmit=(firsName,lastName)=>{
  fetch(`/api/v1/users`,{
    method:"POST",
    headers:{
      "Content-Type": "application/json",
      "Authorization": `Bearer ${API_KEY}`,
    },
    body:JSON.stringify([{firsName,lastName}])
  }).then(res=>{
    if(!res.ok) throw new Error("Response faild")
      return res.json()
  })
  .then(data => setUserList((prev)=>[...prev,{
    firsName:data.items[0].firsName,
    lastName:data.items[0].lastName,
    id:data.items[0]._uuid
  }]))
  .catch(err => console.log(err))
  }
  return (
    <div className="App">
    <UserForm onFormSubmit={onFormSubmit}/>
    <button onClick={getUser}>GET USER</button>

    {userlist.map((user)=> <div key={user.id}>
      <h3>{user.firsName}</h3>
      <h3>{user.lastName}</h3>
    </div>)}
    </div>
  );
}

export default App;
