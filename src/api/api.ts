import axios, { AxiosResponse } from "axios";
import { Product } from "../types/types";

export type Category = string

const apiClient = axios.create({
  baseURL: 'https://fakestoreapi.com'
})

export const fetchProducts = (): Promise<AxiosResponse<Product[]>> => apiClient.get<Product[]>('/products')
export const fetchCategories = (): Promise<AxiosResponse<Category[]>> => apiClient.get<Category[]>('/products/categories')
