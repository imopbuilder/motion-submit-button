'use client';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils/cn';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';

const formSchema = z
	.object({
		username: z
			.string()
			.min(2, { message: 'Username must contain at least 2 characters' })
			.max(50, { message: 'Username must contain at most 50 characters' }),
		password: z
			.string()
			.min(8, { message: 'Password must contain at least 8 characters' })
			.max(50, { message: 'Password must contain at least 50 characters' }),
		confirmPassword: z
			.string()
			.min(8, { message: 'Confirm password must contain at least 8 characters' })
			.max(50, { message: 'Confirm password must contain at least 50 characters' }),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Confirm password did not match password!',
		path: ['confirmPassword'],
	});

export function UserEmailForm() {
	const [position, setPosition] = useState<'left' | 'right'>('right');
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: '',
			password: '',
			confirmPassword: '',
		},
	});

	function handlePointerEnter() {
		if (form.formState.isValid) return;

		setPosition((curr) => {
			if (curr === 'left') return 'right';
			return 'left';
		});
	}

	function onSubmit(values: z.infer<typeof formSchema>) {
		toast.success('Login success', {
			description: <span className='font-medium'>{values.username} ❤️</span>,
		});
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-3'>
				<FormField
					control={form.control}
					name='username'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Username:</FormLabel>
							<FormControl>
								<Input placeholder='shadcn' autoComplete='off' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='password'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password:</FormLabel>
							<FormControl>
								<Input placeholder='Password' autoComplete='off' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='confirmPassword'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Confirm Password:</FormLabel>
							<FormControl>
								<Input placeholder='Confirm Password' autoComplete='off' {...field} />
							</FormControl>
							<FormDescription>Confirm password should match password</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div>
					<Button
						type='submit'
						className={cn('relative', form.formState.isValid ? '' : position === 'left' ? 'animate-from-left' : 'animate-from-right')}
						onPointerEnter={handlePointerEnter}
					>
						Submit
					</Button>
				</div>
			</form>
		</Form>
	);
}
