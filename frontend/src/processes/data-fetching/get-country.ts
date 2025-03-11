import getCountry from "@/entities/country/api/get-country";
import { initialPropsType } from "@/features/country/model/country-types";

export const getInitialProps = (async (): Promise<initialPropsType> => {
    const res = await getCountry({ cursor: "", search: "" });
    const { data, pagination } = await res

    return {
        initialData: data,
        initialPagination: pagination
    }
})