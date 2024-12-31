import React from "react";
import axios from "axios";
import { useAuth } from "../../context/useAuth";

function ItemVeiw({ item, onBack }) {
  const {user} = useAuth();

    const payNow = async () => {
        try {
      
          // Create order via backend
          const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/payment/create-order`, {
            noteId: item._id,
          });

          const orderData = response.data.data;
          
          const options = {
            key: orderData.key_id, // Replace with your Razorpay key_id
            amount: orderData.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            currency: orderData.currency,
            name: orderData.name,
            description: orderData.description,
            handler: async (response) => {
              try {
                  response.noteId = item._id;
                  response.amount = orderData.amount;
                  await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/payment/verify-payment`, response);
                  window.location.reload();        
              }
              catch(error) {
                console.log(error);
                  alert('Error during payment verification:', error);
              }
            },
            order_id: orderData.id, // This is the order_id created in the backend
            prefill: {
              email: user.email,
            },
            theme: {
              color: '#F37254'
            },
          };
          const rzp = new Razorpay(options);
          rzp.open();
        } catch (error) {
          console.error('Error during payment:', error);
        }
      };
    
    return <div className="fixed inset-0 h-screen justify-center items-center flex bg-white bg-opacity-50">
        <img src="/back.svg" alt="Back" className="w-8 h-8 fixed top-4 md:top-16 left-4 md:left-24 cursor-pointer" onClick={onBack}/>
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 bg-white px-4 py-4 shadow-xl">
            <img className="w-56 h-72 object-contain bg-black" src={item.thumbnail} alt="Thumbnail" />
            <div className="flex flex-col h-72 w-56 md:w-72 items-center md:items-start">
                <div className="flex flex-col gap-2 text-wrap overflow-hidden w-full">
                    <h1 className="font-bold text-2xl">{item.title} </h1>
                    <h2 className="text-xl font-bold">Rs.{item.price}</h2>
                    <p>{item.description}</p>
                </div>
                <button className="bg-black rounded-sm text-white font-bold w-56 py-3 mt-auto text-2xl" onClick={(e) => {e.preventDefault(); payNow();}}>BUY</button>
            </div>
        </div>
    </div>;
}

export {ItemVeiw}