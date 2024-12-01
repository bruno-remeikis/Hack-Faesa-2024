'use client'

import { PriceFalling } from "@/components/PriceFalling";
import { Stars } from "@/components/Stars";
import { enterprisesMock } from "@/mocks/enterprises";
import { Enterprise } from "@/models/Enterprise";
import { formatCnpj } from "@/utils/cnpjUtils";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function() {

    const router = useRouter();

    const { cnpj } = useParams();
    const enterprise: Enterprise | undefined = enterprisesMock.filter(e => e.cnpj === cnpj)[0];

    useEffect(() => {
        if (typeof cnpj !== 'string' || !enterprise) {
            alert('Empresa não existente');
            router.push('/');
        }
    }, [cnpj, enterprise])
    

    return (
        <div className="p-4">
            <div>
                <div className="flex gap-3">
                    <h2 className="text-3xl">{ enterprise?.name }</h2>
                    <Stars stars={enterprise.stars} size="lg" />
                </div>
                <span className="block text-black text-opacity-50 text-sm">{ formatCnpj(cnpj as string) }</span>

                <div className="flex mt-4">
                    <div className="p-2 border shadow-sm rounded">
                        <span className="block text-black text-opacity-50 text-xs">Porte da empresa</span>
                        <span className="block">{ enterprise?.size }</span>
                    </div>
                </div>

                <div className="flex flex-col justify-center items-center mt-8">
                    <span className="block text-black text-opacity-50">Valor atribuído</span>
                    <div className="flex gap-2 items-center">
                        <span className="text-4xl">R$ { enterprise.price }</span>
                        <PriceFalling priceFalling={enterprise.priceFalling} size="2xl" />
                    </div>
                </div>
            </div>
        </div>
    );
}