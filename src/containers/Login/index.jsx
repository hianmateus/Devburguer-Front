import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { api } from '../../services/api'
import { toast } from 'react-toastify'

import Logo from '../../assets/Logo.svg'
import { Container, Form, InputContainer, LeftContainer, RightContainer, Title } from './styles'
import { Button } from '../../components/Button'

export function Login() {

    const schema = yup
        .object({
            email: yup.string().email('Digite um e-mail válido').required('O e-mail é OBRIGATÓRIO!'),
            password: yup.string().min(6, 'A senha deve ter pelo menos 6 Caracteres').required('Digite uma Senha!'),
        })
        .required()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    })

    console.log(errors)

    const onSubmit = async (data) => {
        const response = await toast.promise(
            api.post('/session', {
                email: data.email,
                password: data.password
            }),
            {
                pending: 'Verificando seus Dados',
                success: 'Seja Bem-Vindo(a)👌',
                error: 'Email ou Senha Incorreto 🤯'
            },
        )



        console.log(response)
    }

    return (
        <Container>
            <LeftContainer>
                <img src={Logo} alt='Logo-devburguer' />
            </LeftContainer>

            <RightContainer>
                <Title>
                    Olá, seja bem vindo ao <span>Dev Burguer!</span> <br />
                    Acesse com seu <span>Login e senha.</span>
                </Title>

                <Form onSubmit={handleSubmit(onSubmit)}>
                    <InputContainer>
                        <label htmlFor="Email">Email</label>
                        <input type="email" {...register("email")} />
                        <p>{errors?.email?.message}</p>
                    </InputContainer>

                    <InputContainer>
                        <label htmlFor="Senha">Senha</label>
                        <input type="password" {...register("password")} />
                        <p>{errors?.password?.message}</p>
                    </InputContainer>

                    <Button type="submit">Entrar</Button>
                </Form>

                <p>Não possui a conta? <a href="">Clique Aqui.</a></p>
            </RightContainer>
        </Container>
    )
}