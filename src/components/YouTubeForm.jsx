import { DevTool } from '@hookform/devtools';
import React from 'react'
import { useForm } from "react-hook-form";

let renderCount = 0;

const YouTubeForm = () => {

  const form = useForm();
  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState

  const onSubmit = (data) => {
    console.log('Form submitted', data);
  }

  renderCount++;
  return (
    <div>
      <h1>YouTube Form ({renderCount / 2})</h1>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>

            <div className='form-control'>
              <label htmlFor='username'>Username</label>
              <input 
                type='text' 
                id='username' 
                {...register("username", {
                  required: {
                    value: true,
                    message: "Username is required"
                  },
                })}
              />
              <p className='error'>{errors.username?.message}</p>
            </div>

            <div className='form-control'>
              <label htmlFor='username'>E-mail</label>
              <input 
                type='email' 
                id='email' 
                {...register("email", {
                  pattern: {
                    value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                    message: 'Invalid Email Format'
                  },
                  validate: {
                    notAdmin:(fieldValue) => {
                      return (
                        fieldValue !== "admin@example.com" || "Enter a different email address"
                      )
                    },
                    notBlackListed: (fieldValue) => {
                      return !fieldValue.endsWith("baddomain.com") || "This domain is not supported"
                    }
                  }
                })} 
              />
              <p className='error'>{errors.email?.message}</p>
            </div>

            <label htmlFor='channel'>Channel</label>
            <input 
              type='text' 
              id='channel' 
              {...register("channel")}
            />
            <p className='error'>{errors.channel?.message}</p>

            <button>Submit</button>
            <DevTool  control={control}/>
        </form>
    </div>
  )
}

export default YouTubeForm