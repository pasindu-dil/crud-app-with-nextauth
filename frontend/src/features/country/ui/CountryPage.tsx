'use client'

import CountryForm from "@/entities/country/ui/CountryForm"

const CountryPage = () => {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <CountryForm />
    </div>
  )
}

export default CountryPage