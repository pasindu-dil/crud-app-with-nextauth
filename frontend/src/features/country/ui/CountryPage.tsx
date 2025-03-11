import CountryForm from "@/entities/country/ui/CountryForm"
import { initialPropsType } from "../model/country-types"
import CountryTable from "./CountryTable"

const CountryPage = ({ repo }: { repo: initialPropsType }) => {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <CountryForm />
      <CountryTable initialData={repo.initialData} initialPagination={repo.initialPagination} />
    </div>
  )
}

export default CountryPage