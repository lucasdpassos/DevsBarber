import React, { useState } from 'react'
import { 
    Container,
    InputArea,
    CustomButton,
    CustomButtonText,
    SignMessageBtn,
    SignMessageBtnText,
    SignMessageBtnTextBold

 } from './styles'

import Api from '../../Api'

import { useNavigation } from '@react-navigation/native'
import CarneLogo from '../../assets/carnelogo.svg'
import SignInput from '../../components/SignInput'
import EmailIcon from '../../assets/email.svg'
import LockIcon from '../../assets/lock.svg'


export default () => {

    const navigation = useNavigation()

    const [cpfcnpjField, setcpfcnpjField] = useState('')
    const [passwordField, setPasswordField] = useState('')

    const handleMessageButtonClick = () => {
        navigation.reset({
            routes: [{name: 'SignUp'}]
        })
    }

    const handleSignClick = async () => {
        if(cpfcnpjField != '') {

            let json = await Api.signIn(cpfcnpjField)  
            
            if (json != false) {
                navigation.reset({
                    routes: [{name: 'Home'}]
                })                
            } else {
                alert('Login inválido')
            }
            

        } else {
            alert('Preencha os campos')
        }
    }

    return (
        <Container>
            <CarneLogo width="100%" height="320px" />

            <InputArea>

               <SignInput IconSvg={EmailIcon}
               
                placeholder="CPF / CNPJ"
                value={cpfcnpjField}
                onChangeText={t=>setcpfcnpjField(t)}
               />
               <SignInput IconSvg={LockIcon}
               
                placeholder="Senha"
                value={passwordField}
                onChangeText={t=>setPasswordField(t)}
                password={true}
               />

                <CustomButton onPress={handleSignClick}>
                    <CustomButtonText>Login</CustomButtonText>
                </CustomButton>


            </InputArea>

            <SignMessageBtn onPress={handleMessageButtonClick}>
                <SignMessageBtnText>Ainda sem cadastro?</SignMessageBtnText>
                <SignMessageBtnTextBold>Cadastrar</SignMessageBtnTextBold>
            </SignMessageBtn>

        </Container>
    )
}