"use client";
import { useCart } from '../app/context/CartContext'; 
import { useState } from 'react';

const WhatsAppButton = ({ inputs, items, total }) => {
    const { cart, removeFromCart, updateQuantity, clearCart, isModalOpen, toggleModal ,subtotal} = useCart();
    const [error, setError] = useState(null);

 
    

    const createOrder =  () => { 
        
        fetch('api/sendOrder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                items,
                inputs 
            })
        });
    };

    const handleClick = async () => {
        if (!validateInputs(inputs)) {
            setError('All fields are required.');
            return;
        }

        const url = createWhatsAppURL(inputs, items);
        window.open(url, '_blank');
        createOrder();
        clearCart();
        setError(null);
    };

    const validateInputs = (inputs) => {
        const { address, fname, lname, phone, email } = inputs;
        return address && fname && lname && phone && email;
    };

    return (
        <div className='container'>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <span className="ProvidersSingleProduct--selected">
                <button onClick={handleClick} type="button" className="AddToCart HtmlProductAddToCart" style={{ borderRadius: "0" }}  >
                    <span>Order Now!</span>
                </button>
            </span> 
        </div>
    );
};

export default WhatsAppButton;

const createWhatsAppURL = (inputs, items, total) => {
    const { address, fname, lname, phone , email} = inputs;

    // Calculate the total amount
    const totalAmount = items.reduce((sum, item) => sum + item.discount * item.quantity, 0);

    console.log("totalAmount=", total);
    

    // Formatting the message
    const message = `
    *Customer Information:*
    Name: ${email}
    Name: ${fname} ${lname} 
    Phone: ${phone}
    Address: ${address}

    *Order Details:*
    ${items.map((item, index) => `
      Item ${index + 1}:
      - Name: ${item.title} 
      - Quantity: ${item.quantity}
      - Price: $${item.discount}
      - Image: ${item.img[0]} 
    `).join('\n')}

    Subtotal: $${totalAmount.toFixed(2)}
    Delivery fee: $4.00
    *Total Amount:* $${total}
  `;

    const encodedMessage = encodeURIComponent(message);
    const phoneNumber = '9613581592';  
    // return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
};
