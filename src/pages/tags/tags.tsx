import * as Dialog from '@radix-ui/react-dialog'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import {
	LucideFileDown,
	LucideFilter,
	LucideLoader2,
	LucideMoreHorizontal,
	LucidePlus,
	LucideSearch,
} from 'lucide-react'
import { FormEvent, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Header } from '../../components/header'
import { Pagination } from '../../components/pagination'
import { Tabs } from '../../components/tabs'
import { Button } from '../../components/ui/button'
import { Control, Input } from '../../components/ui/input'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '../../components/ui/table'
import { CreateTagForm } from './create-tag-form'
import { TagsTableSkeleton } from './tags-table-skeleton'

export interface TagResponse {
	first: number
	prev: number | null
	next: number
	last: number
	pages: number
	items: number
	data: Tag[]
}

export interface Tag {
	title: string
	slug: string
	amountOfVideos: number
	id: string
}

export function Tags() {
	const [dialogState, setDialogState] = useState<'closed' | 'open'>('closed')

	const [searchParams, setSearchParams] = useSearchParams()
	const urlFilter = searchParams.get('filter') ?? ''

	const [filter, setFilter] = useState(urlFilter)

	const page = searchParams.get('page') ? Number(searchParams.get('page')) : 1

	// const isLoading = false

	const {
		data: tagsResponse,
		isFetching,
		isLoading,
	} = useQuery<TagResponse>({
		queryKey: ['get-tags', urlFilter, page],
		queryFn: async () => {
			// delay 2s
			await new Promise((resolve) => setTimeout(resolve, 2000))

			const response = await fetch(
				`http://localhost:3333/tags?_page=${page}&_per_page=10&title=${urlFilter}`
			)
			const data = await response.json()

			return data
		},
		placeholderData: keepPreviousData,
	})

	function handleFilter(event: FormEvent) {
		event.preventDefault()

		setSearchParams((params) => {
			params.set('page', '1')
			params.set('filter', filter)

			return params
		})
	}

	return (
		<div className='py-10 space-y-8'>
			<div>
				<Header />
				<Tabs />
			</div>
			<main className='max-w-6xl mx-auto space-y-5'>
				<div className='flex items-center gap-3'>
					<h1 className='text-xl font-bold'>Tags</h1>

					<Dialog.Root>
						<Dialog.Trigger
							asChild
							onClick={() => setDialogState('open')}
						>
							<Button variant='primary'>
								<LucidePlus className='size-3' />
								Create new
							</Button>
						</Dialog.Trigger>

						{dialogState === 'open' && (
							<Dialog.Portal>
								<Dialog.Overlay className='fixed inset-0 bg-black/70' />

								<Dialog.Content className='fixed space-y-10 p-10 right-0 top-0 bottom-0 h-screen min-w-[320px] z-10 bg-zinc-950 border-l border-zinc-900'>
									<div className='space-y-3'>
										<Dialog.Title className='text-xl font-bold'>Create tag</Dialog.Title>

										<Dialog.Description className='text-sm text-zinc-500'>
											Tags can be used to group videos about similar concepts.
										</Dialog.Description>
									</div>

									<CreateTagForm closeDialog={() => setDialogState('closed')} />
								</Dialog.Content>
							</Dialog.Portal>
						)}
					</Dialog.Root>

					{isFetching && <LucideLoader2 className='size-4 animate-spin text-zinc-500' />}
				</div>

				<div className='flex items-center justify-between'>
					<form
						onSubmit={handleFilter}
						className='flex items-center gap-2'
					>
						<Input variant='filter'>
							<LucideSearch className='size-3' />

							<Control
								placeholder='Search tags...'
								onChange={(e) => setFilter(e.target.value)}
								value={filter}
							/>
						</Input>

						<Button type='submit'>
							<LucideFilter className='size-3' />
							Apply filters
						</Button>
					</form>

					<Button>
						<LucideFileDown className='size-3' />
						Export
					</Button>
				</div>

				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className='flex items-center gap-5'>
								{/* checkbox placeholder */}
								<div className='w-4 h-4 border rounded-md border-zinc-800 hover:cursor-pointer' />
								Tag
							</TableHead>
							<TableHead>Amount of videos</TableHead>
							<TableHead className='text-end'>Actions</TableHead>
						</TableRow>
					</TableHeader>

					<TableBody>
						{isLoading ? (
							<TagsTableSkeleton />
						) : (
							<>
								{tagsResponse?.data.map((tag) => {
									return (
										<TableRow key={tag.id}>
											<TableCell className='flex items-center gap-5'>
												<div className='w-4 h-4 border rounded-md border-zinc-800 hover:cursor-pointer' />

												<div className='flex flex-col gap-0.5'>
													<span className='font-medium'>{tag.title}</span>
													<span className='text-xs text-zinc-500'>{tag.slug}</span>
												</div>
											</TableCell>

											<TableCell className='text-zinc-300'>{tag.amountOfVideos} video(s)</TableCell>

											<TableCell className='text-right'>
												<Button size='icon'>
													<LucideMoreHorizontal className='size-4' />
												</Button>
											</TableCell>
										</TableRow>
									)
								})}
							</>
						)}
					</TableBody>
				</Table>

				{tagsResponse && (
					<Pagination
						pages={tagsResponse.pages}
						items={tagsResponse.items}
						page={page}
					/>
				)}
			</main>
		</div>
	)
}
