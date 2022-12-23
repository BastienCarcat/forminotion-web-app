import React from 'react'
import Image from '../../../../Images/guide-create.svg'

const DetailsBlocksGuide = () => {
  return (
    <>
      <section aria-labelledby="form-link-copy">
        <div className="rounded-lg bg-white overflow-hidden shadow">
          <div className="p-4">
            <h2
              className="text-xl tracking-tight font-extrabold text-gray-900 sm:text-2xl"
              id="form-link-copy"
            >
              How to embed your form ?
            </h2>
            {/*<div className="flex items-center gap-x-6 mt-4">*/}
            <div className="w-96 mt-14">
              <img src={Image} alt="" />
            </div>
            {/*</div>*/}
          </div>
        </div>
      </section>
    </>
  )
}

DetailsBlocksGuide.propTypes = {}

export default DetailsBlocksGuide
