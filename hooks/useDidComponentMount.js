import { useEffect, useRef } from "react"

const useDidComponentMount = () => {
	const didComponentMount = useRef(false)

	useEffect(() => {
		didComponentMount.current = true
	}, [])

	return didComponentMount.current
}

export default useDidComponentMount