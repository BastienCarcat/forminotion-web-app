import React, { useCallback, useState } from 'react'
import MainForm from './Form'
import { useContextForm } from './Contexts/behaviour'
import _ from 'lodash'
import { useParams } from 'react-router-dom'
import { config } from '../../../config'

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

  const {
    localDatabase,
    callbackAuthorization,
    form,
    updateIdDatabase,
    clearStorage,
    authorization,
    checkUrl
  } = useContextForm()
  const { idForm } = useParams()

  const { apiUrl } = config || {}

  const [url, setUrl] = useState(null)

  const handleChangeUrl = useCallback((event) => {
    setUrl(event.target.value)
  }, [])

  const formatUrlToUuid = useCallback((url) => {
    return _.chain(url)
      .split('/')
      .last()
      .split('?')
      .head()
      .split('', 32)
      .thru((chunks) => {
        return [
          chunks.slice(0, 8).join(''),
          chunks.slice(8, 12).join(''),
          chunks.slice(12, 16).join(''),
          chunks.slice(16, 20).join(''),
          chunks.slice(20).join('')
        ]
      })
      .join('-')
      .value()
  }, [])

  const handleUpdateIdDatabase = useCallback(
    async (databaseURL) => {
      if (databaseURL) {
        const idDatabase = formatUrlToUuid(databaseURL)

        await updateIdDatabase(idDatabase)
      }
    },
    [formatUrlToUuid, updateIdDatabase]
  )

  const linkDatabase = useCallback(
    async (databaseURL) => {
      if (databaseURL) {
        await checkUrl(databaseURL)
      }
    },
    [checkUrl]
  )

  const onCloseWindow = useCallback(async () => {
    await callbackAuthorization()
  }, [callbackAuthorization])

  const handleAddToNotion = useCallback(() => {
    const win = window.open(
      `https://api.notion.com/v1/oauth/authorize?owner=user&client_id=${
        process.env.REACT_APP_NOTION_CLIENT_ID
      }&redirect_uri=${apiUrl}notion/callback&response_type=code&state=idDatabase${_.get(
        localDatabase,
        'idDatabase'
      )}idForm${idForm}`,
      '_blank',
      'location=yes,height=800,width=600,scrollbars=yes,status=yes'
    )

    let i = 0
    const closeDetectInterval = setInterval(() => {
      i++
      if (win.closed) {
        clearInterval(closeDetectInterval)
        onCloseWindow()
      }
      if (i === 120) {
        clearInterval(closeDetectInterval)
        win.close()
      }
    }, 500)
  }, [idForm, localDatabase, onCloseWindow, apiUrl])

  return (
    <>
      <button onClick={clearStorage}>CLEAR STORAGE</button>
      {_.get(localDatabase, 'idDatabase') && authorization ? (
        _.get(form, 'notion.invalidId') ? (
          <>
            <input
              value={url}
              onChange={handleChangeUrl}
              type="text"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            ></input>
            <button onClick={() => handleUpdateIdDatabase(url)}>
              Update ID
            </button>
          </>
        ) : _.get(form, 'notion.mismatchedFields') ? (
          <div>
            Les forms sont incompatibles créer en un nouveau ou rafraichir.
          </div>
        ) : _.get(form, 'unauthorized') ? (
          <div>
            La database n est pas autorisée ou alors l id (url) n est pas bon.
          </div>
        ) : (
          <MainForm />
        )
      ) : !_.get(localDatabase, 'idDatabase') ? (
        <>
          <input
            value={url}
            onChange={handleChangeUrl}
            type="text"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          ></input>
          <button onClick={() => linkDatabase(url)}>link database</button>
        </>
      ) : (
        <button
          onClick={handleAddToNotion}
          type="button"
          className="mt-4 inline-flex items-center rounded-md border border-transparent bg-primary px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-primary-600 "
        >
          Get authorization
        </button>
      )}
    </>
  )
}

FormLayout.propTypes = {}

export default FormLayout
