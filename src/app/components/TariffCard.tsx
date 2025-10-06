'use client'
import React from 'react'
import {Tariff} from 'services/api'
import "../page.css"

export default function TariffCard({
                                       tariff,
                                       isDiscountActive,
                                       onSelect,
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
            className={`
    relative flex flex-col 
    border-2
      ${isFirst
                ? 'rounded-[20px] md:rounded-[34px]'
                : 'rounded-[20px] md:rounded-[40px]'}
    bg-gray-300
    mb-[10px] pb-[20px] pl-[20px] pr-[20px] 
    box-border
    ${isFirst ? 'border-yellow' : 'border-gray-dark'}
    sm:mb-[12px] 
    md:mb-[20px] md:pr-[80px]
  `}
        >
            {/* --- скидка, если не первый --- */}
            {isDiscountActive && !isFirst && discountPercent > 0 && (
                <div
                    className={`
        mt-[-2px] self-end 
        bg-red-div 
        text-[13px] 
        px-[6px] py-[3px] 
        rounded-b-[6px] 
        mr-[28px]
        sm:text-[16px] sm:rounded-b-[8px] sm:mr-[30px]
        md:text-[22px] md:mr-[119px] md:mb-[30px]
      `}
                >
                    -{discountPercent}%
                </div>
            )}

            {/* --- скидка + ХИТ для первого --- */}
            {isFirst && discountPercent > 0 && (
                <div
                    className={`
        flex justify-between items-center w-full pr-[14px]
        sm:gap-[14px]
        md:flex-row md:justify-between md:items-center
      `}
                >
                    {isDiscountActive && (
                        <div
                            className={`
            mt-[-2px]
            bg-red-div
            text-[13px]
            px-[6px] py-[3px]
            rounded-b-[6px]
            mr-[10px]
            sm:text-[16px] sm:rounded-b-[8px] sm:mr-[16px]
            md:text-[22px] md:mr-[20px]
          `}
                        >
                            -{discountPercent}%
                        </div>
                    )}
                    <div
                        className={`
          text-yellow font-medium leading-[130%] 
          text-[13px] 
          sm:text-[16px] 
          md:text-[22px]
        `}
                    >
                        хит!
                    </div>
                </div>
            )}

            {/* --- Контент: цена + текст --- */}
            <div
                className={`
      flex flex-row justify-between items-center
      gap-[10px]
      md:gap-[40px]
      ${isFirst ? 'md:flex-row md:pl-[122px] md:items-center' : 'md:flex-col md:items-center md:pl-0'}
    `}
            >
                {/* --- Блок с ценой --- */}
                <div
                    className={`
        flex flex-col items-start md:items-end
        ${isFirst ? '' : 'md:mb-[10px]'}
      `}
                >
                    <div className="font-medium text-[16px] mobile-375:text-[18px] md:text-[26px] text-white">
                        {tariff.period}
                    </div>

                    <div className="flex flex-col w-fit">
                        <div
                            className={`
            font-semibold
            text-[30px]
            sm:text-[34px]
            md:text-[50px]
            whitespace-nowrap
            ${isFirst ? 'text-yellow' : 'text-white'}
          `}
                        >
                            {isDiscountActive ? `${tariff.price} ₽` : `${tariff.full_price} ₽`}
                        </div>

                        {isDiscountActive && (
                            <div
                                className="self-end font-normal text-[14px] text-gray-100 line-through decoration-[1px] mobile-375:text-[16px] md:text-[24px]"
                            >
                                {tariff.full_price} ₽
                            </div>
                        )}
                    </div>
                </div>

                {/* --- Текст --- */}
                <div
                    className={`
        font-normal text-[14px] leading-[130%] text-white md:text-[16px]
        pl-[10px] md:pl-[40px]
        md:max-w-[360px] md:text-left
        ${isFirst ? 'md:self-center' : ''}
      `}
                >
                    {tariff.text}
                </div>
            </div>
        </div>

    )


}
