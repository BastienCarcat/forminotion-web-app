import React, { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import _ from 'lodash'
import { useParams } from 'react-router-dom'
import Loader from '../../ui/Globals/Loader'
import MainForm from './Form'

const FormLayout = () => {
  const [databaseInfo, setDatabaseInfo] = useState(null)
  const [loading, setLoading] = useState(false)

  const { idForm } = useParams()

  const retrieveDatabaseInfo = useCallback(async () => {
    try {
      setLoading(true)
      const data = await axios.get('form/getById', {
        params: { id: idForm }
      })

      return _.get(data, 'data')
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }, [idForm])

  useEffect(() => {
    async function init() {
      const response = await retrieveDatabaseInfo()
      _.set(response, 'fields', _.orderBy(_.filter(_.get(response, 'fields'), (x) => _.get(x, 'enabled')), ['label']))
      setDatabaseInfo(response)
    }
    init()
  }, [retrieveDatabaseInfo])


  if (loading) return <Loader />

  return (
   <>
     <MainForm databaseInfo={databaseInfo}/>
     {/*<form className="space-y-8 divide-y divide-gray-200">*/}
     {/*  <div className="space-y-8 divide-y divide-gray-200">*/}
     {/*    <div className="pt-8">*/}
     {/*      <div>*/}
     {/*        <h3 className="text-lg leading-6 font-medium text-gray-900">{_.get(databaseInfo, 'title')}</h3>*/}
     {/*        <p className="mt-1 text-sm text-gray-500">{_.get(databaseInfo, 'description')}</p>*/}
     {/*      </div>*/}
     {/*      <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">*/}
     {/*        <div className="sm:col-span-6">*/}
     {/*          <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">*/}
     {/*            First name*/}
     {/*          </label>*/}
     {/*          <div className="mt-1">*/}
     {/*            <input*/}
     {/*              type="text"*/}
     {/*              name="first-name"*/}
     {/*              id="first-name"*/}
     {/*              autoComplete="given-name"*/}
     {/*              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"*/}
     {/*            />*/}
     {/*          </div>*/}
     {/*        </div>*/}
     {/*      </div>*/}
     {/*    </div>*/}
     {/*  </div>*/}

     {/*  <div className="pt-5">*/}
     {/*    <div className="flex justify-end">*/}
     {/*      <button*/}
     {/*        type="submit"*/}
     {/*        className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"*/}
     {/*      >*/}
     {/*        Save*/}
     {/*      </button>*/}
     {/*    </div>*/}
     {/*  </div>*/}
     {/*</form>*/}
   </>
  )
}

FormLayout.propTypes = {}

export default FormLayout