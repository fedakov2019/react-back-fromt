export const getURLParams=()=>
    {
        if (typeof window==='undefined') return null
        const query = new URLSearchParams(window.location.search);
        const value=Object.fromEntries(query);
        
        
        return value

    }