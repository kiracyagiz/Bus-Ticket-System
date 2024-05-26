// components/PaymentCard.js
import { useState } from 'react';
import { Card, Input, Button, Row, Col, message } from 'antd';
import { CreditCardOutlined } from '@ant-design/icons';

const PaymentCard = ({setType,handleTicketInfoFormSubmit,formData}) => {
  const [cardNumber, setCardNumber] = useState('');
  const [cardType, setCardType] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

 
  const handleCardNumberChange = (e) => {
    const input = e.target.value;
    setCardNumber(input);
  
    // Check card type
    if (/^5[1-5]|^(222[1-9]|2[3-6][0-9]|27[0-1])/i.test(input)) {
      setCardType('Mastercard');
    } else if (/^4/.test(input)) {
      setCardType('Visa');
    } else {
      setCardType('');
    }
  };
  
  

  const handlePayment = () => {
    // Here you can implement payment logic
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
      message.success('Payment Successful!');
    }, 2000);

    handleTicketInfoFormSubmit(formData)
    setType(true)
  };

  // Determine card length based on card type
  const getCardLength = () => {
    switch (cardType) {
      case 'Visa':
        return 16;
      case 'Mastercard':
        return 16;
      default:
        return 0;
    }
  };

  // Check if card number length matches the required length
  const isCardNumberValid = () => {
    return cardNumber.length === getCardLength();
  };

  return (
    <Card title="Payment Details" className='p-5 m-5'>
      <div className="relative w-full h-48 overflow-hidden rounded-lg shadow-lg bg-gradient-to-r from-gray-400 to-gray-600 transform transition-transform duration-1000 hover:rotate-6">
        <div className="absolute top-0 left-0 w-full h-full bg-gray-800 flex justify-center items-center">
          <div className="text-white text-center">
            <CreditCardOutlined className="text-4xl mb-2" />
            <p className="text-lg font-semibold">{cardType || 'Card Type'}</p>
            <p className="text-sm">{cardNumber || '#### #### #### ####'}</p>
          </div>
        </div>
      </div>
      <Row gutter={16} className="mt-4">
        <Col span={24}>
          <Input
            prefix={<CreditCardOutlined />}
            placeholder="Enter card number"
            value={cardNumber}
            onChange={handleCardNumberChange}
          />
        </Col>
      </Row>
      <Row gutter={16} className="mt-4">
        <Col span={24}>
          <Button
            type="primary"
            onClick={handlePayment}
            disabled={!isCardNumberValid() || cardType === ''}
            loading={isAnimating}
            className="w-full"
          >
            Pay Now
          </Button>
        </Col>
      </Row>
    </Card>
  );
};

export default PaymentCard;
