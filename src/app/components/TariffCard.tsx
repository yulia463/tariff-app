'use client'
import React from 'react'
import { Tariff } from 'services/api'

export default function TariffCard({
                                       tariff,
                                       isDiscountActive,
                                       selected,
                                       onSelect,
                                       onBuyClick,
                                       showBig = false,
                                   }: {
    tariff: Tariff
    isDiscountActive: boolean
    selected: boolean
    onSelect: () => void
    onBuyClick: (tariffId: string) => void
    showBig?: boolean
}) {
    const discountPercent = Math.round(100 - (tariff.price / tariff.full_price) * 100)

    return (
        <article
            onClick={onSelect}
            className={`relative rounded-2xl overflow-hidden transition-shadow ${showBig ? 'md:col-span-2 p-6' : 'p-4'} ${selected ? 'ring-2 ring-yellow-400' : 'ring-0'} bg-[#1f2a2b]`}
        >
            <div className="flex gap-4 md:gap-8 items-start">
                <div className="hidden md:block w-36 flex-shrink-0">
                    <img src="/model.png" alt="" className="object-contain w-full h-full" />
                </div>

                <div className="flex-1">
                    <div className="flex items-start justify-between">
                        <div>
                            <div className="text-sm text-gray-300">{tariff.period}</div>
                            <div className="mt-1 text-lg font-semibold text-white">{tariff.text}</div>
                        </div>

                        {isDiscountActive && discountPercent > 0 && (
                            <div className="text-xs bg-red-500 text-white px-2 py-1 rounded">{`-${discountPercent}%`}</div>
                        )}
                    </div>

                    <div className="mt-4 flex items-end gap-6">
                        <div>
                            <div className="text-2xl font-bold">
                                {isDiscountActive ? `${tariff.price} ₽` : `${tariff.full_price} ₽`}
                            </div>
                            {isDiscountActive && (
                                <div className="text-sm line-through opacity-60">{tariff.full_price} ₽</div>
                            )}
                        </div>

                        <div className="ml-auto">
                            <button
                                onClick={(e) => { e.stopPropagation(); onBuyClick(tariff.id) }}
                                className={`px-4 py-2 rounded-md shadow-md ${selected ? 'animate-blink' : ''}`}
                                aria-label={`Купить ${tariff.period}`}
                            >
                                Купить
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    )
}
