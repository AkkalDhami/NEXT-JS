import Link from 'next/link'
import React from 'react'

export default function page() {
    return (
        <div className='p-12'>
            <h1>Service Page</h1>

            <div className="flex gap-4 mt-4  flex-col">
                <Link href="/service/app-dev">App Development</Link>
                <Link href="/service/web-dev">Web Development</Link>
            </div>
        </div>
    )
}
