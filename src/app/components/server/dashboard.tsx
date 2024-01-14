import { columns } from '@client/table/columns'
import { DataTable } from '@client/table/data-table'
import { UserNav } from '@client/user-nav'
import { getTasks } from '@actions/task'
import { getServerAuthSession } from '@server/auth'

export const App = async (): Promise<JSX.Element> => {
  const tasks = await getTasks()
  const session = await getServerAuthSession()
  console.log({ session })
  console.log({ tasks })
  return (
    <div className='hidden h-full flex-1 flex-col space-y-8 p-8 md:flex'>
      <div className='flex items-center justify-between space-y-2'>
        <div>
          <h2 className='text-2xl font-bold tracking-tight'>Welcome back! {session?.user.name ?? ''}.</h2>
          <p className='text-muted-foreground'>
            Here&apos;s a list of your tasks for this month!
          </p>
        </div>
        <div className='flex items-center space-x-2'>
          <UserNav />
        </div>
      </div>
      <DataTable data={tasks} columns={columns} />
    </div>
  )
}
