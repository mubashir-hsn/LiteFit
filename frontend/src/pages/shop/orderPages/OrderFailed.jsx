import React from 'react'

const OrderFailed = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
            <div className="bg-white shadow-md rounded-lg p-6 text-center max-w-md w-full">
               <div><i className="ri-close-circle-fill text-6xl text-red-500 mx-auto"></i></div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2 font-[Lora]">
                    Payment Failed!
                </h1>
                <p className="text-gray-700 mb-2 text-[16px] text-justify py-2">
                    We are sorry, there was an error processing
                    your payment. Please try again with a different
                    payment method.
                </p>
            </div>
        </div>
    )
}

export default OrderFailed