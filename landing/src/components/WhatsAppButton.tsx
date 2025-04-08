import { Link } from 'react-router-dom'
import WhatAppIcon from '../assets/icons/WhatsAppIcon.svg'

type WhatsAppButtonProps = {
  phoneNumber: string
}

const WhatsAppButton = ({ phoneNumber }: WhatsAppButtonProps) => {
  return (
    <Link
      to={`https://wa.me/${phoneNumber}?text=¡Hola!%20Quiero%20obtener%20el%20servicio%20de%20Salbox`}
      target='_blank'
      className='bg-whatsapp-500 hover:bg-whatsapp-400 transition-colors fixed bottom-8 left-5 rounded-full p-3 z-50 animate animate-bounce-delay'
    >
      <img src={WhatAppIcon} alt="WhatsApp White Icon" className='w-12' />
    </Link>
  )
}

export default WhatsAppButton