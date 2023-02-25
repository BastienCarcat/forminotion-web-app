import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { useDrag, useDrop } from 'react-dnd'
import { DraggableTypes } from '../../Layout'
import clsx from 'clsx'
import TextField from '../../../../ui/Form/Inputs/Text'
import DragSVG from '../../../../ui/Icons/DragSVG'
import NumberField from '../../../../ui/Form/Inputs/Number'
import SwitchField from '../../../../ui/Form/Inputs/Switch'
import SelectField from '../../../../ui/Form/Inputs/Select'
import StatusField from '../../../../ui/Form/Inputs/Status'
import DateField from '../../../../ui/Form/Inputs/Date'
import URLField from '../../../../ui/Form/Inputs/URL'
import PhoneNumberField from '../../../../ui/Form/Inputs/PhoneNumber'
import MailField from '../../../../ui/Form/Inputs/Mail'
import MultiSelectField from '../../../../ui/Form/Inputs/MultiSelect'
import NotAvailableField from '../../../../ui/Form/Inputs/NotAvailable'

const FieldFormEditionBlockForm = ({ field, dragField, index }) => {
  const [{ handlerId, isOver }, drop] = useDrop(
    {
      accept: DraggableTypes.FIELD,
      drop: (item) => dragField(item.index, index),
      collect: (monitor) => ({
        handlerId: monitor.getHandlerId(),
        isOver: monitor.isOver()
      })
    },
    [index]
  )

  const [{ isDragging }, drag, preview] = useDrag(
    () => ({
      type: DraggableTypes.FIELD,
      item: () => {
        return { id: _.get(field, 'id'), index }
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging()
      })
    }),
    [field, index]
  )

  return (
    <div
      ref={(el) => {
        drop(el)
        preview(el)
      }}
      data-handler-id={handlerId}
      className={clsx(
        'rounded-lg border border-dashed p-1 sm:col-span-3',
        isOver ? ' border-primary' : 'border-transparent'
      )}
    >
      <div className={isOver || isDragging ? 'opacity-50' : 'opacity-100'}>
        {(() => {
          switch (_.get(field, 'property.type')) {
            case 'title':
            case 'rich_text':
              return (
                <TextField
                  name={_.get(field, 'idFieldNotion')}
                  label={
                    <div className="flex items-center">
                      <div ref={drag}>
                        <DragSVG className="mr-1 cursor-move text-lg" />
                      </div>

                      {_.get(field, 'label')}
                    </div>
                  }
                />
              )

            case 'number':
              return (
                <NumberField
                  name={_.get(field, 'idFieldNotion')}
                  label={
                    <div className="flex items-center">
                      <div ref={drag}>
                        <DragSVG className="mr-1 cursor-move text-lg" />
                      </div>

                      {_.get(field, 'label')}
                    </div>
                  }
                />
              )

            case 'checkbox':
              return (
                <div className="flex h-full">
                  <SwitchField
                    name={_.get(field, 'idFieldNotion')}
                    label={
                      <div className="flex items-center">
                        <div ref={drag}>
                          <DragSVG className="mr-1 cursor-move text-lg" />
                        </div>

                        {_.get(field, 'label')}
                      </div>
                    }
                  />
                </div>
              )

            case 'select':
              return (
                <SelectField
                  name={_.get(field, 'idFieldNotion')}
                  label={
                    <div className="flex items-center">
                      <div ref={drag}>
                        <DragSVG className="mr-1 cursor-move text-lg" />
                      </div>

                      {_.get(field, 'label')}
                    </div>
                  }
                  options={_.get(field, 'property.select.options', [])}
                  getOptionLabel={(option) => _.get(option, 'name', '')}
                  optionColor
                />
              )

            case 'status':
              return (
                <StatusField
                  name={_.get(field, 'idFieldNotion')}
                  label={
                    <div className="flex items-center">
                      <div ref={drag}>
                        <DragSVG className="mr-1 cursor-move text-lg" />
                      </div>

                      {_.get(field, 'label')}
                    </div>
                  }
                  options={_.get(field, 'property.status.options', [])}
                  groups={_.get(field, 'property.status.groups', [])}
                  getOptionLabel={(option) => _.get(option, 'name', '')}
                  optionColor
                />
              )

            case 'date':
              return (
                <DateField
                  name={_.get(field, 'idFieldNotion')}
                  label={
                    <div className="flex items-center">
                      <div ref={drag}>
                        <DragSVG className="mr-1 cursor-move text-lg" />
                      </div>

                      {_.get(field, 'label')}
                    </div>
                  }
                />
              )

            case 'url':
              return (
                <URLField
                  name={_.get(field, 'idFieldNotion')}
                  label={
                    <div className="flex items-center">
                      <div ref={drag}>
                        <DragSVG className="mr-1 cursor-move text-lg" />
                      </div>

                      {_.get(field, 'label')}
                    </div>
                  }
                />
              )

            case 'phone_number':
              return (
                <PhoneNumberField
                  name={_.get(field, 'idFieldNotion')}
                  label={
                    <div className="flex items-center">
                      <div ref={drag}>
                        <DragSVG className="mr-1 cursor-move text-lg" />
                      </div>

                      {_.get(field, 'label')}
                    </div>
                  }
                />
              )

            case 'email':
              return (
                <MailField
                  name={_.get(field, 'idFieldNotion')}
                  label={
                    <div className="flex items-center">
                      <div ref={drag}>
                        <DragSVG className="mr-1 cursor-move text-lg" />
                      </div>

                      {_.get(field, 'label')}
                    </div>
                  }
                />
              )

            case 'multi_select':
              return (
                <MultiSelectField
                  name={_.get(field, 'idFieldNotion')}
                  label={
                    <div className="flex items-center">
                      <div ref={drag}>
                        <DragSVG className="mr-1 cursor-move text-lg" />
                      </div>

                      {_.get(field, 'label')}
                    </div>
                  }
                  options={_.get(field, 'property.multi_select.options', [])}
                  getOptionLabel={(option) => _.get(option, 'name', '')}
                  optionColor
                />
              )

            default:
              return (
                <NotAvailableField
                  label={
                    <div className="flex items-center">
                      <div ref={drag}>
                        <DragSVG className="mr-1 cursor-move text-lg" />
                      </div>

                      {_.get(field, 'label')}
                    </div>
                  }
                  type={_.get(field, 'property.type')}
                />
              )
          }
        })()}
      </div>
    </div>
  )
}

FieldFormEditionBlockForm.propTypes = {
  field: PropTypes.object,
  dragField: PropTypes.func,
  index: PropTypes.number
}

export default FieldFormEditionBlockForm
