import axios, {AxiosRequestConfig} from 'axios';

const url: string = process.env.NEXT_PUBLIC_REACT_APP_API_URL as string;

const config = {Headers: {Authorization: 'rw'}}

const useApi = {
	get: (route: string)=>axios.get(url+route, config as AxiosRequestConfig),
	post: (route: string, data: any)=>axios.post(url+route, data, config as AxiosRequestConfig),
	put: (route: string)=>axios.put(url+route, config as AxiosRequestConfig),
	delete: (route: string)=>axios.delete(url+route, config as AxiosRequestConfig)
}

export default useApi;