import { FullProduct, Producto, ProductoSimilar } from "@interfaces/product";

// Función para obtener los productos populares desde el backend
export const GetProductosPopulares = async (): Promise<Producto[]> => {
  try {
    const response = await fetch('http://localhost:4000/producto/filtro/popularidad/1');
    const data = await response.json();
    return data.populares; 
  } catch (error) {
    console.error('Error al obtener productos populares:', error);
    return []; 
  }
};

export const GetProductosSimilares = async (): Promise<ProductoSimilar[]> => {
  try {
    const response = await fetch('http://localhost:4000/producto/similares/21');
    const data = await response.json();
    return data.productosSimilares; 
  } catch (error) {
    console.error('Error al obtener productos populares:', error);
    return []; 
  }
}; 


export const getProducts = async(): Promise<FullProduct[]> =>{
  const res = await fetch("http://localhost:4000/producto");
  if (!res.ok) {
    throw new Error("Error al traer productos");
  }
  const data = await res.json();
  return data.productosRandom;
}

  
