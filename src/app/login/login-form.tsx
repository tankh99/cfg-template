'use client';

import { useLogin } from '@/api/hooks/useAuth';
import { FormTextInput } from '@/components/form-inputs/form-text-input'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const loginFormSchema = z.object({
    username: z.string().min(1, "Username is required"),
    password: z.string().min(1, "Password is required"),
})

export type LoginFormValues = z.infer<typeof loginFormSchema>

const defaultValues: LoginFormValues = {
    username: '',
    password: ''
}

export default function LoginForm() {
    const loginMutation = useLogin();

    const form = useForm<LoginFormValues>({
        defaultValues,
        mode: "onChange",
        resolver: zodResolver(loginFormSchema),

    })

    const handleSubmit = (values: LoginFormValues) => {
        loginMutation.mutate(values);

    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className='flex flex-col space-y-4 w-[480px]'>
                <FormTextInput
                    name="username"
                    label="Username"
                    form={form}
                    />
                <FormTextInput
                    name="password"
                    label="Password"
                    inputProps={{
                        type: "password"
                    }}
                    form={form}
                    />
                <Button type="submit">Login</Button>
            </form>

        </Form>
    )
}
