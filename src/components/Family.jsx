import React from 'react'
import Gravatar from 'react-gravatar'
import { family, member } from './Family.css'

/**
 * Basic view to display all members of a family
 */
export default function Family () {
  let myFamily = [
    {
      firstName: 'Ryan',
      lastName: 'Delaney',
      email: 'delanr3@rpi.edu',
      id: '1'
    },
    {
      firstName: 'Ryan',
      lastName: 'Delaney',
      email: 'delanr3@rpi.edu',
      id: '3'
    },
    {
      firstName: 'Ryan',
      lastName: 'Delaney',
      email: 'delanr3@rpi.edu',
      id: '4'
    },
    {
      firstName: 'Ryan',
      lastName: 'Delaney',
      email: 'delanr3@rpi.edu',
      id: '5'
    },
    {
      firstName: 'Pranav',
      lastName: 'Sathyanarayanan',
      email: 'sathyp@rpi.edu',
      id: '2'
    }
  ]

  return <div className={family}>
    {myFamily.map(fam => <div key={fam.id} className={member}>
      <Gravatar className='ui small centered circular image' email={fam.email} size={500}/>
      <h3>{fam.firstName} {fam.lastName}</h3>
    </div>)}
  </div>
}
