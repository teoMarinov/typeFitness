/* eslint-disable @typescript-eslint/no-explicit-any */

import { Input, Button, AbsoluteCenter, Center, Text, Link } from '@chakra-ui/react'
import { checkForPhoneNumber, getUserByHandle, createUserHandle } from '../../service/user-service';
import { MIN_PASSWORD_LENGTH, MAX_HANDLE_LENGTH, MIN_HANDLE_LENGTH } from '../../common/constants.ts';
import { useContext, useState } from 'react'
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { registerUser } from '../../service/auth-service';


const Signup = () => {

    const navigate = useNavigate();
    const [error, setError] = useState('');

    const [form, setForm] = useState({
        firstName: '',
        handle: '',
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
    });

    const setUser = useContext(AuthContext)

    const updateForm = (prop: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [prop]: e.target.value
        })
    }

    const onRegister = () => {

        if (!form.firstName || (/[0-9]/.test(form.firstName))) {
            return setError('First name must be a text!')
        }
        if (form.handle.length < MIN_HANDLE_LENGTH || form.handle.length > MAX_HANDLE_LENGTH) {
            return setError('Username must be between 2 and 20 characters!')
        }
        if (!form.email || !form.email.includes("@")) {
            return setError('Please enter a valid email!')
        }
        if (form.phoneNumber.length !== 10) {
            return setError('Please enter a valid phone number!')
        }
        if (form.password !== form.confirmPassword) {
            return setError(`Passwords don't match!`)
        }
        if (!form.password || form.password.length < MIN_PASSWORD_LENGTH || !(/[A-Z]/.test(form.password)) || !(/[0-9]/.test(form.password))) {
            return setError('Password should be longer than 5 symbols, containing at least one number and one capital letter!')
        }

        checkForPhoneNumber(form.phoneNumber).then((response) => response.val())
            .then((result) => {
                if (result !== null) {
                    return alert('Phone number is already in use!')
                }
            })

        getUserByHandle(form.handle)
            .then(snapshot => {
                if (snapshot.val()) {
                    alert(`Username is already in use!`)
                    return
                }
                return registerUser(form.email, form.password)
            })
            .catch((e) => {
                console.log(e.message);
                if (e.message.includes('invalid-email')) {
                    return setError('Email is invalid!')
                }
                if (e.message.includes('email-already-in-use')) {
                    return setError('Email is already in use!')
                }
            })
            .then(async (credential: any) => {
                return await createUserHandle(form.handle, credential.user.uid, credential.user.email, form.phoneNumber)
                    .then(() => {
                        { setUser } ({
                            user: credential.user
                        })
                    })
            })
            .then(() => {
                navigate('/');
            })
            .catch((e) => {
                console.log(e.message);
            })
    }
    return (

        <AbsoluteCenter>
            <Center>
                <Text fontSize={40}>
                    Sign Up
                </Text>
            </Center>
            <br />
            <Input w={250} mb={3} placeholder='First name' value={form.firstName} onChange={updateForm('firstName')} /> <br />
            <Input w={250} mb={3} placeholder='Username' value={form.handle} onChange={updateForm('handle')} /> <br />
            <Input w={250} mb={3} type='email' placeholder='Email' value={form.email} onChange={updateForm('email')} /> <br />
            <Input w={250} mb={3} placeholder='Phone Number' value={form.phoneNumber} onChange={updateForm('phoneNumber')} /> <br />
            <Input w={250} mb={3} type='password' placeholder='Password' value={form.password} onChange={updateForm('password')} /> <br />
            <Input w={250} mb={3} type='password' placeholder='Confirm Password' value={form.confirmPassword} onChange={updateForm('confirmPassword')} /> <br />
            <Center>
                {error && (
                    <Text color="red" mr="6px"><strong>{error}</strong> </Text>
                )}
            </Center>
            <br />
            <Center>
                <Button colorScheme={"purple"} onClick={onRegister}>Sign up</Button> <br />
            </Center>
            <Center>
                <Text mr="6px">Already have an account?</Text>
                <Link
                    as={RouterLink}
                    to="/log-in"
                    color="pruple.500">
                    Log In
                </Link>
            </Center>
        </AbsoluteCenter>
    )
}

export default Signup