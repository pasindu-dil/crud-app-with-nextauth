import CountryPage from "@/features/country/ui/CountryPage"
import { getInitialProps } from "../../processes/data-fetching/get-country";

const page = async () => {
  const { initialData, initialPagination } = await getInitialProps()
  
  return (
    <CountryPage repo={{ initialData, initialPagination }} />
  )
}

export default page