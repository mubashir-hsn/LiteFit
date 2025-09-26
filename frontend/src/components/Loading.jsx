import React from 'react'

const Loading = () => {
    return (
        <div className='w-full h-[100vh] bg-white flex justify-center items-center'>
            <div className="flex justify-center items-center h-40">
                {/* <div className="animate-spin rounded-full h-14 w-14 border-t-4 border-red-600"></div> */}
                <div class="loader">
                    <span>L</span>
                    <span>i</span>
                    <span>t</span>
                    <span>e</span>
                    <span>F</span>
                    <span>i</span>
                    <span>t</span>
                </div>
            </div>
        </div>
    )
}

export default Loading