import React, { useCallback, useMemo } from 'react'
import MainForm from './Form'
import { useContextForm } from './Contexts/behaviour'
import _ from 'lodash'
import { useParams } from 'react-router-dom'

const FormLayout = () => {
  // const [databaseInfo, setDatabaseInfo] = useState(null)
  //
  // const { idForm } = useParams()
  //
  // const [get, loading] = useAxiosGetNoAuth()
  //
  // useEffect(() => {
  //   async function init() {
  //     const response = await get('form/getById', {
  //       params: { id: idForm }
  //     })
  //
  //     setDatabaseInfo(response)
  //   }
  //   init()
  // }, [idForm, get])
  //
  // if (loading)
  //   return (
  //     <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
  //       <Loader />
  //     </div>
  //   )
  //
  // if (
  //   _.get(databaseInfo, 'notion.deleted') ||
  //   _.get(databaseInfo, 'notion.archived')
  // ) {
  //   return (
  //     <div className="flex h-full w-full flex-col items-center justify-center p-8">
  //       <div className="max-w-lg text-center text-xl text-gray-900">Oops!</div>
  //       <div className="text-md mt-2 max-w-lg text-center text-gray-900">
  //         This form is no longer available.
  //       </div>
  //       <img
  //         className="my-6 h-auto w-64"
  //         src={Warning}
  //         alt="warning illustration"
  //       />
  //       <div className="text-md max-w-lg text-center text-gray-900">
  //         It seems that the notion database linked to this form has been
  //         deleted.
  //         {_.get(databaseInfo, 'notion.archived') && (
  //           <>
  //             <a
  //               href={_.get(databaseInfo, 'notion.url')}
  //               className="mx-1 text-gray-800 underline"
  //               target="_blank"
  //               rel="noreferrer"
  //             >
  //               Click here
  //             </a>
  //             to restore it.
  //           </>
  //         )}
  //       </div>
  //     </div>
  //   )
  // }

  const { linkDatabaseToForm, localDatabase } = useContextForm()
  const { idForm } = useParams()

  const fakeData = useMemo(
    () => ({
      databaseURL:
        'https://www.notion.so/fbd9bc26ec5a441194f6387021ea1716?v=e2c50cc25b1744c18b9fbb9aad100f8b'
    }),
    []
  )

  const linkDatabase = useCallback(
    (databaseURL) => {
      linkDatabaseToForm(databaseURL)
    },
    [linkDatabaseToForm]
  )

  const callback = useCallback(() => {
    console.log('cb')
  }, [])

  const handleAddToNotion = useCallback(() => {
    const win = window.open(
      `https://api.notion.com/v1/oauth/authorize?owner=user&client_id=${
        process.env.REACT_APP_NOTION_CLIENT_ID
      }&response_type=code&state=idDatabase${_.get(
        localDatabase,
        'idDatabase'
      )}idForm${idForm}`,
      '_blank',
      'location=yes,height=800,width=600,scrollbars=yes,status=yes'
    )
    win.addEventListener('storage', () => {
      console.log('storage changed')
    })
    let i = 0
    const closeDetectInterval = setInterval(async () => {
      i++
      if (win.closed) {
        clearInterval(closeDetectInterval)
        callback()
      }
      if (i === 120) {
        clearInterval(closeDetectInterval)
        win.close()
      }
    }, 10000)
  }, [idForm, localDatabase, callback])

  return _.get(localDatabase, 'idDatabase') &&
    _.get(localDatabase, 'idAuthorization') ? (
    <MainForm />
  ) : !_.get(localDatabase, 'idDatabase') ? (
    <button onClick={() => linkDatabase(_.get(fakeData, 'databaseURL'))}>
      link database
    </button>
  ) : (
    <button
      onClick={handleAddToNotion}
      type="button"
      className="mt-4 inline-flex items-center rounded-md border border-transparent bg-primary px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-primary-600 "
    >
      Get authorization
    </button>
  )
}

FormLayout.propTypes = {}

export default FormLayout
