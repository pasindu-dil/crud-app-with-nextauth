'use client'

import { useRef, useState } from "react";

import { initialPropsType } from "@/features/country/model/country-types";
import getCountry from "@/entities/country/api/get-country";
import Search from "./Search";
import { useDebouncedCallback } from "use-debounce";

const CountryTable = ({ initialData, initialPagination }: initialPropsType) => {
    const [data, setData] = useState(initialData);
    const [pagination, setPagination] = useState(initialPagination);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");

    const getCountryByCursor = async ({ cursor, searchTerm }: { cursor: string, searchTerm: string }) => {
        if (loading) return;

        setLoading(true);
        try {
            const response = await getCountry({ cursor, search: searchTerm });
            const { data, pagination } = await response;

            setData(data);
            setPagination(pagination);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const fetchNextPage = async () => {
        const nextCursor = pagination.nextCursor?.match(/cursor=([^&]*)/)[1];
        getCountryByCursor({ cursor: nextCursor, searchTerm: search });
    }

    const fetchPreviousPage = async () => {
        const previousCursor = pagination.previousCursor?.match(/cursor=([^&]*)/)[1];
        getCountryByCursor({ cursor: previousCursor, searchTerm: search });
    }

    const searchCountry = useDebouncedCallback(async (searchTerm: string) => {
        setSearch(searchTerm);
        getCountryByCursor({ cursor: "", searchTerm });
    }, 300)

    return (
        <div className="w-full px-4">
            <div className="mb-4 flex items-center justify-between gap-6">
                <h1>Country Table</h1>
                <Search handleSearch={searchCountry} />
            </div>
            <table className={`w-full text-sm text-left text-gray-500 dark:text-gray-400 ${loading ? "animate-pulse" : ""}`}>
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th className="font-semibold p-2">Country Name</th>
                        <th className="font-semibold p-2">Country Code</th>
                    </tr>
                </thead>
                <tbody>
                    {loading && <tr><td colSpan={2} className="p-2 text-center">Loading...</td></tr>}
                    {data.map((country) => (
                        <tr key={country.id}>
                            <td className="p-2">{country.name}</td>
                            <td className="p-2">{country.id}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {pagination.previousCursor &&
                <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mr-4 inline-flex" onClick={fetchPreviousPage} disabled={loading} >
                    {/* <svg className={`mr-3 size-5 bg-white ${loading ? "animate-spin" : ""}`} viewBox="0 0 24 24"></svg> */}
                    Previous
                </button>}
            {pagination.nextCursor &&
                <button type="button" className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mr-4 inline-flex`} disabled={loading} onClick={fetchNextPage} >
                    {/* <svg className={`mr-3 size-5 bg-white ${loading ? "animate-spin" : ""}`} viewBox="0 0 24 24"></svg> */}
                    Load More
                </button>
            }
        </div>
    )
}

export default CountryTable