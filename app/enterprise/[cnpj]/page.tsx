'use client'

import { PriceFalling } from "@/components/PriceFalling";
import { Separator } from "@/components/simple/Separator";
import { Stars } from "@/components/Stars";
import { Button } from "@/components/ui/button";
import { enterprisesMock } from "@/mocks/enterprises";
import { Enterprise } from "@/models/Enterprise";
import { formatCnpj } from "@/utils/cnpjUtils";
import Link from "next/link";
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
        <div className="flex flex-col items-center">
            <div className="center top">

                <div className="flex justify-between ">
                    <div>
                        <div className="flex gap-3">
                            <h2 className="text-3xl">{ enterprise?.name }</h2>
                            <Stars stars={enterprise.stars} size="lg" />
                        </div>
                        <div>
                            <h3 className="text-sm">FASTCLEAN LIMPEZAS EMPRESARIAIS LTDA</h3>
                            <span className="block text-black text-opacity-50 text-xs">{ formatCnpj(cnpj as string) }</span>
                        </div>
                    </div>

                    <div>
                        <span className="text-purple-">21</span>
                        <span> avaliações </span>
                        <span className="text-black text-opacity-50">de </span>
                        <span className="text-primary">4</span>
                        <span> empresas </span>
                    </div>
                </div>

                <div className="flex gap-10 mt-4">
                    <div>
                        <span className="block text-black text-opacity-50 text-xs">Porte da empresa</span>
                        <span className="block">{ enterprise?.size }</span>
                    </div>

                    <div>
                        <span className="block text-black text-opacity-50 text-xs">Tipo de serviço</span>
                        <span className="block">Limpeza</span>
                    </div>

                    <div>
                        <span className="block text-black text-opacity-50 text-xs">Natureza jurídica</span>
                        <span className="block">Privada</span>
                    </div>

                    <div>
                        <span className="block text-black text-opacity-50 text-xs">Desde</span>
                        <span className="block">25 de Abril de 1992</span>
                    </div>

                    <div className="flex-1 flex justify-end items-end">
                        <Button asChild>
                            <Link
                                href={`https://cnpja.com/office/${cnpj}`}
                                target="_blank">
                                Mais informações
                            </Link>
                        </Button>
                    </div>
                </div>

            </div>

            <Separator />

            <div className="flex flex-col justify-center items-center bottom">
                <span className="block text-black text-opacity-50">Valor atribuído</span>
                <div className="flex gap-2 items-center">
                    <span className="text-4xl">R$ { enterprise.price }</span>
                    <PriceFalling priceFalling={enterprise.priceFalling} size="2xl" />
                </div>
            </div>

            <div className="flex flex-col gap-8 p-4 center xl:pt-10">
                <div>
                    <span className="text-black text-opacity-75">Pontualidade dos Prestadores</span>
                    <Stars stars={4} size="xl" />
                </div>
                <div>
                    <span className="text-black text-opacity-75">Qualidade do serviço</span>
                    <Stars stars={3} size="xl" />
                </div>
            </div>
        </div>
    );
}