import React, { forwardRef } from 'react'
import { PropTypes } from 'prop-types'
import { Field } from 'react-final-form'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import MaskedInput from 'react-text-mask'
import _ from 'lodash'
import createAutoCorrectedDatePipe from 'text-mask-addons/dist/createAutoCorrectedDatePipe'
import moment from 'moment'

const DateField = ({ label, name, ...others }) => {
  return (
    // <Field name={name} {...others}>
    //   {({ input }) => (
    //     <div>
    //       <label
    //         htmlFor={name}
    //         className="block text-sm font-medium text-gray-700"
    //       >
    //         {label}
    //       </label>
    //       <div className="mt-1 relative rounded-md shadow-sm">
    //         <input
    //           type="date"
    //           className="focus:ring-primary focus:border-primary w-full sm:text-sm border-gray-300 rounded-md"
    //           {...input}
    //         />
    //       </div>
    //     </div>
    //   )}
    // </Field>
    <Field name={name} {...others}>
      {({ input }) => (
        <div>
          <label
            htmlFor={name}
            className="block text-sm font-medium text-gray-700"
          >
            {label}
          </label>
          <DatePicker
            {...input}
            customInput={<Input input={input} />}
            // onChangeRaw={(date) => {
            //   const newRaw = new Date(date.currentTarget.value)
            //   if (isDate(newRaw)) {
            //     input.onChange(newRaw)
            //   }
            // }}
            selected={_.get(input, 'value')}
            renderCustomHeader={({
              date,
              decreaseMonth,
              increaseMonth,
              prevMonthButtonDisabled,
              nextMonthButtonDisabled
            }) => (
              <div className="flex items-center justify-between px-2 py-2">
                <span className="text-lg text-gray-700">
                  {moment(date).format('MMMM YYYY')}
                </span>
                <div className="space-x-2">
                  <button
                    onClick={decreaseMonth}
                    disabled={prevMonthButtonDisabled}
                    type="button"
                    className={`${
                      prevMonthButtonDisabled && 'cursor-not-allowed opacity-50'
                    } inline-flex p-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-primary`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-5 h-5 text-gray-600"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 19.5L8.25 12l7.5-7.5"
                      />
                    </svg>
                  </button>

                  <button
                    onClick={increaseMonth}
                    disabled={nextMonthButtonDisabled}
                    type="button"
                    className={`${
                      nextMonthButtonDisabled && 'cursor-not-allowed opacity-50'
                    } inline-flex p-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-primary`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-5 h-5 text-gray-600"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 4.5l7.5 7.5-7.5 7.5"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          />
        </div>
      )}
    </Field>
  )
}

DateField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired
}

// eslint-disable-next-line react/display-name
const Input = forwardRef(({ onClick, input }, ref) => {
  const autoCorrectedDatePipe = createAutoCorrectedDatePipe('mm/dd/yyyy HH:MM')

  return (
    <div className="mt-1 flex rounded-md shadow-sm">
      <div className="relative flex items-stretch flex-grow focus-within:z-10">
        <MaskedInput
          type="text"
          ref={ref}
          guide
          keepCharPositions
          placeholder="    /    /     "
          pipe={autoCorrectedDatePipe}
          mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
          className="text-black focus:ring-primary focus:border-primary w-full rounded-none rounded-l-md sm:text-sm border-gray-300"
          {...input}
          onChange={(e) => {
            const value = _.get(e, 'target.value')
            if (moment(value).isValid()) {
              input.onChange(new Date(value))
            } else if (!value) {
              input.onChange(null)
            }
          }}
          value={
            moment(_.get(input, 'value')).isValid()
              ? moment(_.get(input, 'value')).format('MM/DD/YYYY')
              : _.get(input, 'value')
          }
        />
      </div>
      <button
        onClick={onClick}
        type="button"
        className="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.6"
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
          />
        </svg>
      </button>
    </div>
  )
})

Input.propTypes = {
  onClick: PropTypes.func,
  input: PropTypes.object
}

export default DateField
