"use client";
import Product from "../landing/components/Product";
import Footer from "components/Footer";
import Navbar from "components/navbar";
import Image from "next/image";
import Categorias from "./components/categories";
import { useEffect, useState } from "react";
import Prices from "./components/prices";
import { Filtered, FullProduct } from "@interfaces/product";
import { FilteredProducts, getProducts } from "@services/product";

export default function Products() {
  const [showCategories, setShowCategories] = useState(false);
  const [showPrices, setShowPrices] = useState(false);

  const [productos, setProductos] = useState<FullProduct[]>([]);
  const [productsSplit, setProductsSplit] = useState(0);

  const [pageNumber, setPageNumber] = useState(1);


  const [, setPricesData] = useState<Filtered>({
    categorias: [],
    min_precio: null,
    max_precio: null,
  });

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [categories, setCategories] = useState<string[]>([]);

  const handleSendCategories = async (updatedCategories: string[]) => {
    // Usa las categorías actualizadas que recibiste como argumento
    const filteredData = {
      categorias: updatedCategories,
      min_precio: (minPrice==0 && maxPrice==0)?(null):(minPrice),
      max_precio: (minPrice==0 && maxPrice==0)?(null):(maxPrice),
    };
  
 // Ahora debería mostrar las categorías correcta  
    if (filteredData.categorias.length > 0 || minPrice !== 0 || maxPrice !== 0) {
      try {
        const res = await FilteredProducts(filteredData); // Llama a la función para obtener los productos filtrados
        setProductos([]); // Limpia productos antes de actualizar
        console.log("Enviando: ", filteredData); // Asegúrate de que envías los datos correctos
        console.log("Recibiendo: ", res); // Imprime los resultados de los productos filtrados
        // setProductos(res); // Actualiza el estado con los nuevos productos
      } catch (error) {
        console.error("Error al traer productos:", error);
        setProductos([]); // Limpia en caso de error
      }
    }
  };


  const handleFilter = ()=>{
    setShowPrices(false); // Oculta precios
    console.log("padre:", categories)
    setPricesData((prevState) => ({
      ...prevState,
      categorias: categories,
      min_precio: null,
      max_precio: null,
    }));
    handleSendCategories(categories);
  }

  const handlePageNumber = (index: number) => {
    setPageNumber(index);
    setProductsSplit((index - 1) * 16);
    if (productsSplit != (index - 1) * 16) {
      window.scrollTo({
        top: 0,
        behavior: "smooth", // Esto hace que el desplazamiento sea suave
      });

    }
  };

  const handleSplitNext = () => {
    if (productos.length >= productsSplit + 16) {
      setProductsSplit(productsSplit + 16);
      window.scrollTo({
        top: 0,
        behavior: "smooth", // Esto hace que el desplazamiento sea suave
      });
      setPageNumber(pageNumber + 1);
    }
  };

  const handleSplitPrev = () => {
    if (productsSplit - 16 >= 0) {
      setProductsSplit(productsSplit - 16);
      window.scrollTo({
        top: 0,
        behavior: "smooth", // Esto hace que el desplazamiento sea suave
      });
      setPageNumber(pageNumber - 1);
    }
  };



  const handlePrices = () => {
    setShowPrices(!showPrices);
    setShowCategories(false);
    setPricesData({
      categorias: categories,
      min_precio: minPrice,
      max_precio: maxPrice,
    });
    handleSendCategories(categories);
  };

  const totalProducts = productos.length;

  // Calculamos x como el número de páginas (o grupos) en base a 16 productos por grupo
  const pagesNumber = Math.ceil(totalProducts / 15);
  const divNumbers = Array.from({ length: pagesNumber }, (_, i) => i + 1);

  useEffect(() => {
    async function fetchGets() {
      try {
        const res = await getProducts(); // Llama a la función para obtener los productos
        setProductos(res); // Actualiza el estado con el resultado
      } catch (error) {
        console.error("Error al traer productos:", error);
      }
    }
    fetchGets();
  }, []);

  const handleToggleCategories = () => {
    setShowCategories((prev) => !prev);
  };

  return (
    <div>
      <Navbar />
      <section className="bg-white">
        <div className="flex h-20 items-center">
          <h1 className="pl-6 font-koulen text-5xl text-gray-900">Productos</h1>
          <Image
            src="/img/girasol.svg"
            alt="Crochet Flower"
            width={40}
            height={40}
            className="pointer-events-none ml-3 mix-blend-multiply"
          />
          <Image
            src="/img/girasol.svg"
            alt="Crochet Flower"
            width={15}
            height={15}
            className="pointer-events-none ml-2 mt-4 mix-blend-multiply"
          />
        </div>
        <div className="flex h-32 flex-col-reverse">
          <div className="mb-3 flex h-9 w-full items-center pl-6">
            <div className="mr-3 flex items-center rounded-2xl bg-gray-200 px-2 font-lekton text-lg text-[#444343]">
              <h2>Aretes</h2>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5 pl-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </div>
            <div className="mr-3 flex items-center rounded-2xl bg-gray-200 px-2 font-lekton text-lg text-[#444343]">
              <h2>Amigurumis</h2>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5 pl-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </div>

            <div className="mr-3 flex items-center px-2 font-lekton text-lg text-[#444343]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 z-20"
                onClick={handleFilter}
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z"
                />
              </svg>
            </div>

            <div className="mr-3 flex items-center px-2 font-lekton text-lg text-[#444343]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            </div>
          </div>

          <div className="relative mb-3 flex h-9 w-full items-center pl-6">
            <h2 className="font-lekton text-lg text-[#444343]">Filtros :</h2>

            <div className="relative ml-6 flex items-center font-lekton text-lg text-[#444343]">
              <h2>Categorias</h2>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.1}
                stroke="currentColor"
                className={`size-5 transition-all duration-300 ease-linear rotate${showCategories ? "rotate-180 transform" : ""}`}
                onClick={handleToggleCategories}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m19.5 8.25-7.5 7.5-7.5-7.5"
                />
              </svg>

              <div className="absolute top-7 h-[700%] w-[160%]">
                <Categorias
                  open={showCategories}
                  setOpen={setShowCategories}
                  categories={categories}
                  setCategories={setCategories}
                />
              </div>
            </div>

            <div className="ml-6 flex items-center font-lekton text-lg text-[#444343]">
              <h2>Precio</h2>
              <svg
                onClick={handlePrices}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.1}
                stroke="currentColor"
                className={`size-5 transition-all duration-300 ease-linear rotate${showPrices ? "rotate-180 transform" : ""}`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m19.5 8.25-7.5 7.5-7.5-7.5"
                />
              </svg>

              <div className="absolute top-7 ml-4 h-[210%] w-[22%] rounded-lg">
                <Prices
                  open={showPrices}
                  setOpen={setShowPrices}
                  minPrice={minPrice}
                  maxPrice={maxPrice}
                  setMinPrice={setMinPrice}
                  setMaxPrice={setMaxPrice}
                />
              </div>
            </div>

            <div className="absolute right-[10%] ml-6 flex items-center font-lekton text-lg text-[#444343]">
              <h2>Ordenar por:</h2>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.1}
                stroke="currentColor"
                className="size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m19.5 8.25-7.5 7.5-7.5-7.5"
                />
              </svg>
            </div>
          </div>
        </div>

        <section className="h-full px-[8.32%] py-12">
          <div className="grid grid-cols-4 gap-6">
            {productos
              .slice(productsSplit, productsSplit + 16)
              .map((producto) => (
                <div
                  key={producto.id_producto}
                  className="h-[364px] w-[260px] text-center"
                >
                  <Product
                    nombre={producto.nombre_prod}
                    precio={`$${producto.precio_venta.toFixed(2)}`}
                    imagen={producto.imagen_principal}
                  />
                </div>
              ))}
          </div>
        </section>

        <div className="flex h-20 items-start justify-end border border-blue-800 px-[8.32%]">
          <div className="flex h-2/3">
            <button
              onClick={handleSplitPrev}
              type="button"
              className="mb-2 me-2 flex h-full w-20 items-center justify-center bg-gradient-to-l from-[#C68EFE] from-30% to-pink-500 px-5 py-2.5 text-center text-sm font-medium text-white transition-all duration-1000 ease-in-out hover:bg-gradient-to-r focus:outline-none focus:ring-4 focus:ring-transparent"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="3"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                />
              </svg>
            </button>
            <div className="flex h-full items-center justify-evenly bg-slate-50 px-1">
              {divNumbers.map((number) =>
                divNumbers.length > 4 ? (
                  pageNumber > 2 ? (
                    number == divNumbers.length - 1 &&
                    number != pageNumber + 1 &&
                    number != pageNumber ? (
                      <div className="mx-1 flex h-7 w-9 items-end justify-center font-lekton text-lg text-blue-400">
                        ...
                      </div>
                    ) : number == divNumbers.length && number != pageNumber ? (
                      <div
                        key={number}
                        onClick={() => handlePageNumber(number)}
                        className={`mx-1 flex h-7 w-7 items-center justify-center border border-[#C68EFE] pt-1 font-lekton text-lg ${
                          pageNumber === number
                            ? "bg-[#C68EFE] text-white" // Estilos cuando pageNumber coincide con number
                            : "text-[#C68EFE] hover:bg-[#C68EFE] hover:text-white" // Estilos por defecto
                        }`}
                      >
                        {number}
                      </div>
                    ) : number >= pageNumber - 1 && number <= pageNumber + 1 ? (
                      <div
                        key={number}
                        onClick={() => handlePageNumber(number)}
                        className={`mx-1 flex h-7 w-7 items-center justify-center border border-[#C68EFE] pt-1 font-lekton text-lg ${
                          pageNumber === number
                            ? "bg-[#C68EFE] text-white" // Estilos cuando pageNumber coincide con number
                            : "text-[#C68EFE] hover:bg-[#C68EFE] hover:text-white" // Estilos por defecto
                        }`}
                      >
                        {number}
                      </div>
                    ) : (
                      ""
                    )
                  ) : number == divNumbers.length - 1 ? (
                    <div className="mx-1 flex h-7 w-9 items-end justify-center font-lekton text-lg text-blue-400">
                      ...
                    </div>
                  ) : number == divNumbers.length ? (
                    <div
                      key={number}
                      onClick={() => handlePageNumber(number)}
                      className={`mx-1 flex h-7 w-7 items-center justify-center border border-[#C68EFE] pt-1 font-lekton text-lg ${
                        pageNumber === number
                          ? "bg-[#C68EFE] text-white" // Estilos cuando pageNumber coincide con number
                          : "text-[#C68EFE] hover:bg-[#C68EFE] hover:text-white" // Estilos por defecto
                      }`}
                    >
                      {number}
                    </div>
                  ) : number <= 3 ? (
                    <div
                      key={number}
                      onClick={() => handlePageNumber(number)}
                      className={`mx-1 flex h-7 w-7 items-center justify-center border border-[#C68EFE] pt-1 font-lekton text-lg ${
                        pageNumber === number
                          ? "bg-[#C68EFE] text-white" // Estilos cuando pageNumber coincide con number
                          : "text-[#C68EFE] hover:bg-[#C68EFE] hover:text-white" // Estilos por defecto
                      }`}
                    >
                      {number}
                    </div>
                  ) : (
                    ""
                  )
                ) : (
                  <div
                    key={number}
                    onClick={() => handlePageNumber(number)}
                    className={`mx-1 flex h-7 w-7 items-center justify-center border border-[#C68EFE] pt-1 font-lekton text-lg ${
                      pageNumber === number
                        ? "bg-[#C68EFE] text-white" // Estilos cuando pageNumber coincide con number
                        : "text-[#C68EFE] hover:bg-[#C68EFE] hover:text-white" // Estilos por defecto
                    }`}
                  >
                    {number}
                  </div>
                ),
              )}
            </div>
            <button
              onClick={handleSplitNext}
              type="button"
              className="mb-2 me-2 flex h-full w-20 items-center justify-center bg-gradient-to-r from-[#C68EFE] from-30% to-pink-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-l focus:outline-none focus:ring-4 focus:ring-transparent dark:focus:ring-transparent"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="3"
                stroke="currentColor"
                className="size-6 -scale-x-90"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                />
              </svg>
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
