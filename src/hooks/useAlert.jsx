import {useState} from 'react'

const useAlert = () => { 
  const [message, setMessage] = useState('')
  const [type, setType] = useState('error')

  const setFeedback = (message, type) => {
    setMessage(message)
    setType(type)
  } 

  return {message , type , setFeedback}
  
}

export default useAlert
