import React, { useState } from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { Container, TitleInput, InputForm, BtnSubmitForm, TxtSubmitForm, LoadingArea } from './styles';

import api from '../../config/api'

export default function Orcamento(){

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [whatsapp, setWhatsApp] = useState('');
    const [project, setProject] = useState('');
    const [loading, setLoading] = useState(false);

    const addOrcamento = async () =>{
        setLoading(true);
        await api.post('/orcamento', {name, email, phone, whatsapp, project}).then((response) => {
            Alert.alert("", response.data.message);  
            setLoading(false);  
        }).catch((error) => {
            if(err.response){
                Alert.alert("", response.data.message);   
                setLoading(false);  
            }else{
                Alert.alert("", "Erro: Orçamento não enviado com sucesso, tente mais tarde!");
                setLoading(false);
            };
        });
    };

    return (
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <Container>
            <TitleInput>Nome</TitleInput>
            <InputForm 
                placeholder="Nome completo"
                autoCorret={false} 
                value={name}
                onChangeText={text => setName(text)} />

            <TitleInput>E-mail</TitleInput>
            <InputForm 
                placeholder="E-mail"
                autoCorret={false} 
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={text => setEmail(text)} />  

            <TitleInput>Telefone</TitleInput>
            <InputForm 
                placeholder="(XX) XXXX-XXXX"
                autoCorret={false} 
                value={phone}
                onChangeText={text => setPhone(text)} /> 

            <TitleInput>WhatsApp</TitleInput>
            <InputForm 
                placeholder="(XX) XXXXX-XXXX"
                autoCorret={false} 
                value={whatsapp}
                onChangeText={text => setWhatsApp(text)} /> 

            <TitleInput>Projeto</TitleInput>
            <InputForm 
                placeholder="Projeto"
                autoCorret={false} 
                value={project}
                onChangeText={text => setProject(text)}/> 

            <BtnSubmitForm disabled={loading} onPress={addOrcamento}>
                <TxtSubmitForm>
                    Cadastrar
                </TxtSubmitForm>
            </BtnSubmitForm>

           {loading && 
           <LoadingArea>
                 <ActivityIndicator size="large" color="#fff" />
               </LoadingArea>
               }

        </Container>
        </ScrollView>
    );
}