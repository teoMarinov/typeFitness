/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"
import { loginUser } from "../../service/auth-service"
import { Link as RouterLink } from 'react-router-dom';
import { AbsoluteCenter, Center, Button, Input, Text, Link, VStack } from '@chakra-ui/react'

const Login = () => {
    const [error, setError] = useState('')

    const navitage = useNavigate()
    const [form, setForm] = useState({
        handle: '',
        password: ''
    })

    const setUser = useContext(AuthContext)

    const updateForm = (prop: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [prop]: e.target.value
        })

    }

    const onLogin = async () => {
        if (!form.handle) return setError('Please enter a username!')
        if (!form.password) return setError('Please enter a password')

        try {
            const credential: any = await loginUser(form.handle, form.password)
            { setUser } ({
                user: credential.user
            })
            navitage('/')
        } catch (error: any) {
            console.log(error.message);
            if (error.message.includes('wrong-password')) {
                return setError('Wrong password!')
            }
            if (error.message.includes('User not found')) {
                return setError('User not found!')
            }
            if (error.message.includes('too-many-requests')) {
                return setError('Too many request. Try again later!')
            }
        }
    }
    const handleKeyDown = (event: any) => {
        if (event.key === "Enter") {
            onLogin()
        }
    };
    return (
        <AbsoluteCenter onKeyDown={handleKeyDown}>
            <Center>
                <Text fontSize={40}>
                    Log In
                </Text>
                <br />
            </Center>
            <VStack mt={'20px'}>
                <Input w={250} placeholder='Username' onChange={updateForm('handle')} />
                <Input w={250} type='password' placeholder='Password' onChange={updateForm('password')} />
            </VStack>
            <Center>
                {error && (
                    <Text color="red" mr="6px"><strong>{error}</strong> </Text>
                )}
            </Center>
            <br />
            <Center>
                <Button colorScheme={"purple"} onClick={onLogin} >Log in</Button> <br />
            </Center>
            <Center>
                <Text mr="6px">Don't have an account?</Text>

                <Link
                    as={RouterLink}
                    to="/sign-up"
                    color="blue.400">
                    Sign Up
                </Link>
            </Center>
        </AbsoluteCenter>
    )
}

export default Login