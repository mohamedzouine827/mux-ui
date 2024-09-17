import React from 'react'
import Counter from './Counter'

export default function page() {
    return (
        <div className='w-96 h-96 flex items-center justify-center bg-gray-300'>


                <Counter targetNumber={925403} variant="casino" speed="normal" />

        </div>
    )
}
