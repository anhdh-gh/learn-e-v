import React, { useContext } from 'react'

export const ModalConfirmContext = React.createContext()

export const useModalConfirm = () => useContext(ModalConfirmContext)