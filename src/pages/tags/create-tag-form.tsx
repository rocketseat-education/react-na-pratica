import { zodResolver } from '@hookform/resolvers/zod'
import * as Dialog from '@radix-ui/react-dialog'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { LucideCheck, LucideLoader2, LucideX } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { Button } from '../../components/ui/button'
import { getSlugFromString } from '../../utils/get-slug-from-string'

const createTagSchema = z.object({
	title: z
		.string()
		.min(3, { message: 'Minimum 3 characters.' })
		.refine((value) => value.trim().length > 0, { message: 'Minimum 3 characters.' }),
})

type CreateTagSchema = z.infer<typeof createTagSchema>

export function CreateTagForm({ closeDialog }: { closeDialog: () => void }) {
	const queryClient = useQueryClient()

	const { register, handleSubmit, watch, formState } = useForm<CreateTagSchema>({
		resolver: zodResolver(createTagSchema),
	})

	const slug = watch('title') ? getSlugFromString(watch('title')) : ''

	const { mutateAsync } = useMutation({
		mutationFn: async ({ title }: CreateTagSchema) => {
			// delay 2s
			await new Promise((resolve) => setTimeout(resolve, 2000))

			await fetch('http://localhost:3333/tags', {
				method: 'POST',
				body: JSON.stringify({
					title,
					slug,
					amountOfVideos: 0,
				}),
			})
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['get-tags'],
			})

			toast.success('Successfully created tag!')

			closeDialog()
		},
		onError: () => toast.error('Something went wrong. Please try again.'),
	})

	async function createTag({ title }: CreateTagSchema) {
		await mutateAsync({ title })
	}

	return (
		<form
			onSubmit={handleSubmit(createTag)}
			className='w-full space-y-6'
		>
			<div className='space-y-2'>
				<label
					className='text-sm font-medium block'
					htmlFor='title'
				>
					Tag name
				</label>
				<input
					{...register('title')}
					id='name'
					type='text'
					className='border border-zinc-800 rounded-lg px-3 py-2.5 bg-zinc-800/50 w-full text-sm'
				/>
				{formState.errors?.title && (
					<p className='text-sm text-red-400'>{formState.errors.title.message}</p>
				)}
			</div>

			<div className='space-y-2'>
				<label
					className='text-sm font-medium block'
					htmlFor='slug'
				>
					Slug
				</label>
				<input
					id='slug'
					type='text'
					readOnly
					value={slug}
					className='border border-zinc-800 rounded-lg px-3 py-2 bg-zinc-800/50 w-full text-sm'
				/>
			</div>

			<div className='flex items-center justify-end gap-2'>
				<Dialog.Close
					asChild
					onClick={closeDialog}
				>
					<Button>
						<LucideX className='size-3' />
						Cancel
					</Button>
				</Dialog.Close>

				<Button
					disabled={formState.isSubmitting}
					className='bg-teal-400 text-teal-950'
					type='submit'
				>
					{formState.isSubmitting ? (
						<LucideLoader2 className='size-3 animate-spin' />
					) : (
						<LucideCheck className='size-3' />
					)}
					Save
				</Button>
			</div>
		</form>
	)
}
