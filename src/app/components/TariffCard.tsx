'use client'
import React from 'react'
import {Tariff} from 'services/api'
import "../page.css"

export default function TariffCard({
                                       tariff,
                                       isDiscountActive,
                                       selected,
                                       onSelect,
                                       onBuyClick,
                                       showBig = false,
                                       isFirst = false
                                   }: {
    tariff: Tariff
    isDiscountActive: boolean
    selected: boolean
    onSelect: () => void
    onBuyClick: (tariffId: string) => void
    showBig?: boolean
    isFirst?: boolean
}) {
    const discountPercent = Math.round(100 - (tariff.price / tariff.full_price) * 100)

    return (
        <div
            onClick={onSelect}
            className={`container ${isFirst ? 'first-tariff' : ''}`}>

            {isDiscountActive && !isFirst && discountPercent > 0 && (
                            <div className="discountPercent">{`-${discountPercent}%`}</div>
                        )}

            {isFirst && discountPercent > 0 && (
                <div className="discountPercentAndHit">
                    { isDiscountActive &&(<div className="discountPercent">{`-${discountPercent}%`}</div>)}
                    <div className="hit">хит!</div>
                </div>

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

                        <div className="text-container-div">{tariff.text}</div>

        </div>
    )
}
