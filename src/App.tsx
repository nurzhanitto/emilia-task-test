import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { dispatch, TState } from './store'
import SearchAppBar from './components/AppBar/AppBar'
import { UserTable } from './components/Table/Table'
import { LoadingIndicator } from './components/Loading/Loading'
import { ErrorMessage } from './components/Error/Error'
import { getUsersRem } from './store/users.slice'

function App() {
  const { loading, error } = useSelector((state: TState) => state.users);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    dispatch(getUsersRem({ skip: 0, limit: 10 }));
    setIsInitialLoad(false)
  }, [isInitialLoad]);
  return <>
    <SearchAppBar />
    {loading && <LoadingIndicator />}
    {error && <ErrorMessage message={error} />}
    {!loading && !error && <UserTable />}
  </>
}

export default App
