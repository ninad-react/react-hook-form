import { DevTool } from '@hookform/devtools';
import React, { useEffect } from 'react'
import { useForm, useFieldArray } from "react-hook-form";

let renderCount = 0;

const YouTubeForm = () => {

  const form = useForm({
    defaultValues: {
      username: 'Batman',
      email: '',
      channel: '',
      social: {
        twitter : "",
        facebook: ""
      },
      phoneNumbers: ["", ""],
      phNumbers: [{number: ''}],
      age: 0,
      dob: new Date()
    }
  });

  const { 
    register, 
    control, 
    handleSubmit, 
    formState, 
    watch, 
    getValues,
    setValue
  } = form;
  const { errors, touchedFields, dirtyFields, isDirty, isValid } = formState;

  console.log({touchedFields, dirtyFields, isDirty, isValid});

  const {fields, append, remove} = useFieldArray({
    name: 'phNumbers',
    control
  })

  const onSubmit = (data) => {
    console.log('Form submitted', data);
  };

  const onError = (errors) => {
    console.log('errors', errors);
  }

  const handleGetValues = () => {
    console.log('getValues', getValues("social.facebook"));
  }

  const handleSetValues = () => {
    setValue("username", "", {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true
    });
  }

  // useEffect(() => {
  //   const subscription = watch((value) => {
  //     console.log('value', value);
  //   })

  //   return () => subscription.unsubscribe();
  // }, [watch])

  // const watchForm = watch();

  renderCount++;
  return (
    <div>
      <h1>YouTube Form ({renderCount / 2})</h1>
      {/* <h2>Watched Value: {JSON.stringify(watchForm)}</h2> */}

        <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
            <div className='form-control'>
              <label htmlFor='username'>Username</label>
              <input 
                type='text' 
                id='username'
                // disabled
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

            <div className='form-control'>
              <label htmlFor='channel'>Channel</label>
              <input 
                type='text' 
                id='channel' 
                {...register("channel", {
                  required:  {
                    value: true,
                    message: "Channel is required"
                  }
                })}
              />
              <p className='error'>{errors.channel?.message}</p>
            </div>

            <div className='form-control'>
              <label htmlFor='twitter'>Twitter</label>
              <input 
                type='text' 
                id='twitter' 
                {...register("social.twitter", {
                  disabled: watch("channel")==="",
                  required: "Enter twitter profile",
                })}
              />
            </div>

            <div className='form-control'>
              <label htmlFor='facebook'>Facebook</label>
              <input 
                type='text' 
                id='facebook' 
                {...register("social.facebook")}
              />
            </div>

            <div className='form-control'>
              <label htmlFor='primary-phone'>Primary phone number</label>
              <input 
                type='text' 
                id='primary-phone' 
                {...register("phoneNumbers.0")}
              />
            </div>

            <div className='form-control'>
              <label htmlFor='secondary-phone'>Secondary phone number</label>
              <input 
                type='text' 
                id='secondary-phone' 
                {...register("phoneNumbers.1")}
              />
            </div>

            <div>
              <label>List of phone numbers</label>
              <div>
                {fields.map((field, index) => {
                  return (
                    <div className='form-control' key={field.id}>
                      <input 
                        type='text' 
                        {...register(`phNumbers.${index}.number`)}
                      />
                      {
                        index > 0 && (
                          <button type='button' onClick={() => remove(index)}>
                            Remove
                          </button>
                        )
                      }
                    </div>
                  )
                })}
                <button type='button' onClick={() => append({ number: "" })}>
                  Add Phone number
                </button>
              </div>
            </div>

            <div className='form-control'>
              <label htmlFor=''>Age</label>
              <input 
                type='number'
                id='age'
                {...register("age", {
                  valueAsNumber: true,
                  required: {
                    value: true,
                    message: "Age is required"
                  }
                })}
              />
              <p className='error'>{errors.age?.message}</p>
            </div>

            <div className='form--control'>
                <label htmlFor='dob'>Date of birth</label>
                <input 
                  type='date'
                  id='dob'
                  {...register("dob", {
                    valueAsDate: true,
                    required: {
                      value: true,
                      message: 'Date of birth is required'
                    },
                  })}
                />
                <p className='error'>{errors.dob?.message}</p>
            </div>

            <button disabled={!isDirty || !isValid}>Submit</button>
            <button type='button' onClick={handleGetValues}>
              Get Values
            </button>
            <button type='button' onClick={handleSetValues}>
              Set Value
            </button>
            <DevTool  control={control}/>
        </form>
    </div>
  )
}

export default YouTubeForm