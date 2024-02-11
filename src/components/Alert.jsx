import React from 'react'

const Alert = props => {
  const types = {
    error: {button:'text-red-700 bg-red-100 hover:bg-red-300',parent:'text-red-700 bg-red-100'},
    success: {button:'text-green-700 bg-green-100 hover:bg-green-300',parent:'text-green-700 bg-green-100'},
  }
 
  return (
    <div
      className={'relative py-3 pl-4 pr-10 leading-normal rounded-lg mb-8'+types[props?.type]?.parent}
      role='alert'>
      <div className='flex justify-between'>
        <p>{props?.message}</p>
        <button
          className={'border-1 cursor-pointer  px-2 rounded-md'+types[props?.type]?.button}
          onClick={() => {
            props.setFeedback('','error')
          }}>
          X
        </button>
      </div>
    </div>
  )
}

export default Alert
