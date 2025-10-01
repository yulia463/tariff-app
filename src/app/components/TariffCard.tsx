'use client'
import React from 'react'
import { Tariff } from 'services/api'
import "../page.css"
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
        <div
            onClick={onSelect}
            className='container'>

                {/*<div*/}
                {/*    className="hidden md:block w-36 flex-shrink-0"*/}
                {/*>*/}
                {/*    <img src="/model.png" alt="" className="object-contain w-full h-full" />*/}
                {/*</div>*/}

                        {isDiscountActive && discountPercent > 0 && (
                            <div className="discountPercent">{`-${discountPercent}%`}</div>
                        )}
                        <div>
                            <div className="period">{tariff.period}</div>
                        </div>


                        <div>
                            <div  className="discountActive">
                                {isDiscountActive ? `${tariff.price} ₽` : `${tariff.full_price} ₽`}
                            </div>

                            {isDiscountActive && (
                                <div  className="full-price">{tariff.full_price} ₽</div>
                            )}

                        </div>

                        <div className="text-frorr">{tariff.text}</div>

                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onBuyClick(tariff.id)
                                }}
                                className={` ${selected ? 'animate-blink' : ''}`}
                                // className={`px-4 py-2 rounded-md shadow-md ${selected ? 'animate-blink' : ''}`}
                                aria-label={`Купить ${tariff.period}`}
                            >
                                Купить
                            </button>
                        </div>
    )
}
