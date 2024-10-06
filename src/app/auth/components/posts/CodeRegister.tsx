"use client";
import { verifyCode } from "@interfaces/user";
import { verifyEmailRegister } from "@services/UserAuth/user";
import React, { ChangeEvent, FormEvent, useState } from "react";

interface AuthFormProps {
  mail: string; // Prop para recibir el título del formulario
}

export default function PswCodeForm({ mail }: AuthFormProps) {
  const [formData, setFormData] = useState<verifyCode>({
    codigoVeri: "",
    correo: mail,
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formData);
    try {
      const response = await verifyEmailRegister(formData);
      if (response.status) {
        console.log("Registro exitoso:", response);
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative z-10 h-[55.4%] w-full rounded-3xl bg-white opacity-90 shadow-2xl"
    >
      <div className="absolute top-[5.3%] flex h-[12.5%] w-full items-center justify-center">
        <h1 className="w-[88.1%] font-koulen text-3xl text-gray-800">
          RESTABLECER CLAVE
        </h1>
      </div>
      <div className="absolute top-[23.3%] ml-7 flex h-[10.6%] w-full">
        <h5 className="text-l w-[70.1%] font-lekton font-normal text-gray-600">
          Ingrese el codigo
        </h5>
      </div>
      <div className="absolute top-[35%] mt-6 flex h-[7.6%] w-full justify-center">
        <input
          id="codigoVeri"
          className="h-19 absolute h-14 w-[88.1%] rounded-2xl border border-gray-200 bg-white pl-3 pr-3 font-lekton text-gray-800 shadow-lg placeholder:font-lekton placeholder:text-gray-400 focus:outline-none"
          placeholder=""
          type="text"
          autoComplete="off"
          required
          value={formData.codigoVeri}
          onChange={handleChange}
          name="codigoVeri"
        />
      </div>
      <div className="absolute bottom-[35%] left-4 pl-3">
        <h1 className="font-lekton text-sm text-[#535353] underline decoration-[#535353]">
          ¿No recibiste ningun codigo?
        </h1>
      </div>
      <div className="absolute bottom-[15%] flex h-[10.19%] w-full justify-center">
        <button className="absolute flex h-full w-[56.61%] items-center justify-center rounded-3xl bg-[#C68EFE] pt-[1%]">
          <h1 className="w-[88.1%] font-koulen text-2xl text-white">ENVIAR</h1>
        </button>
      </div>
      <div className="absolute bottom-4 left-4">
        <a
          href="#"
          className="text-l font-lekton text-gray-600 hover:underline"
        >
          Volver
        </a>
      </div>
    </form>
  );
}
