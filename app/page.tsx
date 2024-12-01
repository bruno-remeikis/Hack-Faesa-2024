'use client'

import { Modal, VisibilityModalProps } from "@/components/modal/Modal";
import { PriceFalling } from "@/components/PriceFalling";
import { Select } from "@/components/simple/Select";
import { Stars } from "@/components/Stars";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { bairrosMock, cidadesMock, ufsMock } from "@/mocks/cep";
import { enterprisesMock } from "@/mocks/enterprises";
import { servicesMock } from "@/mocks/services";
import { Enterprise } from "@/models/Enterprise";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CiFilter } from "react-icons/ci";
import { FaRegStar, FaStar, FaStarHalf, FaStarHalfAlt } from "react-icons/fa";
import { FiArrowDown, FiArrowUp, FiStar } from "react-icons/fi";

export default function Home() {

  const [isModalOpen, setModalOpen] = useState<boolean>(true);

  return (
    <div className="">

      <div className="form p-4 shadow-md">
        <span className="block text-sm text-black text-opacity-50">Buscar por</span>
        <div className="row">
          <Select placeholder="Serviço" items={servicesMock} />
          <button className="flex items-center px-2 py-1 border rounded">
            Filtro
            <CiFilter />
          </button>
        </div>
        <div className="row">
          {/* <input type="text" placeholder="UF" /> */}
          <Select placeholder="UF" items={ufsMock} className="flex-1" />
          <Select placeholder="Cidade" items={cidadesMock} />
          <Select placeholder="Bairro" items={bairrosMock} />
        </div>
        <div className="row justify-end">
          <Button variant="default" className="">Buscar pelos melhores</Button>
        </div>
      </div>

      <div className="p-4">
        <span className="block mb-1 text-sm text-black text-opacity-50">resultados</span>
        <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
          {enterprisesMock.map(e => <Result key={e.cnpj} enterprise={e} />)}
        </div>
      </div>

      <DataModal visible={isModalOpen} setVisible={setModalOpen} />

    </div>
  );
}

function Result({ enterprise: { cnpj, name, price, priceFalling, stars } }: { enterprise: Enterprise }) {
  
  const router = useRouter();
  
  return (
    <div
      className="px-3 py-2 border rounded cursor-pointer hover:bg-purple-200 hover:border-primary transition-all"
      onClick={() => router.push(`/enterprise/${cnpj}`)}  
    >
      <div className="flex items-center justify-between">
        <span className="block ">{ name }</span>
        <Stars stars={stars} />
      </div>
      <div className="flex items-center gap-1">
        <span className="block text-sm">R$ { price }</span>
        <PriceFalling priceFalling={priceFalling} />
      </div>
    </div>
  );
}

function DataModal({ visible, setVisible }: VisibilityModalProps) {
  return (
    <Modal
      visible={visible}
      setVisible={setVisible}
      hideCloseButton
      preventHideOnClickOut
      overlayClassName="p-6"
    >
      <div>
        <div className="flex flex-col items-center mb-3">
          <span className="text-sm">Para ter acesso às suas melhores opções,</span>
          <span className="text-primary">contribua com a gente!</span>
        </div>
        <div className="form">
          <Input placeholder="CNPJ da prestadora" />
          <Assessment label="Pontualidade dos prestadores" />
          <Assessment label="Qualidade do serviço" />
          <div className="row justify-end">
            <Button onClick={() => setVisible && setVisible(false)}>Pronto!</Button>
          </div>
        </div>
      </div>
    </Modal>
  )
}

function Assessment({ label }: { label: string }) {
  const className = "text-xs px-2 rounded-none border-r-0" // hover:border-primary hover:border

  return (
    <div>
      <span className="text-black text-opacity-75 text-sm">{ label }</span>
      <div className="grid grid-cols-5">
        <Button variant="outline" className={`${className} rounded-l`}>Péssimo</Button>
        <Button variant="outline" className={className}>Ruim</Button>
        <Button variant="outline" className={className}>Regular</Button>
        <Button variant="outline" className={className}>Bom</Button>
        <Button variant="outline" className={`${className} rounded-r border-r`}>Ótimo</Button>
      </div>
    </div>
  )
}