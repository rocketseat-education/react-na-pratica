import { Button } from '../../components/ui/button'
import { TableCell, TableRow } from '../../components/ui/table'

export function TagsTableSkeleton() {
	return (
		<>
			{Array.from({ length: 10 }).map((_, i) => {
				return (
					<TableRow key={i}>
						<TableCell className='flex items-center gap-5'>
							<div className='w-4 h-4 rounded-md bg-zinc-800 border  border-zinc-900 hover:cursor-pointer' />

							<div className='flex flex-col gap-1'>
								<span className='w-32 h-5 animate-pulse bg-zinc-800 rounded-md' />
								<span className='w-16 h-4 animate-pulse bg-zinc-800 rounded-md' />
							</div>
						</TableCell>

						<TableCell>
							<div className='h-5 w-20 animate-pulse bg-zinc-800 rounded-md' />
						</TableCell>

						<TableCell className='text-right'>
							<Button
								size='icon'
								className='animate-pulse h-[30px] w-[30px]'
							/>
						</TableCell>
					</TableRow>
				)
			})}
		</>
	)
}
