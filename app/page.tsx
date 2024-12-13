'use client'

import { Modal, VisibilityModalProps } from "@/components/modal/Modal";
import { PriceFalling } from "@/components/PriceFalling";
import { Select, SelectItemProps } from "@/components/simple/Select";
import { Separator } from "@/components/simple/Separator";
import { Stars } from "@/components/Stars";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { bairrosMock, cidadesMock, ufsMock } from "@/mocks/cep";
import { enterprisesMock } from "@/mocks/enterprises";
import { servicesMock } from "@/mocks/services";
import { Enterprise } from "@/models/Enterprise";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { CiFilter } from "react-icons/ci";

export default function Home() {

  const [isModalOpen, setModalOpen] = useState<boolean>(true);

  const [ufs, setUfs] = useState<SelectItemProps[]>([]);
  const [uf, setUf] = useState<string | null>(null);

  const [cities, setCities] = useState<SelectItemProps[]>([]);
  const [city, setCity] = useState<string | null>(null);

  useEffect(() => {
    fetch('https://brasilapi.com.br/api/ibge/uf/v1')
      .then(res => res.json())
      .then(json => setUfs(json
        .map((res: any) => ({ name: res.sigla, value: res.sigla }))
        .sort((a: any, b:any) => a.name.localeCompare(b.name))));
  }, []);

  useEffect(() => {
    if (!uf) {
      setCity(null);
      return;
    }

    fetch(`https://brasilapi.com.br/api/ibge/municipios/v1/${uf}?providers=dados-abertos-br,gov,wikipedia`)
      .then(res => res.json())
      .then(json => setCities(json
        .map((res: any) => ({ name: formatCityName(res.nome), value: res.codigo_ibge }))
        .sort()));
  }, [uf]);

  function formatCityName(text: string): string {
    return text
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  return (
    <div className="flex flex-col items-center">

      <div className="form center top">
        <span className="block text-sm text-black text-opacity-50">Buscar por</span>
        <div className="row">
          <Select placeholder="Serviço" items={servicesMock} />
          <button className="flex items-center px-2 py-1 border rounded">
            Filtro
            <CiFilter />
          </button>
        </div>

        <div className="row">
          <Select placeholder="UF" items={ufs} setItem={setUf} className="flex-1" />
          <Select placeholder="Cidade" items={cities} setItem={setCity} disabled={!uf} />
          <Button variant="default" className="">Buscar pelos melhores</Button>
        </div>
        
      </div>

      <Separator />

      <div className="center bottom">
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