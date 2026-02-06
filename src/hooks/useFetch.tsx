import { useState,useEffect } from "react"

interface useFetchResult<T> {
    data: T|null,
    loading: boolean,
    error: Error | null,
    
}

export const useFetch = <T,>(url: string): useFetchResult<T> => {
    
    const [data, setData] = useState<T | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await fetch(url)
            const json = await response.json();
            setData(json as T);
            setError(null);

        } 
        
        catch (err) {
            setError(err as Error)
        }

        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
     
     fetchData();
     console.log("useFetch ran this time for",url)

    }, [url]); 

  return ({ data, loading, error });
    
}


