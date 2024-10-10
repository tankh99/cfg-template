import React from 'react'

export type FormSection = {
    header: string;
    description?: string;
    children: React.ReactNode;
}

export default function FormSection({header, description, children}: FormSection) {
  return (
    <div className='mb-8 flex flex-col space-y-6'>
        <div className=''>
            <h2 className='text-2xl'>{header}</h2>
            {description ? <h4 className='italic'>{description}</h4> : null}
        </div>
        {children}
    </div>
  )
}
