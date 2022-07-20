import { useState } from "react"

export const useField = (field) => {
    const [value,setValue] = useState('')

    const onChange = e => setValue(e.target.value)
    const reset = ()=> setValue('')
    return {
        attr:{field,
        value,
        onChange},
        reset
    }
}